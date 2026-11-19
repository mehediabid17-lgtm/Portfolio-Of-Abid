import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadJsonFile(relativePath) {
  const fullPath = path.resolve(__dirname, relativePath);
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

const appConfig = loadJsonFile('config.json');
const portfolioData = loadJsonFile('portfolio-data.json');

function buildPortfolioSummary(data) {
  const p = data.profile || {};
  const socials = (p.socials || []).map((s) => `${s.name}: ${s.url}`).join(' | ');
  const edu = (data.education || [])
    .map((e) => `- ${e.degree} at ${e.institution} (${e.year}): ${e.description}`)
    .join('\n');
  const exp = (data.experience || [])
    .map((e) => `- ${e.role} at ${e.company} (${e.duration}): ${e.description}`)
    .join('\n');
  const certs = (data.certificates || [])
    .map((c) => `- ${c.title} (${c.organization}, ${c.year}): ${c.description}`)
    .join('\n');
  const proj = (data.projects || [])
    .map(
      (pr) =>
        `- ${pr.title} (${pr.date}) [${(pr.tech || []).join(', ')}]: ${pr.description}${pr.link && pr.link !== '#' ? ` | Live: ${pr.link}` : ''}${pr.github && pr.github !== '#' ? ` | GitHub: ${pr.github}` : ''}`
    )
    .join('\n');
  const skills = (data.skillCategories || [])
    .map(
      (cat) =>
        `- ${cat.title}: ${(cat.skills || []).map((s) => `${s.name} (${s.level}%)`).join(', ')}`
    )
    .join('\n');

  return [
    `Name: ${p.fullName}`,
    `Role/Badge: ${p.badge}`,
    `Focus: ${p.focus} | Education Summary: ${p.educationSummary}`,
    `Email: ${p.email} | Phone: ${p.phone} | Location: ${p.location}`,
    `CV: ${p.cvUrl}`,
    `Socials: ${socials}`,
    `Typewriter Roles: ${(p.typewriterWords || []).join(', ')}`,
    `About: ${p.aboutParagraph}`,
    `Vision: ${p.visionQuote}`,
    `Education:\n${edu}`,
    `Experience:\n${exp}`,
    `Projects:\n${proj}`,
    `Skills:\n${skills}`,
    `Certificates:\n${certs}`,
    `Portfolio Pages: ${(data.navLinks || []).map((n) => `${n.name} (${n.href})`).join(', ')}`,
  ].join('\n\n');
}

const PORTFOLIO_KNOWLEDGE = buildPortfolioSummary(portfolioData);

const ABID_ASSISTANT_SYSTEM_INSTRUCTION = `You are the portfolio assistant for Abid (Mehedi Hasan Abid). Your primary job is to remember and use all the information provided about Abid from his portfolio and answer questions accurately based on it.

Rules:
1. Answer questions clearly, concisely, and helpfully using only the provided portfolio information.
2. If a user asks anything unrelated to Abid or outside the provided portfolio information (such as general knowledge, random trivia, outside news, coding tutorials not specific to Abid's portfolio, or unrelated tasks), do NOT answer it. Instead, respond only with:
Please ask me Questions About Abid
3. Keep your tone friendly, professional, and aligned with Abid's portfolio.
4. Never invent details that are not in the provided portfolio information. If a specific detail about Abid is not present in the portfolio data, state clearly that it is not listed in his portfolio or respond with:
Please ask me Questions About Abid

Portfolio Information for Abid:
${PORTFOLIO_KNOWLEDGE}`;

function createGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      timeout: 18000,
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function sendChatWithRetry(ai, history, message) {
  const contents = [
    ...history,
    { role: 'user', parts: [{ text: message }] },
  ];

  try {
    return await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents,
      config: {
        systemInstruction: ABID_ASSISTANT_SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        abortSignal: AbortSignal.timeout(15000),
      },
    });
  } catch (err) {
    const status = Number(err?.status || err?.statusCode || 0);
    const msg = String(err?.message || '');
    const isDeadlineOrTransient =
      status === 503 ||
      status === 504 ||
      err?.name === 'TimeoutError' ||
      err?.name === 'AbortError' ||
      msg.includes('DEADLINE_EXCEEDED');

    if (!isDeadlineOrTransient) {
      throw err;
    }

    return await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents,
      config: {
        systemInstruction: ABID_ASSISTANT_SYSTEM_INSTRUCTION,
        abortSignal: AbortSignal.timeout(15000),
      },
    });
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || appConfig.server.defaultPort || 3000;
  const HOST = appConfig.server.host || '0.0.0.0';

  app.use(express.json({ limit: '64kb' }));

  app.get('/api/portfolio', (_req, res) => {
    res.json(portfolioData);
  });

  app.get('/api/config', (_req, res) => {
    res.json({
      updatesFeed: appConfig.updatesFeed,
    });
  });

  app.post('/api/chat', async (req, res) => {
    const startedAt = Date.now();
    const rawMessage = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
    if (!rawMessage) {
      return res.status(400).json({ error: 'Please enter a message before sending.' });
    }
    if (rawMessage.length > 1000) {
      return res.status(400).json({ error: 'Message is too long. Please keep it under 1000 characters.' });
    }

    const ai = createGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured. Please check your key in the Settings > Secrets panel.',
      });
    }

    const rawHistory = Array.isArray(req.body?.history) ? req.body.history : [];
    const safeHistory = rawHistory
      .filter(
        (entry) =>
          entry &&
          (entry.role === 'user' || entry.role === 'model') &&
          typeof entry.text === 'string' &&
          entry.text.trim().length > 0
      )
      .slice(-12)
      .map((entry) => ({
        role: entry.role,
        parts: [{ text: entry.text.trim().slice(0, 2000) }],
      }));

    try {
      const response = await sendChatWithRetry(ai, safeHistory, rawMessage);
      const reply = typeof response?.text === 'string' ? response.text.trim() : '';
      if (!reply) {
        return res.status(502).json({ error: 'Received an empty response. Please try again.' });
      }
      return res.json({ reply });
    } catch (err) {
      const status = Number(err?.status || err?.statusCode || 0);
      const msg = String(err?.message || '');
      const causeCode = String(err?.cause?.code || err?.cause?.message || '');
      console.error(`Gemini chat error after ${Date.now() - startedAt}ms:`, status, err?.name, msg, causeCode);

      if (status === 403 || msg.includes('PERMISSION_DENIED') || msg.includes('API_KEY_INVALID')) {
        return res.status(403).json({
          error: 'API key permission or validation error. Please check your API key in Settings > Secrets.',
        });
      }
      if (status === 429 || msg.includes('RESOURCE_EXHAUSTED')) {
        return res.status(429).json({
          error: 'The assistant is temporarily busy due to rate limits. Please try again in a moment.',
        });
      }
      if (status === 404 || msg.includes('NOT_FOUND')) {
        return res.status(502).json({
          error: 'Requested Gemini model is currently unavailable. Please try again shortly.',
        });
      }
      if (
        status === 504 ||
        err?.name === 'TimeoutError' ||
        err?.name === 'AbortError' ||
        msg.includes('timed out') ||
        msg.includes('DEADLINE_EXCEEDED')
      ) {
        return res.status(504).json({
          error: 'The assistant took too long to respond. Please try again.',
        });
      }
      return res.status(500).json({
        error: 'Unable to reach the assistant right now. Please try again.',
      });
    }
  });

  const distDir = path.resolve(__dirname, 'dist');
  const isProduction =
    process.env.NODE_ENV === 'production' || process.argv.includes('--prod');

  const NO_STORE_HTML_HEADERS = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  };

  function isStaticAssetRequest(reqPath) {
    return (
      reqPath.startsWith('/assets/') ||
      reqPath.startsWith('/api/') ||
      /\.(?:js|mjs|css|map|json|png|jpe?g|webp|gif|svg|ico|woff2?|ttf|eot)$/i.test(reqPath)
    );
  }

  function mountProductionStatic() {
    app.use(
      express.static(distDir, {
        setHeaders(res, filePath) {
          if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
          } else if (/\.[a-f0-9]{8,}\.(?:js|css)$/i.test(filePath) || /-[A-Za-z0-9_-]{6,}\.(?:js|css)$/i.test(filePath)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          } else {
            res.setHeader('Cache-Control', 'public, max-age=3600');
          }
        },
      })
    );

    app.get('*', (req, res) => {
      if (isStaticAssetRequest(req.path)) {
        return res.status(404).end();
      }
      res.set(NO_STORE_HTML_HEADERS);
      return res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  if (!isProduction) {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: {
          middlewareMode: true,
          hmr: process.env.DISABLE_HMR !== 'true',
        },
        appType: 'spa',
      });
      app.use((req, res, next) => {
        if (req.method === 'GET' && !isStaticAssetRequest(req.path)) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        }
        next();
      });
      app.use(vite.middlewares);
    } catch (viteErr) {
      if (fs.existsSync(distDir)) {
        mountProductionStatic();
      } else {
        throw viteErr;
      }
    }
  } else {
    mountProductionStatic();
  }

  const server = app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });

  // Prevent intermittent 502/connection-reset behind Cloud Run / reverse proxies on mobile
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

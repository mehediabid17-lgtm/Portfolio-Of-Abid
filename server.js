import express from 'express';
import compression from 'compression';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadJsonFile(relativePath) {
  const fullPath = path.resolve(__dirname, relativePath);
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

const appConfig = loadJsonFile('config.json');
const portfolioData = loadJsonFile('portfolio-data.json');

function getConfiguredGithubUsername() {
  const socials = (portfolioData.profile && portfolioData.profile.socials) || [];
  const gh = socials.find((s) => String(s.name || '').toLowerCase() === 'github');
  if (gh && gh.url) {
    const match = String(gh.url).match(/github\.com\/([^/?#]+)/i);
    if (match && match[1]) return match[1];
  }
  return 'mehediabid17-lgtm';
}

const GITHUB_CACHE_TTL_MS = 15 * 60 * 1000;
const githubCache = new Map();

function parseGithubContributionsHtml(html) {
  const contributions = [];
  const rowRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="([0-4])"/g;
  const seen = new Set();
  let match;
  while ((match = rowRegex.exec(html)) !== null) {
    const date = match[1];
    const level = Number(match[2]) || 0;
    if (seen.has(date)) continue;
    seen.add(date);
    contributions.push({ date, count: level > 0 ? level : 0, level });
  }
  contributions.sort((a, b) => a.date.localeCompare(b.date));
  return contributions;
}

async function fetchLiveGithubBundle(username) {
  const cached = githubCache.get(username);
  if (cached && Date.now() - cached.fetchedAt < GITHUB_CACHE_TTL_MS) {
    return cached.data;
  }

  const headers = {
    'User-Agent': 'Portfolio-Of-Abid/1.0',
    Accept: 'application/json',
  };

  const [contribRes, userRes, reposRes] = await Promise.allSettled([
    fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}`, {
      headers,
      signal: AbortSignal.timeout(6000),
    }),
    fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers,
      signal: AbortSignal.timeout(6000),
    }),
    fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=10&sort=pushed`, {
      headers,
      signal: AbortSignal.timeout(6000),
    }),
  ]);

  let totalsByYear = {};
  let contributions = [];

  if (contribRes.status === 'fulfilled' && contribRes.value.ok) {
    const contribJson = await contribRes.value.json();
    totalsByYear = contribJson.total || {};
    contributions = Array.isArray(contribJson.contributions) ? contribJson.contributions : [];
  } else {
    try {
      const htmlRes = await fetch(
        `https://github.com/users/${encodeURIComponent(username)}/contributions`,
        { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(6000) }
      );
      if (htmlRes.ok) {
        const htmlText = await htmlRes.text();
        contributions = parseGithubContributionsHtml(htmlText);
      }
    } catch (_) {
      // Fall through cleanly
    }
  }

  let profile = null;
  if (userRes.status === 'fulfilled' && userRes.value.ok) {
    const userJson = await userRes.value.json();
    profile = {
      login: userJson.login || username,
      name: userJson.name || username,
      avatarUrl: userJson.avatar_url || '',
      htmlUrl: userJson.html_url || `https://github.com/${username}`,
      publicRepos: Number(userJson.public_repos) || 0,
      followers: Number(userJson.followers) || 0,
      following: Number(userJson.following) || 0,
    };
  }

  let repos = [];
  if (reposRes.status === 'fulfilled' && reposRes.value.ok) {
    const reposJson = await reposRes.value.json();
    if (Array.isArray(reposJson)) {
      repos = reposJson
        .filter((r) => !r.fork)
        .slice(0, 4)
        .map((r) => ({
          name: r.name,
          url: r.html_url,
          description: r.description || '',
          language: r.language || '',
          stars: Number(r.stargazers_count) || 0,
          pushedAt: r.pushed_at || r.updated_at || '',
        }));
    }
  }

  const payload = {
    username,
    fetchedAt: new Date().toISOString(),
    totalsByYear,
    contributions,
    profile,
    repos,
  };

  if (contributions.length > 0) {
    githubCache.set(username, { fetchedAt: Date.now(), data: payload });
  }

  return payload;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || appConfig.server.defaultPort || 3000;
  const HOST = appConfig.server.host || '0.0.0.0';

  app.use(compression({ threshold: 512 }));

  app.get('/api/portfolio', (_req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.json(portfolioData);
  });

  app.get('/api/config', (_req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.json({
      updatesFeed: appConfig.updatesFeed,
    });
  });

  app.get('/api/github-contributions', async (req, res) => {
    const requested = String(req.query.user || '').trim();
    const username = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(requested)
      ? requested
      : getConfiguredGithubUsername();
    try {
      const bundle = await fetchLiveGithubBundle(username);
      res.setHeader('Cache-Control', 'public, max-age=300');
      res.json(bundle);
    } catch (err) {
      res.status(502).json({ error: 'Unable to fetch GitHub activity right now' });
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
      reqPath.startsWith('/images/') ||
      reqPath.startsWith('/api/') ||
      /\.(?:js|mjs|css|map|json|png|jpe?g|webp|gif|svg|ico|woff2?|ttf|eot)$/i.test(reqPath)
    );
  }

  app.use((req, res, next) => {
    if (
      req.method === 'GET' &&
      req.path.length > 1 &&
      req.path.endsWith('/') &&
      !isStaticAssetRequest(req.path)
    ) {
      const cleanPath = req.path.replace(/\/+$/, '') || '/';
      const queryIndex = req.originalUrl.indexOf('?');
      const query = queryIndex >= 0 ? req.originalUrl.slice(queryIndex) : '';
      return res.redirect(302, cleanPath + query);
    }
    return next();
  });

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
          } else if (/\.(?:webp|png|jpe?g|svg|ico)$/i.test(filePath)) {
            res.setHeader('Cache-Control', 'public, max-age=86400');
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
    app.use('/images', express.static(path.resolve(__dirname, 'images'), { maxAge: '1d' }));
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
  server.requestTimeout = 30000;
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

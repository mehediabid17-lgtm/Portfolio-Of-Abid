import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  appConfig,
  portfolioData,
  getPublicConfig,
  handleChatRequest,
} from './lib/portfolio-assistant.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || appConfig.server.defaultPort || 3000;
  const HOST = appConfig.server.host || '0.0.0.0';

  app.use(express.json({ limit: appConfig.server.jsonBodyLimit || '100kb' }));
  app.use((err, _req, res, next) => {
    if (err instanceof SyntaxError && 'body' in err) {
      res.status(400).json({ error: 'Invalid JSON request body.' });
      return;
    }
    next(err);
  });

  app.get('/api/portfolio', (_req, res) => {
    res.json(portfolioData);
  });

  app.get('/api/config', (_req, res) => {
    res.json(getPublicConfig());
  });

  app.post('/api/chat', async (req, res) => {
    const result = await handleChatRequest(req.body);
    res.status(result.status).json(result.payload);
  });

  const distDir = path.resolve(__dirname, 'dist');
  const isProduction =
    process.env.NODE_ENV === 'production' || process.argv.includes('--prod');

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
      app.use(vite.middlewares);
    } catch (viteErr) {
      if (fs.existsSync(distDir)) {
        app.use(express.static(distDir));
        app.get('*', (_req, res) => {
          res.sendFile(path.join(distDir, 'index.html'));
        });
      } else {
        throw viteErr;
      }
    }
  } else {
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

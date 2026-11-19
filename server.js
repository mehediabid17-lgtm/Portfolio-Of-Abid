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

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || appConfig.server.defaultPort || 3000;
  const HOST = appConfig.server.host || '0.0.0.0';

  app.use(compression({ threshold: 1024 }));

  app.get('/api/portfolio', (_req, res) => {
    res.json(portfolioData);
  });

  app.get('/api/config', (_req, res) => {
    res.json({
      updatesFeed: appConfig.updatesFeed,
    });
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
  server.requestTimeout = 30000;
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

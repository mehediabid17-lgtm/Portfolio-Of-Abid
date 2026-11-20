import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, transformWithEsbuild } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyDirRecursive(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function buildPortfolioDataJs() {
  const portfolioData = fs.readFileSync(path.resolve(__dirname, 'portfolio-data.json'), 'utf8');
  const appConfig = fs.readFileSync(path.resolve(__dirname, 'config.json'), 'utf8');
  return (
    '// Auto-synced fallback bundle for file:// and static hosting (no bundler required)\n' +
    'window.__PORTFOLIO_DATA__ = ' + portfolioData.trim() + ';\n' +
    'window.__APP_CONFIG__ = ' + appConfig.trim() + ';\n'
  );
}

function copyStaticRuntimeAssets() {
  return {
    name: 'copy-static-runtime-assets',
    async closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      if (!fs.existsSync(distDir)) return;

      copyDirRecursive(path.resolve(__dirname, 'images'), path.join(distDir, 'images'));

      for (const file of ['portfolio-data.json', 'config.json']) {
        const srcFile = path.resolve(__dirname, file);
        if (fs.existsSync(srcFile)) {
          fs.copyFileSync(srcFile, path.join(distDir, file));
        }
      }

      const rawScriptPath = path.resolve(__dirname, 'script.js');
      if (fs.existsSync(rawScriptPath)) {
        const rawScript = fs.readFileSync(rawScriptPath, 'utf8');
        try {
          const minResult = await transformWithEsbuild(rawScript, 'script.js', {
            loader: 'js',
            minify: true,
            target: 'es2019',
          });
          fs.writeFileSync(path.join(distDir, 'script.js'), minResult.code, 'utf8');
        } catch (_) {
          fs.writeFileSync(path.join(distDir, 'script.js'), rawScript, 'utf8');
        }
      }

      const dataJs = buildPortfolioDataJs();
      fs.writeFileSync(path.resolve(__dirname, 'portfolio-data.js'), dataJs, 'utf8');
      try {
        const minDataResult = await transformWithEsbuild(dataJs, 'portfolio-data.js', {
          loader: 'js',
          minify: true,
          target: 'es2019',
        });
        fs.writeFileSync(path.join(distDir, 'portfolio-data.js'), minDataResult.code, 'utf8');
      } catch (_) {
        fs.writeFileSync(path.join(distDir, 'portfolio-data.js'), dataJs, 'utf8');
      }

      const builtIndex = path.join(distDir, 'index.html');
      if (fs.existsSync(builtIndex)) {
        fs.copyFileSync(builtIndex, path.join(distDir, '404.html'));
      }
    },
  };
}

export default defineConfig({
  base: './',
  build: {
    target: 'es2019',
  },
  plugins: [copyStaticRuntimeAssets()],
  server: {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});

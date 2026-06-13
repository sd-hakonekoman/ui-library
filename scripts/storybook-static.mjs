import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createServer } from 'node:http';

/*
 * このスクリプトは Storybook を静的ビルドしてからローカル配信します。
 * Node.js 24 のこの環境では Storybook dev server のポート検出が失敗したため、
 * 初期構築では確実に表示確認できる静的配信を npm run storybook に使います。
 */
const port = Number.parseInt(process.env.PORT || '6006', 10);
const host = process.env.HOST || '127.0.0.1';
const outputDir = resolve('storybook-static');

const build = spawnSync('npm', ['run', 'build-storybook'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    HOME: '.storybook-home',
    STORYBOOK_DISABLE_TELEMETRY: 'true',
  },
});

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = createServer((request, response) => {
  const requestUrl = new URL(request.url || '/', `http://${host}:${port}`);
  let pathname;

  try {
    pathname = decodeURIComponent(requestUrl.pathname);
  } catch {
    response.writeHead(400, {
      'Content-Type': 'text/plain; charset=utf-8',
    });
    response.end('Bad Request');
    return;
  }

  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  let filePath = join(outputDir, safePath);

  /*
   * Storybook はクライアント側で URL を切り替えるため、
   * 実ファイルがないパスでは index.html を返します。
   */
  if (!filePath.startsWith(outputDir + sep) && filePath !== outputDir) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  if (!existsSync(filePath)) {
    filePath = join(outputDir, 'index.html');
  }

  if (statSync(filePath).isDirectory()) {
    filePath = join(filePath, 'index.html');
  }

  response.writeHead(200, {
    'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream',
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Storybook is available at http://${host}:${port}`);
});

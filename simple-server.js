import { createServer } from 'http';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const server = createServer((req, res) => {
  console.log(`요청: ${req.method} ${req.url}`);
  
  // CORS 헤더 추가
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.url === '/') {
    try {
      const html = readFileSync(join(__dirname, 'dist', 'index.html'), 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } catch (error) {
      res.writeHead(404);
      res.end('index.html not found');
    }
  } else if (req.url.startsWith('/assets/')) {
    try {
      const filePath = join(__dirname, 'dist', req.url);
      const content = readFileSync(filePath);
      
      if (req.url.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
      } else if (req.url.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
      }
      
      res.end(content);
    } catch (error) {
      res.writeHead(404);
      res.end('File not found');
    }
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = 9000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
서버가 시작되었습니다!
----------------------------------------
로컬: http://localhost:${PORT}/
WSL:  http://172.22.11.5:${PORT}/
----------------------------------------
브라우저에서 위 주소 중 하나로 접속하세요.
`);
});
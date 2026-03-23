const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3001;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const filePath = req.url === '/' || req.url === '/index.html' 
    ? path.join(__dirname, 'index.html')
    : path.join(__dirname, req.url);
  
  if (fs.existsSync(filePath) && !fs.statSync(filePath).isDirectory()) {
    const ext = path.extname(filePath).toLowerCase();
    const types = {'.html':'text/html','.css':'text/css','.js':'application/javascript','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    res.end(fs.readFileSync(filePath));
  } else {
    // SPA fallback
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync(path.join(__dirname, 'index.html')));
  }
});

server.listen(PORT, '0.0.0.0', () => console.log(`Tryalz prototype running at http://localhost:${PORT}`));

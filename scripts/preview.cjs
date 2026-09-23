const http = require('http')
const fs = require('fs')
const path = require('path')
const root = path.resolve(__dirname, '../app/dist/website')
const port = Number(process.env.PORT || 4181)
const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2', '.wasm': 'application/wasm', '.webmanifest': 'application/manifest+json' }

for (const entry of ['', 'trade']) {
  if (!fs.existsSync(path.join(root, entry, 'index.html'))) {
    console.error('Combined build is missing. Run npm run preview from the website folder.')
    process.exit(1)
  }
}

const server = http.createServer((req, res) => {
  let pathname
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname) }
  catch { res.writeHead(400).end(); return }
  if (/^\/(swap|exchange)(\/|$)/.test(pathname)) {
    const destination = pathname.startsWith('/exchange') ? '/trade/#/pool' : '/trade/'
    res.writeHead(302, { Location: destination }).end(); return
  }
  let file = path.resolve(root, '.' + pathname)
  if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!pathname.endsWith('/')) { res.writeHead(302, { Location: pathname + '/' }).end(); return }
    file = path.join(file, 'index.html')
  }
  if (!fs.existsSync(file)) {
    if (path.extname(pathname)) { res.writeHead(404).end(); return }
    const entry = pathname.startsWith('/trade/') ? 'trade' : ''
    file = path.join(root, entry, 'index.html')
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' })
  const stream = fs.createReadStream(file)
  stream.on('error', () => res.destroy())
  stream.pipe(res)
})
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? `Port ${port} is busy. Set PORT to another port and run npm run preview again.` : error.message)
  process.exit(1)
})
server.listen(port, '127.0.0.1', () => {
  console.log(`All apps ready: http://localhost:${port}/`)
  console.log(`Trade: http://localhost:${port}/trade/`)
})

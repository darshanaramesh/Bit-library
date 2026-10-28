import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = path.resolve(__dirname, 'dist')

const indexHTML = fs.readFileSync(path.resolve(dist, 'index.html'), 'utf8')
const assetsDir = path.resolve(dist, 'assets')

function sendFile(res, filePath, status = 200) {
  const content = fs.readFileSync(filePath)
  res.writeHead(status, {
    'Content-Type': getMime(filePath),
    'Content-Length': content.length,
  })
  res.end(content)
}

function sendHtml(res, html, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'text/html; charset=utf-8',
  })
  res.end(html)
}

function getMime(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  return (
    {
      '.html': 'text/html; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
    }[ext] || 'application/octet-stream'
  )
}

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname

  if (pathname === '/' || pathname === '/login' || pathname === '/register') {
    sendHtml(res, indexHTML)
    return
  }

  const assetName = path.basename(pathname)
  const assetPath = path.resolve(assetsDir, assetName)

  try {
    sendFile(res, assetPath)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not found')
  }
})

server.listen(3000, '0.0.0.0', () => {
  console.log('Static server listening on http://0.0.0.0:3000')
})

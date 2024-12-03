import express from 'express'
import http from 'http'
import WebSocket from 'ws'

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

let clients = []

wss.on('connection', ws => {
  console.log('new client connected')
  clients.push(ws)

  ws.on('message', message => {
    console.log(`Received message => ${message}`)
    const parsedMessage = JSON.parse(message)
    console.log('Parsed Message: ', parsedMessage)

    // Broadcast to all clients
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedMessage))
      }
    })
  })

  ws.on('close', () => {
    console.log('Client disconnected')
    clients = clients.filter(client => client !== ws)
  })
})

const PORT = 3001
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

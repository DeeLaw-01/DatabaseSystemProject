import { Server } from 'socket.io'
import { createServer } from 'http'

import dotenv from 'dotenv'

dotenv.config()

// Create a new HTTP server to attach Socket.IO
const httpServer = createServer((req, res) => {
  res.writeHead(404)
  res.end()
})
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173', 'vercelhosting'], // Replace with your actual frontend origins
    methods: ['GET', 'POST']
  }
})

// Event listeners
io.on('connection', socket => {
  console.log(`User connected: ${socket.id}`)

  // Listen for a chat message
  socket.on('chatMessage', data => {
    console.log('Message received:', data)
    // Broadcast the message to all connected clients
    io.emit('chatMessage', data)
  })

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
  })
})

// Export the HTTP server to use in `index.js`
export default httpServer

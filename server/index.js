import express from 'express'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './Routes/authroutes.js'
import User from './models/User.js' // Import the User model

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
const ADMIN = 'Admin'

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))

// Middleware
app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))

// Start Express Server
const expressServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Initialize Socket.IO with the same server
const io = new Server(expressServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173'
  }
})

// Socket.IO Event Handling
io.on('connection', socket => {
  // On User Join (Add user to the database)
  socket.on('join', async name => {
    console.log(`User ${socket.id} connected`)
    console.log('Name:', name)
    if (name) {
      const user = new User({ name, socketId: socket.id })
      console.log(socket.id)
      await user.save()
      io.emit('chatMessage', buildMsg(ADMIN, `Welcome ${name} to the chat!`))
    }
  })

  // On User Send Message
  socket.on('sendMessage', async message => {
    console.log('Message:', message)
    const user = await User.findOne({ socketId: socket.id })
    if (user) {
      io.emit('chatMessage', buildMsg(user.name, message.text, user._id))
    }
  })

  // On User Disconnect (Remove from DB)
  socket.on('disconnect', async () => {
    const user = await User.findOneAndDelete({ socketId: socket.id })
    if (user) {
      io.emit('chatMessage', buildMsg(ADMIN, `${user.name} has left the chat`))
      io.emit('userList', await getUsers()) // Send updated user list
    }
    console.log(`User ${socket.id} disconnected`)
  })
})

// Helper functions
function buildMsg (name, text, userId) {
  return {
    name,
    text,
    time: new Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }).format(new Date()),
    user: userId,
    messageId: Date.now().toLocaleString()
  }
}

async function getUsers () {
  const users = await User.find()
  return users.map(user => user.name)
}

// Routes
app.use('/auth', authRoutes)

// API Routes (For Non-Real-Time Communication)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username') // Fetch only the username field
    res.json({ users })
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/api/messages', (req, res) => {
  // Here, you could fetch and return chat history from the database if needed
  res.json({ messages: [] })
})

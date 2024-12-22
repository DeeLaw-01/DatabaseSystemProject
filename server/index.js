import express from 'express'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './Routes/authroutes.js'
import User from './models/User.js'
import ActiveUser from './models/ActiveUser.js'

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
  // On User Join (Add user to the active users collection)
  socket.on('join', async id => {
    console.log(`User ${socket.id} connected`)
    console.log('ID:', id)
    if (id) {
      const user = await User.findOne({ _id: id })
      console.log(user)
      if (user) {
        await ActiveUser.findOneAndUpdate(
          { user: user._id },
          { socketId: socket.id },
          { upsert: true, new: true }
        )
        io.emit(
          'chatMessage',
          buildMsg(ADMIN, `Welcome ${user.username} to the chat!`)
        )
        io.emit('userList', await getActiveUsers()) // Send updated user list
      }
    }
  })

  // On User Send Message
  socket.on('sendMessage', async message => {
    console.log('Message:', message)
    const activeUser = await ActiveUser.findOne({
      socketId: socket.id
    }).populate('user')
    if (activeUser) {
      const { user } = activeUser
      io.emit('chatMessage', buildMsg(user.name, message.text, user))
    }
  })

  // On User Disconnect (Remove from active users collection)
  socket.on('disconnect', async () => {
    const activeUser = await ActiveUser.findOneAndDelete({
      socketId: socket.id
    })
    if (activeUser) {
      const user = await User.findById(activeUser.user)
      if (user) {
        io.emit(
          'chatMessage',
          buildMsg(ADMIN, `${user.name} has left the chat`)
        )
        io.emit('userList', await getActiveUsers()) // Send updated user list
      }
    }
    console.log(`User ${socket.id} disconnected`)
  })
})

// Helper functions
function buildMsg (name, text, user) {
  return {
    name: (user && user.username) || name,
    text,
    time: new Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
      .format(new Date())
      .toString(),
    userID: (user && user._id) || 'SERVER',
    messageId: Date.now().toString()
  }
}

async function getActiveUsers () {
  const activeUsers = await ActiveUser.find().populate('user', 'name')
  return activeUsers.map(activeUser => activeUser.user.name)
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

import express from 'express'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './Routes/authRoutes.js'
import User from './models/User.js'
import ActiveUser from './models/ActiveUser.js'
import Message from './models/Message.js'
import messageRoutes from './Routes/messageRoutes.js'

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
app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      'https://we-chat-room-tawny.vercel.app',
      'we-chat-room-tawny.vercel.app',
      'https://we-chat-room-n433qqej1-deelaw-01s-projects.vercel.app'
    ]
  })
)

// Start Express Server
const expressServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Initialize Socket.IO with the same server
const io = new Server(expressServer, {
  cors: {
    origin: [
      'http://localhost:5173',
      'https://we-chat-room-tawny.vercel.app',
      'we-chat-room-tawny.vercel.app',
      'we-chat-room-n433qqej1-deelaw-01s-projects.vercel.app',
      'https://we-chat-room-tawny.vercel.app/chatroom'
    ]
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
      const chatMessage = buildMsg(user.name, message.text, user)
      console.log(chatMessage)
      io.emit('chatMessage', chatMessage)

      // Save message to the database
      const newMessage = new Message({
        name: user.username,
        userID: user._id,
        text: message.text,
        timestamp: chatMessage.timestamp
      })
      await newMessage.save()
    }
  })

  // On User Leave (Remove from active users collection)
  socket.on('leave', async () => {
    const activeUser = await ActiveUser.findOneAndDelete({
      socketId: socket.id
    })
    if (activeUser) {
      const user = await User.findById(activeUser.user)
      if (user) {
        io.emit(
          'chatMessage',
          buildMsg(ADMIN, `${user.username} has left the chat`)
        )
        io.emit('userList', await getActiveUsers()) // Send updated user list
      }
    }
    console.log(`User ${socket.id} left the chat`)
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

  // Error handling
  socket.on('error', err => {
    if (err.code === 'ECONNRESET') {
      console.log(`Connection reset by peer: ${socket.id}`)
    } else {
      console.error(`Socket error: ${err.message}`)
    }
  })
})

// Global error handling for uncaught exceptions and unhandled rejections
process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

// Helper functions
function buildMsg (name, text, user) {
  return {
    name: (user && user.username) || name,
    text,
    timestamp: new Intl.DateTimeFormat('default', {
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
  const activeUsers = await ActiveUser.find().populate('user')
  return activeUsers.map(activeUser => activeUser.user.username)
}

// Routes
app.use('/auth', authRoutes)
app.use('/messages', messageRoutes)

app.use('/', (req, res) => {
  res.send('Welcome to the WeChatRoom API')
})

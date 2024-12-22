import mongoose from 'mongoose'

const ActiveUserSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  socketId: {
    type: String,
    required: true
  },
  connectedAt: {
    type: Date,
    default: Date.now
  }
})

const ActiveUser = mongoose.model('ActiveUser', ActiveUserSchema)

export default ActiveUser

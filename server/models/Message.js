import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: String, required: true }
})

const Message = mongoose.model('Message', messageSchema)

export default Message

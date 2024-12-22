// getMessages, getMessageById, updateMessageById, getMessageByUser, deleteMessage
import Message from '../models/Message.js'

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMessageById = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) return res.status(400).json({ message: 'Message ID is required' })
    const Message = await Message.findById(id)
    res.status(200).json(Message)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMessageByUser = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) return res.status(400).json({ message: 'User ID is required' })
    const messages = await Message.find({ user: id })
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateMessageById = async (req, res) => {
  try {
    const id = req.params.id
    const { updatedText } = req.body
    if (!id || !updatedText)
      return res.status(400).json({ message: 'Missing Fields' })
    const message = await Message.findByIdAndUpdate(id, updatedText, {
      new: true
    })
    res.status(200).json(message)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteMessage = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) return res.status(400).json({ message: 'Message ID is required' })
    await Message.findByIdAndDelete(id)
    res.status(200).json({ message: 'Message deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

import express from 'express'
import {
  getMessages,
  getMessageById,
  updateMessageById,
  getMessageByUser,
  deleteMessage
} from '../controllers/messageController.js'

const router = express.Router()

// Routes
router.get('/', getMessages)
router.get('/:id', getMessageById)
router.get('/user/:id', getMessageByUser)
router.put('/:id', updateMessageById)
router.delete('/:id', deleteMessage)

export default router

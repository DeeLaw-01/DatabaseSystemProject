import express from 'express'
import { registerUser, loginUser } from '../controllers/userController.js'
import User from '../models/User.js' // Import the User model

const router = express.Router()

// Routes
router.post('/register', registerUser)
router.post('/login', loginUser)

export default router

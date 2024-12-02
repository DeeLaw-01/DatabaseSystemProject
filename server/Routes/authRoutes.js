const express = require('express')
const { authenticateUser, registerUser } = require('../services/authService') // Import services

const router = express.Router()

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await authenticateUser(email, password)

    if (user.error) {
      return res.status(401).json({ message: user.error })
    }

    return res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      last_login: user.last_login
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  try {
    const result = await registerUser(username, email, password)

    if (result.error) {
      return res.status(400).json({ message: result.error })
    }

    return res.status(201).json({ message: result.message })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router

import express from 'express'
import dbpool from '../database.js'

const router = express.Router()

// Authentication
router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body

  // Input validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Email and password are required.' })
  }

  try {
    // Query to compare email and password
    const query = `SELECT * FROM auth WHERE email = ? AND password = ?`
    const [rows] = await dbpool.execute(query, [email, password])

    if (rows.length > 0) {
      // Successful authentication
      res.status(200).json({ success: true, user: rows[0] })
    } else {
      // No matching user found
      res
        .status(401)
        .json({ success: false, message: 'Invalid email or password.' })
    }
  } catch (error) {
    // Handle database or other errors
    console.error('Error authenticating user:', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred while authenticating the user.'
    })
  }
})

// Registration
router.post('/register', async (req, res) => {
  const { email, password, username } = req.body

  // Input validation
  if (!email || !password || !username) {
    return res.status(400).json({
      success: false,
      message: 'Email, password and username are required.'
    })
  }

  try {
    // Query to compare email and password
    const query = `INSERT INTO auth (email, password, username) VALUES (?, ?, ?)`
    const [rows] = await dbpool.execute(query, [email, password, username])
    console.log('User registered successfully')
    res
      .status(201)
      .json({ success: true, message: 'User registered successfully' })
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      let message = ''
      if (error.sqlMessage.includes('email')) {
        message = 'Email already exists.'
      }
      if (error.sqlMessage.includes('username')) {
        message = 'Username already exists.'
      }
      return res.status(409).json({ success: false, message: message })
    }
    // Handle database or other errors
    console.error('Error registering user:', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred while registering the user.'
    })
  }
})

export default router

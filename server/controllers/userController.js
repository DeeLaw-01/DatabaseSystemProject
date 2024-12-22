import User from '../models/User.js'
import bcrypt from 'bcryptjs'

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })
    await newUser.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  let googleLogin = false

  if (!password) {
    googleLogin = true
  }

  try {
    const user = await User.findOne({ email })

    if (!user) {
      const message = googleLogin
        ? 'Google user not found, please register'
        : 'User not found'
      return res.status(404).json({ message: message })
    }

    if (googleLogin) {
      return res.status(200).json(user)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      res.status(200).json(user)
    } else {
      res.status(400).json({ message: 'Invalid credentials' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

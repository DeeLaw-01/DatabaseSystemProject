import User from '../models/User.js'

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const newUser = new User({ username, email, password })
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
    if (!googleLogin) {
      if (user && user.password === password) {
        res.status(200).json(user)
      } else {
        res.status(400).json({ message: 'Invalid credentials' })
      }
    }
    //Can only reach here if google login
    else if (user) {
      res.status(200).json(user)
    } else {
      res
        .status(400)
        .json({ message: 'Your Google account does not exist with us' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

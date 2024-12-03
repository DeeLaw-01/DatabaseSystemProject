import express from 'express'
import bodyParser from 'body-parser'
import authRoutes from './Routes/authRoutes.js'
import cors from 'cors'


const app = express()
app.use(cors({ origin: '*' }))

// Middleware
app.use(bodyParser.json())

// Routes
app.use('/auth', authRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack) // Log the error
  res
    .status(500)
    .json({ success: false, message: 'An internal server error occurred.' })
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

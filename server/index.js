const express = require('express')
const authRoutes = require('./routes/authRoutes') // Import authentication routes

const app = express()

app.use(express.json()) // Middleware to parse JSON requests

// Auth Routes
app.use('/api/auth', authRoutes)

// Start server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

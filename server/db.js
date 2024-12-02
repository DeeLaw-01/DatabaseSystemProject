const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()

const connection = mysql.createConnection({
  host: `${process.env.HOST}`,
  port: `${process.env.PORT}`, // MySQL default port
  user: `${process.env.USER}`, // MySQL default user
  password: `${process.env.PASSWORD}`, // Your MySQL password
  database: `${process.env.DATABASE}` // Your database name
})

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err)
    return
  }
  console.log('Connected to MySQL database!')
})

module.exports = connection

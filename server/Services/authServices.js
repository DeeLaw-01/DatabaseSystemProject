const db = require('../db') // Import the database connection
const bcrypt = require('bcrypt') // For password hashing


/**
 * Authenticate a user by email and password.
 * @param {string} email - User's email.
 * @param {string} password - User's hashed password.
 * @returns {Promise<object>} - Returns user data or an error message.
 */
async function authenticateUser (email, password) {
  try {
    // Execute the stored procedure
    const [rows] = await db.execute('CALL AuthenticateUser(?, ?)', [
      email,
      password
    ])

    // Process results
    if (rows.length && rows[0].length > 0) {
      return rows[0][0] // Return the user data
    }

    // No user found
    return { error: 'Invalid email or password' }
  } catch (error) {
    console.error('Error in authenticateUser:', error.message)
    throw new Error('Database error')
  }
}
/**
 * Register a new user.
 * @param {string} username - User's username.
 * @param {string} email - User's email.
 * @param {string} password - User's plain-text password.
 * @returns {Promise<object>} - Returns success message or error.
 */
async function registerUser (username, email, password) {
  try {
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10)

    // Call the stored procedure
    await db.execute('CALL RegisterUser(?, ?, ?)', [
      username,
      email,
      passwordHash
    ])

    // Return success message
    return { message: 'User registered successfully' }
  } catch (error) {
    // Handle database errors, including duplicate username/email
    if (error.sqlState === '45000') {
      return { error: error.message } // Custom error from the procedure
    }
    console.error('Error in registerUser:', error.message)
    throw new Error('Database error')
  }
}

module.exports = { registerUser, authenticateUser }




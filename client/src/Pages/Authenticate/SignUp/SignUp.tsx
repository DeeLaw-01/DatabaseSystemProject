import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../Components/ui/button.tsx'
import { Input } from '../../../Components/ui/input.tsx'
import { MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup () {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleRegister = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URI}/auth/register`,
        {
          email,
          password,
          username
        }
      )
      console.log('Response:', response)
      navigate('/login')
    } catch (error: any) {
      if (error.response) {
        const { message } = error.response.data
        setErrorMessage(message)
      } else {
        setErrorMessage('An unexpected error occurred. Please try again later.')
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null) // Clear previous errors
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }
    handleRegister(email, password, username)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex flex-col justify-center items-center p-4 animate-gradient bg-gradient-size'>
      <Link to='/' className='flex items-center space-x-2 mb-8'>
        <MessageSquare className='w-8 h-8 text-purple-400' />
        <span className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white'>
          WeChatRoom
        </span>
      </Link>
      <div className='w-full max-w-md bg-black bg-opacity-50 p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white'>
          Sign Up for WeChatRoom
        </h1>
        {errorMessage && (
          <div className='mb-4 text-red-500 text-sm text-center bg-red-800 bg-opacity-50 p-2 rounded'>
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-300 mb-1'
            >
              Username
            </label>
            <Input
              id='username'
              type='text'
              placeholder='Choose a username'
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className='w-full bg-purple-900 bg-opacity-50 border-purple-700 focus:border-purple-500 text-white'
            />
          </div>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-300 mb-1'
            >
              Email
            </label>
            <Input
              id='email'
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className='w-full bg-purple-900 bg-opacity-50 border-purple-700 focus:border-purple-500 text-white'
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-300 mb-1'
            >
              Password
            </label>
            <Input
              id='password'
              type='password'
              placeholder='Create a password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className='w-full bg-purple-900 bg-opacity-50 border-purple-700 focus:border-purple-500 text-white'
            />
          </div>
          <div>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-gray-300 mb-1'
            >
              Confirm Password
            </label>
            <Input
              id='confirmPassword'
              type='password'
              placeholder='Confirm your password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              className='w-full bg-purple-900 bg-opacity-50 border-purple-700 focus:border-purple-500 text-white'
            />
          </div>
          <Button
            type='submit'
            className='w-full bg-purple-600 hover:bg-purple-700 text-white'
          >
            Sign Up
          </Button>
        </form>
        <div className='mt-6 text-center'>
          <p className='text-gray-400'>
            Already have an account?{' '}
            <Link to='/login' className='text-purple-400 hover:text-purple-300'>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

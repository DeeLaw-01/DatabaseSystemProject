import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../Components/ui/button.tsx'
import { Input } from '../../../Components/ui/input.tsx'
import { MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AuthStore from '../../../ZustandStore/AuthStore.tsx'

export default function Login () {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setUser = AuthStore(state => state.setUser)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    //If success
    setUser({ userName: 'deelaw', email: email })
    console.log('Login attempted with:', email, password)
    navigate('/')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex flex-col justify-center items-center p-4 bg-gradient-size animate-gradient'>
      <Link to='/' className='flex items-center space-x-2 mb-8'>
        <MessageSquare className='w-8 h-8 text-purple-400' />
        <span className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white'>
          WeChatBox
        </span>
      </Link>
      <div className='w-full max-w-md bg-black bg-opacity-50 p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white'>
          Login to WeChatBox
        </h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
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
              placeholder='Enter your password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className='w-full bg-purple-900 bg-opacity-50 border-purple-700 focus:border-purple-500 text-white'
            />
          </div>
          <Button
            type='submit'
            className='w-full bg-purple-600 hover:bg-purple-700 text-white'
          >
            Log In
          </Button>
        </form>
        <div className='mt-4 text-center'>
          <Link
            to='#'
            className='text-sm text-purple-400 hover:text-purple-300'
          >
            Forgot password?
          </Link>
        </div>
        <div className='mt-6 text-center'>
          <p className='text-gray-400'>
            Don't have an account?{' '}
            <Link
              to='/signup'
              className='text-purple-400 hover:text-purple-300'
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

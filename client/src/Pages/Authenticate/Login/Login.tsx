import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../Components/ui/button.tsx'
import { Input } from '../../../Components/ui/input.tsx'
import { MessageSquare, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AuthStore from '../../../ZustandStore/AuthStore.tsx'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import Modal from '../../../Components/Modal.tsx'

export default function Login () {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setUser = AuthStore(state => state.setUser)
  const [forgotPassword, setForgotPassword] = useState(false)

  const handleLogin = async (email: string, password?: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URI}/auth/login`,
        {
          email,
          password
        }
      )
      console.log('Response:', response)
      setUser({
        email: response.data.email,
        userName: response.data.username,
        profilePicture: null,
        id: response.data._id
      })
      navigate('/')
    } catch (error: any) {
      console.log('Error:', error.response.data.message)
      toast({
        title: 'Error logging in',
        description: `${error.response.data.message}`
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    //If success
    handleLogin(email, password)
    console.log('Login attempted with:', email, password)
  }

  const handleGoogleLoginSuccess = (response: any) => {
    console.log('Google login success:', response)
    const decodedResponse = jwtDecode(response.credential)
    //@ts-ignore
    const email = decodedResponse.email
    handleLogin(email)
    console.log('Decoded response:', decodedResponse)
  }
  const handleGoogleLoginFailure = (error: any) => {
    console.log('here')
    console.log('Google login failure:', error)
    toast({
      title: 'Error During Google Login',
      description: `Please try again. ${error}`
    })
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex flex-col justify-center items-center p-4 bg-gradient-size animate-gradient'>
      <Link to='/' className='flex items-center space-x-2 mb-8'>
        <MessageSquare className='w-8 h-8 text-purple-400' />
        <span className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white'>
          WeChatRoom
        </span>
      </Link>
      <div className='w-full max-w-md bg-black bg-opacity-50 p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white'>
          Login to WeChatRoom
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
          <div
            onClick={() => {
              setForgotPassword(true)
            }}
            className='text-sm text-purple-400 hover:text-purple-300 cursor-pointer'
          >
            Forgot password?
          </div>
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
            <div className='mt-4 flex justify-center'>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse)
                }}
                onError={() => {
                  console.log('Login Failed')
                }}
              />
            </div>
          </p>
        </div>
        <Modal isOpen={forgotPassword} onClose={() => setForgotPassword(false)}>
          <h2>LMAO I DON'T CARE</h2>
          <p>MAKE A NEW ACCOUNT</p>
        </Modal>
      </div>
    </div>
  )
}

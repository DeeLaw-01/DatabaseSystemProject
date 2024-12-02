
import { Link } from 'react-router-dom'
export default function Footer () {
  return (
    <footer className='bg-black bg-opacity-50 py-8 px-4'>
      <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center'>
        <div className='text-center md:text-left mb-4 md:mb-0'>
          <h3 className='text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white'>
            WeChatBox
          </h3>
          <p className='text-sm text-gray-400'>Connect. Share. Chat.</p>
        </div>
        <nav className='flex space-x-4'>
          <Link
            to='#'
            className='text-sm text-gray-400 hover:text-purple-400 transition-colors'
          >
            Privacy Policy
          </Link>
          <Link
            to='#'
            className='text-sm text-gray-400 hover:text-purple-400 transition-colors'
          >
            Terms of Service
          </Link>
          <Link
            to='#'
            className='text-sm text-gray-400 hover:text-purple-400 transition-colors'
          >
            Contact Us
          </Link>
        </nav>
      </div>
      <div className='mt-8 text-center text-sm text-gray-500'>
        © {new Date().getFullYear()} WeChatBox. All rights reserved.
      </div>
    </footer>
  )
}

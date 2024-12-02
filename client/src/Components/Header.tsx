import { Link } from 'react-router-dom'
import { MessageSquare } from 'lucide-react'
import { useState } from 'react'

export default function Header () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className='p-4 md:p-6 bg-gray-900 text-white'>
      <nav className='flex items-center justify-between max-w-6xl mx-auto'>
        {/* Logo Section */}
        <Link to='/' className='flex items-center space-x-2'>
          <MessageSquare className='w-8 h-8 text-purple-400' />
          <span className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white'>
            WeChatBox
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex space-x-4'>
          <Link
            to='#features'
            className='hover:text-purple-400 transition-colors'
          >
            Features
          </Link>
          <Link to='/login' className='hover:text-purple-400 transition-colors'>
            Login
          </Link>
          <Link
            to='/signup'
            className='hover:text-purple-400 transition-colors'
          >
            Signup
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden flex items-center focus:outline-none'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className='w-8 h-8 text-purple-400'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='w-6 h-6'
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden mt-4 space-y-2'>
          <Link
            to='#features'
            className='block hover:text-purple-400 transition-colors'
          >
            Features
          </Link>
          <Link
            to='/login'
            className='block hover:text-purple-400 transition-colors'
          >
            Login
          </Link>
          <Link
            to='/signup'
            className='block hover:text-purple-400 transition-colors'
          >
            Signup
          </Link>
        </div>
      )}
    </header>
  )
}

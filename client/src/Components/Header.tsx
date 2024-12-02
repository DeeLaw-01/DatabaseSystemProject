import { Link } from 'react-router-dom'
import { MessageSquare } from 'lucide-react'
import { useState } from 'react'
import AuthStore from '../ZustandStore/AuthStore.tsx'
import { useNavigate } from 'react-router-dom'

export default function Header () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = AuthStore(state => state.user)
  const [openUserMenu, setOpenUserMenu] = useState<boolean>(false)
  const navigate = useNavigate()

  return (
    <header className='p-4 md:p-6 bg-gray-900 text-white'>
      <nav className='flex items-center justify-between max-w-6xl mx-auto'>
        <Link to='/' className='flex items-center space-x-2'>
          <MessageSquare className='w-8 h-8 text-purple-400' />
          <span className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white'>
            WeChatRoom
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex space-x-4 items-center align-middle justify-between'>
          {user ? (
            <>
              <div className='relative flex gap-8 align-middle justify-center items-center'>
                <button
                  onClick={() => {
                    navigate('/chatroom')
                  }}
                  className='bg-purple-500 rounded-md h-8 py-1 px-6 hover:bg-purple-500/50 transition-colors ease-in-out duration-300'
                >
                  Join Chat Room
                </button>
                <div
                  onClick={() => {
                    setOpenUserMenu(!openUserMenu)
                  }}
                  className='rounded-full bg-gradient-to-br from-indigo-500 via-pink-600 to-purple-600 w-12 h-12 flex items-center align-middle justify-center hover:cursor-pointer hover:border-4 border-purple-500 transition-all  ease-in-out'
                >
                  <div>{user.userName.charAt(0).toUpperCase()}</div>
                </div>
                {openUserMenu && (
                  <div className='absolute z-10 top-14 -right-5  bg-gray-900 text-white p-4 rounded-lg shadow-lg flex flex-col gap-4 border-2 border-purple-500/50'>
                    <button
                      onClick={() => {
                        AuthStore.getState().logout()
                      }}
                      className='hover:text-purple-400 transition-colors'
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to='/login'
                className=' transition-colors bg-purple-500 hover:bg-purple-500/50 py-1 px-8 rounded-md text-center'
              >
                Login
              </Link>
              <Link
                to='/signup'
                className='hover:text-purple-400 transition-colors'
              >
                Signup
              </Link>
            </>
          )}
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

import { Link } from 'react-router-dom'
import { MessageSquare, Menu, X, LogOut, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import AuthStore from '../ZustandStore/AuthStore'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'

export default function Header () {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const user = AuthStore(state => state.user)
  const [openUserMenu, setOpenUserMenu] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <>
      <header className='fixed top-0 left-0 right-0 h-16 bg-gray-900 text-white z-50 shadow-lg'>
        <nav className='flex items-center justify-between h-full px-4 max-w-6xl mx-auto'>
          <Link to='/' className='flex items-center space-x-2'>
            <MessageSquare className='w-6 h-6 text-purple-400' />
            <span className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white'>
              WeChatRoom
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className='hidden md:flex space-x-4 items-center'>
            {user ? (
              <>
                <Button
                  onClick={() => navigate('/chatroom')}
                  variant='ghost'
                  className='text-white hover:text-purple-400 transition-colors'
                >
                  Join Chat Room
                </Button>
                <div className='relative'>
                  <Button
                    onClick={() => setOpenUserMenu(!openUserMenu)}
                    className='w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-pink-600 to-purple-600 p-0 hover:opacity-80 transition-opacity'
                  >
                    {user.userName.charAt(0).toUpperCase()}
                  </Button>
                  {openUserMenu && (
                    <div className='absolute z-10 top-12 right-0 bg-gray-800 text-white p-2 rounded-lg shadow-lg border border-purple-500/50'>
                      <Button
                        onClick={() => AuthStore.getState().logout()}
                        variant='ghost'
                        className='text-white hover:text-purple-400 transition-colors'
                      >
                        <LogOut className='w-4 h-4 mr-2' />
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate('/login')}
                  variant='ghost'
                  className='text-white hover:text-purple-400 transition-colors'
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/signup')}
                  variant='ghost'
                  className='text-white hover:text-purple-400 transition-colors'
                >
                  Signup
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            onClick={toggleSidebar}
            variant='ghost'
            size='icon'
            className='md:hidden text-white'
          >
            <Menu className='w-6 h-6' />
          </Button>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      >
        <div
          className={`absolute top-0 right-0 w-64 h-full bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className='flex justify-between items-center p-4 border-b border-gray-700'>
            <h2 className='text-xl font-bold text-white'>Menu</h2>
            <Button
              onClick={toggleSidebar}
              variant='ghost'
              size='icon'
              className='text-white'
            >
              <X className='w-6 h-6' />
            </Button>
          </div>
          <nav className='p-4 space-y-4 flex-grow'>
            {user ? (
              <Button
                onClick={() => {
                  navigate('/chatroom')
                  toggleSidebar()
                }}
                variant='ghost'
                className='w-full justify-start text-white hover:text-purple-400 transition-colors'
              >
                Join Chat Room
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => {
                    navigate('/login')
                    toggleSidebar()
                  }}
                  variant='ghost'
                  className='w-full justify-start text-white hover:text-purple-400 transition-colors'
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    navigate('/signup')
                    toggleSidebar()
                  }}
                  variant='ghost'
                  className='w-full justify-start text-white hover:text-purple-400 transition-colors'
                >
                  Signup
                </Button>
              </>
            )}
          </nav>
          {user && (
            <div className='p-4 border-t border-gray-700'>
              <div className='flex items-center space-x-3 mb-4'>
                <Avatar className='w-10 h-10'>
                  <AvatarFallback className='bg-purple-500 text-white'>
                    {user.userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className='text-sm font-medium text-white'>
                    {user.userName}
                  </p>
                  <p className='text-xs text-gray-400'>{user.email}</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  AuthStore.getState().logout()
                  toggleSidebar()
                }}
                variant='ghost'
                className='w-full justify-start text-white hover:text-purple-400 transition-colors'
              >
                <LogOut className='w-4 h-4 mr-2' />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

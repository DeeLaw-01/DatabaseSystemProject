import { useState, useEffect, useRef } from 'react'
import {
  MessageSquare,
  Send,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'
import { Button } from '../../Components/ui/button.tsx'
import { Input } from '../../Components/ui/input.tsx'
import { ScrollArea } from '../../Components/ui/scroll-area.tsx'
import AuthStore from '../../ZustandStore/AuthStore.tsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { io } from 'socket.io-client'

interface Message {
  name: string
  text?: string
  timestamp: string
  userID: string
  messageId: string
}

export default function Chatroom () {
  const navigate = useNavigate()
  const user = AuthStore(state => state.user)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [timeSpent, setTimeSpent] = useState(0)
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const [socket, setSocket] = useState(io(import.meta.env.VITE_BASE_URI))
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [expandedMessages, setExpandedMessages] = useState<Set<number>>(
    new Set()
  )
  const [isConnected, setIsConnected] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const toggleMessageExpansion = (index: number) => {
    setExpandedMessages(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  useEffect(() => {
    // Automatically join the chat room
    if (user?.userName) {
      socket.emit('join', user.id)
    }

    // Fetch previous messages
    const fetchMessages = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URI}/messages`
        )
        console.log('Messages:', response.data)
        setMessages([...response.data])
      } catch (error) {
        console.error('Error fetching messages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()

    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('chatMessage', (message: any) => {
      console.log('Received message:', message)
      setMessages(prevMessages => [...prevMessages, message])
    })

    socket.on('userList', (users: string[]) => {
      console.log('Online users:', users)
      setOnlineUsers(users)
    })

    const checkSocketConnection = () => {
      if (socket.connected) {
        socket.emit('ping', () => {
          setIsConnected(true)
        })
      } else {
        setIsConnected(false)
      }
    }

    const interval = setInterval(checkSocketConnection, 1000)

    return () => {
      clearInterval(interval)
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = (e: any) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const messageData = {
        user: user?.userName || 'unknown',
        text: newMessage,
        timestamp: new Date().toISOString()
      }
      console.log('Check timestamp:', messageData)
      // Emit the message to the server
      socket.emit('sendMessage', messageData)
      setNewMessage('')
    }
  }

  useEffect(() => {
    // Retrieve the saved time spent from local storage on initial load

    const savedTimeSpent = localStorage.getItem('timeSpent')
    if (savedTimeSpent) {
      setTimeSpent(parseInt(savedTimeSpent))
    }

    // Start timer for time spent
    const timer = setInterval(() => {
      setTimeSpent(prevTime => {
        const newTime = prevTime + 1
        if (newTime % 30 === 0) {
          localStorage.setItem('timeSpent', newTime.toString()) // Save time to local storage as it increments
        }
        return newTime
      })
    }, 1000)

    // Cleanup on component unmount (clear the timer)
    return () => clearInterval(timer)
  }, []) // Empty dependency array ensures this runs only once on mount

  const formatTimeSpent = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className='flex h-screen bg-gradient-to-b from-indigo-900 to-slate-900'>
      {/* Left Sidebar */}
      <aside
        className={`${
          leftSidebarOpen && isMobile
            ? 'w-80 bg-black bg-opacity-90'
            : leftSidebarOpen
            ? 'w-80'
            : !leftSidebarOpen && isMobile
            ? 'w-0 opacity-0'
            : 'w-0 '
        } bg-black bg-opacity-50 p-4 flex flex-col transition-all duration-300 ease-in-out overflow-hidden z-40
        ${isMobile ? 'absolute bottom-0 left-0 h-screen' : ''}

        `}
      >
        <div className={`${leftSidebarOpen ? '' : 'opacity-0'}`}>
          <div className='flex items-center space-x-2 mb-6'>
            <MessageSquare className='w-8 h-8 text-purple-400' />
            <span className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white'>
              WeChatRoom
            </span>
          </div>
          <nav className='flex-grow'>
            <h2 className='text-purple-400 font-semibold mb-2 flex items-center'>
              <Users className='w-4 h-4 mr-2' />
              Online Users
            </h2>
            <ul className='space-y-2'>
              {onlineUsers.length > 0 ? (
                onlineUsers.map((user, index) => (
                  <li key={index} className='flex items-center space-x-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    {/* @ts-ignore */}
                    <span className='text-white'>{user}</span>
                  </li>
                ))
              ) : (
                <li className='flex items-center space-x-2'>
                  <span className='text-white/80 italic text-sm'>
                    No users online
                  </span>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className='mt-auto space-y-2 text-white'>
          <Button
            variant='ghost'
            className='w-full justify-start'
            onClick={() => {
              navigate('/coming-soon')
            }}
          >
            <Settings className='w-4 h-4 mr-2' />
            Settings
          </Button>
          <Button
            onClick={() => {
              socket.emit('leave') // Emit leave event
              navigate('/')
            }}
            variant='ghost'
            className='w-full justify-start hover:bg-red-400 bg-red-300 text-black'
          >
            <LogOut className='w-4 h-4 mr-2' />
            Leave Chat
          </Button>
        </div>
      </aside>

      {/* Toggle button for left sidebar */}
      <Button
        variant='ghost'
        size='icon'
        className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white z-50'
        onClick={() => {
          if (rightSidebarOpen && isMobile) {
            setRightSidebarOpen(!rightSidebarOpen)
          }
          setLeftSidebarOpen(!leftSidebarOpen)
        }}
      >
        {leftSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </Button>

      {/* Main Chat Area */}
      <main className='flex-grow flex flex-col'>
        <header className='bg-black bg-opacity-50 p-4 flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-white'>General Chat</h1>
          <div
            className={`text-sm ${
              isConnected ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {isConnected
              ? 'Connected'
              : 'Disconnected. Please refresh the page.'}
          </div>
        </header>
        <ScrollArea ref={scrollAreaRef} className='flex-grow p-4'>
          {loading ? (
            <div className='flex justify-center flex-col text-white align-middle items-center h-full'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
              <div>Syncing Messages</div>
            </div>
          ) : (
            <div className='space-y-4'>
              {messages.map((msg, index) => {
                const isSystemMessage = msg.userID === 'SERVER'
                const isCurrentUser = msg.userID === user?.id
                const isExpanded = expandedMessages.has(index)
                const shouldShowReadMore =
                  msg.text && msg.text.length > 60 && !isExpanded

                return (
                  <div
                    key={index}
                    className={`flex items-start space-x-2  text-wrap ${
                      isCurrentUser
                        ? 'justify-end'
                        : isSystemMessage
                        ? 'justify-center'
                        : ''
                    }`}
                  >
                    {!isSystemMessage && !isCurrentUser && (
                      <div className='w-8 h-8 bg-purple-500 text-white font-base rounded-full flex items-center justify-center'>
                        {msg.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div
                      className={`${
                        isSystemMessage
                          ? ' text-white/70 text-xs md:text-sm  text-center'
                          : isCurrentUser
                          ? 'bg-black text-white'
                          : 'bg-black bg-opacity-50 text-white'
                      } rounded-lg p-3 max-w-72 break-words`}
                    >
                      {!isSystemMessage && (
                        <p className='font-semibold text-purple-400 text-xs '>
                          {msg.name}
                        </p>
                      )}
                      {msg.text && (
                        <p className='my-1'>
                          {shouldShowReadMore
                            ? `${msg.text.substring(0, 60)}...`
                            : msg.text}
                          {shouldShowReadMore && (
                            <span
                              className='text-blue-500 cursor-pointer text-sm'
                              onClick={() => toggleMessageExpansion(index)}
                            >
                              Read more
                            </span>
                          )}
                          {isExpanded && (
                            <span
                              className='text-blue-500 cursor-pointer'
                              onClick={() => toggleMessageExpansion(index)}
                            >
                              Show less
                            </span>
                          )}
                        </p>
                      )}
                      <div className='flex justify-end'>
                        {!isSystemMessage && (
                          <p className='text-xs text-gray-400 mt-1'>
                            {msg.timestamp}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </ScrollArea>

        <form
          onSubmit={handleSendMessage}
          className='p-4 bg-black bg-opacity-50'
        >
          <div className='flex space-x-2'>
            <Input
              disabled={loading}
              type='text'
              placeholder='Type your message...'
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              className='flex-grow bg-purple-900 bg-opacity-50 border-purple-700 focus:border-purple-500 text-white'
            />
            <Button
              type='submit'
              className='bg-purple-600 hover:bg-purple-700 text-white'
            >
              <Send className='w-4 h-4 ' />
            </Button>
          </div>
        </form>
      </main>

      {/* Right Sidebar */}

      <aside
        className={`${
          rightSidebarOpen && isMobile
            ? 'w-80 bg-black bg-opacity-90'
            : rightSidebarOpen
            ? 'w-80'
            : !rightSidebarOpen && isMobile
            ? 'w-0 opacity-0'
            : 'w-0 '
        } bg-black bg-opacity-50 p-4 flex flex-col items-center align-middle justify-center  transition-all duration-300 ease-in-out overflow-hidden ${
          isMobile ? 'absolute bottom-0 right-0 h-screen' : ''
        }  `}
      >
        <div
          className={`flex flex-col items-center space-y-4 mb-12 transition-opacity duration-75  ${
            rightSidebarOpen ? '' : 'opacity-0'
          }`}
        >
          <div className='w-24 h-24 bg-purple-500 relative rounded-full flex items-center justify-center text-white text-4xl'>
            {user?.userName.charAt(0).toUpperCase()}
            <div className='flex items-center text-base bottom-2 right-2 absolute space-x-2'>
              <div
                className={`w-4 h-4 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-red-600'
                }`}
              ></div>
            </div>
          </div>
          <h2 className='text-2xl font-bold text-white '>{user?.userName}</h2>
          <p className='text-purple-400'>{user?.email}</p>

          <div className='text-white'>
            <p>Time Online: {formatTimeSpent(timeSpent)}</p>
          </div>
        </div>
      </aside>

      {/* Toggle button for right sidebar */}
      <Button
        variant='ghost'
        size='icon'
        className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white z-50'
        onClick={() => {
          if (leftSidebarOpen && isMobile) {
            setLeftSidebarOpen(!leftSidebarOpen)
          }
          setRightSidebarOpen(!rightSidebarOpen)
        }}
      >
        {rightSidebarOpen ? <ChevronRight /> : <ChevronLeft />}
      </Button>
    </div>
  )
}

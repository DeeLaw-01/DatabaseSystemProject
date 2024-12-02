import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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

interface Message {
  id: number
  user: string
  text: string
  timestamp: string
}

interface CurrentUser {
  name: string
  email: string
  status: 'online' | 'away' | 'offline'
}

const onlineUsers = ['Wahab', 'Waleed', 'Abdullah', 'Sarah', 'John']

export default function Chatroom () {
  const navigate = useNavigate()
  const user = AuthStore(state => state.user)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [timeSpent, setTimeSpent] = useState(0)

  const currentUser: CurrentUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'online'
  }

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 2000))

      const mockMessages: Message[] = [
        {
          id: 1,
          user: 'Wahab',
          text: 'Hey everyone!',
          timestamp: '2023-05-20T10:00:00Z'
        },
        {
          id: 2,
          user: 'Waleed',
          text: 'Hi Wahab, how are you?',
          timestamp: '2023-05-20T10:01:00Z'
        },
        {
          id: 3,
          user: 'Abdullah',
          text: 'Welcome to WeChatBox!',
          timestamp: '2023-05-20T10:02:00Z'
        }
      ]
      setMessages(mockMessages)
      setLoading(false)
    }

    fetchMessages()

    // Start timer for time spent
    const timer = setInterval(() => {
      setTimeSpent(prevTime => prevTime + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        user: 'You',
        text: newMessage,
        timestamp: new Date().toISOString()
      }
      setMessages([...messages, newMsg])
      setNewMessage('')
    }
  }

  const formatTimeSpent = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className='flex h-screen bg-gradient-to-b from-indigo-900 to-slate-900'>
      {/* Left Sidebar */}
      <aside
        className={`${
          leftSidebarOpen ? 'w-64' : 'w-0'
        } bg-black bg-opacity-50 p-4 flex flex-col transition-all duration-300 ease-in-out overflow-hidden`}
      >
        <div className={`${leftSidebarOpen ? '' : 'opacity-0'}`}>
          <Link to='/' className='flex items-center space-x-2 mb-6'>
            <MessageSquare className='w-8 h-8 text-purple-400' />
            <span className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white'>
              WeChatBox
            </span>
          </Link>
          <nav className='flex-grow'>
            <h2 className='text-purple-400 font-semibold mb-2 flex items-center'>
              <Users className='w-4 h-4 mr-2' />
              Online Users
            </h2>
            <ul className='space-y-2'>
              {onlineUsers.map((user, index) => (
                <li key={index} className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <span className='text-white'>{user}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className='mt-auto space-y-2 text-white'>
          <Button variant='ghost' className='w-full justify-start'>
            <Settings className='w-4 h-4 mr-2' />
            Settings
          </Button>
          <Button
            onClick={() => {
              navigate('/')
            }}
            variant='ghost'
            className='w-full justify-start'
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
        className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white'
        onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
      >
        {leftSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </Button>

      {/* Main Chat Area */}
      <main className='flex-grow flex flex-col'>
        <header className='bg-black bg-opacity-50 p-4  '>
          <h1 className='text-2xl font-bold text-white'>General Chat</h1>
        </header>
        <ScrollArea className='flex-grow p-4'>
          {loading ? (
            <div className='flex justify-center flex-col text-white align-middle items-center h-full'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
              <div>Syncing Messages</div>
            </div>
          ) : (
            <div className='space-y-4'>
              {messages.map(msg => (
                <div key={msg.id} className='flex items-start space-x-2'>
                  <div className='w-8 h-8 bg-purple-500 text-white font-base rounded-full flex items-center align-middle justify-center'>
                    {msg.user.charAt(0).toUpperCase()}
                  </div>
                  <div className='bg-black bg-opacity-50 rounded-lg p-3 max-w-[80%]'>
                    <p className='font-semibold text-purple-400'>{msg.user}</p>
                    <p className='text-white'>{msg.text}</p>
                    <p className='text-xs text-gray-400 mt-1'>
                      {new Date(msg.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <form
          onSubmit={handleSendMessage}
          className='p-4 bg-black bg-opacity-50'
        >
          <div className='flex space-x-2'>
            <Input
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
          rightSidebarOpen ? 'w-80' : 'w-0'
        } bg-black bg-opacity-50 p-4 flex flex-col items-center align-middle justify-center  transition-all duration-300 ease-in-out overflow-hidden `}
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
                  currentUser.status === 'online'
                    ? 'bg-green-400'
                    : 'bg-gray-400'
                }`}
              ></div>
            </div>
          </div>
          <h2 className='text-2xl font-bold text-white'>{user?.userName}</h2>
          <p className='text-purple-400'>{user?.email}</p>

          <div className='text-white'>
            <p>Time spent: {formatTimeSpent(timeSpent)}</p>
          </div>
        </div>
      </aside>

      {/* Toggle button for right sidebar */}
      <Button
        variant='ghost'
        size='icon'
        className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white'
        onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
      >
        {rightSidebarOpen ? <ChevronRight /> : <ChevronLeft />}
      </Button>
    </div>
  )
}

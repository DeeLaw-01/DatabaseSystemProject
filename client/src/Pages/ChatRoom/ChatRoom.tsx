'use client'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Send } from 'lucide-react'
import { Button } from '../../Components/ui/button.tsx'
import { Input } from '../../Components/ui/input.tsx'
import { ScrollArea } from '../../Components/ui/scroll-area.tsx'
import { useNavigate } from 'react-router-dom'

interface Message {
  id: number
  user: string
  text: string
  timestamp: string
}

export default function Chatroom () {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating API call to fetch previous messages
    const fetchMessages = async () => {
      setLoading(true)
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Mock data
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
          text: 'Hi Alice, how are you?',
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

  return (
    <div className='flex flex-col h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900'>
      <header className='p-4 bg-black bg-opacity-50'>
        <div className='max-w-6xl mx-auto flex justify-between items-center'>
          <Link to='/' className='flex items-center space-x-2'>
            <MessageSquare className='w-8 h-8 text-purple-400' />
            <span className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white'>
              WeChatBox
            </span>
          </Link>
          <Button
            onClick={() => {
              navigate('/')
            }}
            variant='ghost'
            className='text-purple-400 hover:text-purple-300 hover:bg-purple-900'
          >
            Logout
          </Button>
        </div>
      </header>

      <main className='flex-grow p-4 max-w-6xl w-full mx-auto flex flex-col'>
        <ScrollArea className='flex-grow mb-4 bg-black bg-opacity-50 rounded-lg p-4'>
          {loading ? (
            <div className='flex justify-center items-center h-full'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
            </div>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className='mb-4'>
                <p className='font-semibold text-purple-400'>{msg.user}</p>
                <p className='text-white'>{msg.text}</p>
                <p className='text-xs text-gray-400'>
                  {new Date(msg.timestamp).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </ScrollArea>

        <form onSubmit={handleSendMessage} className='flex space-x-2'>
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
            <Send className='w-4 h-4 mr-2' />
            Send
          </Button>
        </form>
      </main>
    </div>
  )
}

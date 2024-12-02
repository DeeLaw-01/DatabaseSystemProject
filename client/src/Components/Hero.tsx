import { Button } from './ui/button.tsx'
import { useNavigate } from 'react-router-dom'
export default function Hero () {
  const navigate = useNavigate()
  return (
    <section className='text-center py-20 px-4'>
      <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-white to-purple-400'>
        Welcome to WeChatBox
      </h1>
      <p className='text-xl md:text-2xl mb-8 max-w-2xl mx-auto'>
        Connect with everyone in a single, vibrant chatbox. Share text, images,
        and more in real-time.
      </p>
      <Button
        onClick={() => {
          navigate('/chatroom')
        }}
        size='lg'
        className='bg-purple-600 hover:bg-purple-700 text-white'
      >
        Join the Conversation
      </Button>
    </section>
  )
}

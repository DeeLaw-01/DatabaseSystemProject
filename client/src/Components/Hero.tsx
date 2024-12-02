import { Button } from './ui/button.tsx'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import AnimatedGradientText from './ui/animated-gradient-text.tsx'

export default function Hero () {
  const navigate = useNavigate()
  return (
    <section className='text-center px-4 h-screen flex justify-center'>
      <div className='flex flex-col justify-center items-center md:pb-32'>
        <div className='mb-2'>
          <AnimatedGradientText>
            🎉 <hr className='mx-2 h-4 w-px shrink-0 bg-gray-300' />{' '}
            <span
              className={` animate-gradient bg-gradient-to-r from-indigo-500 via-white to-red-500 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`}
            >
              Grand Opening
            </span>
            <ChevronRight className='ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5' />
          </AnimatedGradientText>
        </div>
        <h1 className='text-6xl md:text-8xl mb-6 font-light bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-500 to-purple-400 '>
          Welcome to <span className='italic font-bold  '>WeChatRoom</span>
        </h1>
        <p className='text-xl md:text-2xl mb-8 max-w-2xl mx-auto'>
          Connect with everyone in a single, vibrant chatbox. Share text,
          images, and more in real-time.
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
      </div>
    </section>
  )
}

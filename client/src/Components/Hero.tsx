import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import AnimatedGradientText from './ui/animated-gradient-text'

export default function Hero () {
  const navigate = useNavigate()

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-indigo-900 to-slate-900'>
      <div className='relative z-10 text-center px-4 max-w-7xl mx-auto'>
        <div className='flex flex-col justify-center items-center'>
          <div className='mb-4'>
            <AnimatedGradientText>
              🎉 <span className='mx-2 inline-block h-4 w-px bg-gray-300' />{' '}
              <span className='animate-gradient bg-gradient-to-r from-indigo-500 via-white to-red-500 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent'>
                Grand Opening
              </span>
              <ChevronRight className='ml-1 inline-block size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5' />
            </AnimatedGradientText>
          </div>

          <h1 className='text-5xl md:text-7xl lg:text-9xl mb-6 font-light bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-500 to-purple-400'>
            Welcome to <span className='italic font-bold'>WeChatRoom</span>
          </h1>

          <p className='text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300'>
            Connect with everyone in a single, vibrant chatbox. Share text,
            images, and more in real-time.
          </p>

          <Button
            onClick={() => navigate('/chatroom')}
            size='lg'
            className='bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105'
          >
            Join the Conversation
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent z-20' />
      <div className='absolute top-20 left-10 w-20 h-20 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse' />
      <div className='absolute bottom-20 right-10 w-32 h-32 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-pulse' />
    </section>
  )
}

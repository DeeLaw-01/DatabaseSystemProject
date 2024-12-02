import { MessageSquare, Image, Users, Zap } from 'lucide-react'

const features = [
  {
    icon: <MessageSquare className='w-12 h-12 mb-4 text-purple-400' />,
    title: 'Real-time Messaging',
    description:
      'Instantly connect with others through our lightning-fast messaging system.'
  },
  {
    icon: <Image className='w-12 h-12 mb-4 text-purple-400' />,
    title: 'Image Sharing',
    description:
      'Share your favorite moments with image uploads directly in the chat.'
  },
  {
    icon: <Users className='w-12 h-12 mb-4 text-purple-400' />,
    title: 'No Community',
    description: "We literally don't have a community. This is just for me."
  },
  {
    icon: <Zap className='w-12 h-12 mb-4 text-purple-400' />,
    title: 'Simple & Intuitive',
    description:
      'Our user-friendly interface makes chatting a breeze for everyone.'
  }
]

export default function Features () {
  return (
    <section
      id='features'
      className='py-20 px-4 bg-black bg-opacity-50  md:h-screen flex items-center '
    >
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-5xl md:text-6xl font-bold mb-24 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white'>
          Why Choose WeChatRoom?
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='text-center p-6 rounded-lg bg-purple-900 bg-opacity-50 hover:bg-opacity-75 transition-all cursor-pointer duration-500 ease-in-out  '
            >
              {feature.icon}
              <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
              <p className='text-gray-300'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

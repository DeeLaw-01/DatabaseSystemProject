import { Construction } from 'lucide-react'
import { Button } from '../../Components/ui/button.tsx'
import { useState } from 'react'
import Modal from '../../Components/Modal.tsx'

export default function ChatUnderConstruction () {
  const [notify, setNotify] = useState(false)
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-indigo-500 to-purple-900 text-white p-4'>
      <Construction className='w-16 h-16 text-purple-400 mb-4' />
      <h2 className='text-2xl font-bold mb-2'>Feature Under Construction</h2>
      <p className='text-center mb-4 max-w-md'>
        We're working hard to bring you an amazing chat experience. This feature
        will be available soon!
      </p>
      <Button
        variant='outline'
        className='bg-purple-600 hover:bg-purple-700 text-white border-none'
        onClick={() => setNotify(true)}
      >
        Notify Me When It's Ready
      </Button>
      <Modal
        isOpen={notify}
        onClose={() => setNotify(false)}
        className='max-w-md'
      >
        <h2 className='text-2xl mb-12'>Bro wants a setting page so bad 😭</h2>
        <p>
          Don't worry bro, I'll implement a loading page, no need to join a
          newsletter for it XD
        </p>
      </Modal>
    </div>
  )
}

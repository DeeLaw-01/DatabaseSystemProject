import { Link } from 'react-router-dom'
import { useState } from 'react'
import Modal from './Modal.tsx'

export default function Footer () {
  const [isPrivacyOpen, setPrivacyOpen] = useState(false)
  const [isTermsOpen, setTermsOpen] = useState(false)
  const [isContactOpen, setContactOpen] = useState(false)

  return (
    <footer className='bg-gradient-to-b from-purple-900 to-gray-800  py-8 px-4'>
      <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center'>
        <div className='text-center md:text-left mb-4 md:mb-0'>
          <h3 className='text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-white'>
            WeChatRoom
          </h3>
          <p className='text-sm text-gray-400'>Connect. Share. Chat.</p>
        </div>
        <nav className='flex space-x-4'>
          <Link
            to='#'
            className='text-sm text-gray-400 hover:text-purple-400 transition-colors'
            onClick={() => setPrivacyOpen(true)}
          >
            Privacy Policy
          </Link>
          <Link
            to='#'
            className='text-sm text-gray-400 hover:text-purple-400 transition-colors'
            onClick={() => setTermsOpen(true)}
          >
            Terms of Service
          </Link>
          <Link
            to='#'
            className='text-sm text-gray-400 hover:text-purple-400 transition-colors'
            onClick={() => setContactOpen(true)}
          >
            Contact Us
          </Link>
        </nav>
      </div>
      <div className='mt-8 text-center text-sm text-gray-500'>
        © {new Date().getFullYear()} WeChatRoom. All rights reserved.
      </div>

      <Modal isOpen={isPrivacyOpen} onClose={() => setPrivacyOpen(false)}>
        <h2 className='text-2xl mb-12'>Privacy Policy</h2>
        <p>
          I won't sell your data because no one wants to buy it. The second I
          get an offer, I am selling it in a heartbeat mwhehehe
        </p>
      </Modal>
      <Modal isOpen={isTermsOpen} onClose={() => setTermsOpen(false)}>
        <h2 className='text-2xl mb-12'>Terms of Service</h2>
        <p>WOw people actually read these?</p>
      </Modal>
      <Modal isOpen={isContactOpen} onClose={() => setContactOpen(false)}>
        <h2 className='text-2xl mb-12'>Contact Us</h2>
        <p>Please don't</p>
      </Modal>
    </footer>
  )
}

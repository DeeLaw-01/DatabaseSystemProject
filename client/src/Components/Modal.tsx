import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export default function Modal ({
  isOpen,
  onClose,
  children,
  className
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm' />
      <div
        ref={modalRef}
        className={cn(
          'relative bg-black/90 dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full m-4 p-6',
          'transform transition-all ease-in-out duration-300',
          'animate-in fade-in zoom-in-95 text-white',
          className
        )}
        role='dialog'
        aria-modal='true'
      >
        <button
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors'
          onClick={onClose}
          aria-label='Close modal'
        >
          <X className='h-6 w-6' />
        </button>
        {children}
      </div>
    </div>
  )
}

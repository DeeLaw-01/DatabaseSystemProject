import React from 'react'

interface AnimatedGradientTextProps {
  children: React.ReactNode
}

export default function AnimatedGradientText ({
  children
}: AnimatedGradientTextProps) {
  return (
    <div className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium animate-gradient-x'>
      {children}
    </div>
  )
}

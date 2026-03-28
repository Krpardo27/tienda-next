import React from 'react'

export default function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="
            h-14
            bg-white/80 backdrop-blur
            border-b border-gray-200
            flex items-center
            px-6
          ">
      <span className="text-sm font-medium text-gray-600">
        {children}
      </span>
    </h1>
  )
}

import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Logo Icon */}
      <div 
        className={`${sizeClasses[size]} rounded-xl flex items-center justify-center relative overflow-hidden`}
        style={{
          background: 'linear-gradient(135deg, #1fb6ff 0%, #4fc3f7 50%, #29b6f6 100%)'
        }}
      >
        {/* Diamond/Square shape */}
        <div 
          className="bg-white transform rotate-45 flex items-center justify-center"
          style={{
            width: '45%',
            height: '45%',
            borderRadius: '2px'
          }}
        >
          {/* Small white rectangle inside the white diamond */}
          <div 
            className="bg-white transform -rotate-45"
            style={{
              width: '40%',
              height: '20%',
              borderRadius: '1px'
            }}
          />
        </div>
      </div>
      
      {/* Brand Text */}
      {showText && (
        <span className={`${textSizeClasses[size]} font-bold text-foreground`}>
          E-Comm
        </span>
      )}
    </div>
  )
}
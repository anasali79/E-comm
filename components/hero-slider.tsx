"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SlideData {
  id: number
  title: string
  subtitle: string
  discount: string
  gradient: string
  emoji: string
  bgPattern: React.ReactNode
}

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 34,
    seconds: 52
  })
  const sliderRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Multiple slides data
  const slides: SlideData[] = [
    {
      id: 1,
      title: "Super Flash Sale",
      subtitle: "Premium Sneakers",
      discount: "50% Off",
      gradient: "from-red-500 via-pink-500 to-purple-600",
      emoji: "👟",
      bgPattern: (
        <>
          <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-6 right-6 w-16 h-16 border-2 border-white rounded-lg rotate-45"></div>
          <div className="absolute top-1/3 right-8 w-12 h-12 bg-white rounded-full opacity-30"></div>
        </>
      )
    },
    {
      id: 2,
      title: "Mega Deal",
      subtitle: "Designer Bags",
      discount: "40% Off",
      gradient: "from-blue-500 via-indigo-500 to-purple-600",
      emoji: "👜",
      bgPattern: (
        <>
          <div className="absolute top-6 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-4 left-6 w-20 h-20 border-2 border-white rounded-lg rotate-12"></div>
          <div className="absolute top-1/2 left-8 w-10 h-10 bg-white rounded-full opacity-30"></div>
        </>
      )
    },
    {
      id: 3,
      title: "Hot Deals",
      subtitle: "Luxury Belts",
      discount: "35% Off",
      gradient: "from-amber-500 via-orange-500 to-red-600",
      emoji: "🔗",
      bgPattern: (
        <>
          <div className="absolute top-8 left-1/2 w-14 h-14 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-8 right-4 w-18 h-18 border-2 border-white rounded-lg rotate-45"></div>
          <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-white rounded-full opacity-30"></div>
        </>
      )
    }
  ]

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const autoSlideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(autoSlideTimer)
  }, [isAutoPlaying, slides.length])

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
    setIsAutoPlaying(false) // Pause auto-play on touch
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isLeftSwipe = distanceX > 50
    const isRightSwipe = distanceX < -50
    const isVerticalSwipe = Math.abs(distanceY) > Math.abs(distanceX)
    
    // Only trigger slide change for horizontal swipes
    if (!isVerticalSwipe) {
      if (isLeftSwipe) {
        nextSlide()
      } else if (isRightSwipe) {
        prevSlide()
      }
    }
    
    // Resume auto-play after 2 seconds
    setTimeout(() => setIsAutoPlaying(true), 2000)
  }

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 2000)
  }

  return (
    <div className="relative mx-4 mt-4 rounded-2xl overflow-hidden">
      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2 transition-all duration-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2 transition-all duration-200"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={sliderRef}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id}
            className={`w-full flex-shrink-0 bg-gradient-to-br ${slide.gradient} relative`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              {slide.bgPattern}
            </div>
            
            <div className="relative z-10 p-6 text-white">
              {/* Hero Content */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">{slide.title}</h1>
                <p className="text-sm opacity-90 mb-2">{slide.subtitle}</p>
                <p className="text-lg font-semibold">{slide.discount}</p>
              </div>
              
              {/* Countdown Timer */}
              <div className="flex space-x-2 mb-4">
                <div className="bg-white text-gray-800 px-3 py-2 rounded-lg min-w-[50px] text-center">
                  <div className="text-lg font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                </div>
                <div className="bg-white text-gray-800 px-3 py-2 rounded-lg min-w-[50px] text-center">
                  <div className="text-lg font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                </div>
                <div className="bg-white text-gray-800 px-3 py-2 rounded-lg min-w-[50px] text-center">
                  <div className="text-lg font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                </div>
              </div>
              
              {/* Product Image */}
              <div className="flex justify-center mt-4">
                <div className="w-32 h-32 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <div className="text-6xl">{slide.emoji}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Slider Indicators */}
      <div className="flex justify-center space-x-2 pb-4 relative z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
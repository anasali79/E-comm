"use client"

import { useState, useEffect, useRef } from "react"
import { Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { ProductDetailModal } from "@/components/product-detail-modal"
import type { Product } from "@/lib/types"

interface FlashSaleProps {
  products: Product[]
}

export function FlashSale({ products }: FlashSaleProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [currentSlides, setCurrentSlides] = useState([0, 0, 0])
  const [timeLeft, setTimeLeft] = useState(86400)
  const sliderRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 86400))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return { hours, minutes, seconds: secs }
  }

  const time = formatTime(timeLeft)

  const sliderData = [
    {
      title: "⚡ Lightning Deals",
      products: (() => {
        let filtered = products.filter(p => p.discountPercent && p.discountPercent >= 40)
        if (filtered.length < 8) {
          const additional = products.filter(p => p.discountPrice && !filtered.find(f => f.id === p.id))
          filtered = [...filtered, ...additional].slice(0, 8)
        }
        return filtered.slice(0, 8)
      })(),
      color: "from-red-500 to-pink-500"
    },
    {
      title: "🔥 Hot Offers", 
      products: (() => {
        let filtered = products.filter(p => p.isHot || (p.discountPercent && p.discountPercent >= 30))
        if (filtered.length < 8) {
          const additional = products.filter(p => p.ratingValue >= 4.5 && !filtered.find(f => f.id === p.id))
          filtered = [...filtered, ...additional].slice(0, 8)
        }
        return filtered.slice(0, 8)
      })(),
      color: "from-orange-500 to-red-500"
    },
    {
      title: "💥 Mega Deals",
      products: (() => {
        let filtered = products.filter(p => p.discountPrice)
        if (filtered.length < 8) {
          const additional = products.filter(p => 
            (p.brand === 'Nike' || p.brand === 'Adidas' || p.brand === 'Gucci') && 
            !filtered.find(f => f.id === p.id)
          )
          filtered = [...filtered, ...additional].slice(0, 8)
        }
        return filtered.slice(0, 8)
      })(),
      color: "from-purple-500 to-pink-500"
    }
  ]

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
  }

  const nextSlide = (sliderIndex: number) => {
    setCurrentSlides(prev => {
      const newSlides = [...prev]
      const maxSlide = Math.max(0, sliderData[sliderIndex].products.length - 2)
      newSlides[sliderIndex] = (newSlides[sliderIndex] + 1) % (maxSlide + 1)
      return newSlides
    })
  }

  const prevSlide = (sliderIndex: number) => {
    setCurrentSlides(prev => {
      const newSlides = [...prev]
      const maxSlide = Math.max(0, sliderData[sliderIndex].products.length - 2)
      newSlides[sliderIndex] = newSlides[sliderIndex] === 0 ? maxSlide : newSlides[sliderIndex] - 1
      return newSlides
    })
  }

  const handleTouchStart = (e: React.TouchEvent, sliderIndex: number) => {
    setTouchEnd(null)
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const handleTouchEnd = (sliderIndex: number) => {
    if (!touchStart || !touchEnd) return
    
    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isLeftSwipe = distanceX > 50
    const isRightSwipe = distanceX < -50
    const isVerticalSwipe = Math.abs(distanceY) > Math.abs(distanceX)
    
    if (!isVerticalSwipe) {
      if (isLeftSwipe) {
        nextSlide(sliderIndex)
      } else if (isRightSwipe) {
        prevSlide(sliderIndex)
      }
    }
  }

  return (
    <div className="px-4 py-6">
      {/* Flash Sale Header with Countdown */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-4 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">⚡ Flash Sale</h2>
            <p className="text-sm opacity-90">Limited time offers!</p>
          </div>
          <div className="text-center">
            <div className="text-xs opacity-90 mb-2">Ends in</div>
            <div className="flex space-x-1 text-sm font-bold">
              <div className="bg-white bg-opacity-30 px-3 py-2 rounded-lg min-w-[40px] text-center">
                <div className="text-gray-900">{time.hours.toString().padStart(2, '0')}</div>
                <div className="text-xs text-gray-700 opacity-80">HRS</div>
              </div>
              <div className="flex items-center text-white text-lg">:</div>
              <div className="bg-white bg-opacity-30 px-3 py-2 rounded-lg min-w-[40px] text-center">
                <div className="text-gray-900">{time.minutes.toString().padStart(2, '0')}</div>
                <div className="text-xs text-gray-700 opacity-80">MIN</div>
              </div>
              <div className="flex items-center text-white text-lg">:</div>
              <div className="bg-white bg-opacity-30 px-3 py-2 rounded-lg min-w-[40px] text-center">
                <div className="text-gray-900">{time.seconds.toString().padStart(2, '0')}</div>
                <div className="text-xs text-gray-700 opacity-80">SEC</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Three Interactive Sliders */}
      {sliderData.map((slider, sliderIndex) => (
        <div key={sliderIndex} className="mb-6">
          {/* Slider Header */}
          <div className={`bg-gradient-to-r ${slider.color} rounded-t-xl p-3`}>
            <h3 className="text-white font-bold text-sm">{slider.title}</h3>
          </div>
          
          {/* Slider Content */}
          <div className="bg-white rounded-b-xl p-4 shadow-sm">
            {slider.products.length > 0 ? (
              <div className="relative">
                {/* Navigation Buttons */}
                <button 
                  onClick={() => prevSlide(sliderIndex)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                  style={{ marginLeft: '-12px' }}
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                
                <button 
                  onClick={() => nextSlide(sliderIndex)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                  style={{ marginRight: '-12px' }}
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>

                {/* Products Slider */}
                <div 
                  className="overflow-hidden"
                  onTouchStart={(e) => handleTouchStart(e, sliderIndex)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={() => handleTouchEnd(sliderIndex)}
                  ref={el => { sliderRefs.current[sliderIndex] = el }}
                >
                  <div 
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{
                      transform: `translateX(-${currentSlides[sliderIndex] * 50}%)`
                    }}
                  >
                    {slider.products.map((product) => (
                      <div 
                        key={product.id}
                        className="w-1/2 flex-shrink-0 px-2"
                      >
                        <div 
                          className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleProductClick(product)}
                        >
                          {/* Product Image */}
                          <div className="relative mb-2">
                            <div className="w-full h-24 bg-gray-100 rounded-lg overflow-hidden">
                              <img 
                                src={product.imageUrl} 
                                alt={product.name}
                                className="w-full h-full object-cover object-center"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                              <div className="w-full h-full flex items-center justify-center text-2xl hidden">
                                {product.category === 'sneakers' ? '👟' : 
                                 product.category === 'bags' ? '👜' : '🔗'}
                              </div>
                            </div>
                            <button className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm">
                              <Heart className="w-3 h-3 text-gray-400" />
                            </button>
                            {product.discountPercent && (
                              <span className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
                                -{product.discountPercent}%
                              </span>
                            )}
                          </div>
                          
                          {/* Product Info */}
                          <div className="space-y-1 text-center">
                            <h4 className="text-xs font-medium text-gray-800 line-clamp-2">
                              {product.name}
                            </h4>
                            <div className="flex items-center justify-center space-x-1">
                              <span className="text-sm font-bold" style={{ color: '#40BFFF' }}>
                                ${product.discountPrice || product.price}
                              </span>
                              {product.discountPrice && (
                                <span className="text-xs text-gray-400 line-through">
                                  ${product.price}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-center space-x-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <span 
                                    key={i} 
                                    className={`text-xs ${
                                      i < Math.floor(product.ratingValue) 
                                        ? 'text-yellow-400' 
                                        : 'text-gray-300'
                                    }`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slider Dots */}
                <div className="flex justify-center mt-3 space-x-1">
                  {Array.from({ length: Math.max(1, Math.ceil(slider.products.length / 2)) }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlides(prev => {
                        const newSlides = [...prev]
                        newSlides[sliderIndex] = i
                        return newSlides
                      })}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentSlides[sliderIndex] ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                      style={{
                        backgroundColor: i === currentSlides[sliderIndex] ? '#40BFFF' : undefined
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-2xl mb-2">🔍</div>
                <p className="text-sm">No deals available</p>
              </div>
            )}
          </div>
        </div>
      ))}
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
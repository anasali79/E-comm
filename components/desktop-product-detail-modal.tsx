"use client"

import { useState } from "react"
import { X, Share2, Heart, Plus, Minus, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import type { Product } from "@/lib/types"

interface DesktopProductDetailModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function DesktopProductDetailModal({ product, isOpen, onClose }: DesktopProductDetailModalProps) {
  if (!isOpen || !product) return null

  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [selectedSize, setSelectedSize] = useState("M")
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  const showToastMessage = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: Number(product.discountPrice || product.price),
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
      image: product.imageUrl
    }
    
    if (typeof window === 'undefined') {
      showToastMessage('Unable to add to cart')
      return
    }

    try {
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
      const existingItemIndex = existingCart.findIndex((item: any) => 
        item.id === product.id && item.color === selectedColor && item.size === selectedSize
      )

      if (existingItemIndex > -1) {
        existingCart[existingItemIndex].quantity += quantity
      } else {
        existingCart.push(cartItem)
      }

      localStorage.setItem('cart', JSON.stringify(existingCart))
      window.dispatchEvent(new Event('cartUpdated'))
      showToastMessage(`Added ${quantity} ${product.name} to cart!`)
    } catch (e) {
      console.error('Error updating cart in DesktopProductDetailModal:', e)
      showToastMessage('Error adding to cart')
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    showToastMessage('Redirecting to checkout...')
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between shadow-sm z-10 rounded-t-2xl">
          <h1 className="text-2xl font-bold">Product Details</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Share2 className="w-6 h-6 text-gray-600" />
            </button>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          <div className="space-y-4">
            <div className="relative bg-gray-50 rounded-xl overflow-hidden">
              <div className="aspect-square w-full flex items-center justify-center p-8">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="w-full h-full flex items-center justify-center text-8xl hidden bg-gray-100 rounded-xl">
                  {product.category === 'sneakers' ? '👟' : 
                   product.category === 'bags' ? '👜' : '👔'}
                </div>
              </div>
              
              <div className="absolute top-6 left-6 flex flex-col space-y-2">
                {product.isHot && (
                  <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                    🔥 Hot
                  </span>
                )}
                {product.discountPercent && (
                  <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                    -{product.discountPercent}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b bg-gray-50 rounded-xl p-6">
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-3 text-green-500" />
                <p className="text-sm font-medium text-gray-800">Free Shipping</p>
                <p className="text-xs text-gray-600">On orders over $50</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                <p className="text-sm font-medium text-gray-800">2 Year Warranty</p>
                <p className="text-xs text-gray-600">Full product coverage</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 mx-auto mb-3 text-purple-500" />
                <p className="text-sm font-medium text-gray-800">Easy Returns</p>
                <p className="text-xs text-gray-600">30-day return policy</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-base text-gray-500 uppercase tracking-wide font-medium">{product.brand}</span>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < Math.floor(product.ratingValue) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-base text-gray-600">({product.ratingCount} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold" style={{ color: '#40BFFF' }}>
                  ${product.discountPrice || product.price}
                </span>
                {product.discountPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ${product.price}
                    </span>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                      Save {product.discountPercent}%
                    </span>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Color</h3>
              <div className="flex space-x-4">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      selectedColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color === 'white' ? '#ffffff' : color }}
                  >
                    {color === 'white' && <div className="w-full h-full border rounded-full"></div>}
                  </button>
                ))}
              </div>
              <p className="text-base text-gray-600 mt-3 capitalize">Selected: {selectedColor}</p>
            </div>

            {(product.category === 'sneakers' || product.category === 'belts') && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Size</h3>
                <div className="grid grid-cols-6 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 border rounded-xl text-base font-medium transition-all ${
                        selectedSize === size 
                          ? 'border-gray-800 bg-gray-800 text-white' 
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-4">Quantity</h3>
              <div className="flex items-center space-x-6">
                <div className="flex items-center border rounded-xl">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-4 hover:bg-gray-100 rounded-l-xl"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-4 border-x text-center min-w-[80px] text-lg font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-4 hover:bg-gray-100 rounded-r-xl"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-base text-gray-600">In stock: 25+ items</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span className="text-gray-700 font-medium">Total:</span>
                <span className="text-2xl font-bold" style={{ color: '#40BFFF' }}>
                  ${((product.discountPrice || product.price) * quantity).toFixed(2)}
                </span>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 border border-gray-800 text-gray-800 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors"
                >
                  Buy Now
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-3 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#40BFFF' }}
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                Premium quality {product.category} from {product.brand}. Made with finest materials and 
                attention to detail. Perfect for everyday wear and special occasions. 
                Features modern design with classic appeal that combines comfort with style.
              </p>
            </div>

            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold mb-4">Specifications</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Brand:</span>
                  <span className="font-medium">{product.brand}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Category:</span>
                  <span className="font-medium capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Material:</span>
                  <span className="font-medium">Premium Quality</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 font-medium">Origin:</span>
                  <span className="font-medium">Imported</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-green-500 text-white px-8 py-4 rounded-xl shadow-lg flex items-center space-x-3">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-500 text-lg">✓</span>
            </div>
            <span className="font-medium text-lg">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}
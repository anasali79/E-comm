"use client"

import { useState } from "react"
import { X, Heart, Star, Minus, Plus, ShoppingCart, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductDetailModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
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
  }

  const handleBuyNow = () => {
    handleAddToCart()
    showToastMessage('Redirecting to checkout...')
  }

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between shadow-sm z-10">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">Product Details</h1>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Share2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
          </button>
        </div>
      </div>

      {/* Product Image */}
      <div className="relative bg-gray-50">
        <div className="w-full h-80 overflow-hidden flex items-center justify-center">
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
          <div className="w-full h-full flex items-center justify-center text-8xl hidden bg-gray-100">
            {product.category === 'sneakers' ? '👟' : 
             product.category === 'bags' ? '👜' : '👔'}
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product.isHot && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              🔥 Hot
            </span>
          )}
          {product.discountPercent && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              -{product.discountPercent}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-6">
        {/* Basic Info */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</span>
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < Math.floor(product.ratingValue) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.ratingCount})</span>
            </div>
          </div>
          
          <h1 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h1>
          
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold" style={{ color: '#40BFFF' }}>
              ${product.discountPrice || product.price}
            </span>
            {product.discountPrice && (
              <span className="text-lg text-gray-400 line-through">
                ${product.price}
              </span>
            )}
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <h3 className="text-base font-semibold mb-3">Color</h3>
          <div className="flex space-x-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedColor === color ? 'border-gray-800' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color === 'white' ? '#ffffff' : color }}
              >
                {color === 'white' && <div className="w-full h-full border rounded-full"></div>}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2 capitalize">Selected: {selectedColor}</p>
        </div>

        {/* Size Selection */}
        {(product.category === 'sneakers' || product.category === 'belts') && (
          <div>
            <h3 className="text-base font-semibold mb-3">Size</h3>
            <div className="grid grid-cols-6 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 px-2 border rounded-lg text-sm font-medium ${
                    selectedSize === size 
                      ? 'border-gray-800 bg-gray-800 text-white' 
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div>
          <h3 className="text-base font-semibold mb-3">Quantity</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-lg">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-gray-100 rounded-l-lg"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-3 border-x text-center min-w-[60px]">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-gray-100 rounded-r-lg"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm text-gray-500">In stock: 25 items</span>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 py-4 border-t border-b">
          <div className="text-center">
            <Truck className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <p className="text-xs text-gray-600">Free Shipping</p>
          </div>
          <div className="text-center">
            <Shield className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <p className="text-xs text-gray-600">2 Year Warranty</p>
          </div>
          <div className="text-center">
            <RotateCcw className="w-6 h-6 mx-auto mb-2 text-purple-500" />
            <p className="text-xs text-gray-600">Easy Returns</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-base font-semibold mb-3">Description</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Premium quality {product.category} from {product.brand}. Made with finest materials and 
            attention to detail. Perfect for everyday wear and special occasions. 
            Features modern design with classic appeal.
          </p>
        </div>

        {/* Specifications */}
        <div>
          <h3 className="text-base font-semibold mb-3">Specifications</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Brand:</span>
              <span className="font-medium">{product.brand}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span className="font-medium capitalize">{product.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Material:</span>
              <span className="font-medium">Premium Quality</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Origin:</span>
              <span className="font-medium">Imported</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="sticky bottom-0 bg-white border-t p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total:</span>
          <span className="text-xl font-bold" style={{ color: '#40BFFF' }}>
            ${((product.discountPrice || product.price) * quantity).toFixed(2)}
          </span>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={handleBuyNow}
            className="flex-1 border border-gray-800 text-gray-800 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Buy Now
          </button>
          <button 
            onClick={handleAddToCart}
            className="flex-1 text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#40BFFF' }}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-500 text-sm">✓</span>
            </div>
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}
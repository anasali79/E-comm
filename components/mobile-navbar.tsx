"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Search, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react"
import { Logo } from "@/components/logo"

export function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Load cart items from localStorage
    const loadCartItems = () => {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        const items = JSON.parse(savedCart)
        setCartItems(items)
        setCartCount(items.reduce((total: number, item: any) => total + item.quantity, 0))
      }
    }

    loadCartItems()

    // Listen for storage changes (when items are added from other components)
    const handleStorageChange = () => {
      loadCartItems()
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Custom event listener for cart updates
    const handleCartUpdate = () => {
      loadCartItems()
    }
    
    window.addEventListener('cartUpdated', handleCartUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cartUpdated', handleCartUpdate)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const updateCartQuantity = (itemId: string, color: string, size: string, newQuantity: number) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId && item.color === color && item.size === size) {
        return { ...item, quantity: Math.max(0, newQuantity) }
      }
      return item
    }).filter(item => item.quantity > 0)

    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0))
  }

  const removeFromCart = (itemId: string, color: string, size: string) => {
    const updatedCart = cartItems.filter(item => 
      !(item.id === itemId && item.color === color && item.size === size)
    )
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
  }

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo & Brand Name - Left */}
          <Logo size="md" showText={true} />
          
          {/* Hamburger Menu - Right */}
          <button onClick={toggleMenu} className="p-2">
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMenu}>
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300">
            <div className="p-6 mt-16">
              {/* Navigation Links */}
              <nav className="space-y-6">
                <Link 
                  href="/" 
                  className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
                <Link 
                  href="/sneakers" 
                  className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
                  onClick={toggleMenu}
                >
                  Sneakers
                </Link>
                <Link 
                  href="/belt" 
                  className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
                  onClick={toggleMenu}
                >
                  Belts
                </Link>
                <Link 
                  href="/bag" 
                  className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
                  onClick={toggleMenu}
                >
                  Bags
                </Link>
                <Link 
                  href="/contact" 
                  className="block text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
                  onClick={toggleMenu}
                >
                  Contact Us
                </Link>
              </nav>
              
              {/* Cart & Account */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button 
                  onClick={toggleCart}
                  className="flex items-center space-x-3 w-full p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Shopping Cart</span>
                  <span 
                    className="ml-auto text-white text-xs px-2 py-1 rounded-full"
                    style={{ backgroundColor: '#40BFFF' }}
                  >
                    {cartCount}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl overflow-y-auto">
            {/* Cart Header */}
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between shadow-sm">
              <h2 className="text-lg font-bold">Shopping Cart ({cartCount})</h2>
              <button 
                onClick={toggleCart}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500">Start shopping to add items to your cart</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={`${item.id}-${item.color}-${item.size}-${index}`} className="bg-white border rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          <div className="w-full h-full flex items-center justify-center text-2xl hidden">
                            👟
                          </div>
                        </div>
                        
                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500">Color: {item.color}</span>
                            {item.size && <span className="text-xs text-gray-500">Size: {item.size}</span>}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-bold" style={{ color: '#40BFFF' }}>
                              ${item.price}
                            </span>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => updateCartQuantity(item.id, item.color, item.size, item.quantity - 1)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="text-sm font-medium px-2">{item.quantity}</span>
                              <button 
                                onClick={() => updateCartQuantity(item.id, item.color, item.size, item.quantity + 1)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => removeFromCart(item.id, item.color, item.size)}
                                className="p-1 hover:bg-red-100 rounded text-red-500 ml-2"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="sticky bottom-0 bg-white border-t p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold" style={{ color: '#40BFFF' }}>
                    ${getTotalPrice()}
                  </span>
                </div>
                <button 
                  className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#40BFFF' }}
                  onClick={() => {
                    alert('Proceeding to checkout...')
                    toggleCart()
                  }}
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Spacer for fixed navbar */}
      <div className="h-16 md:hidden"></div>
    </>
  )
}
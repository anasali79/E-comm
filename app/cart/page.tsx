"use client"

import { useState, useEffect } from "react"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui-tailwind/button"
import { Card, CardContent } from "@/components/ui-tailwind/card"
import { useCart } from "@/contexts/cart-context"
import { StarRating } from "@/components/star-rating"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [localCartItems, setLocalCartItems] = useState<any[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setLocalCartItems(JSON.parse(savedCart))
    }
  }, [])

  const cartItems = localCartItems.length > 0 ? localCartItems : items
  const cartTotalItems = localCartItems.length > 0 ? 
    localCartItems.reduce((total, item) => total + item.quantity, 0) : totalItems
  const cartTotalPrice = localCartItems.length > 0 ? 
    localCartItems.reduce((total, item) => total + ((Number(item.price) || 0) * item.quantity), 0) : totalPrice

  const handleQuantityChange = (itemId: string, newQuantity: number, color?: string, size?: string) => {
    if (localCartItems.length > 0) {
      const updatedCart = localCartItems.map(item => {
        if (item.id === itemId && item.color === color && item.size === size) {
          return { ...item, quantity: Math.max(1, newQuantity) }
        }
        return item
      })
      setLocalCartItems(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      window.dispatchEvent(new Event('cartUpdated'))
    } else {
      if (newQuantity >= 1) {
        updateQuantity(itemId, newQuantity)
      }
    }
  }

  const handleRemoveItem = (itemId: string, color?: string, size?: string) => {
    if (localCartItems.length > 0) {
      const updatedCart = localCartItems.filter(item => 
        !(item.id === itemId && item.color === color && item.size === size)
      )
      setLocalCartItems(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      window.dispatchEvent(new Event('cartUpdated'))
    } else {
      removeFromCart(itemId)
    }
  }

  const handleClearCart = () => {
    if (localCartItems.length > 0) {
      setLocalCartItems([])
      localStorage.removeItem('cart')
      window.dispatchEvent(new Event('cartUpdated'))
    } else {
      clearCart()
    }
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      alert("Order placed successfully!")
      if (localCartItems.length > 0) {
        setLocalCartItems([])
        localStorage.removeItem('cart')
        window.dispatchEvent(new Event('cartUpdated'))
      } else {
        clearCart()
      }
      setIsCheckingOut(false)
    }, 2000)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to your cart to see them here.</p>
            <Link href="/">
              <Button className="" style={{backgroundColor: '#40BFFF'}}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shopping
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <span className="text-lg text-gray-600">({cartTotalItems} items)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => {
              const product = localCartItems.length > 0 ? 
                {
                  id: item.id,
                  name: item.name,
                  imageUrl: item.image,
                  price: Number(item.price) || 0,
                  discountPrice: null,
                  discountPercent: null,
                  ratingValue: 4.5,
                  ratingCount: 100
                } : item.product;
              
              const quantity = localCartItems.length > 0 ? item.quantity : item.quantity;
              const itemColor = localCartItems.length > 0 ? item.color : undefined;
              const itemSize = localCartItems.length > 0 ? item.size : undefined;
              
              return (
                <Card key={`${product.id}-${itemColor}-${itemSize}-${index}`} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        
                        {/* Color and Size Info for localStorage items */}
                        {localCartItems.length > 0 && (
                          <div className="flex items-center gap-4 mb-2">
                            {itemColor && <span className="text-sm text-gray-600">Color: {itemColor}</span>}
                            {itemSize && <span className="text-sm text-gray-600">Size: {itemSize}</span>}
                          </div>
                        )}
                        
                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-2">
                          <StarRating rating={product.ratingValue} />
                          <span className="text-sm text-gray-500">
                            ({product.ratingCount} reviews)
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xl font-bold" style={{color: '#40BFFF'}}>
                            ${(Number(product.discountPrice) || Number(product.price) || 0).toFixed(2)}
                          </span>
                          {product.discountPrice && (
                            <>
                              <span className="text-sm text-gray-400 line-through">
                                ${Number(product.price).toFixed(2)}
                              </span>
                              <span className="text-sm font-medium text-red-500">
                                {product.discountPercent}% Off
                              </span>
                            </>
                          )}
                        </div>

                        {/* Quantity and Remove */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(product.id, quantity - 1, itemColor, itemSize)}
                              disabled={quantity <= 1}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">{quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(product.id, quantity + 1, itemColor, itemSize)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(product.id, itemColor, itemSize)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          ${((Number(product.discountPrice) || Number(product.price) || 0) * quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          ${(Number(product.discountPrice) || Number(product.price) || 0).toFixed(2)} each
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {/* Clear Cart Button */}
            <div className="pt-4">
              <Button
                variant="outline"
                onClick={handleClearCart}
                className="text-red-500 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartTotalItems} items)</span>
                    <span>${cartTotalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(cartTotalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${(cartTotalPrice * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  style={{backgroundColor: '#40BFFF'}}
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </Button>

                <div className="mt-4 text-center">
                  <Link href="/">
                    <Button variant="ghost" style={{color: '#40BFFF'}}>
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
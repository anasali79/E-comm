"use client"

import { useState, useEffect } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui-tailwind/button"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

export function CartIcon() {
  const { totalItems, totalPrice } = useCart()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const loadCartItems = () => {
      if (typeof window === 'undefined') return
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        try {
          const items = JSON.parse(savedCart)
          setCartCount(items.reduce((total: number, item: any) => total + item.quantity, 0))
        } catch (e) {
          console.error('Error parsing saved cart in CartIcon:', e)
          setCartCount(0)
        }
      }
    }

    loadCartItems()

    const handleCartUpdate = () => {
      loadCartItems()
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('cartUpdated', handleCartUpdate)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('cartUpdated', handleCartUpdate)
      }
    }
  }, [])

  const getTotalPrice = () => {
    if (typeof window === 'undefined') return '0.00'
    try {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        const items = JSON.parse(savedCart)
        return items.reduce((total: number, item: any) => total + (item.price * item.quantity), 0).toFixed(2)
      }
    } catch (e) {
      console.error('Error computing total price in CartIcon:', e)
    }
    return '0.00'
  }

  return (
    <Link href="/cart">
      <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100">
        <ShoppingCart className="h-5 w-5" />
        <span className="text-sm font-medium">Items</span>
        <span className="text-sm font-medium">${getTotalPrice()}</span>
        {cartCount > 0 && (
          <span className="ml-2 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium" style={{backgroundColor: '#40BFFF'}}>
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </Button>
    </Link>
  )
}
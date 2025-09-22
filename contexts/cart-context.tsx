"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import type { Product, CartItem, CartState } from '@/lib/types'

// Cart Actions
type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] }

// Cart Context Type
interface CartContextType extends CartState {
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
}

// Cart Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.product.id === action.product.id)
      
      if (existingItem) {
        // If item already exists, increase quantity
        const updatedItems = state.items.map(item =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + (action.product.discountPrice || action.product.price),
        }
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          id: `${action.product.id}-${Date.now()}`,
          product: action.product,
          quantity: 1,
        }
        
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + (action.product.discountPrice || action.product.price),
        }
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const itemToRemove = state.items.find(item => item.product.id === action.productId)
      if (!itemToRemove) return state
      
      const updatedItems = state.items.filter(item => item.product.id !== action.productId)
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - (itemToRemove.product.discountPrice || itemToRemove.product.price) * itemToRemove.quantity,
      }
    }
    
    case 'UPDATE_QUANTITY': {
      const itemToUpdate = state.items.find(item => item.product.id === action.productId)
      if (!itemToUpdate) return state
      
      if (action.quantity <= 0) {
        // Remove item if quantity is 0 or less
        return cartReducer(state, { type: 'REMOVE_FROM_CART', productId: action.productId })
      }
      
      const quantityDiff = action.quantity - itemToUpdate.quantity
      const priceDiff = (itemToUpdate.product.discountPrice || itemToUpdate.product.price) * quantityDiff
      
      const updatedItems = state.items.map(item =>
        item.product.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      )
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + priceDiff,
      }
    }
    
    case 'CLEAR_CART': {
      return initialState
    }
    
    case 'LOAD_CART': {
      const totalItems = action.items.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = action.items.reduce(
        (sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity,
        0
      )
      
      return {
        items: action.items,
        totalItems,
        totalPrice,
      }
    }
    
    default:
      return state
  }
}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined)

// Helper functions for safe localStorage access
const getLocalStorageItem = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key)
  }
  return null
}

const setLocalStorageItem = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value)
  }
}

// Cart Provider Component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  
  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = getLocalStorageItem('cart')
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart)
          dispatch({ type: 'LOAD_CART', items: parsedCart })
        } catch (error) {
          console.error('Error loading cart from localStorage:', error)
        }
      }
    }
  }, [])
  
  // Save cart to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLocalStorageItem('cart', JSON.stringify(state.items))
    }
  }, [state.items])
  
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product })
  }
  
  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId })
  }
  
  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity })
  }
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  
  const contextValue: CartContextType = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
  
  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
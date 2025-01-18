'use client'

import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addToCart = (product) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id)
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setItems(currentItems => 
      currentItems.filter(item => item.id !== productId)
    )
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}


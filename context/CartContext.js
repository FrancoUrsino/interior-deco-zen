'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

function CartProvider({ children }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setItems(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

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

  const handleStock = () => {
    setItems(currentItems =>
      currentItems.map(item => ({
        ...item,
        stock: item.stock - item.quantity
      }))
    );
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, handleStock }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('Algo salió mal con el provider')
  }
  return context
}

export default CartProvider

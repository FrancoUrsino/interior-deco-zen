'use client'
import { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/db/firebase'
import { useAuth } from '@/context/AuthContext'

const CartContext = createContext()

function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [orders, setOrders] = useState([])
  const { user } = useAuth()

  const addToCart = (product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        if (existingItem.quantity >= existingItem.stock) {
          toast.warning('No hay suficiente stock disponible.')
          return currentItems
        }
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      if (product.stock > 0) {
        return [...currentItems, { ...product, quantity: 1 }]
      }

      toast.error('Este producto está agotado.')
      return currentItems
    })
  }

  const removeFromCart = (productId) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    )
  }

  const handleStock = () => {
    setItems((currentItems) =>
      currentItems.map((item) => ({
        ...item,
        stock: Math.max(0, item.stock - item.quantity)
      }))
    )
  }
  
  const placeOrder = async () => {
    if (!user) {
      toast.error("Debes estar autenticado para realizar una orden.")
      return
    }

    if (items.length === 0) {
      toast.error("El carrito está vacío.")
      return
    }

    const subtotal = items.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    )
    const service = subtotal * 0.09
    const shippingCost = subtotal >= 250000 ? 0 : 20000
    const total = subtotal + service + shippingCost
    const orderData = {
      userId: user.uid,
      items,
      subtotal,
      service,
      shippingCost,
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    try {
      const ordersRef = collection(db, "users", user.uid, "orders")
      const docRef = await addDoc(ordersRef, orderData)
      toast.success("Orden realizada con éxito.")

      setOrders((prevOrders) => [...prevOrders, { id: docRef.id, ...orderData }])
      setItems([])

      return docRef.id
    } catch (error) {
      console.error("Error al realizar la orden:", error)
      toast.error("Error al realizar la orden.")
      throw error
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        handleStock,
        placeOrder,
        orders,
      }}
    >
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

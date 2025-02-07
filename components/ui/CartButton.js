'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { toast } from 'react-toastify'

export function CartButton({ product }) {
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleClick = () => {
    addToCart(product)
    setIsAdded(true)
    
    // ✅ Notificación de éxito
    toast.success(`${product.name} agregado al carrito`, {
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })

    setTimeout(() => setIsAdded(false), 1500)
  }

  return (
    <button 
      onClick={handleClick}
      className={`flex mx-auto md:mx-0 w-96 md:w-56 justify-center p-4 rounded-lg text-white font-semibold cursor-pointer transition-all ${
        isAdded 
          ? 'bg-secondary-color' 
          : 'bg-primary-color hover:bg-primary-color/40'
      }`}
    >
      {isAdded ? 'Agregado' : 'Agregar al Carrito'}
    </button>
  )
}



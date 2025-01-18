'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'

function CartButton({ product }) {
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleClick = () => {
    addToCart(product)
    setIsAdded(true)
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

export default CartButton
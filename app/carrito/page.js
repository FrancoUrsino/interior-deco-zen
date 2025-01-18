'use client'

import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import Button from '@/components/ui/Button'

function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart()

  const subtotal = items.reduce((sum, product) => sum + (product.price * product.quantity), 0)
  const service = subtotal * 0.21
  const shippingCost = subtotal >= 250000 ? 0 : 50000
  const total = subtotal + service + shippingCost

  return (
    <div className="container mx-auto px-4 py-20 min-h-[65vh]">
      <h1 className="text-3xl font-IBM_Plex_Serif uppercase font-bold mb-8">Carrito de Compras</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <p className="text-center font-raleway xl:text-xl">Completá tu pedido hasta $250000 para obtener envío gratis!!</p>
              <p className="text-center mt-10 font-raleway">Tu carrito está vacío.</p>
              <Button text="Seguir comprando" href="/muebles" className="align-middle text-center w-40 mx-auto mt-4 bg-primary-color hover:bg-primary-color/50 hover:text-gray-300 transition duration-200 py-3 px-2 rounded-xl font-IBM_Plex_Serif" />
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((product) => (
                <div key={product.id} className="bg-primary-color rounded-lg shadow-md">
                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1 space-y-1">
                        <h3 className="font-light xl:text-lg">{product.name}</h3>
                        <p className="text-gray-300">
                          ${product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(product.id, product.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
                          >
                            <AiOutlineMinus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">{product.quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, product.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
                          >
                            <AiOutlinePlus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <p className="font-medium">
                          ${(product.price * product.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                          aria-label="Eliminar producto"
                        >
                          <AiOutlineDelete className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-primary-color rounded-lg shadow-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Servicios</p>
                  <p>${service.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Envío</p>
                  <p>{shippingCost === 0 ? "gratuito" : `$${shippingCost.toFixed(2)}`}</p>
                </div>
                <div className="border-t border-gray-200 my-4"></div>
                <div className="flex justify-between font-semibold">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                <button className="w-full bg-black hover:bg-secondary-color text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                  Proceder al Pago
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage

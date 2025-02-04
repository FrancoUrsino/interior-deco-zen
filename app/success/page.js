'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Success() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const registerOrder = async () => {
      if (!user) return

      const paymentId = searchParams.get('payment_id')
      const status = searchParams.get('status')
      const merchantOrderId = searchParams.get('merchant_order_id')

      if (!paymentId || !status || !merchantOrderId) {
        console.error('Datos de pago incompletos')
        return
      }

      const orderData = {
        paymentId,
        status,
        merchantOrderId,
        date: new Date().toISOString(),
        items: JSON.parse(localStorage.getItem('cart') || '[]'), 
        total: JSON.parse(localStorage.getItem('total')) || 0,
      }

      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        })

        if (!response.ok) {
          throw new Error('Error al guardar la orden')
        }

        localStorage.removeItem('cart')
        localStorage.removeItem('total')
        setOrder(orderData)
      } catch (error) {
        console.error('Error al registrar la orden:', error)
      }
    }

    registerOrder()
  }, [user, searchParams])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Pago Exitoso 🎉</h1>
      <p>Tu orden ha sido registrada correctamente.</p>

      {order && (
        <div className="mt-6 p-4 border rounded-lg shadow-md w-96 bg-primary-color/80">
          <h2 className="text-lg font-semibold">Comprobante de Pago</h2>
          <p><strong>ID de Pago:</strong> {order.paymentId}</p>
          <p><strong>Estado:</strong> {order.status}</p>
          <p><strong>Orden:</strong> {order.merchantOrderId}</p>
          <p><strong>Fecha:</strong> {new Date(order.date).toLocaleString()}</p>
          <h3 className="font-semibold mt-4">Productos:</h3>
          <ul className="text-sm">
            {order.items.map(item => (
              <li key={item.id}>
                {item.quantity}x {item.name} - ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-bold">Total: ${order.total}</p>
        </div>
      )}

      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" 
        onClick={() => router.push('/perfil')}
      >
        Ver mis órdenes
      </button>
    </div>
  )
}

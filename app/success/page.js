'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/Button'

export default function Success() {
  const { user } = useAuth()
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
      <h1 className="text-2xl font-bold">¡Pago Exitoso!</h1>
      <p>Tu orden ha sido registrada correctamente.</p>

      {order && (
        <div className="mt-6 p-4 border rounded-lg shadow-md w-96 bg-primary-color/80">
          <h2 className="text-lg font-semibold">Comprobante de Pago</h2>
          <p><strong>ID de Pago:</strong> {order.paymentId}</p>
          <p><strong>Estado:</strong> {order.status}</p>
          <p><strong>Orden:</strong> {order.merchantOrderId}</p>
          <p><strong>Fecha:</strong> {new Date(order.date).toLocaleString()}</p>
        </div>
      )}
      <Button
          text="Ver mis órdenes"
          href={"/perfil"}
          className="flex justify-center items-center gap-2 px-4 py-2 text-base font-semibold transition duration-300"
        />
    </div>
  )
}
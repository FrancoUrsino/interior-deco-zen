import React from "react"

function OrderHistory({ orders = [] }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium mb-4">Mis Compras</h2>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-md p-4"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Orden #{order.id}</span>
                <span className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-sm font-medium text-gray-900">
                  Total: ${order.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No tienes órdenes recientes.</p>
      )}
    </div>
  )
}

export default OrderHistory
"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

function OrderHistory() {
  const { getOrders } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userOrders = await getOrders();
        setOrders(userOrders);
      } catch (error) {
        console.error("Error al obtener órdenes:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Historial de Compras</h2>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Orden #{order.merchantOrderId || order.id}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(order.date || order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-sm font-medium text-gray-900">
                  Total: ${order.total}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  Estado: {order.status || "Sin estado"}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Productos Comprados:</h3>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-gray-200 py-2">
                    <div>
                      <p className="text-sm text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">Categoría: {item.category}</p>
                    </div>
                    <div className="text-sm text-gray-800">
                      Cantidad: {item.quantity}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No tienes órdenes recientes.</p>
      )}
    </div>
  );
}

export default OrderHistory;

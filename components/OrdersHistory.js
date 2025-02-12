"use client";
import { useEffect, useState } from "react";
import { db } from "@/db/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Usamos el uid del usuario, que es el mismo que se usó al guardar la orden
        const ordersRef = collection(db, "users", user.uid, "orders");
        const querySnapshot = await getDocs(ordersRef);
        const userOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(userOrders);
      } catch (error) {
        console.error("❌ Error al obtener órdenes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user)
    return <p className="text-sm text-gray-500">Inicia sesión para ver tus órdenes.</p>;
  if (loading)
    return <p className="text-sm text-gray-500">Cargando órdenes...</p>;

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Historial de Compras</h2>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border border-gray-200 rounded-md p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Orden #{order.merchantOrderId || order.id}
                </span>
                <span className="text-sm text-gray-500">
                  {order.date ? new Date(order.date).toLocaleDateString() : "Fecha no disponible"}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-sm font-medium text-gray-500">
                  Total: ${order.total || 0}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  Estado: {order.status || "Pendiente"}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-white mb-2">Productos Comprados:</h3>
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-gray-200 py-2">
                      <div>
                        <p className="text-sm text-gray-500">{item.name}</p>
                        {item.category && (
                          <p className="text-xs text-gray-500">Categoría: {item.category}</p>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        Cantidad: {item.quantity}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No hay productos en esta orden.</p>
                )}
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

'use client'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/db/firebase";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";

export default function Success() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recuperamos el objeto de orden guardado en localStorage (se guardó al confirmar la compra)
    const storedOrderData = localStorage.getItem("orderData");
    if (storedOrderData) {
      let order = JSON.parse(storedOrderData);
      
      // Extraemos los parámetros que vienen de Mercado Pago
      const paymentId = searchParams.get("payment_id");
      const status = searchParams.get("status");
      const merchantOrderId = searchParams.get("merchant_order_id");
      
      // Fusionamos los datos de la orden almacenada con los datos que vienen de la URL.
      order = {
        ...order,
        paymentId: paymentId || order.paymentId,
        status: status || order.status,
        merchantOrderId: merchantOrderId || order.merchantOrderId,
        date: new Date().toISOString() // Actualizamos la fecha, o mantenela si lo prefieres
      };

      setOrderData(order);
      // Eliminamos la información del localStorage para evitar que se reutilice en recargas futuras.
      localStorage.removeItem("orderData");
    }
    setLoading(false);
  }, [searchParams]);

  // Aquí guardamos la orden en la subcolección "orders" del usuario en Firestore
  useEffect(() => {
    if (orderData && user) {
      const saveOrderToFirestore = async () => {
        try {
          // Usamos el uid del usuario (o el identificador que hayas decidido usar)
          const ordersRef = collection(db, "users", user.uid, "orders");
          await addDoc(ordersRef, orderData);
          console.log("Orden guardada en Firestore correctamente.");
        } catch (error) {
          console.error("Error al guardar la orden en Firestore:", error);
        }
      };
      saveOrderToFirestore();
    }
  }, [orderData, user]);

  if (loading) {
    return <p className="text-center p-4">Registrando tu orden...</p>;
  }

  if (!orderData) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold">No se encontraron datos de la orden.</h2>
      </div>
    );
  }

  // Desestructuramos los datos de la orden
  const { userEmail, paymentId, status, merchantOrderId, date, items, subtotal, service, shippingCost, total } = orderData;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">¡Pago Exitoso!</h1>
      <p>Tu orden ha sido registrada correctamente.</p>
    <div className="p-6 max-w-2xl mx-auto border-gray-500 bg-primary-color shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Comprobante de Pago</h2>
      
      <div className="mb-4">
        <p><strong>Email del Usuario:</strong> {userEmail}</p>
        <p><strong>ID de Pago:</strong> {paymentId}</p>
        <p><strong>Estado:</strong> {status}</p>
        <p><strong>Orden:</strong> {merchantOrderId}</p>
        <p><strong>Fecha:</strong> {new Date(date).toLocaleString()}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Resumen del Pedido</h3>
        <p><strong>Subtotal:</strong> ${subtotal}</p>
        <p><strong>Servicios:</strong> ${service}</p>
        <p><strong>Envío:</strong> {shippingCost === 0 ? "Gratuito" : `$${shippingCost}`}</p>
        <p className="font-bold"><strong>Total:</strong> ${total}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Productos Comprados:</h3>
        {items && items.length > 0 ? (
          <ul className="list-disc pl-5">
            {items.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} x ${item.price} = ${item.productTotal}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay productos en el pedido.</p>
        )}
      </div>

      <div className="mt-6 text-center">
        <Button
          text="Ver mis compras"
          href="/perfil"
        />
      </div>
    </div>
    </div>
  );
}

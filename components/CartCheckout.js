import { useState } from "react";

const CartCheckout = ({ open, onClose, onSelectPayment, items }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleMercadoPago = async () => {
    if (!items || items.length === 0) {
      alert("No hay productos en el carrito.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/mercadopago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items ?? [] }),
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No se recibió una URL de pago válida.");
      }
    } catch (error) {
      alert(`Hubo un problema con el pago: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = () => {
    if (selectedMethod === "mercado_pago") {
      handleMercadoPago();
    } else if (selectedMethod && typeof onSelectPayment === "function") {
      onSelectPayment(selectedMethod);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-secondary-color w-96 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-center mb-4">Selecciona un método de pago</h2>
        <div className="flex flex-col gap-3">
          <button
            className={`w-full py-2 rounded-md font-medium transition ${
              selectedMethod === "transfer" ? "bg-primary-color/80 text-white" : "bg-gray-500 hover:bg-gray-400"
            }`}
            onClick={() => handleSelect("transfer")}
          >
            Transferencia Bancaria
          </button>
          <button
            className={`w-full py-2 rounded-md font-medium transition ${
              selectedMethod === "mercado_pago" ? "bg-primary-color/80 text-white" : "bg-gray-500 hover:bg-gray-400"
            }`}
            onClick={() => handleSelect("mercado_pago")}
          >
            Mercado Pago
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className={`px-4 py-2 rounded-md text-white ${
              selectedMethod ? "bg-primary-color/45 hover:bg-primary-color/60" : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleProceed}
            disabled={!selectedMethod || loading}
          >
            {loading ? "Cargando..." : "Continuar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;

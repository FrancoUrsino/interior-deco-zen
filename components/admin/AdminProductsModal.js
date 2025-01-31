import { useState } from "react";
import Input from "../ui/Input";

const AdminiProductsModal = ({ product, onClose, onUpdate }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onUpdate(editedProduct);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="backdrop-blur-lg p-5 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
        <Input label={"Nombre"} name={"name"} value={editedProduct.name} onChange={handleChange} className={"w-full "} />
        <Input label={"Descripción"} name={"description"} value={editedProduct.description} onChange={handleChange} className={"w-full "} />
        <Input label={"Categoría"} name={"category"} value={editedProduct.category} onChange={handleChange} className={"w-full "} />
        <Input label={"Precio"} type={"number"} name={"price"} value={editedProduct.price} onChange={handleChange} className={"w-full "} />
        <Input label={"Stock"} type={"number"} name={"stock"} value={editedProduct.stock} onChange={handleChange} className={"w-full "} />
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-gray-500 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-secondary-color/70 hover:bg-secondary-color text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminiProductsModal;

import { FaEdit } from "react-icons/fa";

const AdminProductsList = ({ products, onSaleChange, onEdit }) => {
  return (
    <ul className="space-y-4">
      {products.map((product) => (
        <li
          key={product.id}
          className="flex items-center justify-between bg-primary-color/50 p-4 rounded-lg shadow-md border"
        >
          <div className="flex items-center space-x-4">
            <img
              src={product.image1 || "https://placehold.co/600x400"}
              alt={product.name}
              className="w-14 h-14 object-cover rounded-lg"
            />
            <div>
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-md font-semibold">${product.price}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center accent-gray-500 space-x-2">
              <input type="checkbox"
                checked={product.onSale}
                onChange={() => onSaleChange(product.id, product.onSale)}
                className="w-5 h-5"
              />
              <span className="text-sm">En venta</span>
            </label>
            <button
              onClick={() => onEdit(product)}
              className="p-2 hover:bg-primary-color/50"
            >
              <FaEdit size={20} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AdminProductsList;

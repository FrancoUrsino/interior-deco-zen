'use client'
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/db/firebase";
import Input from "../ui/Input";

const AdminAddForm = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    stock: 0,
    image1: "",
    image2: "",
    onSale: false,
    product: "",
    type: "",
    place: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), product);
      alert("Producto agregado correctamente");
      setProduct({
        name: "",
        category: "",
        description: "",
        price: 0,
        stock: 0,
        image1: "",
        image2: "",
        onSale: false,
        product: "",
        type: "",
        place: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>
      <div className="grid grid-cols-2 gap-4">
        <Input name={'name'} value={product.name} onChange={handleChange} placeholder="Nombre" required={true} />
        <Input name={'category'} value={product.category} onChange={handleChange} placeholder="categoría" required={true} />
        <Input name={'description'} value={product.description} onChange={handleChange} placeholder="descripción" required={true} />
        <Input name={'product'} value={product.product} onChange={handleChange} placeholder="mueble/iluminacion/deco" required={true} />
        <Input name='price' type={"number"} value={product.price} onChange={handleChange} placeholder="precio" required={true} />
        <Input name='stock' type={"number"} value={product.stock} onChange={handleChange} placeholder="stock" required={true} />
        <Input name={'type'} value={product.type} onChange={handleChange} placeholder="tipo de producto" required={true} />
        <Input name={'place'} value={product.place} onChange={handleChange} placeholder="interior/exterior" required={true} />
        <Input name={'image1'} value={product.image1} onChange={handleChange} placeholder="imagen 1" required={true} />
        <Input name={'image2'} value={product.image2} onChange={handleChange} placeholder="imagen 2" required={true} />
      </div>
      <button
        type="submit"
        className="mt-4 p-2 bg-gray-500 text-white rounded"
      >
        Agregar Producto
      </button>
    </form>
  );
};

export default AdminAddForm;
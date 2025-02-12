'use client'
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/db/firebase";
import Input from "../ui/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    features: [{ measures: "" }, { weight: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleFeatureChange = (index, key, value) => {
    const updatedFeatures = [...product.features];
    updatedFeatures[index][key] = value;
    setProduct({ ...product, features: updatedFeatures });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), product);
      toast.success("Producto agregado correctamente", { position: "bottom-right" });
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
        features: [{ measures: "" }, { weight: "" }],
      });
    } catch (error) {
      toast.error("Error al agregar el producto", { position: "bottom-right" });
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>
      <div className="grid grid-cols-2 gap-4">
        <Input name="name" value={product.name} onChange={handleChange} placeholder="Nombre" required />
        <Input name="category" value={product.category} onChange={handleChange} placeholder="Categoría" required />
        <Input name="description" value={product.description} onChange={handleChange} placeholder="Descripción" required />
        <Input name="product" value={product.product} onChange={handleChange} placeholder="Mueble/Iluminación/Deco" required />
        <Input name="price" type="number" value={product.price} onChange={handleChange} placeholder="Precio" required />
        <Input name="stock" type="number" value={product.stock} onChange={handleChange} placeholder="Stock" required />
        <Input name="type" value={product.type} onChange={handleChange} placeholder="Tipo de producto" required />
        <Input name="place" value={product.place} onChange={handleChange} placeholder="Interior/Exterior" required />
        <Input name="image1" value={product.image1} onChange={handleChange} placeholder="Imagen 1: https://placehold.co/ || /assets/imagen " required />
        <Input name="image2" value={product.image2} onChange={handleChange} placeholder="Imagen 2: https://placehold.co/ || /assets/imagen" required />
        <Input name="measures" value={product.features[0].measures} onChange={(e) => handleFeatureChange(0, "measures", e.target.value)} placeholder="Medidas (Ej: 170cm x 6cm x 6cm)" required />
        <Input name="weight" value={product.features[1].weight} onChange={(e) => handleFeatureChange(1, "weight", e.target.value)} placeholder="Peso (Ej: 50w)" required />
      </div>
      <button type="submit" className="mt-4 p-2 bg-gray-500 text-white rounded">
        Agregar Producto
      </button>
      <ToastContainer />
    </form>
  );
};

export default AdminAddForm;

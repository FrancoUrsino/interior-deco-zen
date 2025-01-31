"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/db/firebase";
import AdminAddForm from "./AdminAddForm";
import LogoutButton from "../ui/LogoutButton";
import AdminProductsTable from "./AdminProductsTable";
import AdminProductsModal from "./AdminProductsModal";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };
    fetchProducts();
  }, []);

  const handleStockChange = async (id, newStock) => {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, { stock: newStock });
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p))
    );
  };

  const handleSaleStatusChange = async (id, onSale) => {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, { onSale: !onSale });
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, onSale: !onSale } : p))
    );
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    const productRef = doc(db, "products", updatedProduct.id);
    await updateDoc(productRef, updatedProduct);
    setEditingProduct(null);
    const querySnapshot = await getDocs(collection(db, "products"));
    setProducts(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <LogoutButton />
      </div>

      <AdminAddForm />

      <AdminProductsTable
        products={products}
        onStockChange={handleStockChange}
        onSaleChange={handleSaleStatusChange}
        onEdit={handleEditProduct}
      />

      {editingProduct && (
        <AdminProductsModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdate={handleUpdateProduct}
        />
      )}
    </div>
  );
};

export default AdminPanel;

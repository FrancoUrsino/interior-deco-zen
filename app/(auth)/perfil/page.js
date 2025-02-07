"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import OrderHistory from "@/components/OrdersHistory";
import Input from "@/components/ui/Input";
import LogoutButton from "@/components/ui/LogoutButton";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    dni: "",
    phone: "",
    address: "",
  });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setFormData({
        name: user.name || "",
        lastName: user.lastName || "",
        dni: user.dni || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      await updateUserProfile(formData);
      toast.success("Perfil actualizado exitosamente");
    } catch (error) {
      toast.error("Error al actualizar el perfil");
    } finally {
      setUpdating(false);
    }
  };
  

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <div className="font-raleway">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Mi Perfil</h1>
            <LogoutButton />
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Input label="Nombre" type="text" name="name" value={formData.name} onChange={handleChange} />
              <Input label="Apellido" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
              <Input label="DNI" type="text" name="dni" value={formData.dni} onChange={handleChange} />
              <Input label="Teléfono" type="tel" name="phone" value={formData.phone} onChange={handleChange} />
              <Input label="Dirección" type="text" name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={updating}
                className={`bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                  updating ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {updating ? "Actualizando..." : "Actualizar perfil"}
              </button>
            </div>
          </form>
          <OrderHistory orders={user?.orders} />
        </div>
      </div>
    </div>
  );
}

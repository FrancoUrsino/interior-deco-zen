"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-md bg-primary-color hover:bg-primary-color/50"
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;

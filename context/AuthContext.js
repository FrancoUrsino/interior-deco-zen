"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc, collection, addDoc, getDocs } from "firebase/firestore";
import { auth, db } from "@/db/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      try {
        if (authUser) {
          const userDoc = await getDoc(doc(db, "users", authUser.uid));
          if (userDoc.exists()) {
            setUser({ ...authUser, ...userDoc.data() });
          } else {
            setUser(authUser);
          }
          setIsAdmin(authUser.email === "interioradmin@gmail.com");
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
        setUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const register = async (email, password, userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      await setDoc(doc(db, "users", newUser.uid), {
        ...userData,
        email,
        createdAt: new Date().toISOString(),
      });

      setUser({ ...newUser, ...userData });
      return newUser;
    } catch (error) {
      console.error("Error en registro:", error);
      throw error;
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateUserProfile = async (updatedData) => {
    try {
      if (!user || !user.uid) throw new Error("Usuario no autenticado");
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, updatedData, { merge: true });
      setUser((prev) => ({ ...prev, ...updatedData }));
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      throw error;
    }
  };  

  const addOrder = async (order) => {
    try {
      if (!user || !user.uid) throw new Error("Usuario no autenticado");

      if (!Array.isArray(order.items) || order.items.length === 0) {
        throw new Error("La orden no contiene items válidos.");
      }

      const subtotal = order.items.reduce((sum, product) => {
        const price = parseFloat(product.price);
        const quantity = product.quantity || 1;
        return sum + (price * quantity);
      }, 0);

      const service = subtotal * 0.09;
      const shippingCost = subtotal >= 250000 ? 0 : 20000;
      const total = subtotal + service + shippingCost;
      const ordersRef = collection(db, "users", user.uid, "orders");
      const newOrder = await addDoc(ordersRef, {
        ...order,
        userId: user.uid,
        total,
        createdAt: new Date().toISOString(),
      });
      return newOrder.id;
    } catch (error) {
      console.error("Error al agregar orden:", error);
      throw error;
    }
  };

  const getOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      if (!response.ok) throw new Error("Error al obtener órdenes");
      const orders = await response.json();

      return orders.filter(order => order.userId === user?.id && order.status === "approved");
    } catch (error) {
      console.error("Error obteniendo órdenes:", error);
      return [];
    }
  };
  
  const value = {
    user,
    loading,
    isAdmin,
    register,
    login,
    logout,
    updateUserProfile,
    addOrder,
    getOrders,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Hubo un error con el AuthProvider");
  }
  return context;
}

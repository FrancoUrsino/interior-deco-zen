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

      console.log("Subtotal:", subtotal);
      console.log("Servicio (9%):", service);
      console.log("Costo de envío:", shippingCost);
      console.log("Total calculado:", total);

      const ordersRef = collection(db, "users", user.uid, "orders");
      const newOrder = await addDoc(ordersRef, {
        ...order,
        total,
        createdAt: new Date().toISOString(),
      });

      console.log("Orden guardada con éxito:", newOrder.id);
      return newOrder.id;
    } catch (error) {
      console.error("Error al agregar orden:", error);
      throw error;
    }
  };

  const getOrders = async () => {
    try {
      if (!user || !user.uid) return [];

      const ordersRef = collection(db, "users", user.uid, "orders");
      const querySnapshot = await getDocs(ordersRef);

      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

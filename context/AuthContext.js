"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
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

  const value = {
    user,
    loading,
    isAdmin,
    register,
    login,
    logout,
    updateUserProfile,
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

'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { auth, db, storage } from '@/db/firebase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      try {
        if (authUser) {
          const userDoc = await getDoc(doc(db, 'users', authUser.uid))
          if (userDoc.exists()) {
            setUser({ ...authUser, ...userDoc.data() })
          } else {
            setUser(authUser)
          }
          setIsAdmin(authUser.email === 'interioradmin@gmail.com')
        } else {
          setUser(null)
          setIsAdmin(false)
        }
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error)
        setUser(null)
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  const register = async (email, password, userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const newUser = userCredential.user

      await setDoc(doc(db, 'users', newUser.uid), {
        ...userData,
        email,
        createdAt: new Date().toISOString(),
        orders: [],
      })

      setUser({ ...newUser, ...userData })
      return newUser
    } catch (error) {
      console.error('Error en registro:', error)
      throw error
    }
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const updateUserProfile = async (updatedData, photoFile = null) => {
    try {
      const userDocRef = doc(db, 'users', user.uid)

      let photoURL = user.photoURL
      if (photoFile) {
        const storageRef = ref(storage, `profilePictures/${user.uid}`)
        await uploadBytes(storageRef, photoFile)
        photoURL = await getDownloadURL(storageRef)
      }
      
      await setDoc(userDocRef, { ...updatedData, photoURL }, { merge: true })

      setUser((prev) => ({
        ...prev,
        ...updatedData,
        photoURL,
      }))
    } catch (error) {
      console.error('Error al actualizar el perfil:', error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    isAdmin,
    register,
    login,
    logout,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

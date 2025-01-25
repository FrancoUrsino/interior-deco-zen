'use client'

import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/db/firebase"
import Sidebar from "@/components/Sidebar"

const getUniqueCategories = (products = [], productType) => {
  const filteredProducts = products.filter((p) => p.product === productType)
  return Array.from(new Set(filteredProducts.map((p) => p.category)))
}

function IluminacionLayout({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const productType = "iluminacion"

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"))
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setProducts(productsList)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAndSetProducts()
  }, [])

  const categories = getUniqueCategories(products, productType)

  if (loading) {
    return <p className="text-center text-gray-400">Cargando productos...</p>
  }

  return (
    <div className="min-h-screen text-white">
      <div className="flex">
        <Sidebar categories={categories || []} product={productType} />
        <div className="w-full min-h-screen">{children}</div>
      </div>
    </div>
  )
}

export default IluminacionLayout
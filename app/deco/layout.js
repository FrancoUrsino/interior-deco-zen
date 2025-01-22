import products from "@/db/products.json"
import Sidebar from "@/components/Sidebar"

// Obtener categorías únicas de los productos de decoración
const getUniqueCategories = () => {
  const decoProducts = products.products.filter((p) => p.product === "deco")
  return Array.from(new Set(decoProducts.map((p) => p.category)))
}

export default function DecoLayout({ children }) {
  const productType = "muebles"
  const categories = getUniqueCategories()

  return (
    <div className="min-h-screen text-white">
      <div className="flex">
        <Sidebar categories={categories} product={productType} />
        <div className="w-full min-h-screen">{children}</div>
      </div>
    </div>
  )
}
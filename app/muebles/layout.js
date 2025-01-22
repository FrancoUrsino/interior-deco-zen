import products from "@/db/products.json"
import Sidebar from "@/components/Sidebar"

const getUniqueCategories = (productType) => {
  const filteredProducts = products.products.filter((p) => p.product === productType)
  return Array.from(new Set(filteredProducts.map((p) => p.category)))
}

export default function DecoLayout({ children }) {
  const productType = "muebles"
  const categories = getUniqueCategories(productType)

  return (
    <div className="min-h-screen text-white">
      <div className="flex">
        <Sidebar categories={categories} product={productType} />
        <div className="w-full min-h-screen">{children}</div>
      </div>
    </div>
  )
}

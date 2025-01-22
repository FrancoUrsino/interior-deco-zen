import Banner from "@/components/ui/Banner"
import Card from "@/components/ui/Card"
import products from "@/db/products.json"

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function CategoryPage({ params }) {
  await delay(1500)
  const { category } = params
  const categoryProducts = products.products.filter((p) => p.product === "muebles" && p.category === category)

  return (
    <>
      <Banner imageSrc="/assets/mueblesBanner.jpg" title={category.charAt(0).toUpperCase() + category.slice(1)} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product) => (
            <Card key={product.id} {...product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No hay productos disponibles en esta categoría.</p>
        )}
      </div>
    </>
  )
}

import Banner from "@/components/ui/Banner"
import { getProducts } from "@/actions/GetProducts"
import ItemList from "@/components/ItemList"

async function IluminacionCategoryPage({ params }) {

  const { category } = await params
  const { payload: products } = await getProducts(category)

  return (
    <>
      <Banner imageSrc="/assets/mueblesBanner.jpg" title={category} />
      <ItemList productos={products} />
    </>
  )
}

export default IluminacionCategoryPage
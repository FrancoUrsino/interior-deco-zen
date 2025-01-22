import { Suspense } from "react"
import ItemList from "./ItemList"
import Banner from "./ui/Banner"

function ItemListContainer({ category }) {
  return (
    <div className="w-full">
      <Banner imageSrc="/assets/mueblesBanner.jpg" title={category} />
      <Suspense>
        <ItemList category={category} />
      </Suspense>
    </div>
  )
}

export default ItemListContainer
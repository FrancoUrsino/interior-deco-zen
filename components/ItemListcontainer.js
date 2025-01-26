import React, { Suspense } from "react";
import ItemList from "./ItemList";
import Banner from "./ui/Banner";
import { getProducts } from "@/actions/GetProducts";
import Loading from "./ui/Loading";

async function ItemListContainer({ categoryOfProducts }) {
  const { payload: allProducts } = await getProducts();

  const filteredProducts = allProducts.filter(
    (product) => product.product === categoryOfProducts
  );

  return (
    <div className="w-full">
      <Banner
        imageSrc={`/assets/${categoryOfProducts}Banner.jpg`}
        title={categoryOfProducts}
      />
      <ItemList productos={filteredProducts} categoryOfProducts={categoryOfProducts} />
    </div>
  );
}

function ItemListContainerWrapper(props) {
  return (
    <Suspense fallback={<Loading />}>
      <ItemListContainer {...props} />
    </Suspense>
  );
}


export default ItemListContainerWrapper
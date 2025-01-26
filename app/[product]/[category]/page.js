import Banner from "@/components/ui/Banner";
import { getProducts } from "@/actions/GetProducts";
import ItemList from "@/components/ItemList";

async function ProductCategoryPage({ params }) {
  const { product, category } = await params;
  const { payload: products } = await getProducts(category);

  return (
    <>
      <Banner imageSrc={`/assets/${product}Banner.jpg`} title={`${category}`} />
      <ItemList productos={products} />
    </>
  );
}

export default ProductCategoryPage;
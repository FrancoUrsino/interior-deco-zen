import { notFound } from "next/navigation";
import ItemListContainer from "@/components/ItemListcontainer";
import { getProducts } from "@/actions/GetProducts";


export const metadata = {
  title: "Interior Deco Zen - Productos"
}

const ProductPage = async ({ params }) => {
  const { product } = await params;
  const { payload: products, error } = await getProducts(product);

  if (error || !products) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold text-center  capitalize">
        {product}
      </h1>
      <ItemListContainer categoryOfProducts={product} product={product} />
    </div>
  );
};

export default ProductPage;

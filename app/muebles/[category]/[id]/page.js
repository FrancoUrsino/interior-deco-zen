import { notFound } from "next/navigation";
import ItemDetailHeader from "@/components/ItemDetailHeader";
import ItemDetailMain from "@/components/ItemDetailMain";
import ItemDetailDetails from "@/components/ItemDetailDetails";
import { GetProductsById } from "@/actions/GetProductById";

const MueblesIdPage = async ({ params }) => {
  const { id } = params;
  const product = await GetProductsById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen text-white">
      <ItemDetailHeader category="muebles" />
      <ItemDetailMain imageSrc={product.image1} name={product.name} type={product.type}
      />
      <ItemDetailDetails product={product} />
    </div>
  );
};

export default MueblesIdPage;

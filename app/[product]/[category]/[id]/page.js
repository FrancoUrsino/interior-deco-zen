import { notFound } from "next/navigation";
import ItemDetailHeader from "@/components/ItemDetails/ItemDetailHeader";
import ItemDetailMain from "@/components/ItemDetails/ItemDetailMain";
import ItemDetailDetails from "@/components/ItemDetails/ItemDetailDetails";
import { GetProductsById } from "@/actions/GetProductById";

const ProductIdPage = async ({ params }) => {
  const { product, id } = await params; // Obtenemos 'product' (categoría) e 'id' del parámetro dinámico
  const item = await GetProductsById(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen text-white">
      <ItemDetailHeader category={product} /> {/* Pasamos la categoría dinámica */}
      <ItemDetailMain 
        imageSrc={item.image1} 
        name={item.name} 
        type={item.type} 
      />
      <ItemDetailDetails product={item} />
    </div>
  );
};

export default ProductIdPage;

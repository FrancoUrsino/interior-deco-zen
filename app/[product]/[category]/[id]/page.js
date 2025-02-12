import { notFound } from "next/navigation";
import ItemDetailHeader from "@/components/ItemDetails/ItemDetailHeader";
import ItemDetailMain from "@/components/ItemDetails/ItemDetailMain";
import ItemDetailDetails from "@/components/ItemDetails/ItemDetailDetails";
import GetProductsFromServer from "@/actions/GetProductsFromServer";
import { GetProductsByIdFromServer } from "@/actions/GetProductsByIdFromServer";


export const generateStaticParams = async () => {
  const params = await GetProductsFromServer();
  return params;
};

export const generateMetadata = async({params}) =>{
  const {id} = await params
  const {payload: producto} = await GetProductsByIdFromServer(id)

  return{
    title: producto.name
  }
}

const ProductIdPage = async ({ params }) => {
  const { id } = await params;

  const itemResponse = await GetProductsByIdFromServer(id);

  const item = itemResponse?.payload;

  if (!item) {
    console.warn(`Producto con id ${id} no encontrado.`);
    notFound();
  }

  return (
    <div className="min-h-screen text-white">
      <ItemDetailHeader category={item.product} />
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

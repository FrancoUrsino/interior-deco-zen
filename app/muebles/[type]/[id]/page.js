import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const products = [
  { id: 1, name: "Novu", type: "SILLA DE COMEDOR", description: "Silla Nuvola. Fabricada en madera de guindo. Tapizada en género rústico.", features: ["Medidas: 58 cm x 59 cm x 59 cm", "Peso: 8kg"], materials: ["Madera de guindo", "Seda egipcia"], images: ["/assets/sillaNovu.png", "/assets/sillaNovu2.png"], price: 79999 },
  { id: 2, name: "Panamá", type: "MESA DE COMEDOR", description: "Mesa de comedor Trish. Con base fabricada en acero pulido y tapa en Dekton", features: ["Medidas: 220 cm x 110 cm x 76 cm", "Peso: 35kg"], materials: ["Acero inoxidable", "Dekton"], images: ["/assets/mesa.png", "/assets/mesa2.png"], price: 570000 },
  { id: 3, name: "Mege", type: "SILLÓN", description: "Sillón dos cuerpos Mege. Fabricado íntegramente en madera. Enchapado en cerezo reconstituido, lustrado natural con OSMO. Tapizado en lino. Este producto forma parte de la colección G", features: ["Medidas: 180 cm x 106 cm x 65 cm", "Peso: 90kg"], materials: ["Madera", "Terciopelo premium"], images: ["/assets/sillonMege.png", "/assets/sillonMege2.png"], price: 449000 },
  { id: 10, name: "Novu", type: "SILLA DE COMEDOR", description: "Silla Nuvola. Fabricada en madera de guindo. Tapizada en género rústico.", features: ["Medidas: 58 cm x 59 cm x 59 cm", "Peso: 8kg"], materials: ["Madera de guindo", "Seda egipcia"], images: ["/assets/sillaNovu.png", "/assets/sillaNovu2.png"], price: 79999 },
  { id: 20, name: "Panamá", type: "MESA DE COMEDOR", description: "Mesa de comedor Trish. Con base fabricada en acero pulido y tapa en Dekton", features: ["Medidas: 220 cm x 110 cm x 76 cm", "Peso: 35kg"], materials: ["Acero inoxidable", "Dekton"], images: ["/assets/mesa.png", "/assets/mesa2.png"], price: 570000 },
  { id: 0, name: "Mege", type: "SILLÓN", description: "Sillón dos cuerpos Mege. Fabricado íntegramente en madera. Enchapado en cerezo reconstituido, lustrado natural con OSMO. Tapizado en lino. Este producto forma parte de la colección G", features: ["Medidas: 180 cm x 106 cm x 65 cm", "Peso: 90kg"], materials: ["Madera", "Terciopelo premium"], images: ["/assets/sillonMege.png", "/assets/sillonMege2.png"], price: 449000 },
];

const getProduct = async (id) => {
  return products.find((product) => product.id === Number(id));
};

const ProductDetail = async ({ params }) => {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    throw notFound();
  }

  return (
    <div className="min-h-screen text-white ">

      <div className="flex flex-col gap-2 mt-20 mb-8">
        <Link href="/muebles" className="inline-flex text-2xl items-center gap-2 text-gray-600 hover:text-gray-400">
          <IoIosArrowRoundBack className="w-6 h-6" />
          <span>Volver a Muebles</span>
        </Link>
      </div>

      <div className="pt-10 relative w-full h-5/6">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={1000}
          height={1200}
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center xl:translate-x-[200px] 2xl:translate-x-[400px]">
          <h1 className="font-semibold font-raleway mb-4 text-4xl md:text-5xl xl:text-8xl ">
            {product.name}
          </h1>
          <p className="text-xl">{product.type}</p>
        </div>
      </div>

      <div className="max-w-7xl m-auto px-8 py-4">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="relative pb-96 overflow-hidden">
              <Image src={product.images[1]} alt={product.name} objectFit="cover" width={1000} height={700} className="absolute top-0 left-0 w-full h-full object-contain" />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-bold">Descripción</h2>
              <p className="text-gray-400 leading-relaxed">{product.description}</p>
            </div>
            <div>
              <h2 className="text-lg font-bold">Características</h2>
              <ul className="p-0 text-gray-400">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex align-middle my-1">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-base font-bold pb-2">Materiales</h2>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material, index) => (
                  <span key={index} className="p-2 bg-[#333333] rounded-2xl text-sm text-center">
                    {material}
                  </span>
                ))}
              </div>
              <p className="text-xl font-raleway font-semibold ">Precio ${product.price}</p>
            </div>
            <button className="flex mx-auto md:mx-0 w-96 md:w-56 justify-center p-4 bg-[#333333] rounded-lg text-white font-semibold cursor-pointer">Agregar al Carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;


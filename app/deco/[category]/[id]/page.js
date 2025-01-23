import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { CartButton } from "@/components/ui/CartButton";
import { products } from "@/db/products.json";

const getProduct = (id) => {
  return products.find((product) => product.id === Number(id));
};

const ProductDetail = async ({ params }) => {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    throw notFound();
  }

  return (
    <div className="min-h-screen text-white">
      <div className="flex flex-col gap-2 mt-20 mb-8">
        <Link href="/deco" className="inline-flex text-2xl items-center gap-2 text-gray-600 hover:text-gray-400">
          <IoIosArrowRoundBack className="w-6 h-6" />
          <span>Volver a Deco</span>
        </Link>
      </div>
      <div className="pt-10 relative w-full h-5/6">
        <Image
          src={product.image1 || "/placeholder.svg"}
          alt={product.name}
          width={1000}
          height={1200}
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center xl:translate-x-[200px] 2xl:translate-x-[400px]">
          <h1 className="font-semibold font-raleway mb-4 text-4xl md:text-5xl xl:text-8xl">
            {product.name}
          </h1>
          <p className="text-xl">{product.type}</p>
        </div>
      </div>
      <div className="max-w-7xl m-auto px-8 py-4">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="relative pb-96 overflow-hidden">
              <Image
                src={product.image2 || "/placeholder.svg"}
                alt={product.name}
                width={1000}
                height={700}
                className="absolute top-0 left-0 w-full h-full object-contain"
              />
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
                    {feature.measures}
                    {feature.weight}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xl font-raleway font-semibold">Precio ${product.price}</p>
            <CartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

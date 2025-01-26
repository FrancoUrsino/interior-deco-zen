import Image from "next/image";
import { CartButton } from "@/components/ui/CartButton";

const ItemDetailDetails = ({ product }) => {
  return (
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
                  {feature.measures} {feature.weight}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xl font-raleway font-semibold">Precio ${product.price}</p>
          <CartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ItemDetailDetails;

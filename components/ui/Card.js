import React from "react";
import Image from "next/image";

import { IoIosArrowRoundForward } from "react-icons/io";
import Button from "./Button";

const Card = ({ product }) => {
  return (
    <div>
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={300}
        className="object-cover rounded-lg"
      />
      <div className="font-IBM_Plex_Serif text-center">
        <h3 className="font-medium text-2xl lg:text-4xl">{product.name}</h3>
        <div>
          <p className="text-sm text-gray-500 my-2">
            {product.type} - {product.category} - {product.place}
          </p>
        </div>
        <Button
          text="Ver Detalles"
          href={`/muebles/${product.category}/${product.id}`}
          className="flex justify-center items-center gap-2 px-4 py-2 text-base font-semibold transition duration-300"
          icon={IoIosArrowRoundForward}
        />
      </div>
    </div>
  );
};

export default Card;

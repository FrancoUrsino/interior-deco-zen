import React from "react";
import Image from "next/image";

import { IoIosArrowRoundForward } from "react-icons/io";
import Button from "./Button";

const Card = ({ image1, name, type, category, place, id, product }) => {
  return (
    <div>
      <Image
        src={image1}
        alt={name}
        width={500}
        height={200}
        className=" aspect-11/16 rounded-lg w-60 h-36 mx-auto"
      />
      <div className="font-IBM_Plex_Serif text-center">
        <h3 className="font-medium text-2xl lg:text-4xl">{name}</h3>
        <div>
          <p className="text-sm text-gray-500 my-2">
            {type} - {category} - {place}
          </p>
        </div>
        <Button
          text="Ver Detalles"
          href={`/${product}/${category}/${id}`}
          className="flex justify-center items-center gap-2 px-4 py-2 text-base font-semibold transition duration-300"
          icon={IoIosArrowRoundForward}
        />
      </div>
    </div>
  );
};

export default Card;

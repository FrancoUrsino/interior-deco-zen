import React from "react";
import Image from "next/image";

const ItemDetailMain = ({ imageSrc, name, type }) => {
  return (
    <div className="pt-10 relative w-full h-5/6">
      <Image
        src={imageSrc || "/placehold.co/600x400/orange/white"}
        alt={name}
        width={500}
        height={300}
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center xl:translate-x-[200px] 2xl:translate-x-[400px]">
        <h1 className="font-semibold font-raleway mb-4 text-4xl md:text-5xl xl:text-8xl mix-blend-difference">
          {name}
        </h1>
        <p className="text-xl mix-blend-difference">{type}</p>
      </div>
    </div>
  );
};

export default ItemDetailMain 

import React from "react";
import Image from "next/image";

function Banner({ imageSrc, title }) {
  return (
      <div className="relative h-[300px] mb-8">
        <Image
          src={imageSrc}
          alt="Products banner"
          fill
          className="object-cover opacity-50 object-center"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="font-shadows-into-light text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-widest">
            {title}
          </h2>
        </div>
      </div>
  );
}

export default Banner;


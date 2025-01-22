import React from "react";
import Button from "../ui/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import Image from "next/image";
import dormitorio from '@/public/assets/dormitorio.jpg';

function HeaderSection() {
  return (
    <>
      <div className="relative min-h-screen flex items-center">
        <Image
          src={dormitorio}
          alt="Fondo del hero"
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="container mx-auto px-6 z-10 relative">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-4xl md:text-6xl font-light leading-tight">Redefinimos el concepto de Hogar</h1>
            <p className="text-lg md:text-xl max-w-2xl">Un <span className="font-medium">hogar</span> es mucho más que un espacio físico. Es una extensión de nuestra personalidad, un refugio de nuestros valores y una manifestación de los sueños que podamos tener.</p>
            <Button
              text="Contactanos"
              href="#contacto"
              className="inline-flex py-2 px-6 border border-white hover:bg-white hover:text-black transition-colors uppercase tracking-wider"
              icon={IoIosArrowRoundForward}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderSection;

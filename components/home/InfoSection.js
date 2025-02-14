import Image from "next/image";
import { BsStars } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { IoIosArrowRoundForward } from "react-icons/io";
import living from "@/public/assets/living.jpg";
import reposera from "@/public/assets/reposera.jpg";
import sofa from '@/public/assets/sofaEscandinavo.webp'
import dormitorio from "@/public/assets/dormitorio.jpg";
import comedor from "@/public/assets/comedor.jpg";
import Button from "../ui/Button";

const InfoSection = () => {
  return (
    <div className="container mx-auto p-4 font-raleway">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-11xl mx-auto">
        <div className="relative col-span-full lg:col-span-2 row-span-2 overflow-hidden group bg-white shadow-md rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
          <Image
            src={living}
            alt="Living moderno en tendencia"
            width={800}
            height={800}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
            placeholder="blur"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-white/90 text-black hover:bg-white/75">
              Tendencias 2025
            </span>
            <h2 className="text-3xl font-bold text-white mb-1">Salas de Estar Modernas</h2>
            <p className="text-white/90 mb-4 max-w-lg">
              Diseños contemporáneos que combinan comodidad y estilo para tu espacio más importante.
            </p>
            <Button text="Explorar Colección" href="/muebles" className="inline-flex items-center gap-2 px-4 py-2 text-base font-semibold rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition duration-300" icon={IoIosArrowRoundForward} />
          </div>
        </div>
        <div className="relative col-span-full md:col-span-2 lg:col-span-2 overflow-hidden group bg-white shadow-md rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <Image
            src={reposera}
            alt="Reposera de Pileta"
            width={800}
            height={400}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
            placeholder="blur"
          />
          <div className="absolute top-4 left-4 z-20 bg-red-500 text-white px-3 py-1 text-sm font-semibold rounded-full">
            Oferta Especial
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <h3 className="text-xl font-bold text-white mb-2">Reposera Strew</h3>
            <p className="text-white/90 mb-4">Diseño moderno para exteriores.</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">$195000</span>
              <span className="text-lg line-through text-white/70">$250000</span>
              <Button text="ver producto" href="/muebles/exterior/q4pCwvA1avqfvnfui4Gm" />
            </div>
          </div>
        </div>
        <div className="col-span-1 p-6 bg-gray-500 text-white rounded-lg shadow-md">
          <div className="flex flex-col h-full justify-between">
            <BsStars className="w-8 h-8 mb-4 text-primary-color" />
            <h3 className="text-xl font-bold mb-2 text-primary-color">Asesoría de Diseño</h3>
            <p className="mb-4 text-primary-color">Servicio personalizado de decoración.</p>
            <Button text="Contactanos Ahora" href="/contacto" className="ml-0 w-48 px-4 py-2 text-base font-semibold rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition duration-300" />
          </div>
        </div>
        <div className="col-span-1 p-6 bg-gray-300 rounded-lg shadow-md">
          <div className="flex flex-col h-full justify-between">
            <CiClock2 className="w-8 h-8 mb-4 text-primary-color" />
            <h3 className="text-xl font-bold mb-2 text-gray-600">Entrega a Todo el País</h3>
            <p className="text-gray-600">Compras mayores a $250000 son sin cargo.</p>
          </div>
        </div>
        <div className="relative col-span-1 md:col-span-1 overflow-hidden group bg-white rounded-lg shadow-md">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <Image
            src={dormitorio}
            alt="Dormitorio"
            width={400}
            height={400}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-lg font-semibold text-white">Dormitorios</h3>
            <p className="text-white/90 text-sm">Descubre el confort.</p>
          </div>
        </div>
        <div className="relative col-span-1 md:col-span-1 overflow-hidden group bg-white rounded-lg shadow-md">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <Image
            src={comedor}
            alt="Comedor"
            width={400}
            height={400}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            placeholder="blur"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-lg font-semibold text-white">Comedores</h3>
            <p className="text-white/90 text-sm">Espacios para compartir.</p>
          </div>
        </div>
        <div className="col-span-full md:col-span-2 p-6 bg-muted rounded-lg shadow-md bg-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 text-primary-color">Decoración & Accesorios</h3>
              <p className="text-muted-foreground mb-4 w-1/2 text-primary-color">Pequeños detalles que marcan la diferencia en tu hogar</p>
              <Button text="Ver Colección" href="/deco" className="w-44 inline-flex items-center gap-2 px-4 py-2 text-base font-semibold rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition duration-300" icon={IoIosArrowRoundForward} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Image
                src={living}
                alt="Decoración 1"
                width={100}
                height={100}
                className="rounded-lg"
                placeholder="blur"
              />
              <Image
                src={sofa}
                alt="Decoración 2"
                width={100}
                height={100}
                className="rounded-lg"
                placeholder="blur"
              />
              <Image
                src={dormitorio}
                alt="Decoración 3"
                width={100}
                height={100}
                className="rounded-lg"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;

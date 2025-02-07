import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t-2 border-gray-600 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h2 className="text-2xl font-bold">INTERIOR DECO ZEN</h2>
          <p className="text-gray-400 mt-2">Diseños sencillos y elegantes que crean ambientes tranquilos, perfectos para tu hogar moderno y sereno</p>
          <p className="text-gray-400 mt-2">Calle Falsa 123, BSAS, Argentina</p>
          <p className="text-gray-400">+54 01122-3344</p>
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-semibold">Páginas</h3>
          <ul className="mt-2 space-y-2">
            <li><Link href="/muebles" className="text-gray-400 hover:text-white">Muebles</Link></li>
            <li><Link href="/iluminacion" className="text-gray-400 hover:text-white">Iluminacion</Link></li>
            <li><Link href="/deco" className="text-gray-400 hover:text-white">Deco</Link></li>
            <li><Link href="/contacto" className="text-gray-400 hover:text-white">Contacto</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Interior deco zen.</p>
      </div>
    </footer>
  );
}

export default Footer
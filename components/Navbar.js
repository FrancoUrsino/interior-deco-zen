'use client'
import React, { useEffect, useState } from 'react';
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { GoPerson } from "react-icons/go";
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/assets/logo.png';


function Navbar() {
  const [nav, setNav] = useState(false);
  const [navbar, setNavbar] = useState(false);

  const scrollNavbar = () => {
    if (window.scrollY >= 20) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollNavbar);
    return () => {
      window.removeEventListener('scroll', scrollNavbar);
    };
  }, []);

  return (
    <nav className={nav ? 'fixed top-0 w-full bg-black/20 max-h-96 backdrop-blur-lg rounded-b-3xl z-50' : 'fixed bg-black top-0 rounded-b-3xl w-full max-h-96 z-50'}>
      <div className="justify-between px-1 mx-auto lg:w-11/12 md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between w-11/12 py-2 mx-auto md:block">
            <Link href="/"><Image src={logo} width={50} height={50} alt='Logo' /></Link>
            <div className="md:hidden">
              <button className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border" onClick={() => setNavbar(!navbar)}>
                {navbar ? (
                  <RiCloseLine className='text-white' />
                ) : (
                  <RiMenu3Line className='text-white' />
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className={`flex-1 justify-self-center pb-3 mt-4 md:block md:pb-0 md:mt-0 ${navbar ? 'py-2 px-10 md:p-0 block' : 'hidden'}`}>
            <ul className="h-screen md:h-auto items-center justify-center md:flex font-raleway">
              <li className="text-base md:text-sm md:px-4 lg:text-sm xl:px-2 lg:px-6 xl:text-xl text-white py-2 px-1 text-center border-b-2 md:border-b-0 hover:bg-700 border-primary-color md:hover:text-white hover:font-bold md:hover:bg-transparent">
                <Link href="/muebles" onClick={() => setNavbar(false)}>MUEBLES</Link>
              </li>
              <li className="text-base md:text-sm md:px-6 lg:text-lg lg:px-2 xl:text-xl text-white py-2 px-1 text-center border-b-2 md:border-b-0 border-primary-color md:hover:text-white hover:font-bold md:hover:bg-transparent">
                <Link href="/iluminacion" onClick={() => setNavbar(false)}>ILUMINACIÓN</Link>
              </li>
              <li className="text-base md:text-sm md:px-6 lg:text-lg lg:px-2 xl:text-xl text-white py-2 px-1 text-center border-b-2 md:border-b-0 border-primary-color md:hover:text-white hover:font-bold md:hover:bg-transparent">
                <Link href="/deco" onClick={() => setNavbar(false)}>DECO</Link>
              </li>
              <li className="text-base md:text-sm md:px-6 lg:text-lg lg:px-2 xl:text-xl text-white py-2 px-1 text-center border-b-2 md:border-b-0 border-primary-color md:hover:text-white hover:font-bold md:hover:bg-transparent">
                <Link href="/contacto" onClick={() => setNavbar(false)}>CONTACTANOS</Link>
              </li>
              <li className="text-base md:text-sm md:px-6 lg:text-sm xl:px-2 lg:px-6 xl:text-xl text-white py-2 px-1 flex align-middle justify-center border-b-2 md:border-b-0 border-primary-color hover:text-gray-400 md:hover:bg-transparent">
                <Link href="/perfil" onClick={() => setNavbar(false)}><GoPerson /></Link>
              </li>
              <li className="text-base md:text-sm md:px-6 lg:text-sm xl:px-2 lg:px-6 xl:text-xl text-white py-2 px-1 flex align-middle justify-center border-b-2 md:border-b-0 border-primary-color hover:text-gray-400 md:hover:bg-transparent">
                <Link href="/carrito" onClick={() => setNavbar(false)}><LiaShoppingBagSolid /></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { IoMdClose, IoIosMenu } from "react-icons/io"
import SidebarLoading from "./ui/SidebarLoading"

export default function Sidebar({ categories, product }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <Suspense fallback={<SidebarLoading/>} >
      <aside
        className={` md:sticky top-0 left-8 md:left-0 pt-20 h-screen bg-primary-color transition-all duration-300 ease-in-out z-40 ${isOpen ? "-translate-x-8 sticky" : "-translate-x-full absolute h-full"}
          md:translate-x-0 md:w-64 w-96 border-r border-zinc-800
      `}
      >
        <div className="p-6 pt-16 md:pt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Categorías</h2>
        <button
              className="text-white p-2 relative left-6 rounded-md md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
              {isOpen ? <IoMdClose size={24} /> : <IoIosMenu size={24} />}
        </button>
          </div>

          <div className="space-y-2">
            <Link
              href={`/${product}`}
              className="block px-4 py-2 rounded-md hover:bg-zinc-800 transition"
              onClick={() => window.innerWidth < 768 && setIsOpen(false)}
            >
              Todos
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/${product}/${category}`}
                className="block px-4 py-2 rounded-md hover:bg-zinc-800 transition"
                onClick={() => window.innerWidth < 768 && setIsOpen(false)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      </aside>
      </Suspense>
    </>
  )
}

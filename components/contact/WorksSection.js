"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import dormitorio from '@/public/assets/dormitorio.jpg'

function WorksSection() {
  const imageRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current || !contentRef.current) return

      const scrolled = window.scrollY
      const rate = scrolled * 0.1

      imageRef.current.style.transform = `translateY(-${rate}px)`
      contentRef.current.style.transform = `translateY(${rate}px)`
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-[600px] overflow-hidden">
      <div ref={imageRef} className="absolute inset-0 w-1/2">
        <Image
          src={dormitorio}
          alt="Imagen de proyectos realizados"
          layout="fill"
          objectFit="cover"
          priority={true}
          className="z-0"
        />
      </div>

      <div
        ref={contentRef}
        className="absolute right-0 top-0 bottom-44 w-1/2 h-[600px] bg-primary-color text-white flex flex-col justify-center items-start px-12 lg:px-24"
      >
        <div className="">
          <div className="space-y-20">
            <div className="">
              <div className="text-5xl lg:text-7xl font-light">+130</div>
              <div className="text-gray-400">hogares redefinidos</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-light lg:text-7xl">+5.000</div>
              <div className="text-gray-400">m2 transformados</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorksSection

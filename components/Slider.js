'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { IoIosArrowRoundForward } from "react-icons/io";
import Button from './ui/Button'
import '../app/globals.css'

const archiveItems = [
  { 
    id: 1,
    title: 'Silla Novu', 
    image: '/assets/sillaNovu.png', 
    hoverImage: '/assets/sillaNovu2.png',
    location: 'AR / UR', 
    category: 'Silla', 
    environment: 'Interior' 
  },
  { 
    id: 2,
    title: 'Mesa Panamá', 
    image: '/assets/mesa.png', 
    hoverImage: '/assets/mesa2.png',
    location: 'AR / UR', 
    category: 'Mesa', 
    environment: 'Exterior' 
  },
  { 
    id: 3,
    title: 'Sillón Mege', 
    image: '/assets/sillonMege.png', 
    hoverImage: '/assets/sillonMege2.png',
    location: 'AR / UR',
    category: 'Sillón', 
    environment: 'Interior' 
  },
  { 
    id: 4,
    title: 'Mesa Raki', 
    image: '/assets/mesaRaki.png', 
    hoverImage: '/assets/mesaRaki2.png',
    location: 'AR / UR',  
    category: 'Mesa', 
    environment: 'Ambos' 
  },
  { 
    title: 'Lampara Mayli', 
    image: '/assets/lamparaMayli.png', 
    hoverImage: '/assets/lamparaMayli2.png',
    location: 'AR / UR', 
    category: 'Lámpara', 
    environment: 'Interior' 
  },
  { 
    title: 'Tronco Mesh', 
    image: '/assets/decoMesh.png', 
    hoverImage: '/assets/decoMesh2.png',
    location: 'AR / UR', 
    category: 'Deco', 
    environment: 'Ambos' 
  },
  
]

export default function ArchiveSlider() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Pagination, Navigation]}
      breakpoints={{
        640: { slidesPerView: 2 },
        920: { slidesPerView: 3 },
        1240: { slidesPerView: 4 },
      }}
      className="w-full"
    >
      {archiveItems.map((item, index) => (
        <SwiperSlide key={index} className="pb-12">
          <HoverCard item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

const HoverCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="archive-items w-[320px] border border-[#595959] rounded-lg p-4 h-[400px] mx-auto transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image 
        src={isHovered ? item.hoverImage : item.image} 
        alt={item.title} 
        width={150}
        height={100}
        className="w-full h-56 object-cover rounded-lg mb-4 transition-all duration-300"
      />

      <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-3xl font-light text-[#595959] font-shadows-into-light mb-4'>
        {item.title}
      </h2>
      
      <div className="flex flex-wrap justify-center md:justify-around items-center w-full p-4 gap-4">
        <p className='uppercase text-xs md:text-sm text-[#595959]'>{item.location}</p>
        <p className='uppercase text-xs md:text-sm text-[#595959]'>{item.category}</p>
        <p className='uppercase text-xs md:text-sm text-[#595959]'>{item.environment}</p>
      </div>
      <Button text="Ver Detalles" href={`/muebles/${item.category}/${encodeURIComponent(item.id)}`} className="flex items-center justify-center align-middle font-raleway hover:text-gray-500 transition duration-200" icon={IoIosArrowRoundForward} />
    </div>
  )
}

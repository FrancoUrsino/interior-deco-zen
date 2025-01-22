'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { IoIosArrowRoundForward } from "react-icons/io";
import Button from '../ui/Button'
import '../../app/globals.css'
import { products } from '@/db/products.json'

export default function ArchiveSlider() {
  const [randomProducts, setRandomProducts] = useState([])

  useEffect(() => {
    const shuffled = products.sort(() => 0.5 - Math.random())
    setRandomProducts(shuffled.slice(0, 6))
  }, [])

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
      {randomProducts.map((item, index) => (
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
        src={isHovered ? item.image2 : item.image1} 
        alt={item.name} 
        width={150}
        height={100}
        className="w-full h-56 object-cover rounded-lg mb-4 transition-all duration-300"
      />

      <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-3xl font-light text-[#595959] font-shadows-into-light mb-4'>
        {item.name}
      </h2>
      
      <div className="flex flex-wrap justify-center md:justify-around items-center w-full p-4 gap-4">
        <p className='uppercase text-xs md:text-sm text-[#595959]'>{item.category}</p>
        <p className='uppercase text-xs md:text-sm text-[#595959]'>{item.place}</p>
      </div>
      <Button text="Ver Detalles" href={`/${item.product}/${item.category}/${encodeURIComponent(item.id)}`} className="flex items-center justify-center align-middle font-raleway hover:text-gray-500 transition duration-200" icon={IoIosArrowRoundForward} />
    </div>
  )
}

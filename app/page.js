import InfoSection from '@/components/home/InfoSection'
import ModelSection from '@/components/home/ModelSection'
import ArchiveSlider from '@/components/home/Slider'
import React from 'react'

function Page() {
  return (
    <>
      <section className='flex flex-col justify-center p-4 md:py-20 min-h-96 md:min-h-screen'>
        <div className='flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-12 lg:gap-48'>
          <h1 className='uppercase text-7xl  md:text-9xl lg:text-[160px] 2xl:text-[250px] font-normal leading-[0.85]'>Muebles de</h1>
        </div>
        <div className='flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-12 lg:gap-48'>
          <h1 className='uppercase text-7xl  md:text-9xl lg:text-[160px] 2xl:text-[250px] font-normal leading-[0.95]'>interior</h1>
          <p className='flex absolute top-[177px] left-80 text-end w-32 md:relative md:top-0 md:left-0 md:text-left md: md:text-sm md:w-1/3 lg:w-1/5 text-[10px] lg:text-base 2xl:text-xl lg:-left-24 font-normal leading-[0.9]'>Diseños sencillos y elegantes que crean ambientes tranquilos, perfectos para tu hogar moderno y sereno</p>
        </div>
        <div className='flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-12 lg:gap-48'>
          <h1 className='uppercase text-6xl  md:text-8xl lg:text-[130px] 2xl:text-[210px] font-normal leading-[0.85]'>Para el hogar</h1>
        </div>
      </section>

      <section className='flex flex-col justify-center items-center gap-8 md:gap-12 text-center min-h-96 lg:min-h-screen pb-12'>
        <div className="archive-header">
          <h2 className='lg:text-4xl font-raleway italic'>Productos destacados</h2>
        </div>
        <ArchiveSlider />
      </section>
        <ModelSection />
        <InfoSection />
    </>
  )
}

export default Page


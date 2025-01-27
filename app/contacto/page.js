export const metadata = {
  title: 'Interior Deco Zen - Contactanos',
};

import AboutSection from '@/components/contact/AboutSection';
import HeaderSection from '@/components/contact/HeaderSection';
import StepsSection from '@/components/contact/StepsSection';
import WorksSection from '@/components/contact/WorksSection';
import React from 'react'

function page() {
  return (
    <div className='font-raleway'>
      <HeaderSection />
      <AboutSection />
      <WorksSection />
      <StepsSection />
    </div>
  );
}

export default page
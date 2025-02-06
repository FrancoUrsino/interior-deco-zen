export const metadata = {
  title: 'Interior Deco Zen - Contactanos',
};

import AboutSection from '@/components/contact/AboutSection';
import ContactForm from '@/components/contact/ContactSection';
import HeaderSection from '@/components/contact/HeaderSection';
import StepsSection from '@/components/contact/StepsSection';
import WorksSection from '@/components/contact/WorksSection';

function page() {
  return (
    <div className='font-raleway'>
      <HeaderSection />
      <AboutSection />
      <WorksSection />
      <StepsSection />
      <ContactForm />
    </div>
  );
}

export default page
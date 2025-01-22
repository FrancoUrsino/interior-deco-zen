"use client";

import { useState } from "react";
import Image from "next/image";
import living from '@/public/assets/living.jpg'

function StepsSection() {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      title: "MEDICIÓN",
      description:
        "Comenzamos con una medición detallada del departamento, donde verificamos las dimensiones interiores y recopilamos toda la información necesaria para desarrollar un proyecto preciso.",
    },
    {
      title: "ANTEPROYECTO",
      description: "Desarrollamos un anteproyecto detallado basado en tus necesidades y preferencias.",
    },
    {
      title: "PRESUPUESTO",
      description: "Preparamos un presupuesto detallado y transparente para tu proyecto.",
    },
    {
      title: "CONFIRMACIÓN",
      description: "Una vez aprobado el presupuesto, procedemos con la confirmación del proyecto.",
    },
    {
      title: "EJECUCIÓN",
      description: "Iniciamos la transformación de tu espacio siguiendo el plan establecido.",
    },
  ];

  return (
    <section className="relative mt-40 py-24 max-w-7xl text-primary- min-h-screen">
      <div className="absolute inset-0">
        <Image
          src={living}
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="blur-sm scale-[0.99]"
          priority
        />
      </div>
    <div className="absolute inset-0 bg-gradient-to-tr from-black/70 to-transparent">
      <div className="relative top-32 container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-16 text-primary-color">
          Así transformamos hogares
        </h2>

        <div className="max-w-3xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <div key={step.title} className="border-b border-primary-color">
              <button
                onClick={() => setActiveStep(activeStep === index ? null : index)}
                className="w-full py-4 flex items-center justify-between  transition-colors"
              >
                <span className="text-lg font-light">{step.title}</span>
                <span className="text-2xl">{activeStep === index ? "−" : "+"}</span>
              </button>

              {activeStep === index && (
                <div className="pb-4 font-light">{step.description}</div>
              )}
            </div>
          ))}
        </div>

    </div>
      </div>
    </section>
  );
}

export default StepsSection;


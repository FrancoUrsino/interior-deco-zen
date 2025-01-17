const ResponsiveSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-8 w-11/12 mx-auto">
      <div className="mb-6 md:mb-0 md:w-1/2">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-500 mb-4">
          Explora el diseño 3D
        </h2>
        <p className="text-gray-200 text-sm md:text-base">
          Descubre este increíble modelo 3D del loft VR interactivo. Sumérgete en una experiencia única
          y explora cada detalle desde la comodidad de tu pantalla.
        </p>
      </div>
      {/* Componente de Sketchfab */}
      <div className="md:w-1/2 overflow-hidden justify-center items-center mx-auto">
        <div className="sketchfab-embed-wrapper">
          <iframe
            title="VR loft | Living room | Baked"
            className="w-full aspect-video rounded-lg shadow-lg"
            frameBorder="0"
            allowFullScreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allow="autoplay;"
            src="https://sketchfab.com/models/f3e6f16527af4465858a34cc1e9e7a2b/embed?autostart=1&transparent=1&ui_infos=0&ui_controls=0"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ResponsiveSection;

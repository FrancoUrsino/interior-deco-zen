// import ItemList from "./ItemList";
// import Banner from "./ui/Banner";
// import { getProducts } from "@/actions/GetProducts";

// async function ItemListContainer({ categoryOfProducts }) {
//   // Llamada a la función que obtiene todos los productos
//   const { payload: allProducts } = await getProducts(); // Obtiene todos los productos

//   // Filtrar los productos que coinciden con el valor de "product"
//   const filteredProducts = allProducts.filter(
//     (product) => product.product === categoryOfProducts
//   );

//   return (
//     <div className="w-full">
//       <Banner
//         imageSrc={`/assets/mueblesBanner.jpg`}
//         title={categoryOfProducts}
//       />
//       <ItemList productos={filteredProducts} categoryOfProducts={categoryOfProducts} />
//     </div>
//   );
// }

// export default ItemListContainer;

import ItemList from "./ItemList";
import Banner from "./ui/Banner";
import { getProducts } from "@/actions/GetProducts";

async function ItemListContainer({ categoryOfProducts }) {
  // Llamada a la función que obtiene los productos
  const { payload: allProducts, error, message } = await getProducts();

  // Validar si hay error o los productos no están disponibles
  if (error || !allProducts) {
    console.error("Error al obtener productos:", message);
    return (
      <div className="w-full text-center text-gray-500 mt-10">
        <p>No se pudieron cargar los productos. Por favor, inténtalo más tarde.</p>
      </div>
    );
  }

  // Filtrar los productos que coinciden con la categoría
  const filteredProducts = allProducts.filter(
    (product) => product.product === categoryOfProducts
  );

  return (
    <div className="w-full">
      <Banner
        imageSrc={`/assets/${categoryOfProducts}Banner.jpg`}
        title={categoryOfProducts}
      />
      <ItemList productos={filteredProducts} categoryOfProducts={categoryOfProducts} />
    </div>
  );
}

export default ItemListContainer;

import Card from "@/components/ui/Card";

function ItemList({ productos = [] }) {
  const productosOnSale = productos.filter(product => product.onSale);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {productosOnSale.length > 0 ? (
        productosOnSale.map((product) => <Card key={product.id} {...product} />)
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          No hay productos en oferta disponibles.
        </p>
      )}
    </div>
  );
}

export default ItemList;


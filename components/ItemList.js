import Card from "@/components/ui/Card";

function ItemList({ productos = []}) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {productos.length > 0 ? (
        productos.map((product) => <Card key={product.id} {...product} />)
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          No hay productos disponibles en esta categoría.
        </p>
      )}
    </div>
  );
}

export default ItemList;

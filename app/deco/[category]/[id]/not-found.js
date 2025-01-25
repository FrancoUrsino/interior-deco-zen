import Link from "next/link"

function NotFound() {
  return (
    <div className="text-center my-20">
      <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
      <p className="mb-4">Lo sentimos, el producto que buscas está agotado momentaneamente.</p>
      <Link href="/deco" className="hover:text-gray-400">Volver a todas las categorías</Link>
    </div>
  )
}

export default NotFound
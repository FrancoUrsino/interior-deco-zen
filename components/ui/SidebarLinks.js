import Link from "next/link";

function SidebarLinks({ categories, product }) {
  return (
    <div className="space-y-2">
      <Link href={`/${product}`} className="block px-4 py-2 rounded-md hover:bg-zinc-800 transition">
        Todos
      </Link>

      {categories.map((category) => (
        <Link key={category} href={`/${product}/${category}`} className="block px-4 py-2 rounded-md hover:bg-zinc-800 transition">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Link>
      ))}
    </div>
  );
}

export default SidebarLinks
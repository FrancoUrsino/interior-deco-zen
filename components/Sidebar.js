import SidebarLinks from "./ui/SidebarLinks";
import SidebarButton from "./ui/SidebarButton";
import { Suspense } from "react";
import SidebarLoading from "./ui/SidebarLoading";

function Sidebar({ categories, product }) {
  return (
    <Suspense fallback={<SidebarLoading />} >
      <aside className="sticky top-0 left-4 md:left-0 pt-20 h-screen bg-primary-color transition-all duration-300 ease-in-out z-40 md:translate-x-0 md:w-64 w-96 border-r border-zinc-800">
        <div className="p-6 pt-16 md:pt-6">
          <SidebarButton />
          <SidebarLinks categories={categories} product={product} />
        </div>
      </aside>
    </Suspense>
  );
}

export default Sidebar
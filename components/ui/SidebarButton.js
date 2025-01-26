"use client";

import { useState } from "react";
import { IoMdClose, IoIosMenu } from "react-icons/io"

function SidebarButton() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold">Categorías</h2>
      <button
        className="text-white p-2 relative left-6 rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ?  <IoMdClose size={24} /> : <IoIosMenu size={24} />}
      </button>
    </div>
  );
}

export default SidebarButton
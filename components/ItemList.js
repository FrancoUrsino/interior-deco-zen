// 'use client'
// import React, { useState } from 'react'
// import Banner from '@/components/ui/Banner'
// import Card from '@/components/ui/Card'
// import { products, categories, furnitureTypes } from '@/db/products.json'

// const ItemList = () => {
//   const [selectedCategories, setSelectedCategories] = useState([])
//   const [selectedTypes, setSelectedTypes] = useState([])

//   const handleFilterChange = ({ filter, setFilter, value }) => {
//     setFilter(prev =>
//       prev.includes(value)
//         ? prev.filter(item => item !== value)
//         : [...prev, value]
//     )
//   }

//   const filteredProducts = products
//     .filter(product => product.product === 'muebles')
//     .filter(({ category, type }) =>
//       (selectedCategories.length === 0 || selectedCategories.includes(category)) &&
//       (selectedTypes.length === 0 || selectedTypes.includes(type))
//     )

//   return (
//     <div className="min-h-screen">
//       <Banner imageSrc="/assets/mueblesBanner.jpg" title="MUEBLES" />
//       <div className="max-w-9xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div className="space-y-3 md:block flex flex-wrap md:gap-4">
//             <h3 className="text-lg font-semibold w-full">Categorías</h3>
//             {categories.map(category => {
//               const isSelected = selectedCategories.includes(category)
//               return (
//                 <div key={category} className="flex items-center mx-2 space-x-2">
//                   <input
//                     type="checkbox"
//                     className="h-4 w-4 accent-slate-500"
//                     checked={isSelected}
//                     onChange={() => handleFilterChange({
//                       filter: category,
//                       setFilter: setSelectedCategories,
//                       value: category
//                     })}
//                   />
//                   <label className="text-sm font-medium">{category}</label>
//                 </div>
//               )
//             })}
//             <h3 className="text-lg font-semibold w-full mt-4">Tipos de Mueble</h3>
//             {furnitureTypes.map(type => {
//               const isSelected = selectedTypes.includes(type)
//               return (
//                 <div key={type} className="flex items-center mx-2 space-x-2">
//                   <input
//                     type="checkbox"
//                     className="h-4 w-4"
//                     checked={isSelected}
//                     onChange={() => handleFilterChange({
//                       filter: type,
//                       setFilter: setSelectedTypes,
//                       value: type
//                     })}
//                   />
//                   <label className="text-sm font-medium">{type}</label>
//                 </div>
//               )
//             })}
//           </div>
//           <div className='md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
//             {filteredProducts.map(product => (
//               <Card key={product.id} {...product} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ItemList

import Card from "@/components/ui/Card"
import products from "@/db/products.json"

function ItemList({category}) {
  const filteredProducts = products.products.filter((p) => p.product === category)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <Card key={product.id} {...product} />
      ))}
    </div>
  )
}
export default ItemList
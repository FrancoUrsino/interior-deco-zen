'use client'
import React, { useState } from 'react';
import Banner from '@/components/ui/Banner';
import Card from '@/components/ui/Card';

const ItemList = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const categories = ['Novedades', 'Cocina', 'Comedor', 'Living', 'Dormitorio', 'Outdoor'];
  const furnitureTypes = ['Sillón', 'Mesa', 'Silla', 'Cama'];

  const products = [
    { id: 1, name: 'Novu', type: 'Silla', image: '/assets/sillaNovu.png', category: 'Comedor', material: 'Madera', place: 'interior' },
    { id: 2, name: 'Panamá', type: 'Mesa', image: '/assets/mesa.png', category: 'Comedor' , material: 'Madera', place: 'interior' },
    { id: 3, name: 'Mege', type: 'Sillón', image: '/assets/sillonMege.png', category: 'Living', material: 'Metal', place: 'interior' },
    { id: 4, name: 'Novu', type: 'Silla', image: '/assets/SillaNovu.png', category: 'Comedor', material: 'Madera', place: 'interior' },
    { id: 5, name: 'Panamá', type: 'Mesa', image: '/assets/mesa.png', category: 'Comedor' , material: 'Madera', place: 'interior' },
    { id: 6, name: 'Mege', type: 'Sillón', image: '/assets/sillonMege.png', category: 'Living', material: 'Metal', place: 'interior' },
  ];

  const handleFilterChange = (filter, setFilter, value) => {
    setFilter(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const filteredProducts = products.filter(product =>
    (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
    (selectedTypes.length === 0 || selectedTypes.includes(product.type))
  );

  return (
    <div className="min-h-screen">
      <Banner imageSrc="/assets/mueblesBanner.jpg" title="MUEBLES" />

      <div className="max-w-9xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:block flex flex-wrap md:gap-4">
            <h3 className="text-lg font-semibold w-full">Categorías</h3>
            {categories.map(category => (
              <div key={category} className="flex items-center mx-2 space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-slate-500"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleFilterChange(category, setSelectedCategories, category)}
                />
                <label className="text-sm font-medium">{category}</label>
              </div>
            ))}

            <h3 className="text-lg font-semibold w-full mt-4">Tipos de Mueble</h3>
            {furnitureTypes.map(type => (
              <div key={type} className="flex items-center mx-2 space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleFilterChange(type, setSelectedTypes, type)}
                />
                <label className="text-sm font-medium">{type}</label>
              </div>
            ))}
          </div>

          <div className='md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredProducts.map(product => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;

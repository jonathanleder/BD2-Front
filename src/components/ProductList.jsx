import React from 'react';

function ProductList({ products, onSelect }) {
  const handleChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => parseInt(option.value, 10));
    onSelect(selectedOptions);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Productos</h2>
      <select 
        multiple 
        onChange={handleChange}
        className="w-full h-96 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        {products.map(product => (
          <option key={product.id} value={product.id} className="p-2 hover:bg-gray-100">
            {product.descripcion} - ${product.precio.toFixed(2)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProductList;
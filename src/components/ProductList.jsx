import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductList({ products, onSelect }) {
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => parseInt(option.value, 10));
    onSelect(selectedOptions);
  };

  const handleEditClick = (productId) => {
    if (productId) {
        navigate(`/modificar-producto/${productId}`);
    }
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
      
      <div className="mt-4 space-y-2">
        {products.map(product => (
          <div key={product.id} className="flex items-center justify-between">
            <span>{product.descripcion} - ${product.precio.toFixed(2)}</span>
            <button
              onClick={() => handleEditClick(product.id)}
              className="text-white bg-indigo-500 px-3 py-1 rounded-md hover:bg-indigo-600"
            >
              Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;

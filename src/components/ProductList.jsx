// ProductList.js
import React from 'react';

function ProductList({ products, onSelect }) {
  const handleChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    onSelect(selectedOptions);
  };

  return (
    <div>
      <h2>Productos</h2>
      <select multiple onChange={handleChange}>
        {products.map(product => (
          <option key={product.id} value={product.id}>
            {product.descripcion} - ${product.precio}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProductList;
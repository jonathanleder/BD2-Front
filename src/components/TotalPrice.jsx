// TotalPrice.js
import React from 'react';

function TotalPrice({ total, onCalculate }) {
  return (
    <div>
      <button onClick={onCalculate}>Calcular precio total</button>
      <p>Precio total: ${total.toFixed(2)}</p>
    </div>
  );
}

export default TotalPrice;
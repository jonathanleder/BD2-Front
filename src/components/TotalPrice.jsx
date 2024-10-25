import React from 'react';

function TotalPrice({ total, onCalculate }) {
  return (
    <div>
      <button 
        onClick={onCalculate}
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300"
      >
        Calcular precio total
      </button>
      <p className="mt-4 text-xl font-semibold text-gray-800">
        Precio total: ${total ? total.toFixed(2) : '0.00'}
      </p>
    </div>
  );
}

export default TotalPrice;

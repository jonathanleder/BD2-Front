import React from 'react';

function PurchaseButton({ onPurchase }) {
  return (
    <button 
      onClick={onPurchase}
      className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300"
    >
      Realizar compra
    </button>
  );
}

export default PurchaseButton;
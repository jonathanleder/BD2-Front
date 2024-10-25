import React from 'react';

function DiscountList({ discounts }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Descuentos vigentes</h2>
      <div className="bg-gray-50 rounded-md p-4 max-h-48 overflow-y-auto">
        {discounts.map(discount => (
          <p key={discount.id} className="text-sm text-gray-600 mb-2">
            {discount.descripcion}: <span className="font-medium text-gray-800">{discount.descuento * 100}%</span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default DiscountList;
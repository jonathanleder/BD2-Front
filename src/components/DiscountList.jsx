// DiscountList.js
import React from 'react';

function DiscountList({ discounts }) {
  return (
    <div>
      <h2>Descuentos vigentes</h2>
      <table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map(discount => (
            <tr key={discount.id}>
              <td>{discount.descripcion}</td>
              <td>{discount.porcentaje}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DiscountList;
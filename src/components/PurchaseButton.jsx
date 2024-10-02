// PurchaseButton.js
import React from 'react';

function PurchaseButton({ onPurchase }) {
  return (
    <button onClick={onPurchase}>Realizar compra</button>
  );
}

export default PurchaseButton;
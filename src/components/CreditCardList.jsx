// CreditCardList.js
import React from 'react';

function CreditCardList({ cards, onSelect }) {
  const handleChange = (event) => {
    onSelect(event.target.value);
  };

  return (
    <div>
      <h2>Tarjetas de crédito</h2>
      <select onChange={handleChange}>
        <option value="">Seleccione una tarjeta</option>
        {cards.map(card => (
          <option key={card.id} value={card.id}>
            {card.numero} - {card.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CreditCardList;
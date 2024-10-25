import React from 'react';

function CreditCardList({ cards, onSelect }) {
  const handleChange = (event) => {
    onSelect(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tarjeta de crédito</h2>
      <select 
        onChange={handleChange}
        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Seleccione una tarjeta</option>
        {cards.map(card => (
          <option key={card.id} value={card.id}>
            {card.numero} - {card.tipoTarjeta}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CreditCardList;
import React, { useState } from 'react';

function AddTarjetaForm({ clientId, onTarjetaAdded }) {
  const [numero, setNumero] = useState('');
  const [tipo, setTipo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/clientes/agregar-tarjeta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clienteId: clientId,
          numero,
          tipo
        }),
      });

      if (!response.ok) throw new Error('Error al agregar la tarjeta');

      const data = await response.json();
      setMessage('Tarjeta agregada con éxito');
      setNumero('');
      setTipo('');
      onTarjetaAdded();
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="text-lg font-medium mb-4">Agregar Tarjeta</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="numero" className="block text-sm font-medium text-gray-700">Número de Tarjeta:</label>
          <input
            type="text"
            id="numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo de Tarjeta:</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Seleccione un tipo</option>
            <option value="VISA">VISA</option>
            <option value="MASTERCARD">MASTERCARD</option>
            <option value="AMEX">AMEX</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300">
          Agregar Tarjeta
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-center" style={{ color: message.includes('éxito') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
}

export default AddTarjetaForm;
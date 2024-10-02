import React, { useState } from 'react';

function AddTarjetaForm({ clientId, onTarjetaAdded }) {
  const [clienteId, setClienteId] = useState('');
  const [numero, setNumero] = useState('');
  const [tipoTarjeta, setTipoTarjeta] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/clientes/agregar-tarjeta/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numero,
          tipoTarjeta
        }),
      });

      if (!response.ok) {
        throw new Error('Error al agregar la tarjeta');
      }

      const data = await response.text();
      setMessage(data);
      onTarjetaAdded(); // Call this to refresh the credit card list
      // ... clear form fields ...
      setNumero('');
      setTipoTarjeta('');
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

 

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Agregar Tarjeta</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="clienteId" className="block text-sm font-medium text-gray-700">ID del Cliente:</label>
          <input
            type="text"
            id="clienteId"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="numero" className="block text-sm font-medium text-gray-700">Número de Tarjeta:</label>
          <input
            type="text"
            id="numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="tipoTarjeta" className="block text-sm font-medium text-gray-700">Tipo de Tarjeta:</label>
          <input
            type="text"
            id="tipoTarjeta"
            value={tipoTarjeta}
            onChange={(e) => setTipoTarjeta(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button 
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Agregar Tarjeta
        </button>
      </form>
      {message && (
        <p className="mt-4 text-sm text-center" style={{ color: message.includes('éxito') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default AddTarjetaForm;
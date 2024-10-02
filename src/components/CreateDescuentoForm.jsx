import React, { useState } from 'react';

function CreateDescuentoForm() {
  const [tipo, setTipo] = useState('compra');
  const [producto, setProducto] = useState('');
  const [tarjeta, setTarjeta] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [porcentaje, setPorcentaje] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = tipo === 'compra' 
        ? `http://localhost:8080/descuentos/crear/compra/${producto}`
        : `http://localhost:8080/descuentos/crear/producto/${tarjeta}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fechaInicio,
          fechaFin,
          porcentaje: parseFloat(porcentaje)
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el descuento');
      }

      const data = await response.text();
      setMessage(data);
      // Limpiar el formulario
      setProducto('');
      setTarjeta('');
      setFechaInicio('');
      setFechaFin('');
      setPorcentaje('');
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Crear Descuento</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo de Descuento:</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="compra">Descuento por Compra</option>
            <option value="producto">Descuento por Producto</option>
          </select>
        </div>
        {tipo === 'compra' ? (
          <div>
            <label htmlFor="producto" className="block text-sm font-medium text-gray-700">Producto:</label>
            <input
              type="text"
              id="producto"
              value={producto}
              onChange={(e) => setProducto(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        ) : (
          <div>
            <label htmlFor="tarjeta" className="block text-sm font-medium text-gray-700">Tarjeta:</label>
            <input
              type="text"
              id="tarjeta"
              value={tarjeta}
              onChange={(e) => setTarjeta(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}
        <div>
          <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700">Fecha de Inicio:</label>
          <input
            type="date"
            id="fechaInicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700">Fecha de Fin:</label>
          <input
            type="date"
            id="fechaFin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="porcentaje" className="block text-sm font-medium text-gray-700">Porcentaje de Descuento:</label>
          <input
            type="number"
            id="porcentaje"
            value={porcentaje}
            onChange={(e) => setPorcentaje(e.target.value)}
            required
            min="0"
            max="100"
            step="0.01"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button 
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Crear Descuento
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

export default CreateDescuentoForm;
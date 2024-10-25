import React, { useState, useEffect } from 'react';

function CreateDescuentoForm({ onDescuentoCreated }) {
  const [tipoDescuento, setTipoDescuento] = useState('');
  const [porcentaje, setPorcentaje] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [productoOTarjeta, setProductoOTarjeta] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const descuentoData = {
        fechaInicio,
        fechaFin,
        porcentaje: parseFloat(porcentaje),
        descripcion: productoOTarjeta,
      };

      let url = '';
      if (tipoDescuento === 'PRODUCTO') {
        url = `http://localhost:8080/descuentos/crear/compra/${productoOTarjeta}`;
      } else if (tipoDescuento === 'COMPRA') {
        url = `http://localhost:8080/descuentos/crear/producto/${productoOTarjeta}`;
      } else {
        throw new Error('Tipo de descuento no válido');
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(descuentoData),
      });

      if (!response.ok) throw new Error('Error al crear el descuento');

      const data = await response.text();
      setMessage(data);
      setPorcentaje('');
      setFechaInicio('');
      setFechaFin('');
      setProductoOTarjeta('');
      setTipoDescuento('');
      onDescuentoCreated();
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md p-6">
      <h3 className="text-lg font-medium mb-4">Crear Descuento</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="tipoDescuento" className="block text-sm font-medium text-gray-700">Tipo de Descuento:</label>
          <select
            id="tipoDescuento"
            value={tipoDescuento}
            onChange={(e) => setTipoDescuento(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Seleccione un tipo</option>
            <option value="PRODUCTO">Por Producto</option>
            <option value="COMPRA">Por Compra</option>
          </select>
        </div>
        <div>
          <label htmlFor="productoOTarjeta" className="block text-sm font-medium text-gray-700">
            {tipoDescuento === 'PRODUCTO' ? 'Producto:' : 'Tarjeta:'}
          </label>
          <input
            type="text"
            id="productoOTarjeta"
            value={productoOTarjeta}
            onChange={(e) => setProductoOTarjeta(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="porcentaje" className="block text-sm font-medium text-gray-700">Porcentaje:</label>
          <input
            type="number"
            id="porcentaje"
            value={porcentaje}
            onChange={(e) => setPorcentaje(e.target.value)}
            required
            min="0"
            max="100"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700">Fecha de Inicio:</label>
          <input
            type="date"
            id="fechaInicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300">
          Crear Descuento
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-center" style={{ color: message.includes('éxito') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
}

export default CreateDescuentoForm;
import React, { useState, useEffect } from 'react';

function RealizarVentaForm() {
  const [clienteId, setClienteId] = useState('');
  const [productos, setProductos] = useState([]);
  const [selectedProductos, setSelectedProductos] = useState([]);
  const [tarjetaId, setTarjetaId] = useState('');
  const [tarjetas, setTarjetas] = useState([]);
  const [montoTotal, setMontoTotal] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProductos();
  }, []);

  useEffect(() => {
    if (clienteId) {
      fetchTarjetas();
    }
  }, [clienteId]);

  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:8080/productos/listar');
      if (!response.ok) throw new Error('Error al cargar los productos');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const fetchTarjetas = async () => {
    try {
      const response = await fetch(`http://localhost:8080/clientes/listar-tarjetas/${clienteId}`);
      if (!response.ok) throw new Error('Error al cargar las tarjetas');
      const data = await response.json();
      setTarjetas(data);
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleProductoChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setSelectedProductos(selectedOptions);
  };

  const calcularMonto = async () => {
    try {
      const response = await fetch('http://localhost:8080/ventas/calcular-monto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productos: selectedProductos.map(id => ({ id })),
          tarjeta: { id: parseInt(tarjetaId) }
        }),
      });
      if (!response.ok) throw new Error('Error al calcular el monto');
      const data = await response.json();
      setMontoTotal(data);
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/ventas/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cliente: { id: parseInt(clienteId) },
          productos: selectedProductos.map(id => ({ id })),
          tarjeta: { id: parseInt(tarjetaId) }
        }),
      });

      if (!response.ok) {
        throw new Error('Error al realizar la venta');
      }

      setMessage('Venta realizada con éxito');
      // Limpiar el formulario
      setClienteId('');
      setSelectedProductos([]);
      setTarjetaId('');
      setMontoTotal(0);
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Realizar Venta</h2>
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
          <label htmlFor="productos" className="block text-sm font-medium text-gray-700">Productos:</label>
          <select
            multiple
            id="productos"
            value={selectedProductos}
            onChange={handleProductoChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {productos.map(producto => (
              <option key={producto.id} value={producto.id}>
                {producto.descripcion} - ${producto.precio}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tarjetaId" className="block text-sm font-medium text-gray-700">Tarjeta:</label>
          <select
            id="tarjetaId"
            value={tarjetaId}
            onChange={(e) => setTarjetaId(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Seleccione una tarjeta</option>
            {tarjetas.map(tarjeta => (
              <option key={tarjeta.id} value={tarjeta.id}>
                {tarjeta.numero} - {tarjeta.tipoTarjeta}
              </option>
            ))}
          </select>
        </div>
        <button 
          type="button"
          onClick={calcularMonto}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Calcular Monto
        </button>
        <p className="text-lg font-bold text-center">Monto Total: ${montoTotal.toFixed(2)}</p>
        <button 
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Realizar Venta
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

export default RealizarVentaForm;
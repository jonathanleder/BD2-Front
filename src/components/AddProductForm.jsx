import React, { useState, useEffect } from 'react';

function AddProductForm() {
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [marcaId, setMarcaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch categorías y marcas cuando el componente se monta
    fetchCategorias();
    fetchMarcas();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://localhost:8080/categorias/listar');
      if (!response.ok) throw new Error('Error al cargar las categorías');
      const data = await response.json();
      console.log("la categoria es: "+data);
      setCategorias(data);
    } catch (error) {
      setMessage('Error al cargar las categorías: ' + error.message);
    }
  };

  const fetchMarcas = async () => {
    try {
      const response = await fetch('http://localhost:8080/marcas/listar');
      if (!response.ok) throw new Error('Error al cargar las marcas');
      const data = await response.json();
      console.log("la marca es: "+data.nombre);
      setMarcas(data);
    } catch (error) {
      setMessage('Error al cargar las marcas: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/productos/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codigo,
          descripcion,
          precio: parseFloat(precio),
          categoria: { id: parseInt(categoriaId) },
          marca: { id: parseInt(marcaId) }
        }),
      });

      if (!response.ok) throw new Error('Error al crear el producto');

      const data = await response.json();
      setMessage(data);
      // Limpiar el formulario
      setCodigo('');
      setDescripcion('');
      setPrecio('');
      setCategoriaId('');
      setMarcaId('');
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h2 className="text-lg font-medium mb-4">Agregar Producto</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">Código:</label>
          <input
            type="text"
            id="codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="precio" className="block text-sm font-medium text-gray-700">Precio:</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoría:</label>
          <select
            id="categoria"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="marca">Marca:</label>
          <select
            id="marca"
            value={marcaId}
            onChange={(e) => setMarcaId(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Seleccione una marca</option>
            {marcas.map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300">Agregar Producto</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddProductForm;
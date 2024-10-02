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
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="codigo">Código:</label>
          <input
            type="text"
            id="codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
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
          >
            <option value="">Seleccione una marca</option>
            {marcas.map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Agregar Producto</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddProductForm;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ModificarProducto = () => {
  const { idProducto } = useParams();

  console.log("El id del producto es:", idProducto);
  const [categoriaId, setCategoriaId] = useState('');
  const [producto, setProducto] = useState({
    id: idProducto,
    descripcion: '',
    precio: '',
    marca: '',
    categoria: ''
  });
  const [categorias, setCategorias] = useState([]);
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    // Fetch del producto
    if (idProducto) {
      fetch(`http://localhost:8080/productos/listar/${idProducto}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Error al cargar el producto");
          }
          return response.json();
        })
        .then(data => {
          setProducto(data);
          // Establecer la categoría seleccionada
          setCategoriaId(data.categoria.id); // Asumiendo que categoria tiene una propiedad 'id'
        })
        .catch(error => setMensajeError(error.message));
    }
  }, [idProducto]);

  useEffect(() => {
    // Fetch de categorías
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:8080/categorias/listar');
        if (!response.ok) throw new Error('Error al cargar las categorías');
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        setMensajeError('Error al cargar las categorías: ' + error.message);
      }
    };
    fetchCategorias();
  }, []);



  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    setMensajeError('');
  
    // Prepara el objeto para la actualización, asegurándote de incluir la nueva categoría
    const productoActualizado = {
        id: producto.id,
        codigo: producto.codigo,
        descripcion: producto.descripcion,
        precio: producto.precio,
        marca: { id: producto.marca.id },
        categoria: { id: categoriaId },
        version: producto.version // Incluye la versión aquí
      };

    console.log("Datos a enviar:")
    console.table(productoActualizado);
  
    fetch(`http://localhost:8080/productos/actualizar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productoActualizado), // Envía el objeto actualizado
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 409) {
            throw new Error("Otro usuario ha modificado este producto. Por favor, refresque y reintente.");
          } else {
            throw new Error("Error al actualizar el producto. Intente nuevamente.");
          }
        }
        alert("Producto actualizado correctamente");
      })
      .catch((error) => {
        setMensajeError(error.message);
      });
  };




  console.table(producto);
  console.table(categorias);
  return (
    <div>
      <h2>Editar Producto</h2>
      {mensajeError && <div style={{ color: 'red' }}>{mensajeError}</div>}
      <form onSubmit={manejarEnvio}>
        <label>ID:</label>
        <input type="text" value={producto.id} disabled />
        
        <label>Descripción:</label>
        <input
          type="text"
          name="descripcion"
          value={producto.descripcion}
          onChange={manejarCambio}
        />
        
        <label>Precio:</label>
        <input
          type="number"
          name="precio"
          value={producto.precio}
          onChange={manejarCambio}
        />

        <label>Marca:</label>
        <input
          type="text"
          name="marca"
          value={producto.marca.nombre}
          onChange={manejarCambio}
        />

<label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoría:</label>
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

        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default ModificarProducto;

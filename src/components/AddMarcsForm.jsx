import React, { useState } from 'react';

function AddMarcaForm() {
  const [nombre, setNombre] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/marcas/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la marca');
      }

      const data = await response.text();
      setMessage(data);
      // Limpiar el formulario
      setNombre('');
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Agregar Marca</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre de la Marca:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar Marca</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddMarcaForm;
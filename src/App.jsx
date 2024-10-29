import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VentaApp from './pages/VentaApp';
import ModificarProducto from './pages/ModificarProducto';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VentaApp />} />
        {/* Ruta dinámica para la edición del producto */}
        <Route path="/modificar-producto/:idProducto" element={<ModificarProducto />} />
      </Routes>
    </Router>
  );
}

export default App;

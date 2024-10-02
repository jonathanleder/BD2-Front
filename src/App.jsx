import React, { useState, useEffect } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import DiscountList from './components/DiscountList';
import CreditCardList from './components/CreditCardList';
import TotalPrice from './components/TotalPrice';
import PurchaseButton from './components/PurchaseButton';
import ErrorMessage from './components/ErrorMessage';
import AddProductForm from './components/AddProductForm';
import AddMarcaForm from './components/AddMarcsForm';
import AddCategoriaForm from './components/AddCategoryForm';
import AddTarjetaForm from './components/AddTarjetaForm';
import CreateClienteForm from './components/CreateClientForm';
import CreateDescuentoForm from './components/CreateDescuentoForm';

function App() {
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [creditCards, setCreditCards] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');
  const [clientId, setClientId] = useState('');
  const [activeTab, setActiveTab] = useState('shop');

  useEffect(() => {
    if (clientId) {
      fetchProducts();
      fetchDiscounts();
      fetchCreditCards();
    }
  }, [clientId]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/productos/listar');
      if (!response.ok) throw new Error('Error al cargar los productos');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchDiscounts = async () => {
    try {
      const response = await fetch('http://localhost:8080/descuentos/listar');
      if (!response.ok) throw new Error('Error al cargar los descuentos');
      const data = await response.json();
      setDiscounts(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchCreditCards = async () => {
    try {
      const response = await fetch(`http://localhost:8080/clientes/listar-tarjetas/${clientId}`);
      if (!response.ok) throw new Error('Error al cargar las tarjetas de crédito');
      const data = await response.json();
      setCreditCards(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleProductSelection = (selectedIds) => {
    setSelectedProducts(selectedIds);
  };

  const handleCardSelection = (cardId) => {
    setSelectedCard(cardId);
  };

  const calculateTotalPrice = async () => {
    try {
      const response = await fetch('http://localhost:8080/ventas/calcular-monto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productos: selectedProducts.map(id => ({ id })),
          tarjeta: { id: selectedCard }
        }),
      });
      if (!response.ok) throw new Error('Error al calcular el precio total');
      const data = await response.json();
      setTotalPrice(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePurchase = async () => {
    try {
      const response = await fetch('http://localhost:8080/ventas/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cliente: { id: clientId },
          productos: selectedProducts.map(id => ({ id })),
          tarjeta: { id: selectedCard }
        }),
      });
      if (!response.ok) throw new Error('Error al realizar la compra');
      alert('Compra realizada con éxito');
      // Reset selected products and recalculate total
      setSelectedProducts([]);
      setTotalPrice(0);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClientCreated = (newClientId) => {
    setClientId(newClientId);
    setActiveTab('shop');
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-8 text-center">Sistema de Ventas</h1>
      
      <div className="mb-4">
        <button 
          className={`mr-2 px-4 py-2 ${activeTab === 'shop' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('shop')}
        >
          Tienda
        </button>
        <button 
          className={`mr-2 px-4 py-2 ${activeTab === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('admin')}
        >
          Administración
        </button>
      </div>

      {activeTab === 'shop' && (
        <div>
          {!clientId && (
            <CreateClienteForm onClientCreated={handleClientCreated} />
          )}
          {clientId && (
            <>
              <ProductList products={products} onSelect={handleProductSelection} />
              <DiscountList discounts={discounts} />
              <CreditCardList cards={creditCards} onSelect={handleCardSelection} />
              <TotalPrice total={totalPrice} onCalculate={calculateTotalPrice} />
              <PurchaseButton onPurchase={handlePurchase} />
            </>
          )}
        </div>
      )}

      {activeTab === 'admin' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Administración</h2>
          <AddProductForm onProductAdded={fetchProducts} />
          <AddMarcaForm />
          <AddCategoriaForm />
          <AddTarjetaForm clientId={clientId} onTarjetaAdded={fetchCreditCards} />
          <CreateDescuentoForm onDescuentoCreated={fetchDiscounts} />
        </div>
      )}

      <ErrorMessage message={error} />
    </div>
  );
}

export default App;
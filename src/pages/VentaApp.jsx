import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import DiscountList from '../components/DiscountList';
import CreditCardList from '../components/CreditCardList';
import TotalPrice from '../components/TotalPrice';
import PurchaseButton from '../components/PurchaseButton';
import ErrorMessage from '../components/ErrorMessage';
import AddProductForm from '../components/AddProductForm';
import AddMarcaForm from '../components/AddMarcsForm';
import AddCategoriaForm from '../components/AddCategoryForm';
import AddTarjetaForm from '../components/AddTarjetaForm';
import CreateClienteForm from '../components/CreateClientForm';
import CreateDescuentoForm from '../components/CreateDescuentoForm';

function VentaApp() {
  const [clientId, setClientId] = useState(null);
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [creditCards, setCreditCards] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    setClientId(5);
  }, []);

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
      setError('Error al cargar los productos: ' + error.message);
    }
  };

  const fetchDiscounts = async () => {
    try {
      const response = await fetch('http://localhost:8080/descuentos/listar');
      if (!response.ok) throw new Error('Error al cargar los descuentos');
      const data = await response.json();
      setDiscounts(data);
    } catch (error) {
      setError('Error al cargar los descuentos: ' + error.message);
    }
  };

  const fetchCreditCards = async () => {
    try {
      const response = await fetch(`http://localhost:8080/clientes/listar-tarjetas/${clientId}`);
      if (!response.ok) throw new Error('Error al cargar las tarjetas de crédito');
      const data = await response.json();
      setCreditCards(data);
    } catch (error) {
      setError('Error al cargar las tarjetas de crédito: ' + error.message);
    }
  };

  const handleProductSelection = (selectedIds) => {
    setSelectedProducts(selectedIds);
  };

  const handleCardSelection = (cardId) => {
    setSelectedCard(cardId);
  };

  const calculateTotalPrice = async () => {
    if (selectedProducts.length === 0 || !selectedCard) {
      setError('Por favor, selecciona productos y una tarjeta para continuar');
      return;
    }
  
    try {
      console.log({
        productos: selectedProducts.map(id => parseInt(id, 10)),
        tarjeta: parseInt(selectedCard, 10)
      });
      
      const response = await fetch('http://localhost:8080/ventas/calcular-monto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productos: selectedProducts.map(id => parseInt(id, 10)), // Convert to integers
          tarjeta: parseInt(selectedCard, 10) // Ensure tarjeta is also an integer
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }
      
      const data = await response.json();
      setTotalPrice(data);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error al calcular el precio total:', error);
      setError('Error al calcular el precio total: ' + error.message);
    }
  };
  
  const handlePurchase = async () => {
    if (selectedProducts.length === 0 || !selectedCard) {
      setError('Por favor, selecciona productos y una tarjeta para realizar la compra');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/ventas/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cliente: clientId,
          productos: selectedProducts, // Enviar solo los IDs
          tarjeta: selectedCard // Enviar solo el ID de la tarjeta
        }),
      });
      if (!response.ok) throw new Error('Error al realizar la compra');
      alert('Compra realizada con éxito');
      setSelectedProducts([]);
      setTotalPrice(0);
    } catch (error) {
      setError('Error al realizar la compra: ' + error.message);
    }
  };
  
  const filteredDiscounts = discounts.length > 0 && selectedProducts.length > 0
    ? discounts.filter(discount => selectedProducts.includes(discount.productId))
    : [];
    
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sistema de Ventas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="bg-white shadow-md rounded-lg p-6">
              <ProductList products={products} onSelect={handleProductSelection} />
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
              <DiscountList discounts={filteredDiscounts} />
              <CreditCardList cards={creditCards} 
  onSelect={handleCardSelection} 
  selectedCard={selectedCard} />
              <TotalPrice total={totalPrice} onCalculate={calculateTotalPrice} />
              <PurchaseButton onPurchase={handlePurchase} />
            </div>
          </div>
        </div>
        <ErrorMessage message={error} />
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AddProductForm onProductAdded={fetchProducts} />
        <CreateDescuentoForm onDescuentoCreated={fetchDiscounts} />
        <CreateClienteForm onClientCreated={setClientId} />
        <AddTarjetaForm clientId={clientId} onTarjetaAdded={fetchCreditCards} />
        <AddMarcaForm />
        <AddCategoriaForm />
      </div>
    </div>
  );
}

export default VentaApp;

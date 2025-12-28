// src/pages/AdminItems.jsx
import React, { useState } from 'react';

const AdminItems = () => {
  const [services, setServices] = useState([
    { id: 's1', name: 'Limpieza facial', price: 80 },
    { id: 's2', name: 'Radiofrecuencia', price: 120 },
    { id: 's3', name: 'Peeling', price: 60 },
  ]);

  const [products, setProducts] = useState([
    { id: 'p1', name: 'Crema hidratante', price: 50 },
    { id: 'p2', name: 'Protector solar', price: 70 },
    { id: 'p3', name: 'Serum vitamínico', price: 120 },
  ]);

  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  const addService = () => {
    if (!newServiceName || !newServicePrice) return;
    const newService = {
      id: `s${services.length + 1}`,
      name: newServiceName,
      price: parseFloat(newServicePrice),
    };
    setServices([...services, newService]);
    setNewServiceName('');
    setNewServicePrice('');
  };

  const addProduct = () => {
    if (!newProductName || !newProductPrice) return;
    const newProduct = {
      id: `p${products.length + 1}`,
      name: newProductName,
      price: parseFloat(newProductPrice),
    };
    setProducts([...products, newProduct]);
    setNewProductName('');
    setNewProductPrice('');
  };

  const removeService = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  const removeProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold  mb-4"
      style={{
        color: "#31b237",
      }}
      >Editar servicios y productos</h1>

      {/* Servicios */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Servicios</h2>
        <div className="space-y-2 mb-4">
          {services.map(s => (
            <div key={s.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <strong>{s.name}</strong>
                <div className="text-sm text-gray-500">{s.price} Bs.</div>
              </div>
              <button
                onClick={() => removeService(s.id)}
                className="text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nombre del servicio"
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            placeholder="Precio"
            value={newServicePrice}
            onChange={(e) => setNewServicePrice(e.target.value)}
            className="w-34 p-2 border border-gray-300 rounded-md"
          />
          
        </div>
        <div className='flex gap-2 '>
          <button
            onClick={addService}
            className="px-3 py-2  text-white rounded-md w-full mt-2"
            style={{
              backgroundColor: "#31b237",
              fontWeight: "600",
            }}
          >
            + Agregar
          </button>
        </div>
      </div>

      {/* Productos */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Productos</h2>
        <div className="space-y-2 mb-4">
          {products.map(p => (
            <div key={p.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <strong>{p.name}</strong>
                <div className="text-sm text-gray-500">{p.price} Bs.</div>
              </div>
              <button
                onClick={() => removeProduct(p.id)}
                className="text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nombre del producto"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            placeholder="Precio"
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
            className="w-34 p-2 border border-gray-300 rounded-md"
          />
          
        </div>
        <div className='flex gap-2 '>
          <button
            onClick={addProduct}
            className="px-3 py-2  text-white rounded-md w-full mt-2"
            style={{
              backgroundColor: "#31b237",
              fontWeight: "600",
            }}
          >
            + Agregar
          </button>

        </div>
      </div>
    </div>
  );
};

export default AdminItems;
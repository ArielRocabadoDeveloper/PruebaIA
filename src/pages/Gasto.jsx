// src/pages/Gasto.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Gasto = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [branch, setBranch] = useState(user?.branch || 'Sucursal A');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      description,
      amount: parseFloat(amount),
      branch,
      doctor: user?.name,
      date: new Date().toISOString(),
    };
    console.log('Gasto registrado:', payload);
    alert('Gasto registrado (simulación). Revisa la consola.');
    // Limpiar formulario
    setDescription('');
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4" style={{ color: "#31b237" }}>Registrar nuevo gasto</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-1">Descripción</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-1">Monto (Bs.)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-1">Sucursal</label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Sucursal A">Sucursal A</option>
            <option value="Sucursal B">Sucursal B</option>
            <option value="Sucursal C">Sucursal C</option>
            <option value="Sucursal D">Sucursal C</option>
            <option value="Sucursal F">Sucursal F</option>
            <option value="Sucursal G">Sucursal G</option>
            
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white rounded-md"
          style={{ backgroundColor: "#31b237", fontWeight: "600" }}
        >
          Registrar gasto
        </button>
      </form>
    </div>
  );
};

export default Gasto;
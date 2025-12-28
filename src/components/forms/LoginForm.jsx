// src/components/forms/LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const mockUser = {
      id: 1,
      name: 'Alejandra Torres',
      // Cambia a admin duena // aqui tenemos 2 roles: 'doctor' y 'admin'
      role: 'admin', 
      branch: 'Sucursal A'
    };
    login(mockUser);
    if (mockUser.role === 'admin') {
      navigate('/duena');
    } else {
      navigate('/doctor');
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="tu@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
            required
          />
        </div>

        <div className="mb-4 input-with-icon">
          <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
            required
          />
          <button
            type="button"
            className="input-icon-btn"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#374151" strokeWidth="1.9"><path d="M3 3l18 18"/><path d="M10.59 10.59A3 3 0 0 0 13.41 13.41"/><path d="M9.88 5.88A10 10 0 0 0 21 12c-1.66 4.19-5.33 7-9 7a9.6 9.6 0 0 1-4-.86"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#374151" strokeWidth="1.9"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sucursal</label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors">
            <option>Seleccione sucursal</option>
            <option>Sucursal A</option>
            <option>Sucursal B</option>
            <option>Sucursal C</option>
            <option>Sucursal D</option>
            <option>Sucursal E</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn-primary-lg"
        >
          Ingresar
        </button>
      </form>
    </>
  );
};

export default LoginForm;
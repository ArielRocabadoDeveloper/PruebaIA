// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import dermoLogo from '../../assets/dermo.png';

const Header = ({ onMenuToggle }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  // Obtener el título actual según la ruta
  const getCurrentTitle = () => {
    const path = location.pathname;
    if (path === '/doctor' || path === '/') return 'Dashboard';
    if (path === '/duena') return 'Dashboard Dueña';
    if (path === '/atencion') return 'Registrar Atención';
    if (path === '/gasto') return 'Registrar Gasto';
    if (path === '/buscar') return 'Buscar Paciente';
    if (path === '/admin/cuentas') return 'Gestionar Cuentas';
    if (path === '/admin/items') return 'Gestionar Items';
    if (path === '/cajachica') return 'Caja Chica';
    return 'DERMO ESTÉTICA';
  };

  const handleMenuToggle = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
    onMenuToggle();
  };

  return (
    <header className="text-white shadow-lg border-b-2 px-4 py-4 flex items-center justify-between animate-fadeIn" style={{ backgroundColor: '#31b237', borderColor: '#31b237' }}>
      {/* Logo a la izquierda */}
      <div className="flex items-center space-x-2">
        <img 
          src={dermoLogo} 
          alt="DERMO Logo" 
          className="h-10 w-10 object-contain hover:scale-110 transition-transform duration-300"
          title="DERMO Estética"
        />
        <span className="hidden sm:inline font-bold text-sm">DERMO</span>
      </div>

      {/* Título centrado */}
      <div className="flex-1 text-center px-4">
        <h1 className="text-lg md:text-xl font-semibold truncate">
          {getCurrentTitle()}
        </h1>
      </div>

      {/* Menú hamburguesa a la derecha */}
      <div className="flex items-center space-x-4">
        {/* Usuario */}
        <div className="hidden sm:flex flex-col items-end">
          <p className="text-xs font-medium">Bienvenido</p>
          <p className="text-xs opacity-90 truncate max-w-[120px]">
            {user?.name || 'Usuario'}
          </p>
        </div>

        {/* Hamburguesa */}
        <button
          onClick={handleMenuToggle}
          className="p-2 rounded-lg text-white hover:bg-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          aria-label="Abrir menú"
        >
          <svg 
            className={`w-6 h-6 transition-transform duration-300 ${isHamburgerOpen ? 'rotate-90' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
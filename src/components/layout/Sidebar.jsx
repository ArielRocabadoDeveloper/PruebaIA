import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import dermoLogo from '../../assets/dermo.png';

const Sidebar = ({ isOpen, onClose, user, logout }) => {
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);

  const navItems = [
    { path: '/doctor', label: 'Dashboard', icon: 'dashboard' },
    { path: '/atencion', label: 'Registrar Atención', icon: 'assignment' },
    { path: '/gasto', label: 'Registrar Gasto', icon: 'account_balance_wallet' },
    { path: '/buscar', label: 'Buscar Paciente', icon: 'person_search' },
  ];

  const adminItems = [
    { path: '/duena', label: 'Dashboard Dueña', icon: 'trending_up' },
    { path: '/admin/cuentas', label: 'Gestionar Cuentas', icon: 'people' },
    { path: '/admin/items', label: 'Gestionar Items', icon: 'inventory_2' },
    { path: '/historialpacientes', label: 'Historial Pacientes', icon: 'history' },
    { path: '/cajachica', label: 'Caja Chica', icon: 'savings' },
  ];

  const allItems = user?.role === 'admin' ? [...navItems, ...adminItems] : navItems;

  // Control de animación
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  // Cerrar el sidebar al hacer clic en un link
  const handleNavClick = () => {
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Cerrar al presionar ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay con fondo borroso */}
      <div
        className={`sidebar-overlay ${isAnimating ? 'open' : 'closed'}`}
        onClick={onClose}
        style={{
          backdropFilter: isAnimating ? 'blur(4px)' : 'blur(0px)',
        }}
      />

      {/* Menú deslizable */}
      <div className={`sidebar-menu ${isAnimating ? 'open' : ''}`}>
        {/* Header del sidebar */}
        <div className="sidebar-header">
          <div className="sidebar-header-title">
            <img 
              src={dermoLogo} 
              alt="DERMO Logo" 
              className="sidebar-header-icon h-10 w-10 object-contain hover:scale-110 transition-transform duration-300"
              title="DERMO Estética"
            />
            <span>Dermo Clínica</span>
          </div>
        </div>

        {/* Navegación */}
        <nav className="sidebar-nav">
          {/* Sección Doctor */}
          <div className="nav-section">
            {allItems.slice(0, 4).map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={`nav-item ${
                  location.pathname === item.path ? 'active' : ''
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="nav-item-icon material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Sección Admin (si aplica) */}
          {user?.role === 'admin' && (
            <div className="nav-section">
              <div className="nav-section-title">Administración</div>
              {adminItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`nav-item ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
                  style={{ animationDelay: `${(index + 4) * 0.05}s` }}
                >
                  <span className="nav-item-icon material-symbols-outlined">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* Botón Logout */}
        <div style={{ padding: '8px' }}>
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="sidebar-logout"
          >
            <span className="nav-item-icon material-symbols-outlined">logout</span>
            <span>Cerrar sesión</span>
          </button>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <p>© 2025 Dermo Clínica - Create by AndesCode</p>
          <p style={{ marginTop: '4px', fontSize: '11px' }}>v1.0.0</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
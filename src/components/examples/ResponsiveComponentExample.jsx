// src/components/examples/ResponsiveComponentExample.jsx
// Este archivo es un EJEMPLO de cómo crear componentes 100% responsive

import React, { useState } from 'react';
import '../../styles/responsive-patterns.css';

/**
 * Componente de ejemplo mostrando todas las técnicas responsive
 * Úsalo como referencia para mejorar tus componentes existentes
 */
const ResponsiveComponentExample = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  // Datos de ejemplo
  const exampleCards = [
    { id: 1, title: 'Card 1', description: 'Descripción del card 1' },
    { id: 2, title: 'Card 2', description: 'Descripción del card 2' },
    { id: 3, title: 'Card 3', description: 'Descripción del card 3' },
  ];

  return (
    <div className="component-container">
      {/* PATRÓN 1: HEADER CON TÍTULO */}
      <div className="section-header">
        <h1>Componente Responsive</h1>
        <p className="text-sm-responsive text-gray-600 mt-2">
          Este es un ejemplo de componente totalmente responsive
        </p>
      </div>

      {/* PATRÓN 2: INFO BLOCK */}
      <div className="info-block">
        <p className="text-sm-responsive">
          💡 <strong>Tip:</strong> Este componente se adapta perfectamente a
          mobile, tablet y desktop usando CSS media queries.
        </p>
      </div>

      {/* PATRÓN 3: GRILLA DE CARDS */}
      <div className="cards-grid gap-responsive">
        {exampleCards.map((card) => (
          <div
            key={card.id}
            className="card cursor-pointer"
            onClick={() => setSelectedCard(card.id)}
            style={{
              opacity: selectedCard === null || selectedCard === card.id ? 1 : 0.6,
              transition: 'all 0.3s ease',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg-responsive font-semibold">{card.title}</h3>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <p className="text-sm-responsive text-gray-600 flex-1">
              {card.description}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500">ID: {card.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* PATRÓN 4: SECCIÓN CON FLEX LAYOUT */}
      <div className="mt-8 p-responsive bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-lg-responsive font-semibold mb-4">Flex Responsive</h2>
        <div className="flex-responsive">
          <div className="flex-1 p-4 bg-white rounded border border-gray-200">
            <h4 className="font-medium mb-2">Columna 1</h4>
            <p className="text-sm-responsive text-gray-600">
              En móvil: una columna. En tablet: dos. En desktop: flexible.
            </p>
          </div>
          <div className="flex-1 p-4 bg-white rounded border border-gray-200">
            <h4 className="font-medium mb-2">Columna 2</h4>
            <p className="text-sm-responsive text-gray-600">
              Se adapta automáticamente según el ancho de pantalla.
            </p>
          </div>
        </div>
      </div>

      {/* PATRÓN 5: FORMULARIO RESPONSIVE */}
      <div className="mt-8 p-responsive bg-white rounded-lg border border-gray-200">
        <h2 className="text-lg-responsive font-semibold mb-6">Formulario Responsive</h2>
        <form className="form-grid">
          {/* Campos normales */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
            />
          </div>

          {/* Campo ancho completo */}
          <div className="form-grid full md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Mensaje
            </label>
            <textarea
              placeholder="Tu mensaje"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
            />
          </div>
        </form>
      </div>

      {/* PATRÓN 6: TABLA RESPONSIVE */}
      <div className="mt-8">
        <h2 className="text-lg-responsive font-semibold mb-4">Tabla Responsive</h2>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th className="hidden-mobile">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Juan Pérez</td>
                <td>juan@example.com</td>
                <td className="hidden-mobile">
                  <span className="text-green-600 font-medium">Activo</span>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>María García</td>
                <td>maria@example.com</td>
                <td className="hidden-mobile">
                  <span className="text-green-600 font-medium">Activo</span>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Carlos López</td>
                <td>carlos@example.com</td>
                <td className="hidden-mobile">
                  <span className="text-gray-500 font-medium">Inactivo</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PATRÓN 7: BOTONES RESPONSIVE */}
      <div className="mt-8">
        <h2 className="text-lg-responsive font-semibold mb-4">Botones</h2>
        <div className="btn-group">
          <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Guardar
          </button>
          <button className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">
            Cancelar
          </button>
          <button className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
            Eliminar
          </button>
        </div>
      </div>

      {/* PATRÓN 8: MOSTRAR/OCULTAR POR RESOLUCIÓN */}
      <div className="mt-8 p-responsive bg-blue-50 rounded-lg border border-blue-200">
        <div className="mobile-only">
          <p className="text-blue-900">📱 Este texto solo aparece en móvil</p>
        </div>
        <div className="desktop-only">
          <p className="text-blue-900">🖥️ Este texto solo aparece en tablet y desktop</p>
        </div>
        <div className="desktop-large-only">
          <p className="text-blue-900">💻 Este texto solo aparece en desktop grande</p>
        </div>
      </div>

      {/* PATRÓN 9: ESPACIADO RESPONSIVE */}
      <div className="mt-8 p-responsive bg-purple-50 rounded-lg border border-purple-200">
        <h2 className="text-lg-responsive font-semibold mb-4">Espaciado Responsive</h2>
        <p className="text-sm-responsive text-purple-900">
          El padding y gap de este componente cambia según la resolución:
        </p>
        <ul className="list-disc list-inside mt-4 text-sm-responsive text-purple-900 gap-responsive">
          <li>Mobile: 1rem padding, 1rem gap</li>
          <li>Tablet: 1.5rem padding, 1.25rem gap</li>
          <li>Desktop: 2rem padding, 1.5rem gap</li>
        </ul>
      </div>

      {/* INFORMACIÓN DE DEBUGGING */}
      <div className="mt-8 p-responsive bg-gray-900 text-white rounded-lg font-mono text-xs">
        <p className="mb-2">Información de viewport (debugging):</p>
        <div className="desktop-large-only">
          <p>📊 Desktop (1025px+)</p>
        </div>
        <div className="hidden-desktop" style={{ display: 'block' }}>
          <div className="mobile-only">
            <p>📱 Mobile (≤640px)</p>
          </div>
          <div className="desktop-only" style={{ display: 'none' }}>
            <p>📑 Tablet (641px-1024px)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveComponentExample;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardDoctor = () => {
  const { user } = useAuth();
  const [patientsCount, setPatientsCount] = useState(0);
  const [earnings, setEarnings] = useState(0);

  // Simulación de datos
  useEffect(() => {
    setPatientsCount(15);
    setEarnings(1250.00);
  }, []);

  return (
    <div className="mb-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Hola, {user?.name} 👋</h1>
        <p className="text-lg text-gray-600">Bienvenido de nuevo a DermoClínica</p>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Pacientes atendidos este mes</h2>
          <p className="text-3xl font-bold text-green-600">{patientsCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Ganancias mensuales</h2>
          <p className="text-3xl font-bold text-green-600">{earnings.toFixed(2)} Bs.</p>
        </div>
      </div>

      {/* Lista de pacientes */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Últimos pacientes atendidos</h2>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <strong>Paciente {i}</strong>
                <div className="text-sm text-gray-500">CI: 123456{i}</div>
              </div>
              <div className="text-sm text-gray-500">Fecha: 2025-11-{i}0</div>
            </div>
          ))}
        </div>
      </div>

  
    </div>
  );
};

export default DashboardDoctor;
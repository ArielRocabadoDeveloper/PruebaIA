import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardDoctor from './pages/DashboardDoctor';
import DashboardDuena from './pages/DashboardDuena';
import Atencion from './pages/Atencion';
import Gasto from './pages/Gasto';
import Buscar from './pages/Buscar';

import HistorialPacientes from './pages/historialpacientes';
import CajaChica from './pages/cajachica';
import AdminCuentas from './pages/AdminCuentas';
import AdminItems from './pages/AdminItems';
import './styles/globals.css';
import './components/layout/Sidebar.css';
import './App.responsive.css';
import Splash from './components/ui/Splash';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // We no longer hide the splash immediately here.
    // Instead, Splash will call `onFinish` when it finishes its own animation
    // (this lets CSS run fully before the splash is removed).
    // Keep a fallback safety timer in case something fails.
    const fallback = setTimeout(() => setShowSplash(false), 20000);
    return () => clearTimeout(fallback);
  }, []);
  return (
    <Router>
    {showSplash && <Splash onFinish={() => setShowSplash(false)} />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute allowedRoles={['doctor', 'admin']}>
              <DashboardLayout>
                <DashboardDoctor />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <PrivateRoute allowedRoles={['doctor']}>
              <DashboardLayout>
                <DashboardDoctor />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/duena"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <DashboardLayout>
                <DashboardDuena />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/atencion"
          element={
            <PrivateRoute allowedRoles={['doctor', 'admin']}>
              <DashboardLayout>
                <Atencion />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/gasto"
          element={
            <PrivateRoute allowedRoles={['doctor', 'admin']}>
              <DashboardLayout>
                <Gasto />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/buscar"
          element={
            <PrivateRoute allowedRoles={['doctor', 'admin']}>
              <DashboardLayout>
                <Buscar />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/historialpacientes"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <DashboardLayout>
                <HistorialPacientes />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/cajachica"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <DashboardLayout>
                <CajaChica />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/cuentas"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <DashboardLayout>
                <AdminCuentas />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/items"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <DashboardLayout>
                <AdminItems />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
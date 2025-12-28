// src/pages/AdminCuentas.jsx
/**
 * ═══════════════════════════════════════════════════════════
 * ADMIN CUENTAS - Gestión de Cuentas de Médicos
 * ═══════════════════════════════════════════════════════════
 * 
 * BACKEND NOTES:
 * - Este componente está preparado para integrar con API REST
 * - Los comentarios indican qué endpoints se esperan
 * - Todos los datos actualmente son simulados (state local)
 * - Reemplazar fetch() en los métodos marked con [TODO: BACKEND]
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/adminCuentas.css';

const AdminCuentas = () => {
  const { user } = useAuth();

  // ═══════════════════════════════════════════════════════════
  // STATE MANAGEMENT
  // ═══════════════════════════════════════════════════════════

  // [TODO: BACKEND] Reemplazar con fetch inicial desde GET /api/doctors
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: 'Dr. Alejandra Torres',
      email: 'alejandra.torres@dermoclinica.com',
      role: 'doctor',
      createdAt: '2025-11-10',
      status: 'active',
    },
    {
      id: 2,
      name: 'Dr. Carlos Pérez',
      email: 'carlos.perez@dermoclinica.com',
      role: 'doctor',
      createdAt: '2025-11-08',
      status: 'active',
    },
    {
      id: 3,
      name: 'Dra. María López',
      email: 'maria.lopez@dermoclinica.com',
      role: 'doctor',
      createdAt: '2025-11-05',
      status: 'active',
    },
  ]);

  // Form state para crear nueva cuenta
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    
  });

  // Estado para edición de cuenta
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Notificaciones
  const [toast, setToast] = useState(null);

  // ═══════════════════════════════════════════════════════════
  // HELPER FUNCTIONS
  // ═══════════════════════════════════════════════════════════

  /**
   * Mostrar notificación temporal
   * @param {string} message - Texto del mensaje
   * @param {string} type - 'success' o 'error'
   */
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  /**
   * Validar email
   * @param {string} email
   * @returns {boolean}
   */
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  /**
   * Validar contraseña (mínimo 8 caracteres)
   * @param {string} password
   * @returns {boolean}
   */
  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  // ═══════════════════════════════════════════════════════════
  // CREATE ACCOUNT
  // ═══════════════════════════════════════════════════════════

  /**
   * Crear nueva cuenta de doctor
   * 
   * [TODO: BACKEND] POST /api/doctors/create
   * Body:
   * {
   *   name: string (requerido, mín 3 caracteres)
   *   email: string (requerido, validar formato único en DB)
   *   password: string (requerido, mín 8 caracteres - HASH antes de guardar)
   *   branch: string (requerido, debe existir en tabla sucursales)
   *   role: "doctor" (fijo)
   * }
   * 
   * Response esperada:
   * {
   *   id: number (PK auto-generado)
   *   name: string
   *   email: string
   *   branch: string
   *   role: "doctor"
   *   createdAt: ISO timestamp
   *   status: "active"
   * }
   * 
   * Errores posibles:
   * - 400: Email ya existe (validar unicidad)
   * - 400: Email inválido
   * - 400: Contraseña débil
   * - 400: Sucursal no válida
   * - 500: Error servidor
   */
  const handleCreateAccount = async (e) => {
    e.preventDefault();

    // Validaciones cliente
    if (!formData.name.trim()) {
      showToast('El nombre es requerido', 'error');
      return;
    }
    if (formData.name.trim().length < 3) {
      showToast('El nombre debe tener al menos 3 caracteres', 'error');
      return;
    }
    if (!isValidEmail(formData.email)) {
      showToast('Email inválido', 'error');
      return;
    }
    if (!isValidPassword(formData.password)) {
      showToast('Contraseña debe tener al menos 8 caracteres', 'error');
      return;
    }

    // Validar email único localmente (backend debe validar también)
    if (accounts.some(acc => acc.email === formData.email)) {
      showToast('Este email ya está registrado', 'error');
      return;
    }

    try {
      // [TODO: BACKEND] Descomentar y reemplazar con fetch real
      /*
      const response = await fetch('/api/doctors/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          branch: formData.branch,
          role: 'doctor',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error creando cuenta');
      }

      const newAccount = await response.json();
      */

      // SIMULACIÓN TEMPORAL (remover cuando backend esté listo)
      const newAccount = {
        id: Math.max(...accounts.map(a => a.id), 0) + 1,
        name: formData.name,
        email: formData.email,
        branch: formData.branch,
        role: 'doctor',
        createdAt: new Date().toISOString().split('T')[0],
        status: 'active',
      };

      setAccounts([...accounts, newAccount]);
      setFormData({ name: '', email: '', password: '', branch: 'Sucursal Centro' });
      showToast(`Cuenta creada: ${newAccount.name}`, 'success');
    } catch (error) {
      console.error('Error creando cuenta:', error);
      showToast(`Error: ${error.message}`, 'error');
    }
  };

  // ═══════════════════════════════════════════════════════════
  // EDIT ACCOUNT
  // ═══════════════════════════════════════════════════════════

  /**
   * Iniciar modo edición para una cuenta
   * @param {object} account - Datos de la cuenta a editar
   */
  const startEdit = (account) => {
    setEditingId(account.id);
    setEditData({ ...account });
  };

  /**
   * Guardar cambios de cuenta editada
   * 
   * [TODO: BACKEND] PUT /api/doctors/{id}
   * Body:
   * {
   *   name: string (opcional)
   *   email: string (opcional - validar unicidad excepto el actual)
   *   branch: string (opcional)
   *   status: "active" | "inactive" (opcional)
   * }
   * 
   * Response esperada:
   * {
   *   id: number
   *   name: string
   *   email: string
   *   branch: string
   *   role: "doctor"
   *   status: "active" | "inactive"
   *   updatedAt: ISO timestamp
   * }
   * 
   * Errores posibles:
   * - 404: Doctor no encontrado
   * - 400: Email duplicado
   * - 400: Email inválido
   * - 500: Error servidor
   */
  const handleSaveEdit = async () => {
    if (!editData.name.trim()) {
      showToast('El nombre no puede estar vacío', 'error');
      return;
    }

    if (!isValidEmail(editData.email)) {
      showToast('Email inválido', 'error');
      return;
    }

    try {
      // [TODO: BACKEND] Descomentar y reemplazar con fetch real
      /*
      const response = await fetch(`/api/doctors/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editData.name,
          email: editData.email,
          branch: editData.branch,
          status: editData.status,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error actualizando cuenta');
      }

      const updatedAccount = await response.json();
      */

      // SIMULACIÓN TEMPORAL
      setAccounts(
        accounts.map(acc =>
          acc.id === editingId
            ? { ...acc, ...editData }
            : acc
        )
      );

      setEditingId(null);
      setEditData({});
      showToast('Cuenta actualizada', 'success');
    } catch (error) {
      console.error('Error actualizando cuenta:', error);
      showToast(`Error: ${error.message}`, 'error');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  // ═══════════════════════════════════════════════════════════
  // DELETE ACCOUNT
  // ═══════════════════════════════════════════════════════════

  /**
   * Eliminar cuenta de doctor
   * 
   * [TODO: BACKEND] DELETE /api/doctors/{id}
   * 
   * Importante:
   * - Antes de eliminar, verificar si tiene atenciones registradas
   * - Si tiene datos, devolver error o permitir soft-delete (cambiar status a 'inactive')
   * - Considerar: ¿Se elimina completamente o solo se desactiva?
   * - Respuesta esperada: 204 No Content o { success: true }
   * 
   * Errores posibles:
   * - 404: Doctor no encontrado
   * - 409: No se puede eliminar - tiene atenciones registradas
   * - 500: Error servidor
   */
  const handleDeleteAccount = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta cuenta?')) {
      return;
    }

    try {
      // [TODO: BACKEND] Descomentar y reemplazar con fetch real
      /*
      const response = await fetch(`/api/doctors/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error eliminando cuenta');
      }
      */

      // SIMULACIÓN TEMPORAL
      setAccounts(accounts.filter(acc => acc.id !== id));
      showToast('Cuenta eliminada', 'success');
    } catch (error) {
      console.error('Error eliminando cuenta:', error);
      showToast(`Error: ${error.message}`, 'error');
    }
  };

  // ═══════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════

  return (
    <div className="admin-cuentas bg-gray-100 px-4 md:px-6 lg:px-8">
      {/* Header */}
      <div className="admin-header">
        <h1>Gestión de Cuentas </h1>
        <p>Crear y administrar cuentas de médicos</p>
      </div>

      {/* Form Crear Cuenta */}
      <div className="form-section">
        <div className="form-title">
          
          Crear Nueva Cuenta
        </div>

        <form onSubmit={handleCreateAccount}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Nombre completo <span className="form-label-required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: Dr. Juan Pérez"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Email <span className="form-label-required">*</span>
              </label>
              <input
                type="email"
                className="form-input"
                placeholder="medico@dermoclinica.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Contraseña <span className="form-label-required">*</span>
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="Mín. 8 caracteres"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

          
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Crear Cuenta
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setFormData({ name: '', email: '', password: '' })}
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>

      {/* Tabla de Cuentas */}
      <div className="table-section">
        <div className="table-header">
          <div className="table-title">
            
            Cuentas Creadas
          </div>
          <div className="table-counter">{accounts.length} cuentas</div>
        </div>

        {accounts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <div className="empty-state-text">No hay cuentas creadas</div>
            <div className="empty-state-subtext">Crea la primera cuenta usando el formulario arriba</div>
          </div>
        ) : (
          <table className="table-responsive">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Fecha Creación</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.name}</td>
                  <td className="table-cell-email">{account.email}</td>
                  
                  <td>{account.createdAt}</td>
                  <td>
                    <span className={`table-cell-badge ${account.status === 'active' ? '' : 'other'}`}>
                      {account.status === 'active' ? '🟢 Activo' : '⚪ Inactivo'}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn-icon btn-edit"
                        onClick={() => startEdit(account)}
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-icon btn-delete"
                        onClick={() => handleDeleteAccount(account.id)}
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Editar */}
      {editingId !== null && (
        <div className="modal-overlay" onClick={cancelEdit}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Editar Cuenta</h2>

            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-input"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              />
            </div>


            <div className="modal-actions">
              <button className="btn-secondary" onClick={cancelEdit}>
                Cancelar
              </button>
              <button className="btn-primary" onClick={handleSaveEdit}>
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notificación */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}
    </div>
  );
};

export default AdminCuentas;

// src/pages/CajaChica.jsx
import React, { useState } from "react";
import "../styles/cajachica.css";

const CajaChica = () => {
  const [filterBranch, setFilterBranch] = useState("todas");
  const [filterMonth, setFilterMonth] = useState("todos");

  // Base de datos de gastos (simulada - en producción vendría del backend)
  const gastosDB = [
    {
      id: 1,
      description: "Compra de guantes desechables",
      amount: 150.00,
      branch: "Sucursal A",
      date: "2025-11-28T10:30:00"
    },
    {
      id: 2,
      description: "Pago de luz mensual",
      amount: 450.00,
      branch: "Sucursal B",
      date: "2025-11-27T14:15:00"
    },
    {
      id: 3,
      description: "Compra de cremas faciales",
      amount: 320.50,
      branch: "Sucursal A",
      date: "2025-11-26T09:00:00"
    },
    {
      id: 4,
      description: "Reparación de equipo láser",
      amount: 800.00,
      branch: "Sucursal C",
      date: "2025-11-25T16:45:00"
    },
    {
      id: 5,
      description: "Material de limpieza",
      amount: 95.00,
      branch: "Sucursal B",
      date: "2025-11-24T11:20:00"
    },
    {
      id: 6,
      description: "Compra de mascarillas N95",
      amount: 200.00,
      branch: "Sucursal A",
      date: "2025-11-23T08:30:00"
    },
    {
      id: 7,
      description: "Pago de agua mensual",
      amount: 180.00,
      branch: "Sucursal C",
      date: "2025-11-22T13:00:00"
    },
    {
      id: 8,
      description: "Publicidad en redes sociales",
      amount: 500.00,
      branch: "Sucursal A",
      date: "2025-11-21T10:00:00"
    },
    {
      id: 9,
      description: "Compra de jeringas y agujas",
      amount: 275.00,
      branch: "Sucursal B",
      date: "2025-11-20T15:30:00"
    },
    {
      id: 10,
      description: "Café y snacks para personal",
      amount: 120.00,
      branch: "Sucursal C",
      date: "2025-11-19T09:45:00"
    },
    {
      id: 11,
      description: "Impresión de folletos",
      amount: 350.00,
      branch: "Sucursal A",
      date: "2025-11-18T14:00:00"
    },
    {
      id: 12,
      description: "Compra de alcohol y desinfectantes",
      amount: 180.00,
      branch: "Sucursal B",
      date: "2025-11-17T11:30:00"
    },
    {
      id: 13,
      description: "Compra de alcohol y desinfectantes",
      amount: 180.00,
      branch: "Sucursal D",
      date: "2025-11-17T11:30:00"
    },
    {
      id: 14,
      description: "Compra de alcohol y desinfectantes",
      amount: 180.00,
      branch: "Sucursal E",
      date: "2025-11-17T11:30:00"
    },
    {
      id: 15,
      description: "Compra de alcohol y desinfectantes",
      amount: 180.00,
      branch: "Sucursal F",
      date: "2025-11-17T11:30:00"
    },
  ];

  // Obtener sucursales únicas
  const branches = ["todas", ...new Set(gastosDB.map(g => g.branch))];

  // Filtrar gastos
  const filteredGastos = gastosDB.filter((gasto) => {
    const matchBranch = filterBranch === "todas" || gasto.branch === filterBranch;
    
    const gastoMonth = new Date(gasto.date).getMonth();
    const matchMonth = filterMonth === "todos" || gastoMonth === parseInt(filterMonth);

    return matchBranch && matchMonth;
  });

  // Calcular totales
  const totalGastos = filteredGastos.reduce((sum, g) => sum + g.amount, 0);
  const totalGeneral = gastosDB.reduce((sum, g) => sum + g.amount, 0);

  // Formatear fecha
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Obtener resumen por sucursal
  const branchSummary = filteredGastos.reduce((acc, gasto) => {
    if (!acc[gasto.branch]) {
      acc[gasto.branch] = 0;
    }
    acc[gasto.branch] += gasto.amount;
    return acc;
  }, {});

  return (
    <div className="cajachica-container">
      {/* Header */}
      <div className="cajachica-header">
        <div className="header-title">
          <h1 >
            Caja Chica
          </h1>
        </div>
        <div className="header-stats">
          <div className="stat-card total">
            <span className="stat-label">Total Filtrado</span>
            <span className="stat-value">Bs. {totalGastos.toFixed(2)}</span>
          </div>
          <div className="stat-card general">
            <span className="stat-label">Total General</span>
            <span className="stat-value">Bs. {totalGeneral.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="filters-section">
        <div className="filter-group">
          <select
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
            className="filter-select"
          >
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch === "todas" ? "Todas las sucursales" : branch}
              </option>
            ))}
          </select>
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="filter-select"
          >
            <option value="todos">Todos los meses</option>
            <option value="0">Enero</option>
            <option value="1">Febrero</option>
            <option value="2">Marzo</option>
            <option value="3">Abril</option>
            <option value="4">Mayo</option>
            <option value="5">Junio</option>
            <option value="6">Julio</option>
            <option value="7">Agosto</option>
            <option value="8">Septiembre</option>
            <option value="9">Octubre</option>
            <option value="10">Noviembre</option>
            <option value="11">Diciembre</option>
          </select>
        </div>
        <div className="results-count">
          {filteredGastos.length} gasto{filteredGastos.length !== 1 ? "s" : ""} encontrado{filteredGastos.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Lista de Gastos */}
      <div className="gastos-list">
        {filteredGastos.length > 0 ? (
          filteredGastos.map((gasto) => (
            <div key={gasto.id} className="gasto-card">
              <div className="gasto-icon">
                <span className="material-symbols-outlined">receipt</span>
              </div>
              <div className="gasto-info">
                <div className="gasto-header">
                  <h3 className="gasto-description">{gasto.description}</h3>
                </div>
                <div className="gasto-details">
                  <span className="detail-item">
                    <span className="material-symbols-outlined">location_on</span>
                    {gasto.branch}
                  </span>
                  <span className="detail-item">
                    <span className="material-symbols-outlined">calendar_today</span>
                    {formatDate(gasto.date)}
                  </span>
                  <span className="detail-item">
                    <span className="material-symbols-outlined">schedule</span>
                    {formatTime(gasto.date)}
                  </span>
                </div>
              </div>
              <div className="gasto-amount">
                <span className="amount-label">Monto</span>
                <span className="amount-value">Bs. {gasto.amount.toFixed(2)}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <span className="material-symbols-outlined empty-icon">inbox</span>
            <h3>No se encontraron gastos</h3>
            <p>Intenta con otros filtros de búsqueda</p>
          </div>
        )}
      </div>

      {/* Resumen por Sucursal */}
      <div className="branch-summary">
        <h3>Resumen por Sucursal</h3>
        <div className="branch-cards">
          {Object.entries(branchSummary).map(([branch, total]) => (
            <div key={branch} className="branch-card">
              <div className="branch-icon">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div className="branch-info">
                <span className="branch-name">{branch}</span>
                <span className="branch-total">Bs. {total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CajaChica;

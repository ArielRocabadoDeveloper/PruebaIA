// src/pages/Buscar.jsx
import React, { useState } from "react";
import "../styles/buscar.css";

const Buscar = () => {
  const [ci, setCi] = useState("");
  const [patient, setPatient] = useState(null);

  // Simulación de base de datos de pacientes con historial completo
  const patientsDB = {
    1234567: {
      name: "Ana María Castillo",
      phone: "68018322",
      totalVisits: 12,
      totalSpent: 1800.00,
      history: [
        {
          id: 1,
          date: "2025-11-15",
          doctor: "Dra. Alejandra Torres",
          services: [
            { name: "Limpieza facial", qty: 1 },
            { name: "Hidratación profunda", qty: 1 },
          ],
          products: [
            { name: "Protector solar SPF 50", qty: 1 },
            { name: "Crema hidratante", qty: 2 },
          ],
          observations: "Piel deshidratada, se recomendó usar protector solar diariamente",
          photo: true,
          total: 280.00,
        },
        {
          id: 2,
          date: "2025-11-08",
          doctor: "Dr. Carlos Pérez",
          services: [
            { name: "Peeling químico", qty: 1 },
          ],
          products: [
            { name: "Serum vitamínico", qty: 1 },
          ],
          observations: "",
          photo: false,
          total: 320.50,
        },
        {
          id: 3,
          date: "2025-11-01",
          doctor: "Dra. María López",
          services: [
            { name: "Tratamiento acné", qty: 1 },
            { name: "Masaje facial", qty: 1 },
          ],
          products: [
            { name: "Gel limpiador", qty: 1 },
            { name: "Mascarilla facial", qty: 1 },
          ],
          observations: "Mejoría notable en lesiones de acné. Continuar con tratamiento semanal",
          photo: true,
          total: 350.75,
        },
      ],
    },
    7654321: {
      name: "Carlos Pérez",
      phone: "71234567",
      totalVisits: 8,
      totalSpent: 1120.00,
      history: [
        {
          id: 1,
          date: "2025-11-12",
          doctor: "Dra. Alejandra Torres",
          services: [
            { name: "Depilación láser", qty: 1 },
          ],
          products: [
            { name: "Protector solar SPF 50", qty: 1 },
          ],
          observations: "Depilación completada. Evitar exposición al sol por 48 horas",
          photo: false,
          total: 420.00,
        },
        {
          id: 2,
          date: "2025-10-28",
          doctor: "Dr. Carlos Pérez",
          services: [
            { name: "Limpieza facial", qty: 1 },
          ],
          products: [
            { name: "Crema hidratante", qty: 1 },
          ],
          observations: "",
          photo: true,
          total: 200.00,
        },
      ],
    },
  };

  // Búsqueda de paciente
  const handleSearch = () => {
    if (!ci.trim()) {
      alert("Ingrese CI para buscar");
      return;
    }

    const p = patientsDB[ci];
    if (p) {
      setPatient({
        ci,
        ...p,
      });
    } else {
      setPatient(null);
      alert("No se encontró paciente. Puede registrar uno nuevo.");
    }
  };

  // Manejar Enter en input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Obtener iniciales del paciente
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Formatear fecha
  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString("es-ES", options);
  };

  return (
    <div className="buscar-container bg-gray-100">
      {/* Header */}
      <div className="buscar-header px-4 md:px-4 lg:px-4">
        <h1>Buscar Paciente</h1>
        <p>Ingrese el carnet de identidad (CI) para ver el historial</p>
      </div>

      {/* Search Section */}
      <div className="search-section px-4 md:px-6 lg:px-8">
        <div className="search-group">
          <input
            type="number"
            placeholder="Carnet de identidad (CI)"
            value={ci}
            onChange={(e) => setCi(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">
            Buscar 
          </button>
        </div>
      </div>

      {/* Patient Info */}
      {patient ? (
        <>
          {/* Patient Card */}
          <div className="patient-info-card px-4 md:px-6 lg:px-8">
            <div className="patient-header">
              <div className="patient-avatar">
                {getInitials(patient.name)}
              </div>
              <div className="patient-details">
                <h2>{patient.name}</h2>
                <div className="patient-detail-item">
                  <span>Telefono:</span>
                  <span>{patient.phone}</span>
                </div>
                <div className="patient-detail-item">

                  <span >CI:</span>
                  <span>{patient.ci}</span>
                </div>
                <div className="patient-stat">
                  <div className="patient-stat-item">
                    <span className="patient-stat-value">
                      {patient.totalVisits}
                    </span>
                    <span className="patient-stat-label">Visitas</span>
                  </div>
                  <div className="patient-stat-item">
                    <span className="patient-stat-value">
                      {patient.totalSpent.toFixed(2)}
                    </span>
                    <span className="patient-stat-label">Total Bs.</span>
                  </div>
                  <div className="patient-stat-item">
                    <span className="patient-stat-value">
                      {(patient.totalSpent / patient.totalVisits).toFixed(2)}
                    </span>
                    <span className="patient-stat-label">Promedio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="history-section px-4 md:px-6 lg:px-8">
            <h3 className="history-title">
              <span className="history-title-icon">📋</span>
              Historial de Atenciones ({patient.history.length})
            </h3>

            {patient.history && patient.history.length > 0 ? (
              <div className="history-list">
                {patient.history.map((attendance) => (
                  <div key={attendance.id} className="attendance-card">
                    {/* Header */}
                    <div className="attendance-header">
                      <div>
                        <div className="attendance-date">Fecha de atención</div>
                        <div className="attendance-date-value">
                          {formatDate(attendance.date)}
                        </div>
                      </div>
                      <div className="attendance-doctor">
                        <div className="attendance-doctor-label">Médico</div>
                        <div className="attendance-doctor-name">
                          {attendance.doctor}
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="attendance-body">
                      {/* Servicios */}
                      {attendance.services && attendance.services.length > 0 && (
                        <div className="attendance-section">
                          <div className="attendance-section-title">
                            <span>💆</span> Servicios
                          </div>
                          <div className="attendance-items">
                            {attendance.services.map((service, i) => (
                              <div key={i} className="attendance-item">
                                <span className="attendance-item-name">
                                  {service.name}
                                </span>
                                <span className="attendance-item-qty">
                                  x{service.qty}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Productos */}
                      {attendance.products && attendance.products.length > 0 && (
                        <div className="attendance-section">
                          <div className="attendance-section-title">
                            <span>🧴</span> Productos
                          </div>
                          <div className="attendance-items">
                            {attendance.products.map((product, i) => (
                              <div key={i} className="attendance-item">
                                <span className="attendance-item-name">
                                  {product.name}
                                </span>
                                <span className="attendance-item-qty">
                                  x{product.qty}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Observaciones */}
                      {attendance.observations && attendance.observations.trim() !== "" && (
                        <div className="attendance-section">
                          <div className="attendance-section-title">
                            <span>📝</span> Observaciones
                          </div>
                          <div className="attendance-observations">
                            {attendance.observations}
                          </div>
                        </div>
                      )}

                      {/* Foto */}
                      <div className="attendance-section">
                        <div className="attendance-section-title">
                          <span>📷</span> Foto
                        </div>
                        <div className="attendance-photo-status">
                          {attendance.photo ? (
                            <span className="photo-yes">✓ Sí</span>
                          ) : (
                            <span className="photo-no">✗ No</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="attendance-footer">
                      <span className="attendance-total-label">
                        Total de atención:
                      </span>
                      <span className="attendance-total-value">
                        Bs. {attendance.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📭</div>
                <p className="empty-state-text">
                  No hay registros de atenciones
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="empty-state px-4 md:px-6 lg:px-8">
          <div className="empty-state-icon">🔍</div>
          <p className="empty-state-text">
            Ingrese un CI para visualizar el historial del paciente
          </p>
        </div>
      )}
    </div>
  );
};

export default Buscar;

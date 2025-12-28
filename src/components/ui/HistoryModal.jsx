import React from "react";
import "../../styles/historyModal.css";

const HistoryModal = ({ patient, onClose }) => {
  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString("es-ES", options);
  };

  if (!patient) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="history-modal">
        <div className="modal-header">
          <div className="modal-title-section">
            <h2>Carpeta Clínica</h2>
            <h3>{patient.name}</h3>
          </div>
          <button
            className="close-modal-btn"
            onClick={onClose}
            title="Cerrar"
          >
            ✕
          </button>
        </div>

        <div className="modal-content">
          {/* Datos del Paciente */}
          <div className="modal-section">
            <h4 className="modal-section-title">
              <span className="material-symbols-outlined">monitor_heart</span>
              Datos del Paciente
            </h4>
            <div className="patient-data-grid">
              <div className="data-item">
                <span className="data-label">CI</span>
                <span className="data-value">{patient.ci}</span>
              </div>
              <div className="data-item">
                <span className="data-label">Teléfono</span>
                <span className="data-value">{patient.phone}</span>
              </div>
              <div className="data-item">
                <span className="data-label">Correo</span>
                <span className="data-value email-text">{patient.email}</span>
              </div>
              <div className="data-item">
                <span className="data-label">Visitas</span>
                <span className="data-value highlight">
                  {patient.totalVisits}
                </span>
              </div>
              <div className="data-item">
                <span className="data-label">Total Gastado</span>
                <span className="data-value highlight-green">
                  Bs. {patient.totalSpent.toFixed(2)}
                </span>
              </div>
              <div className="data-item">
                <span className="data-label">Promedio</span>
                <span className="data-value">
                  Bs. {(patient.totalSpent / patient.totalVisits).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Historial de Atenciones */}
          <div className="modal-section">
            <h4 className="modal-section-title">
              <span className="material-symbols-outlined">receipt_long</span>
              Historial de Atenciones
            </h4>
            {patient.history && patient.history.length > 0 ? (
              <div className="history-cards-container">
                {patient.history.map((visit) => (
                  <div key={visit.id} className="history-card">
                    <div className="history-card-header">
                      <div className="history-date">
                        <span className="material-symbols-outlined date-icon">calendar_today</span>
                        <span className="date-text">{formatDate(visit.date)}</span>
                      </div>
                      <div className="photo-badge">
                        {visit.photo ? (
                          <span className="badge-yes">
                            <span className="material-symbols-outlined">photo_camera</span>
                            Sí
                          </span>
                        ) : (
                          <span className="badge-no">
                            No
                            <span className="material-symbols-outlined">photo_camera</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="history-card-body">
                      <div className="history-detail-row">
                        <span className="detail-label">
                          <span className="material-symbols-outlined">clinical_notes</span>
                          Servicios
                        </span>
                        <span className="detail-value">{visit.services}</span>
                      </div>
                      <div className="history-detail-row">
                        <span className="detail-label">
                          <span className="material-symbols-outlined">medication</span>
                          Productos
                        </span>
                        <span className="detail-value">{visit.products}</span>
                      </div>
                      {visit.observations && (
                        <div className="history-detail-row observation-row">
                          <span className="detail-label">
                            <span className="material-symbols-outlined">note_stack</span>
                            Observaciones
                          </span>
                          <span className="detail-value observation-text">
                            {visit.observations}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="history-card-footer">
                      <span className="total-text">Total de atención</span>
                      <span className="total-amount">
                        Bs. {visit.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-history-msg">
                <span className="material-symbols-outlined no-history-icon">inbox</span>
                <p>No hay registros de atenciones</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryModal;

// src/pages/historialpacientes.jsx
import React, { useState } from "react";
import HistoryModal from "../components/ui/HistoryModal";
import "../styles/historial.css";

//hubo un error naming este archivo como cajachica.jsx en vez de historialpacientes.jsx

const HistorialPacientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  // Base de datos de pacientes con historial completo
  const patientsDB = {
    "1234567": {
      id: 1,
      ci: "1234567",
      name: "Ana María Castillo",
      phone: "68018322",
      email: "ana.castillo@email.com",
      totalVisits: 12,
      totalSpent: 1800.00,
      history: [
        {
          id: 1,
          date: "2025-11-15",
          services: "Limpieza facial, Hidratación profunda",
          products: "Protector solar SPF 50, Crema hidratante",
          observations: "Piel deshidratada, se recomendó usar protector solar diariamente",
          photo: true,
          total: 280.00,
        },
        {
          id: 2,
          date: "2025-11-08",
          services: "Peeling químico",
          products: "Serum vitamínico",
          observations: "",
          photo: false,
          total: 320.50,
        },
        {
          id: 3,
          date: "2025-11-01",
          services: "Tratamiento acné, Masaje facial",
          products: "Gel limpiador, Mascarilla facial",
          observations: "Mejoría notable en lesiones de acné",
          photo: true,
          total: 350.75,
        },
      ],
    },
    "7654321": {
      id: 2,
      ci: "7654321",
      name: "Carlos Pérez",
      phone: "71234567",
      email: "carlos.perez@email.com",
      totalVisits: 8,
      totalSpent: 1120.00,
      history: [
        {
          id: 1,
          date: "2025-11-12",
          services: "Depilación láser",
          products: "Protector solar SPF 50",
          observations: "Depilación completada. Evitar exposición al sol 48h",
          photo: false,
          total: 420.00,
        },
        {
          id: 2,
          date: "2025-10-28",
          services: "Limpieza facial",
          products: "Crema hidratante",
          observations: "",
          photo: true,
          total: 200.00,
        },
      ],
    },
    "8901234": {
      id: 3,
      ci: "8901234",
      name: "María López García",
      phone: "72345678",
      email: "maria.lopez@email.com",
      totalVisits: 15,
      totalSpent: 2450.50,
      history: [
        {
          id: 1,
          date: "2025-11-18",
          services: "Microdermabrasión, Peeling",
          products: "Suero hidratante",
          observations: "Excelentes resultados",
          photo: true,
          total: 450.00,
        },
      ],
    },
    "5678901": {
      id: 4,
      ci: "5678901",
      name: "Roberto Mendoza",
      phone: "73456789",
      email: "roberto.mendoza@email.com",
      totalVisits: 3,
      totalSpent: 280.00,
      history: [
        {
          id: 1,
          date: "2025-10-05",
          services: "Consulta inicial",
          products: "Crema facial",
          observations: "Paciente nuevo",
          photo: false,
          total: 280.00,
        },
      ],
    },
    "2345678": {
      id: 5,
      ci: "2345678",
      name: "Fernanda Torres",
      phone: "74567890",
      email: "fernanda.torres@email.com",
      totalVisits: 10,
      totalSpent: 1650.75,
      history: [
        {
          id: 1,
          date: "2025-11-16",
          services: "Rejuvenecimiento facial",
          products: "Mascarilla de oro",
          observations: "Tratamiento premium",
          photo: true,
          total: 500.00,
        },
      ],
    },
    "9012345": {
      id: 6,
      ci: "9012345",
      name: "Diego Ramírez",
      phone: "75678901",
      email: "diego.ramirez@email.com",
      totalVisits: 6,
      totalSpent: 890.25,
      history: [
        {
          id: 1,
          date: "2025-11-10",
          services: "Tratamiento capilar",
          products: "Shampoo premium",
          observations: "Buen resultado",
          photo: false,
          total: 890.25,
        },
      ],
    },
    "3456789": {
      id: 7,
      ci: "3456789",
      name: "Lucia Morales",
      phone: "76789012",
      email: "lucia.morales@email.com",
      totalVisits: 2,
      totalSpent: 350.00,
      history: [
        {
          id: 1,
          date: "2025-08-20",
          services: "Consulta",
          products: "Productos básicos",
          observations: "",
          photo: false,
          total: 350.00,
        },
      ],
    },
    "6789012": {
      id: 8,
      ci: "6789012",
      name: "Valentina Sánchez",
      phone: "77890123",
      email: "valentina.sanchez@email.com",
      totalVisits: 20,
      totalSpent: 3200.00,
      history: [
        {
          id: 1,
          date: "2025-11-19",
          services: "Botox facial",
          products: "Crema premium",
          observations: "Cliente VIP",
          photo: true,
          total: 800.00,
        },
      ],
    },
    "4567890": {
      id: 9,
      ci: "4567890",
      name: "Jorge Martínez",
      phone: "78901234",
      email: "jorge.martinez@email.com",
      totalVisits: 7,
      totalSpent: 920.50,
      history: [
        {
          id: 1,
          date: "2025-11-14",
          services: "Tratamiento de estrías",
          products: "Crema especial",
          observations: "Seguimiento en proceso",
          photo: true,
          total: 920.50,
        },
      ],
    },
    "7890123": {
      id: 10,
      ci: "7890123",
      name: "Isabela Flores",
      phone: "79012345",
      email: "isabela.flores@email.com",
      totalVisits: 4,
      totalSpent: 580.00,
      history: [
        {
          id: 1,
          date: "2025-09-30",
          services: "Limpieza profunda",
          products: "Mascarilla facial",
          observations: "",
          photo: false,
          total: 580.00,
        },
      ],
    },
  };

  // Lista de todos los pacientes para búsqueda
  const patientsList = Object.values(patientsDB);

  // Filtrar pacientes según búsqueda
  const filteredPatients = patientsList.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.ci.includes(searchTerm)
  );

  // Paciente seleccionado
  const selectedPatient = selectedPatientId
    ? patientsDB[selectedPatientId]
    : null;

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
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString("es-ES", options);
  };

  // Obtener días desde última visita
  const getDaysSinceLastVisit = (lastVisit) => {
    const last = new Date(lastVisit);
    const today = new Date();
    const diff = Math.floor((today - last) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="cajachica-container bg-gray-100">
      {/* LISTA PRINCIPAL DE PACIENTES */}
      <div className="patients-main-section">
        {/* Header */}
        <div className="main-header">
          <div className="header-content">
            <h1>Historial - Pacientes</h1>
            <p>Selecciona un paciente para ver su historial completo</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="main-search-section">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Buscar por nombre o CI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="main-search-input"
            />
            <span className="search-icon-main">🔍</span>
          </div>
          <div className="search-info">
            {filteredPatients.length} paciente{filteredPatients.length !== 1 ? "s" : ""} encontrado{filteredPatients.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Lista de Pacientes */}
        <div className="patients-list-main">
          {filteredPatients.length > 0 ? (
            <div className="list-container">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.ci}
                  className="patient-list-item"
                  onClick={() => setSelectedPatientId(patient.ci)}
                >
                  <div className="list-item-avatar">
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="list-item-content">
                    <h4>{patient.name}</h4>
                    <p>{patient.ci}</p>
                  </div>
                  <div className="list-item-arrow">→</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-main">
              <div className="empty-icon-main">🔍</div>
              <h3>No se encontraron pacientes</h3>
              <p>Intenta con otro término de búsqueda</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL/OVERLAY CON HISTORIAL */}
      {selectedPatient && (
        <HistoryModal
          patient={selectedPatient}
          onClose={() => setSelectedPatientId(null)}
        />
      )}
    </div>
  );
};

export default HistorialPacientes;

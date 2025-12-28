import React, { useState } from "react";
import PreviewAtencion from "../previews/PreviewAtencion";

const RegisterAppointmentForm = ({ currentUser, currentBranch }) => {
  const [ci, setCi] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [paymentType, setPaymentType] = useState("efectivo");
  const [manualTotal, setManualTotal] = useState("");
  const [items, setItems] = useState([]);
  const [observations, setObservations] = useState("");
  const [photo, setPhoto] = useState(null);
  const [hasPhoto, setHasPhoto] = useState(false);

  // Datos simulados (luego vienen del backend)
  const services = [
    { id: "s1", name: "Limpieza facial", price: 80 },
    { id: "s2", name: "Radiofrecuencia", price: 120 },
    { id: "s3", name: "Peeling", price: 60 },
    { id: "s4", name: "Masaje relajante", price: 160 },
  ];
  const products = [
    { id: "p1", name: "Crema hidratante", price: 50 },
    { id: "p2", name: "Protector solar", price: 70 },
    { id: "p3", name: "Serum vitamínico", price: 120 },
  ];

  // Simulación de pacientes (luego del backend)
  const pacientes = {
    1234567: { name: "Ana María Castillo", phone: "68018322" },
    7654321: { name: "Carlos Pérez", phone: "71234567" },
  };

  const [selectedService, setSelectedService] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  const [selectedProduct, setSelectedProduct] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleServiceChange = (e) => {
    const id = e.target.value;
    const serv = services.find((s) => s.id === id);
    if (serv) {
      setServicePrice(serv.price);
    }
  };

  const handleProductChange = (e) => {
    const id = e.target.value;
    const prod = products.find((p) => p.id === id);
    if (prod) {
      setProductPrice(prod.price);
    }
  };

  const handleAddService = () => {
    if (!selectedService) {
      alert("Seleccione un servicio");
      return;
    }

    const serv = services.find((s) => s.id === selectedService);
    const price = parseFloat(servicePrice) || serv.price;

    setItems((prev) => [
      ...prev,
      {
        type: "serv",
        id: serv.id,
        name: serv.name,
        price,
        uid: Date.now() + Math.random(),
      },
    ]);
  };

  const handleAddProduct = () => {
    if (!selectedProduct) {
      alert("Seleccione un producto");
      return;
    }

    const prod = products.find((p) => p.id === selectedProduct);
    const price = parseFloat(productPrice) || prod.price;

    setItems((prev) => [
      ...prev,
      {
        type: "prod",
        id: prod.id,
        name: prod.name,
        price,
        uid: Date.now() + Math.random(),
      },
    ]);
  };

  const handleRemoveItem = (uid) => {
    setItems((prev) => prev.filter((item) => item.uid !== uid));
  };

  const calculateTotal = () => {
    const sum = items.reduce((acc, item) => acc + (item.price || 0), 0);
    const manual = parseFloat(manualTotal);
    return manual && manual > 0 ? manual : sum;
  };

  const handleLookup = () => {
    if (!ci) {
      alert("Ingrese CI para buscar");
      return;
    }

    const p = pacientes[ci];
    if (p) {
      setPatientName(p.name);
      setPatientPhone(p.phone);
      alert("Paciente encontrado y autocompletado.");
    } else {
      alert(
        "No se encontró paciente. Complete los datos para registrar uno nuevo."
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.length === 0) {
      alert("Agregue al menos 1 servicio o producto antes de registrar.");
      return;
    }

    const payload = {
      encargado: currentUser,
      sucursal: currentBranch,
      patient: {
        ci: ci.trim(),
        name: patientName.trim(),
        phone: patientPhone.trim(),
      },
      items: items.map((i) => ({
        type: i.type,
        id: i.id,
        name: i.name,
        price: i.price,
      })),
      payment: {
        type: paymentType,
        total: calculateTotal(),
      },
      observations: observations,
      hasPhoto: hasPhoto,
      photo: photo ? URL.createObjectURL(photo) : null,
      createdAt: new Date().toISOString(),
    };

    console.log("Payload a enviar al servidor:", payload);
    alert(
      "Atención registrada (simulación). Revisa la consola para ver el payload."
    );
    // Limpiar formulario
    setItems([]);
    setCi("");
    setPatientName("");
    setPatientPhone("");
    setManualTotal("");
    setObservations("");
    setPhoto(null);
    setHasPhoto(false);
  };

  return (
    <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_380px] gap-4 p-4">
      {/* Left: Form */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-green-600 mb-3">
          Registrar nueva atención
        </h2>

        {/* Patient lookup */}
        <label className="block text-sm text-gray-500 mb-1">
          Carnet de identidad (CI)
        </label>
        <div className="flex gap-2 mb-3">
          <input
            id="ci"
            type="text"
            placeholder="Ej: 1234567"
            value={ci}
            onChange={(e) => setCi(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleLookup}
            className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50"
          >
            Buscar
          </button>
        </div>
        <label className="block text-sm text-gray-500 mb-1">Paciente</label>
        <input
          id="patient-name"
          type="text"
          placeholder="Nombre del paciente"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        <label className="block text-sm text-gray-500 mb-1">Celular</label>
        <input
          id="patient-phone"
          type="tel"
          placeholder="telefono"
          value={patientPhone}
          onChange={(e) => setPatientPhone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <hr className="border-t border-gray-200 my-4" />

        {/* service selector */}
        <label className="block text-sm text-gray-500 mb-1">Servicio</label>
        <div className="flex gap-2 mb-3">
          <select
            id="service-select"
            value={selectedService}
            onChange={(e) => {
              setSelectedService(e.target.value);
              handleServiceChange(e);
            }}
            className="w-full p-4 border border-gray-300 rounded-md"
          >
            <option value="">Seleccionar servicio</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.price} Bs.
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 mb-3">
          <input
            id="service-price"
            type="number"
            placeholder="Precio"
            min="0"
            value={servicePrice}
            onChange={(e) => setServicePrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button 
            onClick={handleAddService}
            className="px-9 py-2"
            style={{
              backgroundColor: "#31b237",
              color: "white",
              borderRadius: "0.375rem",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#2fae30")
            } // Hover color
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#31b237")
            } // Restore original color
          >
            + Agregar
          </button>
        </div>

        {/* product selector */}

        <label className="block text-sm text-gray-500 mb-1">Producto</label>

        <div className="flex gap-4 mb-4">
          <select
            id="product-select"
            value={selectedProduct}
            onChange={(e) => {
              setSelectedProduct(e.target.value);
              handleProductChange(e);
            }}
            className="w-full p-4 border border-gray-300 rounded-md"
          >
            <option value="">Seleccionar producto</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.price} Bs.
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 mb-4">
          <input
            id="product-price"
            type="number"
            placeholder="Precio"
            min="0"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleAddProduct}
            className="px-9 py-2"
            style={{
              backgroundColor: "#31b237",
              color: "white",
              borderRadius: "0.375rem",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#2fae30")
            } // Hover color
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#31b237")
            } // Restore original color
          >
            + Agregar
          </button>
        </div>

        <label className="block text-sm text-gray-500 mb-1">Tipo de pago</label>
        <div className="flex gap-2 mb-4">
          <select
            id="payment-type"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="efectivo">Efectivo</option>
            <option value="qr">QR</option>
            <option value="tarjeta">Tarjeta</option>
          </select>
          <input
            id="manual-total"
            type="number"
            placeholder="Ajuste total (opcional)"
            value={manualTotal}
            onChange={(e) => setManualTotal(e.target.value)}
            className="w-40 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Observaciones */}
        <label className="block text-sm text-gray-500 mb-1">
          Observaciones
        </label>
        <textarea
          id="observations"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          rows="3"
          placeholder="Notas adicionales sobre la atención"
        ></textarea>

        {/* Foto */}
        <label className="block text-sm text-gray-500 mb-1">Foto</label>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="has-photo"
            checked={hasPhoto}
            onChange={(e) => setHasPhoto(e.target.checked)}
            className="ml-3"
          />
          <label htmlFor="has-photo" className="ml-1 text-sm text-gray-500">
            ¿Tiene foto? En el caso que si enviela al Whatsapp
          </label>
        </div>

        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className= " px-4 py-2  text-white rounded-md "
            style={{
              backgroundColor: "#31b237",
              color: "white",
              borderRadius: "0.375rem",
            }}
          >
            Registrar atención
          </button>
        </div>

        <div className="footer mt-4 text-sm text-gray-500">
          Simula buscar un paciente por CI (autocompleta nombre/celular si
          existe).
        </div>
      </div>

      {/* Right: Preview */}
      <PreviewAtencion
        items={items}
        onRemove={handleRemoveItem}
        total={calculateTotal()}
        currentUser={currentUser}
        currentBranch={currentBranch}
      />
    </div>
  );
};

export default RegisterAppointmentForm;

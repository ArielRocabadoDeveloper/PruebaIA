import React from 'react';
import { useAuth } from '../context/AuthContext';
import RegisterAppointmentForm from '../components/forms/RegisterAppointmentForm';

const Atencion = () => {
  const { user } = useAuth();
  const currentUser = user?.name || 'Alejandra Torres';
  const currentBranch = user?.branch || 'Sucursal A';

  return (
    <div className="min-h-screen bg-gray-50">
      <RegisterAppointmentForm currentUser={currentUser} currentBranch={currentBranch} />
    </div>
  );
};

export default Atencion;
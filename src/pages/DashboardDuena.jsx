import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/dashboardDuena.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const DashboardDuena = () => {
  const { user } = useAuth();

  const [data] = useState({
    totalGenerated: 12540.50,
    commissionsPercentage: 30,
    totalComparedLastMonth: 28,
    nettComparedLastMonth: 35,
    topService: { name: 'Limpieza facial', count: 210 },
    topProduct: { name: 'Crema hidratante', sales: 89 },
    //en paymentMethods tiene que terminar con bs corrige
    paymentMethods: {
      efectivo: 245, 
      qr: 187,
      tarjeta: 156,
    }, 
    topProducts: [
      { name: 'Crema hidratante', sales: 89 },
      { name: 'Protector solar', sales: 76 },
      { name: 'Serum vitamínico', sales: 65 },
      { name: 'Gel limpiador', sales: 54 },
      { name: 'Mascarilla facial', sales: 43 },
      { name: 'Exfoliante', sales: 32 },
    ],
    topServices: [
      { name: 'Limpieza facial', count: 210 },
      { name: 'Tratamiento acné', count: 185 },
      { name: 'Peeling químico', count: 142 },
      { name: 'Masaje facial', count: 118 },
      { name: 'Hidratación profunda', count: 95 },
      { name: 'Depilación láser', count: 76 },
    ],
    branches: [
      { name: 'Sucursal Centro', attendances: 185 },
      { name: 'Sucursal Sur', attendances: 156 },
      { name: 'Sucursal Este', attendances: 142 },
      { name: 'Sucursal Oeste', attendances: 128 },
      { name: 'Sucursal Norte', attendances: 98 },
      { name: 'Sucursal Zona Nueva', attendances: 76 },
    ],
    doctorsStats: [
      { name: 'Alejandra Torres', attendances: 156 },
      { name: 'Carlos Pérez', attendances: 142 },
      { name: 'María López', attendances: 128 },
      { name: 'Dr. Rodríguez', attendances: 115 },
    ],
    clientsStats: [
      { name: 'Ana María Castillo', visits: 12, spent: 1800.00 },
      { name: 'Juan Carlos Rojas', visits: 10, spent: 1480.00 },
      { name: 'Lucía Fernández', visits: 9, spent: 1260.00 },
      { name: 'Patricia González', visits: 8, spent: 1120.00 },
    ],
  });

  const totalNett = data.totalGenerated * (1 - data.commissionsPercentage / 100);

  const barData = {
    labels: data.topProducts.map(p => p.name),
    datasets: [{
      label: 'Ventas',
      data: data.topProducts.map(p => p.sales),
      backgroundColor: 'rgba(49, 178, 55, 0.7)',
      borderColor: '#31b237',
      borderWidth: 2,
      borderRadius: 8,
    }],
  };

  const pieServices = {
    labels: data.topServices.map(s => s.name),
    datasets: [{
      data: data.topServices.map(s => s.count),
      backgroundColor: ['#31b237', '#10b981', '#059669', '#047857', '#065f46', '#064e3b'],
      borderColor: '#ffffff',
      borderWidth: 3,
    }],
  };

  const pieBranches = {
    labels: data.branches.map(b => b.name),
    datasets: [{
      data: data.branches.map(b => b.attendances),
      backgroundColor: ['#31b237', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#14b8a6'],
      borderColor: '#ffffff',
      borderWidth: 3,
    }],
  };

  return (
    <div className=" dashboard-duena">
      <div className="duena-header px-4 md:px-6 lg:px-8">
        <h1>Hola, {user?.name} </h1>
        
        <p>Panel de administración de DermoClínica</p>
      </div>

      <div className="stats-grid px-4 md:px-6 lg:px-8">
        <div className="stat-card primary">
          <div className="stat-card-label"><span className="stat-card-icon material-symbols-outlined">account_balance_wallet</span> Total generado (mes)</div>
          <div className="stat-card-value">{data.totalGenerated.toFixed(2)}</div>
          <div className="stat-card-sub">Bs. bruto</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label"><span className="stat-card-icon material-symbols-outlined">currency_exchange</span> Total neto ({data.commissionsPercentage}% comisión)</div>
          <div className="stat-card-value">{totalNett.toFixed(2)}</div>
          <div className="stat-card-sub">Bs. después de comisiones</div>
        </div>

        <div className="stat-card dual">
          <div className="stat-card-label"><span className="stat-card-icon material-symbols-outlined">trending_up</span> Comparado al mes pasado</div>
          <div className="stat-dual-row">
            <div className="stat-dual-item">
              <span className="stat-dual-label">Bruto</span>
              <span className="stat-dual-value">+{data.totalComparedLastMonth}%</span>
            </div>
            <div className="stat-dual-item">
              <span className="stat-dual-label">Neto</span>
              <span className="stat-dual-value">+{data.nettComparedLastMonth}%</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label"><span className="stat-card-icon material-symbols-outlined">spa</span> Servicio más requerido</div>
          <div className="stat-card-value" style={{fontSize:'1.6rem'}}>{data.topService.name}</div>
          <div className="stat-card-sub" style={{fontSize:'1.9rem'}}>{data.topService.count} veces</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label"><span className="stat-card-icon material-symbols-outlined">shopping_bag</span> Producto más vendido</div>
          <div className="stat-card-value" style={{fontSize:'1.6rem'}}>{data.topProduct.name}</div>
          <div className="stat-card-sub" style={{fontSize:'1.9rem'}}>{data.topProduct.sales} ventas</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label"><span className="stat-card-icon material-symbols-outlined">payment</span> Formas de pago</div>
          <div className="payment-methods">
            <div className="payment-item">
              <span className="payment-label">Efectivo</span>
              <span className="payment-count">{data.paymentMethods.efectivo} Bs.</span> 
            </div>
            <div className="payment-item">
              <span className="payment-label">QR</span>
              <span className="payment-count">{data.paymentMethods.qr} Bs. </span>
            </div>
            <div className="payment-item">
              <span className="payment-label">Tarjeta</span>
              <span className="payment-count">{data.paymentMethods.tarjeta} Bs.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="charts-section px-4 md:px-6 lg:px-8">
        <div className="chart-card">
          <div className="chart-title"><span className="chart-title-icon material-symbols-outlined">bar_chart</span> Top 6 productos más vendidos</div>
          <div className="chart-container">
            <Bar data={barData} options={{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true, ticks:{color:'#6b7280'}}, x:{ticks:{color:'#6b7280'}}}}} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-title"><span className="chart-title-icon material-symbols-outlined">health_and_safety</span> Servicios más requeridos</div>
          <div className="chart-container">
            <Pie data={pieServices} options={{responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'bottom', labels:{color:'#6b7280', padding:15}}}}} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-title"><span className="chart-title-icon material-symbols-outlined">store</span> Atenciones por sucursal</div>
          <div className="chart-container">
            <Pie data={pieBranches} options={{responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'bottom', labels:{color:'#6b7280', padding:15}}}}} />
          </div>
        </div>
      </div>

      <div className="lists-section px-4 md:px-6 lg:px-8">
        <div className="list-card">
          <div className="list-title"><span className="list-title-icon material-symbols-outlined">local_hospital</span> Médicos con más atenciones</div>
          <div className="list-items">
            {data.doctorsStats.map((d, i) => (
              <div key={i} className="list-item">
                <div><div className="list-item-name">{d.name}</div></div>
                <div style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                  <span className="list-item-stat">{d.attendances}<span className="list-item-stat-value">atenciones</span></span>
                  <div className="list-item-rank">{i+1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="list-card">
          <div className="list-title"><span className="list-title-icon material-symbols-outlined">people</span> Clientes con más frecuencia</div>
          <div className="list-items">
            {data.clientsStats.map((c, i) => (
              <div key={i} className="list-item">
                <div>
                  <div className="list-item-name">{c.name}</div>
                  <div className="list-item-detail">{c.visits} visitas • {c.spent.toFixed(2)} Bs. gastados</div>
                </div>
                <div className="list-item-rank">{i+1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDuena;

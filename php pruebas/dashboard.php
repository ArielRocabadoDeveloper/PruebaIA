<?php
session_start();
if (!isset($_SESSION['logged_in'])) {
  header('Location: index.php');
  exit;
}
$name = $_SESSION['name'];
$sucursal = $_SESSION['sucursal'];
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dermo Estética - Dashboard</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <header>
    <div class="header-inner">
      <div class="logo">Resumen</div>
      <button class="menu-toggle">☰</button>
      <nav>
        <ul>
          <li><a href="dashboard.php">Inicio</a></li>
          <li><a href="atencion.php">Registrar nueva atención</a></li>
          <li><a href="gasto.php">Registrar nuevo gasto</a></li>
          <li><a href="buscar.php">Buscar paciente</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <div class="container">
    <div class="panel">
      <div class="welcome">
        <h2>
          <img src="assets/doctor.svg" alt="Icono doctor" class="user-icon" aria-hidden="true">
          Bienvenida <?php echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8'); ?>
        </h2>
      </div>
      <div class="stats">
        <div class="stat-box">
          <p>Pacientes hoy:</p>
          <h3>12</h3>
        </div>
        <div class="stat-box">
          <p>Total Generado</p>
          <h3>350Bs.</h3>
        </div>
      </div>
      <label>Pacientes atendidos:</label>
      <div>
        <div class="patient-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.314 0-6 2.686-6 6v2h12v-2c0-3.314-2.686-6-6-6z"/></svg>
          <div>Ana Maria Castillo <div class="small">Fisio Terapia</div></div>
        </div>
        <!-- Repite para más -->
        <div class="patient-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.314 0-6 2.686-6 6v2h12v-2c0-3.314-2.686-6-6-6z"/></svg>
          <div>Ana Maria Castillo <div class="small">Fisio Terapia</div></div>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    document.querySelector('.menu-toggle').addEventListener('click', () => {
      document.querySelector('nav').classList.toggle('open');
    });
  </script>
</body>
</html>
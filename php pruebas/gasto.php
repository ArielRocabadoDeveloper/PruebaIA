<?php
session_start();
if (!isset($_SESSION['logged_in'])) {
  header('Location: index.php');
  exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dermo Estética - Registrar Gasto</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <header>
    <div class="header-inner">
      <div class="logo">Dermo estética</div>
      <button class="menu-toggle">☰</button>
      <nav>
        <ul>
          <li><a href="dashboard.php">Inicio</a></li>
          <li><a href="atencion.php">Registrar nueva atención</a></li>
          <li><a href="gasto.php" class="active">Registrar nuevo gasto</a></li>
          <li><a href="buscar.php">Buscar paciente</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <div class="container">
    <div class="panel" style="max-width: 500px; margin: 0 auto;">
      <h2>Registrar nuevo gasto</h2>
      <label>Descripción</label>
      <input type="text" id="desc" placeholder="Descripción del gasto">
      <label>Monto</label>
      <input type="number" id="monto" placeholder="Monto en Bs." min="0">
      <label>Categoría</label>
      <select id="categoria">
        <option value="suministros">Suministros</option>
        <option value="alquiler">Alquiler</option>
        <option value="salarios">Salarios</option>
        <option value="otros">Otros</option>
      </select>
      <label>Fecha</label>
      <input type="date" id="fecha">
      <button id="btn-submit-gasto" style="margin-top:12px;">Registrar gasto</button>
    </div>
  </div>
  
  <script>
    document.getElementById('btn-submit-gasto').addEventListener('click', () => {
      const payload = {
        desc: document.getElementById('desc').value,
        monto: document.getElementById('monto').value,
        categoria: document.getElementById('categoria').value,
        fecha: document.getElementById('fecha').value
      };
      console.log('Gasto registrado (simulación):', payload);
      alert('Gasto registrado (simulación).');
    });
    document.querySelector('.menu-toggle').addEventListener('click', () => {
      document.querySelector('nav').classList.toggle('open');
    });
  </script>
</body>
</html>
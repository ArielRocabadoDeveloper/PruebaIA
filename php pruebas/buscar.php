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
  <title>Dermo Estética - Buscar Paciente</title>
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
          <li><a href="gasto.php">Registrar nuevo gasto</a></li>
          <li><a href="buscar.php" class="active">Buscar paciente</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <div class="container">
    <div class="panel" style="max-width: 500px; margin: 0 auto;">
      <h2>Buscar paciente</h2>
      <label>Buscar por CI o nombre</label>
      <div class="row">
        <input type="text" id="search-input" placeholder="CI o nombre">
        <button id="btn-search" class="ghost">Buscar</button>
      </div>
      <div id="results" class="list" style="margin-top:12px;"></div>
    </div>
  </div>
  
  <script>
    const pacientesData = [
      { ci: '1234567', name: 'Ana María Castillo', phone: '68018322', treatment: 'Fisio Terapia' },
      { ci: '7654321', name: 'Carlos Pérez', phone: '71234567', treatment: 'Limpieza Facial' }
    ];
    document.getElementById('btn-search').addEventListener('click', () => {
      const query = document.getElementById('search-input').value.toLowerCase().trim();
      const results = pacientesData.filter(p => p.ci.includes(query) || p.name.toLowerCase().includes(query));
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';
      if (results.length === 0) {
        resultsDiv.innerHTML = '<div class="preview-empty">No se encontraron pacientes.</div>';
        return;
      }
      results.forEach(p => {
        const div = document.createElement('div');
        div.className = 'patient-item';
        div.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.314 0-6 2.686-6 6v2h12v-2c0-3.314-2.686-6-6-6z"/></svg>
          <div><strong>${p.name}</strong> <div class="small">CI: ${p.ci} - Tel: ${p.phone} - ${p.treatment}</div></div>
        `;
        resultsDiv.appendChild(div);
      });
    });
    document.querySelector('.menu-toggle').addEventListener('click', () => {
      document.querySelector('nav').classList.toggle('open');
    });
  </script>
</body>
</html>
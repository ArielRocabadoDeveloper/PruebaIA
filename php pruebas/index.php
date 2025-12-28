<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Simula login exitoso
  $_SESSION['logged_in'] = true;
  $_SESSION['name'] = 'Alejandra';
  $_SESSION['sucursal'] = $_POST['sucursal'] ?? 'Sucursal A';
  header('Location: dashboard.php');
  exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dermo Estética - Login</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <div class="container" style="max-width: 400px; margin-top: 40px;">
    <div class="panel" style="text-align: center;">
      <div style="background: var(--green); padding: 20px; border-radius: 8px 8px 0 0; margin: -14px -14px 12px -14px;">
        <img src="assets/logo.svg" alt="Logo" width="60" height="60">
        <h1 style="color: white; font-size: 18px; margin-top: 8px;">DERMO ESTETICA</h1>
      </div>
      <h2>Bienvenido</h2>
      <form method="post">
        <label>Correo electrónico:</label>
        <input type="email" name="email" placeholder="Correo electrónico" required>
        <label>Contraseña:</label>
        <input type="password" name="pass" required>
        <label>Seleccione sucursal</label>
        <select name="sucursal" required>
          <option value="">Seleccione sucursal</option>
          <option value="Sucursal A">Sucursal A</option>
          <option value="Sucursal B">Sucursal B</option>
          <option value="Sucursal B">Sucursal C</option>
        </select>
        <button type="submit" style="margin-top: 12px;">Ingresar</button>
      </form>
    </div>
  </div>
  <div class="footer-bar">AndesCode © 2025</div>
</body>
</html>
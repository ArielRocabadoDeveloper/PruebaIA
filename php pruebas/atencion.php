<?php
session_start();
if (!isset($_SESSION['logged_in'])) {
  header('Location: index.php');
  exit;
}
$sucursal = $_SESSION['sucursal'];
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dermo Estética - Registrar Atención</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <header>
    <div class="header-inner">
        <div></div>
      <div class="logo">Dermo estetica</div>
      <button class="menu-toggle">☰</button>
      <nav>
        <ul>
          <li><a href="dashboard.php">Inicio</a></li>
          <li><a href="atencion.php" class="active">Registrar nueva atención</a></li>
          <li><a href="gasto.php">Registrar nuevo gasto</a></li>
          <li><a href="buscar.php">Buscar paciente</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <div class="container">
    <!-- Form -->
    <div class="panel">
      <h2>Registrar nueva atención</h2>
      <label for="ci">Carnet de identidad (CI)</label>
      <div class="row">
        <input id="ci" type="text" placeholder="Ej: 1234567">
        <button id="btn-lookup" class="ghost">Buscar</button>
      </div>
      <label>Paciente</label>
      <input id="patient-name" type="text" placeholder="Nombre del paciente">
      <label>Celular</label>
      <input id="patient-phone" type="tel" placeholder="Teléfono">
      <hr style="margin:12px 0;border:none;border-top:1px solid #eee">
      <label>Servicio</label>
      <div class="row">
        <select id="service-select"></select>
        <input id="service-price" type="number" placeholder="Precio" min="0">
        <button id="btn-add-service" class="btn-add">+ Agregar</button>
      </div>
      <label>Producto</label>
      <div class="row">
        <select id="product-select"></select>
        <input id="product-price" type="number" placeholder="Precio" min="0">
        <button id="btn-add-product" class="btn-add">+ Agregar</button>
      </div>
      <label>Tipo de pago</label>
      <div class="pay-row">
        <select id="payment-type">
          <option value="efectivo">Efectivo</option>
          <option value="qr">QR</option>
          <option value="tarjeta">Tarjeta</option>
        </select>
        <input id="manual-total" type="number" placeholder="Ajuste total (opcional)" style="width:160px">
      </div>
      <!-- Observaciones: textarea responsive y auto-ajustable -->
      <div class="form-group observations">
        <label for="observations">Observaciones</label>
        <textarea id="observations" rows="4" placeholder="Escribe tus observaciones aquí..."></textarea>
      </div>

      <!-- Foto: checkbox más grande y con label -->
      <div class="form-group photo-row">
        <label for="photo-checkbox" class="photo-label">Foto:</label>
        <input type="checkbox" id="photo-checkbox" class="photo-checkbox" aria-label="Incluir foto">
      </div>

      <button id="btn-submit">Registrar atención</button>
    </div>

    </div>
    <!-- Preview -->
    <div class="panel">
      <h2>Preview de la atención</h2>
      <div id="preview-list" class="list">
        <div class="preview-empty">No hay servicios ni productos agregados.</div>
      </div>
      <div class="total">Total: <span id="total-amount">0.00</span> Bs.</div>
      <hr style="margin:12px 0;border:none;border-top:1px solid #eee">
      <div style="display:flex;gap:8px;align-items:center;justify-content:space-between">
        <div><span class="small">Encargado:</span><br><strong id="current-user"><?php echo $_SESSION['name'] . ' Torres'; ?></strong></div>
        <div><span class="small">Sucursal:</span><br><span class="badge"><?php echo $sucursal; ?></span></div>
      </div>
    </div>
  </div>
  
  <script>
    // Tu JS completo, corregido
    const services = [
      { id: 's1', name: 'Limpieza facial', price: 80 },
      { id: 's2', name: 'Radiofrecuencia', price: 120 },
      { id: 's3', name: 'Peeling', price: 60 }
    ];
    const products = [
      { id: 'p1', name: 'Crema hidratante', price: 50 },
      { id: 'p2', name: 'Protector solar', price: 70 },
      { id: 'p3', name: 'Serum vitamínico', price: 120 }
    ];
    const pacientes = {
      '1234567': { name: 'Ana María Castillo', phone: '68018322' },
      '7654321': { name: 'Carlos Pérez', phone: '71234567' }
    };
    let items = [];
    const serviceSelect = document.getElementById('service-select');
    const productSelect = document.getElementById('product-select');
    const servicePrice = document.getElementById('service-price');
    const productPrice = document.getElementById('product-price');
    const btnAddService = document.getElementById('btn-add-service');
    const btnAddProduct = document.getElementById('btn-add-product');
    const previewList = document.getElementById('preview-list');
    const totalAmount = document.getElementById('total-amount');
    const btnLookup = document.getElementById('btn-lookup');
    const ciInput = document.getElementById('ci');
    const patientName = document.getElementById('patient-name');
    const patientPhone = document.getElementById('patient-phone');
    const btnSubmit = document.getElementById('btn-submit');
    const manualTotal = document.getElementById('manual-total');
    function fillSelects() {
      services.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id; opt.textContent = `${s.name} — ${s.price} Bs.`;
        serviceSelect.appendChild(opt);
      });
      products.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id; opt.textContent = `${p.name} — ${p.price} Bs.`;
        productSelect.appendChild(opt);
      });
      serviceSelect.addEventListener('change', () => {
        const s = services.find(x => x.id === serviceSelect.value);
        servicePrice.value = s ? s.price : '';
      });
      productSelect.addEventListener('change', () => {
        const p = products.find(x => x.id === productSelect.value);
        productPrice.value = p ? p.price : '';
      });
    }
    fillSelects();
    btnAddService.addEventListener('click', () => {
      const id = serviceSelect.value;
      if (!id) { alert('Seleccione un servicio'); return; }
      const s = services.find(x => x.id === id);
      const price = Number(servicePrice.value) || s.price;
      addItem({type: 'serv', id: s.id, name: s.name, price});
    });
    btnAddProduct.addEventListener('click', () => {
      const id = productSelect.value;
      if (!id) { alert('Seleccione un producto'); return; }
      const p = products.find(x => x.id === id);
      const price = Number(productPrice.value) || p.price;
      addItem({type: 'prod', id: p.id, name: p.name, price});
    });
    function addItem(item) {
      items.push({...item, uid: Date.now() + Math.random()});
      renderPreview();
      updateTotal();
    }
    function renderPreview() {
      previewList.innerHTML = '';
      if (items.length === 0) {
        previewList.innerHTML = '<div class="preview-empty">No hay servicios ni productos agregados.</div>';
        return;
      }
      items.forEach(it => {
        const div = document.createElement('div');
        div.className = 'item';
        const meta = document.createElement('div');
        meta.className = 'meta';
        const t = document.createElement('div');
        t.innerHTML = `<strong>${it.name}</strong> <div class="small">${it.type === 'serv' ? 'Servicio' : 'Producto'}</div>`;
        meta.appendChild(t);
        const right = document.createElement('div');
        right.style.display = 'flex'; right.style.alignItems = 'center'; right.style.gap = '12px';
        const p = document.createElement('div');
        p.className = 'small'; p.textContent = `${it.price.toFixed(2)} Bs.`;
        const btn = document.createElement('button');
        btn.className = 'remove';
        btn.textContent = 'Eliminar';
        btn.title = 'Eliminar ítem';
        btn.addEventListener('click', () => {
          items = items.filter(x => x.uid !== it.uid);
          renderPreview();
          updateTotal();
        });
        right.appendChild(p);
        right.appendChild(btn);
        div.appendChild(meta);
        div.appendChild(right);
        previewList.appendChild(div);
      });
    }
    function updateTotal() {
      const sum = items.reduce((acc, i) => acc + Number(i.price || 0), 0);
      const manual = Number(manualTotal.value);
      const final = (manual && manual > 0) ? manual : sum;
      totalAmount.textContent = final.toFixed(2);
    }
    btnLookup.addEventListener('click', () => {
      const ci = ciInput.value.trim();
      if (!ci) { alert('Ingrese CI para buscar'); return; }
      const p = pacientes[ci];
      if (p) {
        patientName.value = p.name;
        patientPhone.value = p.phone;
        alert('Paciente encontrado y autocompletado.');
      } else {
        alert('No se encontró paciente. Complete los datos para registrar uno nuevo.');
        patientName.focus();
      }
    });
    btnSubmit.addEventListener('click', () => {
      if (items.length === 0) { alert('Agregue al menos 1 servicio o producto antes de registrar.'); return; }
      const payload = {
        encargado: document.getElementById('current-user').textContent,
        sucursal: document.querySelector('.badge').textContent,
        patient: {
          ci: ciInput.value.trim(),
          name: patientName.value.trim(),
          phone: patientPhone.value.trim()
        },
        items: items.map(i => ({type: i.type, id: i.id, name: i.name, price: Number(i.price)})),
        payment: {
          type: document.getElementById('payment-type').value,
          total: Number(totalAmount.textContent)
        },
        createdAt: new Date().toISOString()
      };
      console.log('Payload a enviar al servidor:', payload);
      alert('Atención registrada (simulación). Revisa la consola para ver el payload.');
      items = []; renderPreview(); updateTotal();
    });
    manualTotal.addEventListener('input', updateTotal);

    // Auto-resize textarea de observaciones
    (function(){
      const obs = document.getElementById('observations');
      if (!obs) return;
      const autosize = (el) => {
        el.style.height = 'auto';
        const newH = Math.min(el.scrollHeight, 360);
        el.style.height = newH + 'px';
      };
      // inicial
      autosize(obs);
      obs.addEventListener('input', () => autosize(obs));
      // cuando se cambie el tamaño de ventana, reajusta para responsividad
      window.addEventListener('resize', () => autosize(obs));
    })();
  </script>
  <script>
    document.querySelector('.menu-toggle').addEventListener('click', () => {
      document.querySelector('nav').classList.toggle('open');
    });
  </script>
</body>
</html>
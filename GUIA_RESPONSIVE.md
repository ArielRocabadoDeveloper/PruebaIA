# 📱 GUÍA COMPLETA DE RESPONSIVE - DERMO CLÍNICA

## 🎯 Resumen de Cambios

Has recibido una actualización completa de CSS y JavaScript responsive para tu aplicación. Aquí te muestro cómo usar todo.

---

## 📦 ARCHIVOS NUEVOS CREADOS

### 1. **Sidebar.css** (Estilos del Sidebar)
```
src/components/layout/Sidebar.css
```
- Animaciones del sidebar
- Estilos de items de navegación
- Efectos hover y activos

### 2. **App.responsive.css** (Sistema de Responsividad)
```
src/components/layout/App.responsive.css
```
- Breakpoints completos
- Componentes responsive
- Grillas y layouts

### 3. **responsive-patterns.css** (Patrones Reutilizables)
```
src/styles/responsive-patterns.css
```
- 10+ patrones CSS listos para usar
- Componentes de ejemplo

### 4. **responsive.js** (Utilidades JavaScript)
```
src/utils/responsive.js
```
- Funciones y hooks para responsividad
- Detectores de breakpoint

### 5. **ResponsiveComponentExample.jsx** (Componente de Ejemplo)
```
src/components/examples/ResponsiveComponentExample.jsx
```
- Ejemplo de componente 100% responsive
- Implementa todos los patrones

---

## 🚀 CÓMO USAR

### Opción 1: Usar Clases CSS Directas

```jsx
// Grilla responsive
<div className="card-responsive">
  <div className="card">Contenido</div>
  <div className="card">Contenido</div>
</div>

// Contenedor fluido
<div className="container-responsive">
  Contenido centrado
</div>

// Grid auto-fit
<div className="grid-auto-fit gap-responsive">
  {items.map(item => <div key={item.id}>{item}</div>)}
</div>
```

### Opción 2: Usar Funciones JavaScript

```jsx
import { isMobile, getBreakpoint, useBreakpoint } from '../utils/responsive';

// En un componente
const MyComponent = () => {
  // Opción A: Hook
  const breakpoint = useBreakpoint(); // 'mobile', 'tablet', 'desktop'

  // Opción B: Función directa
  const width = getBreakpoint();

  // Opción C: Detectores específicos
  const onMobile = isMobile();

  return (
    <div>
      {isMobile() && <p>Estás en móvil</p>}
      {!isMobile() && <p>Estás en desktop</p>}
    </div>
  );
};
```

### Opción 3: Patrones CSS Predefinidos

```jsx
// Componente con todos los patrones
<div className="component-container">
  {/* Encabezado */}
  <div className="section-header">
    <h1>Mi Sección</h1>
  </div>

  {/* Info block */}
  <div className="info-block">
    Información importante
  </div>

  {/* Grid de cards */}
  <div className="cards-grid gap-responsive">
    <div className="card">Card 1</div>
    <div className="card">Card 2</div>
    <div className="card">Card 3</div>
  </div>

  {/* Formulario */}
  <form className="form-grid">
    <input type="text" />
    <input type="email" />
    <textarea className="form-grid full"></textarea>
  </form>

  {/* Botones */}
  <div className="btn-group">
    <button>Guardar</button>
    <button>Cancelar</button>
  </div>
</div>
```

---

## 🎨 BREAKPOINTS DISPONIBLES

```
Mobile:   0px - 640px    (Móvil)
Tablet:   641px - 1024px (iPad)
Desktop:  1025px+        (PC)
```

### Usar en CSS:

```css
/* Para desktop en adelante */
@media (min-width: 1025px) {
  .elemento {
    width: 300px;
  }
}

/* Para tablet hacia abajo */
@media (max-width: 1024px) {
  .elemento {
    width: 100%;
  }
}

/* Solo para móvil */
@media (max-width: 640px) {
  .elemento {
    font-size: 14px;
  }
}
```

---

## 🔧 UTILIDADES JAVASCRIPT DISPONIBLES

### 1. **Detectar Breakpoint**

```javascript
import { getBreakpoint } from '../utils/responsive';

const breakpoint = getBreakpoint();
// Retorna: 'mobile' | 'tablet' | 'desktop'

if (breakpoint === 'mobile') {
  // Hacer algo en móvil
}
```

### 2. **Detectores Específicos**

```javascript
import { isMobile, isTablet, isDesktop } from '../utils/responsive';

if (isMobile()) {
  console.log('En móvil');
}

if (isTablet()) {
  console.log('En tablet');
}

if (isDesktop()) {
  console.log('En desktop');
}
```

### 3. **Hook useBreakpoint()**

```javascript
import { useBreakpoint } from '../utils/responsive';

function MiComponente() {
  const breakpoint = useBreakpoint();

  return (
    <div>
      Estás en: {breakpoint}
    </div>
  );
}
```

### 4. **Hook useOrientation()**

```javascript
import { useOrientation } from '../utils/responsive';

function MiComponente() {
  const orientation = useOrientation(); // 'portrait' o 'landscape'

  return (
    <div>
      Orientación: {orientation}
    </div>
  );
}
```

### 5. **Obtener Info de Pantalla**

```javascript
import { getScreenDimensions, getGridColumns } from '../utils/responsive';

const dims = getScreenDimensions();
console.log(dims); // { width: 1440, height: 900 }

const cols = getGridColumns();
console.log(cols); // 1, 2 o 3 según breakpoint
```

### 6. **Media Query Helper**

```javascript
import { matchMedia } from '../utils/responsive';

matchMedia({
  mobile: () => console.log('Móvil'),
  tablet: () => console.log('Tablet'),
  desktop: () => console.log('Desktop'),
});
```

### 7. **Escuchar Cambios de Breakpoint**

```javascript
import { onBreakpoint } from '../utils/responsive';

// Ejecutar cuando llegue a desktop
const unsubscribe = onBreakpoint('desktop', () => {
  console.log('Ahora estás en desktop!');
});

// Desuscribirse
unsubscribe();
```

### 8. **Throttle para Resize**

```javascript
import { throttle } from '../utils/responsive';

const handleResize = throttle(() => {
  console.log('Resize optimizado');
}, 250);

window.addEventListener('resize', handleResize);
```

---

## 📋 EJEMPLOS PRÁCTICOS

### Ejemplo 1: Dashboard Responsive

```jsx
import React from 'react';
import { useBreakpoint } from '../utils/responsive';
import '../styles/responsive-patterns.css';

export default function Dashboard() {
  const breakpoint = useBreakpoint();

  return (
    <div className="component-container">
      <div className="section-header">
        <h1>Dashboard</h1>
      </div>

      {/* Grid que cambia según breakpoint */}
      <div className="cards-grid gap-responsive">
        <div className="card">
          <h3 className="text-lg-responsive font-bold">Stat 1</h3>
          <p className="text-sm-responsive">Valor: 1000</p>
        </div>
        <div className="card">
          <h3 className="text-lg-responsive font-bold">Stat 2</h3>
          <p className="text-sm-responsive">Valor: 2000</p>
        </div>
        <div className="card">
          <h3 className="text-lg-responsive font-bold">Stat 3</h3>
          <p className="text-sm-responsive">Valor: 3000</p>
        </div>
      </div>

      {/* Mostrar información según breakpoint */}
      <div className="mt-6 p-4 bg-blue-100 rounded">
        <p className="text-sm-responsive">
          Breakpoint actual: <strong>{breakpoint}</strong>
        </p>
      </div>
    </div>
  );
}
```

### Ejemplo 2: Formulario Responsivo

```jsx
import React from 'react';
import '../styles/responsive-patterns.css';

export default function ResponsiveForm() {
  return (
    <div className="component-container">
      <form className="form-grid">
        <div>
          <label className="block text-sm font-medium mb-2">Nombre</label>
          <input type="text" className="w-full px-4 py-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input type="email" className="w-full px-4 py-2 border rounded" />
        </div>

        {/* Campo de ancho completo */}
        <div className="form-grid full">
          <label className="block text-sm font-medium mb-2">Mensaje</label>
          <textarea className="w-full px-4 py-2 border rounded" rows="4" />
        </div>

        {/* Botones */}
        <div className="btn-group col-span-full">
          <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Enviar
          </button>
          <button type="reset" className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}
```

### Ejemplo 3: Mostrar/Ocultar por Breakpoint

```jsx
import React from 'react';
import '../styles/responsive-patterns.css';

export default function Sidebar() {
  return (
    <>
      {/* Solo en móvil */}
      <div className="mobile-only">
        <MobileSidebar />
      </div>

      {/* Solo en desktop */}
      <div className="desktop-only">
        <DesktopSidebar />
      </div>
    </>
  );
}
```

---

## 🎯 CLASE CSS PARA MOSTRAR/OCULTAR

```jsx
// Solo en móvil (hasta 640px)
<div className="mobile-only">
  Visible solo en móvil
</div>

// Solo en tablet y desktop
<div className="desktop-only">
  Oculto en móvil
</div>

// Solo en desktop grande (1025px+)
<div className="desktop-large-only">
  Solo en PC
</div>
```

---

## ✨ CLASES DE TIPOGRAFÍA RESPONSIVE

```jsx
// Tamaño pequeño que crece
<p className="text-sm-responsive">
  Pequeño en móvil, grande en desktop
</p>

// Tamaño grande que crece
<h2 className="text-lg-responsive">
  Título responsive
</h2>
```

---

## 📏 ESPACIADO RESPONSIVE

```jsx
// Padding responsive
<div className="p-responsive">
  1rem en móvil, 1.5rem en tablet, 2rem en desktop
</div>

// Gap responsive (en flex/grid)
<div className="flex gap-responsive">
  Espaciado que se adapta
</div>
```

---

## 🎨 UTILIDADES DE SOMBRAS

```jsx
// Sombra suave
<div className="shadow-soft">
  Sombra pequeña
</div>

// Sombra elevada
<div className="shadow-elevated">
  Sombra grande
</div>

// Sombra con brillo verde
<div className="shadow-glow">
  Sombra con efecto glow
</div>
```

---

## 🌈 GRADIENTES DISPONIBLES

```jsx
// Verde (tema principal)
<div className="gradient-green">
  Gradiente verde
</div>

// Azul
<div className="gradient-blue">
  Gradiente azul
</div>

// Púrpura
<div className="gradient-purple">
  Gradiente púrpura
</div>
```

---

## 🚀 MEJORES PRÁCTICAS

### ✅ HACER

```css
/* Bien: Mobile first */
.elemento {
  width: 100%;
}

@media (min-width: 641px) {
  .elemento {
    width: 50%;
  }
}

@media (min-width: 1025px) {
  .elemento {
    width: 33.333%;
  }
}
```

### ❌ EVITAR

```css
/* Mal: Desktop first */
.elemento {
  width: 33.333%;
}

@media (max-width: 1024px) {
  .elemento {
    width: 50%;
  }
}

@media (max-width: 640px) {
  .elemento {
    width: 100%;
  }
}
```

---

## 🔗 REFERENCIAS RÁPIDAS

| Archivo | Uso |
|---------|-----|
| `Sidebar.css` | Estilos del menú lateral |
| `App.responsive.css` | Sistema de responsividad general |
| `responsive-patterns.css` | Patrones CSS reutilizables |
| `responsive.js` | Utilidades JavaScript |
| `ResponsiveComponentExample.jsx` | Ejemplo de componente |

---

## 💡 TIPS IMPORTANTES

1. **Siempre usa media queries con min-width** (Mobile first)
2. **Prueba en DevTools**: F12 → Click en icono de responsive
3. **Los breakpoints son 640px y 1025px**
4. **Importa los CSS al principio del proyecto**
5. **Usa las utilidades de responsive.js para lógica compleja**

---

## 🎯 PRÓXIMOS PASOS

1. ✅ Actualiza tus componentes existentes usando los patrones
2. ✅ Prueba en móvil, tablet y desktop
3. ✅ Ajusta colors si lo necesitas
4. ✅ Agrega animaciones según corresponda

---

**¡Listo para usar!** 🎉

Todos los archivos están en su lugar y listos para funcionar. Simplemente importa los CSS y comienza a usar las clases y funciones.


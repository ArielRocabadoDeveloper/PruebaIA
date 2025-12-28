// src/config/EJEMPLOS_CONFIGURACION.js
// Ejemplos de cómo usar responsive.config.js

/**
 * ============================================
 * EJEMPLOS DE USO DE responsive.config.js
 * ============================================
 */

// 1. IMPORTAR LA CONFIGURACIÓN
// ==========================================
import {
  BREAKPOINTS,
  BREAKPOINT_QUERIES,
  SPACING,
  GRID,
  FONT_SIZES,
  COLORS,
  SHADOWS,
  ANIMATIONS,
  getValue,
  mediaQuery,
} from './responsive.config';

/**
 * EJEMPLO 1: USAR BREAKPOINTS EN JAVASCRIPT
 * ==========================================
 */

const windowWidth = window.innerWidth;

if (windowWidth <= BREAKPOINTS.MOBILE_MAX) {
  console.log('Estás en mobile');
}

if (
  windowWidth > BREAKPOINTS.TABLET_MIN &&
  windowWidth <= BREAKPOINTS.TABLET_MAX
) {
  console.log('Estás en tablet');
}

if (windowWidth >= BREAKPOINTS.DESKTOP_MIN) {
  console.log('Estás en desktop');
}

/**
 * EJEMPLO 2: USAR BREAKPOINT_QUERIES PARA MEDIA QUERIES
 * ========================================================
 */

// En CSS-in-JS (styled-components, emotion, etc)
const estilos = {
  mobile: `
    @media ${BREAKPOINT_QUERIES.mobile} {
      width: 100%;
      padding: ${SPACING.mobile.padding};
    }
  `,
  desktop: `
    @media ${BREAKPOINT_QUERIES.desktop} {
      width: 50%;
      padding: ${SPACING.desktop.padding};
    }
  `,
};

/**
 * EJEMPLO 3: USAR SPACING SEGÚN BREAKPOINT
 * ========================================
 */

const getSpacing = (breakpoint) => {
  switch (breakpoint) {
    case 'mobile':
      return SPACING.mobile;
    case 'tablet':
      return SPACING.tablet;
    case 'desktop':
      return SPACING.desktop;
    default:
      return SPACING.desktop;
  }
};

// Uso:
const spacing = getSpacing('desktop');
console.log(spacing.padding); // '2rem'

/**
 * EJEMPLO 4: USAR GRID COLUMNS
 * =============================
 */

const getGridColumns = (breakpoint) => {
  return GRID[breakpoint] || GRID.desktop;
};

// Uso:
const columns = {
  mobile: getGridColumns('mobile'), // 1
  tablet: getGridColumns('tablet'), // 2
  desktop: getGridColumns('desktop'), // 3
};

/**
 * EJEMPLO 5: USAR COLORES CONFIGURADOS
 * ====================================
 */

const bottonColor = COLORS.primary; // '#22c55e'
const grayBorder = COLORS.gray[200]; // '#e5e7eb'

/**
 * EJEMPLO 6: USAR SOMBRAS
 * ======================
 */

const cardStyle = {
  boxShadow: SHADOWS.elevated, // Sombra grande
};

const hoverStyle = {
  boxShadow: SHADOWS.glow, // Efecto glow
};

/**
 * EJEMPLO 7: USAR ANIMACIONES
 * ==========================
 */

const animatedElement = {
  transition: `all ${ANIMATIONS.duration.normal} ${ANIMATIONS.timing.cubic}`,
};

/**
 * EJEMPLO 8: FUNCIÓN HELPER getValue
 * =================================
 */

// Obtener valor según breakpoint automáticamente
const fontSizesPC = getValue(FONT_SIZES, 'desktop');
console.log(fontSizesPC.lg); // '1.25rem'

/**
 * EJEMPLO 9: USAR EN COMPONENTE REACT
 * ==================================
 */

import React from 'react';

function MiComponente() {
  const [breakpoint, setBreakpoint] = React.useState('desktop');

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= BREAKPOINTS.MOBILE_MAX) {
        setBreakpoint('mobile');
      } else if (width <= BREAKPOINTS.TABLET_MAX) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const spacing = getSpacing(breakpoint);
  const gridColumns = getGridColumns(breakpoint);

  return (
    <div
      style={{
        padding: spacing.padding,
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gap: spacing.gap,
      }}
    >
      {/* Contenido aquí */}
    </div>
  );
}

/**
 * EJEMPLO 10: CREAR UN HOOK PERSONALIZADO
 * ======================================
 */

function useResponsiveConfig() {
  const [breakpoint, setBreakpoint] = React.useState('desktop');

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= BREAKPOINTS.MOBILE_MAX) {
        setBreakpoint('mobile');
      } else if (width <= BREAKPOINTS.TABLET_MAX) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    breakpoint,
    spacing: getSpacing(breakpoint),
    gridColumns: getGridColumns(breakpoint),
    colors: COLORS,
    shadows: SHADOWS,
    animations: ANIMATIONS,
  };
}

// Uso en componente:
function MiComponenteConHook() {
  const { breakpoint, spacing, gridColumns } = useResponsiveConfig();

  return (
    <div
      style={{
        padding: spacing.padding,
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
      }}
    >
      <p>Breakpoint: {breakpoint}</p>
    </div>
  );
}

/**
 * EJEMPLO 11: CONSTANTES PARA USAR DIRECTAMENTE
 * ============================================
 */

// Puedes crear constantes para acceder rápidamente:
const MOBILE = BREAKPOINTS.MOBILE_MAX; // 640
const TABLET_MIN = BREAKPOINTS.TABLET_MIN; // 641
const TABLET_MAX = BREAKPOINTS.TABLET_MAX; // 1024
const DESKTOP = BREAKPOINTS.DESKTOP_MIN; // 1025

/**
 * EJEMPLO 12: VALIDAR RESOLUCIÓN
 * ==============================
 */

function isValidResolution(width) {
  if (width < 320) {
    console.warn('Resolución muy pequeña');
    return false;
  }
  if (width > 1920) {
    console.warn('Resolución muy grande');
    return false;
  }
  return true;
}

/**
 * EJEMPLO 13: OBTENER INFO DE PANTALLA
 * ==================================
 */

function getScreenInfo() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  let type = 'desktop';
  if (width <= BREAKPOINTS.MOBILE_MAX) type = 'mobile';
  else if (width <= BREAKPOINTS.TABLET_MAX) type = 'tablet';

  return {
    width,
    height,
    type,
    isPortrait: height > width,
    isLandscape: width > height,
    dpi: window.devicePixelRatio,
  };
}

/**
 * EJEMPLO 14: COMPONENTE CON ESTILOS RESPONSIVOS
 * ============================================
 */

function CardResponsivo({ title, children }) {
  const { breakpoint } = useResponsiveConfig();
  const spacing = getSpacing(breakpoint);

  return (
    <div
      style={{
        padding: spacing.padding,
        borderRadius: '8px',
        boxShadow: SHADOWS.base,
        backgroundColor: 'white',
        transition: `all ${ANIMATIONS.duration.normal} ${ANIMATIONS.timing.cubic}`,
      }}
    >
      <h3
        style={{
          fontSize: getValue(FONT_SIZES, breakpoint).lg,
          marginBottom: spacing.marginBottom,
          color: COLORS.primary,
        }}
      >
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

/**
 * EJEMPLO 15: MATRIZ DE VALORES POR BREAKPOINT
 * =========================================
 */

// Crear una matriz de valores personalizados
const CUSTOM_CONFIG = {
  mobile: {
    cols: 1,
    gap: '1rem',
    padding: '1rem',
  },
  tablet: {
    cols: 2,
    gap: '1.5rem',
    padding: '1.5rem',
  },
  desktop: {
    cols: 3,
    gap: '2rem',
    padding: '2rem',
  },
};

// Usar con getValue()
const customSpacing = getValue(CUSTOM_CONFIG, 'desktop');
console.log(customSpacing.cols); // 3

/**
 * ============================================
 * RESUMEN DE FUNCIONES DISPONIBLES
 * ============================================
 *
 * CONSTANTES:
 * - BREAKPOINTS: Valores en píxeles
 * - BREAKPOINT_QUERIES: Strings para media queries
 * - SPACING: Padding y gap por breakpoint
 * - GRID: Número de columnas
 * - FONT_SIZES: Tamaños de fuente
 * - COLORS: Paleta de colores
 * - SHADOWS: Efectos de sombra
 * - ANIMATIONS: Duración y timing
 *
 * FUNCIONES:
 * - getValue(object, breakpoint): Obtener valor según breakpoint
 * - mediaQuery(breakpoint): Obtener string de media query
 * - isBreakpoint(width, target): Verificar si width es breakpoint
 * - getMaxWidth(breakpoint): Obtener ancho máximo
 *
 * EJEMPLOS DE USO:
 * 1. En JavaScript: if (width <= BREAKPOINTS.MOBILE_MAX)
 * 2. En CSS-in-JS: @media ${BREAKPOINT_QUERIES.mobile}
 * 3. Obtener valores: getValue(FONT_SIZES, 'desktop')
 * 4. En componentes: useResponsiveConfig()
 *
 * ============================================
 */

export default {
  getSpacing,
  getGridColumns,
  useResponsiveConfig,
  getScreenInfo,
  CardResponsivo,
};

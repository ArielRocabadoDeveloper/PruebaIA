// src/config/responsive.config.js
// Configuración centralizada de responsividad

export const BREAKPOINTS = {
  // Breakpoints en píxeles
  MOBILE_MAX: 640,
  TABLET_MIN: 641,
  TABLET_MAX: 1024,
  DESKTOP_MIN: 1025,
};

export const BREAKPOINT_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.MOBILE_MAX}px)`,
  tablet: `(min-width: ${BREAKPOINTS.TABLET_MIN}px) and (max-width: ${BREAKPOINTS.TABLET_MAX}px)`,
  desktop: `(min-width: ${BREAKPOINTS.DESKTOP_MIN}px)`,
  tabletUp: `(min-width: ${BREAKPOINTS.TABLET_MIN}px)`,
  desktopUp: `(min-width: ${BREAKPOINTS.DESKTOP_MIN}px)`,
};

export const SPACING = {
  mobile: {
    padding: '1rem',
    gap: '1rem',
    marginBottom: '1rem',
  },
  tablet: {
    padding: '1.5rem',
    gap: '1.25rem',
    marginBottom: '1.5rem',
  },
  desktop: {
    padding: '2rem',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
};

export const GRID = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
};

export const FONT_SIZES = {
  mobile: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
  },
  tablet: {
    xs: '0.75rem',
    sm: '0.95rem',
    base: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '1.875rem',
  },
  desktop: {
    xs: '0.75rem',
    sm: '1rem',
    base: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2.25rem',
  },
};

export const COLORS = {
  primary: '#22c55e',
  primaryDark: '#16a34a',
  primaryLight: '#dcfce7',
  secondary: '#3b82f6',
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

export const SHADOWS = {
  soft: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
  base: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  elevated: '0 10px 25px rgba(0, 0, 0, 0.1)',
  glow: '0 0 20px rgba(34, 197, 94, 0.2)',
};

export const ANIMATIONS = {
  duration: {
    fast: '0.15s',
    normal: '0.3s',
    slow: '0.5s',
    slower: '0.75s',
  },
  timing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    cubic: 'cubic-bezier(0.4, 0, 0.2, 1)',
    cubicIn: 'cubic-bezier(0.4, 0, 1, 1)',
    cubicOut: 'cubic-bezier(0, 0, 0.2, 1)',
  },
};

export const CONTAINER = {
  mobile: '100%',
  tablet: '640px',
  desktop: '1200px',
};

export const SIDEBAR = {
  width: '280px',
  widthTablet: '260px',
  widthMobile: '240px',
  headerHeight: '80px',
};

export const HEADER = {
  height: '60px',
  heightMobile: '56px',
};

// Función helper para obtener valores según breakpoint
export const getValue = (object, breakpoint) => {
  return object[breakpoint] || object.desktop || object.mobile;
};

// Función helper para crear media queries
export const mediaQuery = (breakpoint) => {
  return `@media ${BREAKPOINT_QUERIES[breakpoint]}`;
};

// Funciones helper para chequear breakpoints
export const isBreakpoint = (width, target) => {
  switch (target) {
    case 'mobile':
      return width <= BREAKPOINTS.MOBILE_MAX;
    case 'tablet':
      return width > BREAKPOINTS.TABLET_MIN && width <= BREAKPOINTS.TABLET_MAX;
    case 'desktop':
      return width >= BREAKPOINTS.DESKTOP_MIN;
    default:
      return false;
  }
};

export const getMaxWidth = (breakpoint) => {
  switch (breakpoint) {
    case 'mobile':
      return BREAKPOINTS.MOBILE_MAX;
    case 'tablet':
      return BREAKPOINTS.TABLET_MAX;
    case 'desktop':
    default:
      return 1920;
  }
};

// Exportar todo como un objeto default también
export default {
  BREAKPOINTS,
  BREAKPOINT_QUERIES,
  SPACING,
  GRID,
  FONT_SIZES,
  COLORS,
  SHADOWS,
  ANIMATIONS,
  CONTAINER,
  SIDEBAR,
  HEADER,
  getValue,
  mediaQuery,
  isBreakpoint,
  getMaxWidth,
};

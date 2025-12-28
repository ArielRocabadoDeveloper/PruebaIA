// src/utils/responsive.js
// Utilidades para trabajar con responsividad

/**
 * Hook para detectar el breakpoint actual
 * @returns {string} 'mobile' | 'tablet' | 'desktop'
 */
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = React.useState('mobile');

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setBreakpoint('mobile');
      } else if (width <= 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    // Call once on mount
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

/**
 * Obtener el breakpoint exacto sin hook (para uso global)
 * @returns {string} 'mobile' | 'tablet' | 'desktop'
 */
export const getBreakpoint = () => {
  const width =
    typeof window !== 'undefined' ? window.innerWidth : 1025;

  if (width <= 640) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
};

/**
 * Detectar si está en viewport móvil
 * @returns {boolean}
 */
export const isMobile = () => {
  return typeof window !== 'undefined' && window.innerWidth <= 640;
};

/**
 * Detectar si está en viewport tablet
 * @returns {boolean}
 */
export const isTablet = () => {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1025;
  return width > 640 && width <= 1024;
};

/**
 * Detectar si está en viewport desktop
 * @returns {boolean}
 */
export const isDesktop = () => {
  return typeof window !== 'undefined' && window.innerWidth >= 1025;
};

/**
 * Media Query Helper - Ejecutar código basado en breakpoint
 * @param {Object} queries - { mobile: fn, tablet: fn, desktop: fn }
 */
export const matchMedia = (queries) => {
  const breakpoint = getBreakpoint();

  if (breakpoint === 'mobile' && queries.mobile) {
    return queries.mobile();
  }
  if (breakpoint === 'tablet' && queries.tablet) {
    return queries.tablet();
  }
  if (breakpoint === 'desktop' && queries.desktop) {
    return queries.desktop();
  }
};

/**
 * Obtener número de columnas según breakpoint
 * @returns {number} 1, 2 o 3
 */
export const getGridColumns = () => {
  const breakpoint = getBreakpoint();
  return {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  }[breakpoint];
};

/**
 * Obtener espaciado según breakpoint
 * @returns {number} en pixeles
 */
export const getResponsiveSpacing = () => {
  const breakpoint = getBreakpoint();
  return {
    mobile: 16,    // 1rem
    tablet: 24,    // 1.5rem
    desktop: 32,   // 2rem
  }[breakpoint];
};

/**
 * Obtener ancho máximo del contenedor
 * @returns {number} en pixeles
 */
export const getContainerMaxWidth = () => {
  const breakpoint = getBreakpoint();
  return {
    mobile: 640,
    tablet: 1024,
    desktop: 1280,
  }[breakpoint];
};

/**
 * Ejecutar función cuando se alcanza un breakpoint específico
 * @param {string} breakpoint - 'mobile' | 'tablet' | 'desktop'
 * @param {function} callback - función a ejecutar
 * @returns {function} desuscribirse
 */
export const onBreakpoint = (breakpoint, callback) => {
  const handleResize = () => {
    if (getBreakpoint() === breakpoint) {
      callback();
    }
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
};

/**
 * Throttle para resize events (evita ejecutarse demasiadas veces)
 * @param {function} func - función a ejecutar
 * @param {number} wait - milisegundos de espera
 * @returns {function}
 */
export const throttle = (func, wait = 250) => {
  let timeout = null;
  let previous = 0;

  return function executedFunction(...args) {
    const now = Date.now();
    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  };
};

/**
 * Obtener dimensiones de pantalla seguras
 * @returns {Object} { width, height }
 */
export const getScreenDimensions = () => {
  if (typeof window === 'undefined') {
    return { width: 1280, height: 720 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

/**
 * Hook para escuchar cambios de orientación
 * @returns {string} 'portrait' | 'landscape'
 */
export const useOrientation = () => {
  const [orientation, setOrientation] = React.useState(
    typeof window !== 'undefined' && window.innerHeight > window.innerWidth
      ? 'portrait'
      : 'landscape'
  );

  React.useEffect(() => {
    const handleResize = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      setOrientation(isPortrait ? 'portrait' : 'landscape');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return orientation;
};

/**
 * Detectar tipo de dispositivo
 * @returns {string} 'phone' | 'tablet' | 'desktop'
 */
export const getDeviceType = () => {
  const ua = navigator.userAgent.toLowerCase();

  if (/android/.test(ua)) {
    return /mobile/.test(ua) ? 'phone' : 'tablet';
  }

  if (/iphone|ipod/.test(ua)) {
    return 'phone';
  }

  if (/ipad/.test(ua)) {
    return 'tablet';
  }

  return 'desktop';
};

/**
 * Utilidad para crear media queries dinámicas
 * @example
 * createMediaQuery(1024, () => {
 *   console.log('Desktop!');
 * });
 */
export const createMediaQuery = (width, callback) => {
  const mediaQuery = window.matchMedia(`(min-width: ${width}px)`);

  const handleChange = (e) => {
    if (e.matches) {
      callback();
    }
  };

  mediaQuery.addEventListener('change', handleChange);

  // Call once on creation if already matches
  if (mediaQuery.matches) {
    callback();
  }

  // Return unsubscribe function
  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
};

export default {
  useBreakpoint,
  getBreakpoint,
  isMobile,
  isTablet,
  isDesktop,
  matchMedia,
  getGridColumns,
  getResponsiveSpacing,
  getContainerMaxWidth,
  onBreakpoint,
  throttle,
  getScreenDimensions,
  useOrientation,
  getDeviceType,
  createMediaQuery,
};

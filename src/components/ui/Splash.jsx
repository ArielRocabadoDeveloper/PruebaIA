import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/splash.css';
import dermoCarga from '../../assets/dermo.png';

const Splash = ({ duration, onFinish }) => {
  const navigate = useNavigate();

  const rootRef = useRef(null);

  useEffect(() => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      navigate('/login', { replace: true });
      if (typeof onFinish === 'function') onFinish();
    };

    // If `duration` prop is provided (ms), use it; otherwise read from CSS variables
    let finalDuration = duration;
    if (!finalDuration) {
      const node = rootRef.current || document.documentElement;
      const style = getComputedStyle(node);
      const toMs = (s) => {
        if (!s) return 0;
        const v = s.trim();
        if (v.endsWith('ms')) return parseFloat(v);
        if (v.endsWith('s')) return parseFloat(v) * 1000;
        return parseFloat(v) || 0;
      };
      const d = style.getPropertyValue('--splash-duration') || '0s';
      const delay = style.getPropertyValue('--splash-delay') || '0s';
      finalDuration = toMs(d) + toMs(delay);
      // if they are zero, fallback to 8000ms
      if (finalDuration === 0) finalDuration = 8000;
    }

    const t = setTimeout(finish, finalDuration);

    // If CSS animation finishes earlier, use that instead for perfect sync
    const node = rootRef.current;
    const onAnimEnd = (e) => {
      if (e.animationName === 'splashFadeOut') {
        finish();
      }
    };
    if (node) node.addEventListener('animationend', onAnimEnd);

    return () => {
      clearTimeout(t);
      if (node) node.removeEventListener('animationend', onAnimEnd);
    };
  }, [duration, navigate, onFinish]);

  return (
  <div className="splash-root" ref={rootRef}>
      <div className="splash-card">
        <img src={dermoCarga} alt="Dermo Estética" className="splash-logo" />
        <h2 className="splash-title">Hola de nuevo</h2>
        <p className="splash-sub">Bienvenido a Dermo Estética</p>
      </div>
    </div>
  );
};

export default Splash;

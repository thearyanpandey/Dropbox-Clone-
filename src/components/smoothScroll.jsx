// src/components/SmoothScroll.jsx
import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Clean up on component unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

export default SmoothScroll;
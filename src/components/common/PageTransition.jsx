import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const PageTransition = ({ children }) => {
  const location = useLocation();
  const pageRef = useRef(null);

  useEffect(() => {
    // Immediate scroll trigger refresh after route changes
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div ref={pageRef} className="w-full">
      {children}
    </div>
  );
};


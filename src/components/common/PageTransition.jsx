import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const PageTransition = ({ children }) => {
  const location = useLocation();
  const pageRef = useRef(null);

  useEffect(() => {
    if (!pageRef.current) return;

    // Use opacity transition and immediately clear props so containing block isn't broken for fixed/pinned elements
    gsap.fromTo(
      pageRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
        clearProps: 'all',
        onComplete: () => {
          ScrollTrigger.refresh();
        }
      }
    );
  }, [location.pathname]);

  return (
    <div ref={pageRef} className="w-full">
      {children}
    </div>
  );
};


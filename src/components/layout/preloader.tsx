
"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface PreloaderProps {
  onLoaded: () => void;
  duration?: number;
}

export function Preloader({ onLoaded, duration = 2500 }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Add a slight delay for fade-out animation to complete before calling onLoaded
      setTimeout(onLoaded, 500); // Corresponds to preloader-fade-out duration (0.5s)
    }, duration);

    return () => clearTimeout(timer);
  }, [onLoaded, duration]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ease-in-out",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!isVisible}
      data-testid="preloader"
    >
      <div className="deathly-hallows-symbol-container">
        <svg 
          className="deathly-hallows-symbol" 
          width="150" 
          height="150" 
          viewBox="0 0 200 200" 
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Deathly Hallows Symbol"
        >
          {/* Triangle */}
          <polygon points="100,10 190,170 10,170" className="dh-triangle" />
          {/* Circle */}
          <circle cx="100" cy="115" r="58" className="dh-circle" />
          {/* Line */}
          <line x1="100" y1="10" x2="100" y2="170" className="dh-line" />
        </svg>
      </div>
    </div>
  );
}

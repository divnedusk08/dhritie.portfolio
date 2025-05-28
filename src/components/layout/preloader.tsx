
"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface PreloaderProps {
  onLoaded: () => void;
}

const codeLine = 'print("Hi, I\'m Dhriti")';

export function Preloader({ onLoaded }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [typedText, setTypedText] = useState<string>('');
  const [charIndex, setCharIndex] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [canClickToContinue, setCanClickToContinue] = useState(false);

  useEffect(() => {
    if (!isTypingDone && charIndex < codeLine.length) {
      const typingTimer = setTimeout(() => {
        setTypedText((prev) => prev + codeLine[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 80); // Adjust typing speed (ms)
      return () => clearTimeout(typingTimer);
    } else if (charIndex >= codeLine.length && !isTypingDone) {
      setIsTypingDone(true);
      const promptTimer = setTimeout(() => {
        setCanClickToContinue(true);
      }, 500); // Delay before showing click prompt
      return () => clearTimeout(promptTimer);
    }
  }, [charIndex, isTypingDone]);

  const handleClick = () => {
    if (canClickToContinue) {
      setIsVisible(false);
      // Delay for fade-out animation before calling onLoaded
      setTimeout(onLoaded, 300); // Matches fade-out duration
    }
  };

  return (
    <div
      className={cn(
        "python-preloader-container fixed inset-0 z-[100] flex items-start justify-start transition-opacity duration-300 ease-in-out",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={handleClick}
      aria-hidden={!isVisible}
      data-testid="preloader"
    >
      <div className="python-preloader-content">
        <div className="code-line">
          <span className="line-number">1</span>
          <span>
            {typedText}
            {!isTypingDone && <span className="typewriter-cursor">_</span>}
          </span>
        </div>
        {canClickToContinue && (
          <div className="click-prompt">
            Click anywhere to continue...
          </div>
        )}
      </div>
    </div>
  );
}

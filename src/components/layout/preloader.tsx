
"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface PreloaderProps {
  onLoaded: () => void;
}

const codeLineText = 'print("Hi, I\'m Dhriti")';
const promptText = "Click anywhere to continue...";

export function Preloader({ onLoaded }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [typedCode, setTypedCode] = useState<string>('');
  const [charIndex, setCharIndex] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [showPromptLine, setShowPromptLine] = useState(false);
  const [canClickToContinue, setCanClickToContinue] = useState(false);

  useEffect(() => {
    if (!isTypingDone && charIndex < codeLineText.length) {
      const typingTimer = setTimeout(() => {
        setTypedCode((prev) => prev + codeLineText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 80); // Adjust typing speed (ms)
      return () => clearTimeout(typingTimer);
    } else if (charIndex >= codeLineText.length && !isTypingDone) {
      setIsTypingDone(true);
      const promptTimer = setTimeout(() => {
        setShowPromptLine(true);
        setCanClickToContinue(true);
      }, 500); // Delay before showing click prompt line
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
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        canClickToContinue && isVisible && "cursor-pointer"
      )}
      onClick={handleClick}
      aria-hidden={!isVisible}
      data-testid="preloader"
    >
      <div className="python-preloader-content">
        <div className="code-line">
          <span className="line-number">1</span>
          <span>
            {typedCode}
            {!isTypingDone && <span className="typewriter-cursor">_</span>}
          </span>
        </div>
        {showPromptLine && (
          <div className="code-line">
            <span className="line-number">2</span>
            <span className="click-prompt-inline">
              {promptText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

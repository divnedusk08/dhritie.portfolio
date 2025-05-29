
"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface PreloaderProps {
  onLoaded: () => void;
}

const codeLineText = 'print("Hi, I\'m Dhriti")';
const promptText = '# Click anywhere to continue...';

export function Preloader({ onLoaded }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  // State for line 1
  const [typedCode, setTypedCode] = useState<string>('');
  const [charIndex, setCharIndex] = useState(0);
  const [isLine1TypingComplete, setIsLine1TypingComplete] = useState(false);

  // State for line 2
  const [typedPrompt, setTypedPrompt] = useState<string>('');
  const [promptCharIndex, setPromptCharIndex] = useState(0);
  const [isLine2TypingComplete, setIsLine2TypingComplete] = useState(false);
  const [showLine2, setShowLine2] = useState(false);

  // Shared state
  const [canClickToContinue, setCanClickToContinue] = useState(false);
  const [activeCursor, setActiveCursor] = useState<'line1' | 'line2' | null>('line1');


  // Effect for typing line 1
  useEffect(() => {
    if (isLine1TypingComplete) return;

    if (charIndex < codeLineText.length) {
      setActiveCursor('line1');
      const typingTimer = setTimeout(() => {
        setTypedCode((prev) => prev + codeLineText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(typingTimer);
    } else {
      setIsLine1TypingComplete(true);
      setActiveCursor(null); 
    }
  }, [charIndex, isLine1TypingComplete]);

  // Effect for initiating line 2 display and typing
  useEffect(() => {
    if (isLine1TypingComplete && !showLine2) {
      const line2AppearTimer = setTimeout(() => {
          setShowLine2(true);
          setActiveCursor('line2'); 
      }, 1000); // Shortened pause to 1 second
      return () => clearTimeout(line2AppearTimer);
    }

    if (showLine2 && !isLine2TypingComplete) {
      if (promptCharIndex < promptText.length) {
        setActiveCursor('line2');
        const typingTimer = setTimeout(() => {
          setTypedPrompt((prev) => prev + promptText[promptCharIndex]);
          setPromptCharIndex((prev) => prev + 1);
        }, 80); 
        return () => clearTimeout(typingTimer);
      } else {
        setIsLine2TypingComplete(true);
        setActiveCursor('line2'); 
        setCanClickToContinue(true);
      }
    }
  }, [isLine1TypingComplete, showLine2, promptCharIndex, isLine2TypingComplete]);


  const handleClick = () => {
    if (canClickToContinue) {
      setIsVisible(false);
      setTimeout(onLoaded, 300); 
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
            {activeCursor === 'line1' && <span className="typewriter-cursor">_</span>}
          </span>
        </div>
        {showLine2 && (
          <div className="code-line">
            <span className="line-number">2</span>
            <span className="click-prompt-inline">
              {typedPrompt}
              {activeCursor === 'line2' && <span className="typewriter-cursor">_</span>}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

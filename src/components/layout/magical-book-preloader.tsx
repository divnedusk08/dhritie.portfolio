
"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { User, Award, Briefcase, Mail, BookOpen } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface MagicalBookPreloaderProps {
  onNavigation: (href: string) => void;
  navItems: NavItem[];
}

const Sparkle: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div className="book-sparkle" style={style} />
);

export function MagicalBookPreloader({ onNavigation, navItems }: MagicalBookPreloaderProps) {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [showPageLinks, setShowPageLinks] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [sparkles, setSparkles] = useState<React.CSSProperties[]>([]);
  const [showChoosingPathText, setShowChoosingPathText] = useState(false);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 25 }).map(() => ({
        top: `${Math.random() * 110 - 5}%`,
        left: `${Math.random() * 110 - 5}%`,
        animationDelay: `${Math.random() * 3}s`,
        transform: `scale(${Math.random() * 0.7 + 0.5})`,
      }));
      setSparkles(newSparkles);
    };
    generateSparkles();
    const intervalId = setInterval(generateSparkles, 3500);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let pageLinksTimer: NodeJS.Timeout;
    let choosingPathTimer: NodeJS.Timeout;

    if (isBookOpen && !showPageLinks) {
      setShowChoosingPathText(true); // Show "choosing your path..."
      choosingPathTimer = setTimeout(() => {
        setShowChoosingPathText(false); // Hide "choosing your path..."
        setShowPageLinks(true); // Then show page links
      }, 1500); // Duration for "choosing your path..."
    } else if (!isBookOpen) {
      // Reset when book is closed or initially
      setShowChoosingPathText(false);
      setShowPageLinks(false);
    }
    return () => {
      clearTimeout(pageLinksTimer);
      clearTimeout(choosingPathTimer);
    };
  }, [isBookOpen]);

  const handleBookClick = () => {
    if (!isBookOpen && !isAnimatingOut) {
      setIsBookOpen(true);
    }
  };

  const handleLinkClick = (href: string) => {
    if (isAnimatingOut) return;
    setIsAnimatingOut(true);
    setTimeout(() => {
      onNavigation(href);
      // Reset state if needed for re-entry, though onNavigation might unmount this component
      // setIsBookOpen(false); 
      // setIsAnimatingOut(false);
    }, 700);
  };

  return (
    <div
      className={cn(
        "magical-book-preloader fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700",
        isAnimatingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      <div
        className={cn(
          "book-container group",
          isBookOpen ? "book-is-open" : ""
        )}
        onClick={!isBookOpen ? handleBookClick : undefined} // Only allow click to open when closed
      >
        <div className={cn("book", isAnimatingOut ? "book-zoom-out-animation" : "")}>
          {!isAnimatingOut && sparkles.map((style, i) => <Sparkle key={i} style={style} />)}

          <div className="book-cover">
            <div className="book-cover-content">
              <BookOpen className="book-icon h-20 w-20 md:h-28 md:w-28 mb-3 text-primary-foreground/80" />
              <p className="book-prompt-text">
                {isBookOpen ? "" : "CLICK HERE TO OPEN"}
              </p>
            </div>
          </div>

          <div className="book-pages-container">
            {isBookOpen && showChoosingPathText && !showPageLinks && (
              <p className="choosing-path-text">choosing your path...</p>
            )}
            {showPageLinks && navItems.map((item) => (
              <button
                key={item.href}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLinkClick(item.href);
                }}
                className="book-page-link group/link"
                disabled={isAnimatingOut}
              >
                <item.icon className="mr-3 h-5 w-5 text-primary group-hover/link:text-accent transition-colors" />
                <span className="group-hover/link:text-accent transition-colors">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


"use client";

import { type RefObject, useEffect, useRef, useState } from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

// This hook returns a ref callback and a boolean indicating if the element is intersecting.
export function useIntersectionObserver(
  options: IntersectionObserverOptions = {}
): [(node: Element | null) => void, boolean] {
  const [element, setElement] = useState<Element | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasTriggeredRef = useRef(false); // To handle triggerOnce

  const { threshold = 0.1, root = null, rootMargin = '0px', triggerOnce = false } = options;

  useEffect(() => {
    // Clean up any previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (element) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (triggerOnce) {
            if (entry.isIntersecting && !hasTriggeredRef.current) {
              setIsIntersecting(true);
              hasTriggeredRef.current = true;
              // No need to explicitly unobserve if we disconnect the observer on element change or unmount
            }
          } else {
            setIsIntersecting(entry.isIntersecting);
          }
        },
        { threshold, root, rootMargin }
      );

      observerRef.current.observe(element);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [element, threshold, root, rootMargin, triggerOnce]);

  // If triggerOnce is true and it has already triggered, always return true
  // This ensures that once visible, it stays "visible" for animation purposes
  const finalIsIntersecting = triggerOnce && hasTriggeredRef.current ? true : isIntersecting;

  return [setElement, finalIsIntersecting];
}

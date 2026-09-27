import { useEffect, useRef } from 'react';

interface UseRevealOnScrollOptions {
  selector?: string;
  threshold?: number;
  rootMargin?: string;
  onIntersect?: (entry: IntersectionObserverEntry) => void;
}

/**
 * Custom React hook to observe elements in a section as they enter the viewport
 * and apply the `.is-visible` CSS class for a smooth, subtle fade-in effect.
 */
export function useRevealOnScroll<T extends HTMLElement = HTMLElement>({
  selector = '.reveal-on-scroll, .teacher-card',
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  onIntersect,
}: UseRevealOnScrollOptions = {}) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Find all matching target elements inside the container
    const childElements = Array.from(container.querySelectorAll<HTMLElement>(selector));
    
    // Check if the container itself matches the selector
    const targets = container.matches(selector)
      ? [container, ...childElements]
      : childElements;

    if (!targets.length) return;

    // Fallback for environments without IntersectionObserver
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (onIntersect) {
              onIntersect(entry);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [selector, threshold, rootMargin, onIntersect]);

  return containerRef;
}

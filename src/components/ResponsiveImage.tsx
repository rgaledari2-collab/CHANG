import React, { useState, useEffect, useRef } from 'react';
import { handleImageError } from '../utils/imageFallback';
import placeholders from '../assets/placeholders.json';

export interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  fallbackSrc?: string;
  rootMargin?: string;
  placeholder?: string;
}

/**
 * ResponsiveImage Component with Strict Viewport Lazy Loading & Low-Resolution Blur-up Placeholders
 * 
 * - Pairs solid color warm skeleton with micro-base64 data-URI placeholders
 * - Eliminates layout shift (CLS: 0) with explicit aspect-ratio
 * - Smooth fade-in transition once the WebP image finishes loading
 * - Native decoding="async" and loading="lazy"
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  srcSet,
  sizes,
  width,
  height,
  aspectRatio,
  priority = false,
  className = '',
  containerClassName = '',
  fallbackSrc,
  rootMargin = '150px 0px',
  placeholder,
  onError,
  onLoad,
  style,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Retrieve base64 low-resolution placeholder if available
  const lqip = placeholder || (placeholders as Record<string, string>)[src] || undefined;

  // IntersectionObserver to strictly defer loading until scrolled near viewport
  useEffect(() => {
    if (priority || isVisible) return;

    const target = containerRef.current || imgRef.current;
    if (!target) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [priority, isVisible, rootMargin]);

  // Generate responsive srcset if not explicitly provided
  const computedSrcSet =
    srcSet ||
    (src && src.startsWith('https://images.unsplash.com/')
      ? `${src.split('?')[0]}?auto=format&fit=crop&w=400&q=80 400w, ${src.split('?')[0]}?auto=format&fit=crop&w=800&q=80 800w, ${src.split('?')[0]}?auto=format&fit=crop&w=1200&q=80 1200w`
      : undefined);

  const computedSizes = sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px';

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (fallbackSrc) {
      e.currentTarget.onerror = null;
      e.currentTarget.src = fallbackSrc;
    } else {
      handleImageError(e);
    }
    onError?.(e);
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#2A1016]/10 dark:bg-white/5 ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* 1. Low-Resolution base64 data-URI placeholder with soft gaussian blur */}
      {lqip && (
        <div
          className={`absolute inset-0 bg-cover bg-center filter blur-md transition-opacity duration-700 scale-105 pointer-events-none ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundImage: `url("${lqip}")` }}
          aria-hidden="true"
        />
      )}

      {/* 2. Solid color skeleton pulse background if no lqip or before load */}
      <div
        className={`absolute inset-0 bg-gradient-to-tr from-[#3B1720]/15 to-[#B92B3A]/5 dark:from-white/5 dark:to-white/10 animate-pulse transition-opacity duration-500 pointer-events-none ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      />

      {/* 3. Actual high-definition WebP image */}
      {isVisible && (
        <img
          ref={imgRef}
          src={src}
          srcSet={computedSrcSet}
          sizes={computedSizes}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          fetchPriority={priority ? 'high' : 'low'}
          onError={handleError}
          onLoad={handleImageLoad}
          className={`relative z-10 w-full h-full object-cover transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={{
            aspectRatio: aspectRatio || undefined,
            ...style,
          }}
          {...props}
        />
      )}
    </div>
  );
};

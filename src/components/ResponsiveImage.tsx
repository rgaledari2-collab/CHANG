import React, { useState, useEffect, useRef } from 'react';
import { handleImageError } from '../utils/imageFallback';

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
}

/**
 * ResponsiveImage Component with Strict Viewport Lazy Loading (IntersectionObserver)
 * 
 * - Images are ONLY loaded when they enter the viewport window (threshold + rootMargin)
 * - Zero Layout Shift (CLS) via explicit aspect-ratio
 * - Smooth transition upon load with low perceived latency
 * - Asynchronous decoding for non-blocking UI
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
  onError,
  onLoad,
  style,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // IntersectionObserver to strictly defer loading until scrolled into view
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
      className={`relative overflow-hidden bg-black/5 dark:bg-white/5 ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {isVisible ? (
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
          className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={{
            aspectRatio: aspectRatio || undefined,
            ...style,
          }}
          {...props}
        />
      ) : (
        /* Placeholder skeleton before entering viewport */
        <div
          className="w-full h-full bg-[#18050B]/10 dark:bg-white/5 animate-pulse"
          style={aspectRatio ? { aspectRatio } : undefined}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

import React from 'react';
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
}

/**
 * ResponsiveImage Component
 * 
 * Implements clean, reliable responsive image loading:
 * - Direct real image loading with high-availability fallbacks
 * - Zero Cumulative Layout Shift (CLS) via explicit width, height & aspect-ratio
 * - Native lazy loading with asynchronous decoding
 * - Tolerant to network / ISP restrictions
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
  onError,
  fallbackSrc,
  style,
  ...props
}) => {
  // Generate responsive srcset if not explicitly provided
  const computedSrcSet =
    srcSet ||
    (src && src.startsWith('https://images.unsplash.com/')
      ? `${src.split('?')[0]}?auto=format&fit=crop&w=400&q=80 400w, ${src.split('?')[0]}?auto=format&fit=crop&w=800&q=80 800w, ${src.split('?')[0]}?auto=format&fit=crop&w=1200&q=80 1200w`
      : undefined);

  // Mobile-first default sizes matching common responsive breakpoints
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

  const imageElement = (
    <img
      src={src}
      srcSet={computedSrcSet}
      sizes={computedSizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={handleError}
      className={`w-full h-full object-cover transition-opacity duration-300 ${className}`}
      style={{
        aspectRatio: aspectRatio || undefined,
        ...style,
      }}
      {...props}
    />
  );

  if (containerClassName) {
    return (
      <div 
        className={`relative overflow-hidden ${containerClassName}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        {imageElement}
      </div>
    );
  }

  return imageElement;
};

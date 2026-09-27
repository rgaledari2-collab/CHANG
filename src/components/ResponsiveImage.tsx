import React, { useState } from 'react';
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
 * Implements modern mobile-first responsive image loading:
 * - Proper `srcset` and `sizes` attributes for multi-screen adaptation
 * - Zero Cumulative Layout Shift (CLS) via explicit width, height & aspect-ratio
 * - Native lazy loading with asynchronous decoding
 * - Smart graceful fallback on network / CORS errors
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
  const [hasError, setHasError] = useState(false);

  // Generate responsive srcset if not explicitly provided
  const computedSrcSet = srcSet || (src ? `${src} 400w, ${src} 800w, ${src} 1200w` : undefined);

  // Mobile-first default sizes matching common responsive breakpoints
  const computedSizes = sizes || '(max-width: 640px) 94vw, (max-width: 1024px) 48vw, 400px';

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
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

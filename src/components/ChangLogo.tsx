import React from 'react';
import { CHANG_LOGO_WHITE, CHANG_LOGO_RED } from '../assets/logoBase64';

interface ChangLogoProps {
  className?: string;
  variant?: 'white' | 'red' | 'dark' | 'currentColor';
}

/**
 * ChangLogo renders the authentic original logo artwork with transparent background.
 * It uses inlined base64 data URIs so it loads 100% instantly with ZERO network requests,
 * preventing any flash of unstyled content, 404s, or loading delays in any environment.
 */
export const ChangLogo: React.FC<ChangLogoProps> = ({
  className = 'h-10 w-auto',
  variant = 'currentColor'
}) => {
  return (
    <span className={`inline-flex items-center justify-center relative select-none ${className}`}>
      {variant === 'white' ? (
        <img
          src={CHANG_LOGO_WHITE}
          alt="لوگوی رسمی آموزشگاه موسیقی چنگ"
          className="w-full h-full max-h-full object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
          decoding="sync"
          loading="eager"
        />
      ) : variant === 'red' ? (
        <img
          src={CHANG_LOGO_RED}
          alt="لوگوی رسمی آموزشگاه موسیقی چنگ"
          className="w-full h-full max-h-full object-contain"
          decoding="sync"
          loading="eager"
        />
      ) : (
        <>
          {/* Light mode: Red authentic logo */}
          <img
            src={CHANG_LOGO_RED}
            alt="لوگوی آموزشگاه چنگ"
            className="w-full h-full max-h-full object-contain dark:hidden"
            decoding="sync"
            loading="eager"
          />
          {/* Dark mode: White authentic logo */}
          <img
            src={CHANG_LOGO_WHITE}
            alt="لوگوی آموزشگاه چنگ"
            className="w-full h-full max-h-full object-contain hidden dark:block filter drop-shadow-[0_1px_8px_rgba(255,255,255,0.2)]"
            decoding="sync"
            loading="eager"
          />
        </>
      )}
    </span>
  );
};

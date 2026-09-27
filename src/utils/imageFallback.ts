import React from 'react';

export const MUSIC_FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%23241015" width="400" height="300"/><circle cx="200" cy="140" r="55" fill="%23B92B3A" opacity="0.25"/><path d="M190 115v45a12 12 0 1 1-8-11.3V122l28-8v38a12 12 0 1 1-8-11.3V106z" fill="%23F3C7CA"/><text fill="%23E8DFE0" font-family="sans-serif" font-size="14" font-weight="bold" x="50%" y="80%" text-anchor="middle">آموزشگاه موسیقی چنگ خرمشهر</text></svg>';

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = MUSIC_FALLBACK_IMAGE;
};

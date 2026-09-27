import React from 'react';

/**
 * High-Availability Real Photography Fallback Registry
 * 
 * Uses globally accessible, unblocked photographic mirrors (Wikimedia Commons CDN)
 * to ensure that real human portraits and real concert/studio photography load
 * even if Unsplash or local network restrictions occur.
 */
export const REAL_PHOTO_FALLBACKS = {
  negar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/A_smiling_woman_in_a_light_blue_shirt.jpg/640px-A_smiling_woman_in_a_light_blue_shirt.jpg',
  mehdi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre_person.jpg/640px-Pierre_person.jpg',
  sara: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Woman_smiling_outdoors.jpg/640px-Woman_smiling_outdoors.jpg',
  ali: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Portrait_of_a_man.jpg/640px-Portrait_of_a_man.jpg',
  event: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Sydney_Symphony_Orchestra_at_the_Sydney_Opera_House.jpg/1280px-Sydney_Symphony_Orchestra_at_the_Sydney_Opera_House.jpg',
  story1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Steinway_%26_Sons_grand_piano.jpg/800px-Steinway_%26_Sons_grand_piano.jpg',
  story2: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Young_musician_playing_classical_guitar.jpg/800px-Young_musician_playing_classical_guitar.jpg',
};

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = e.currentTarget;
  img.onerror = null; // Prevent loop

  const alt = (img.alt || '').toLowerCase();
  const src = (img.src || '').toLowerCase();

  if (alt.includes('نگار') || alt.includes('پیانو')) {
    img.src = REAL_PHOTO_FALLBACKS.negar;
  } else if (alt.includes('مهدی') || alt.includes('تار') || alt.includes('سه‌تار')) {
    img.src = REAL_PHOTO_FALLBACKS.mehdi;
  } else if (alt.includes('سارا') || alt.includes('آواز')) {
    img.src = REAL_PHOTO_FALLBACKS.sara;
  } else if (alt.includes('علی') || alt.includes('گیتار')) {
    img.src = REAL_PHOTO_FALLBACKS.ali;
  } else if (alt.includes('کنسرت') || alt.includes('رویداد') || alt.includes('شب موسیقی')) {
    img.src = REAL_PHOTO_FALLBACKS.event;
  } else if (alt.includes('تمرین') || src.includes('493225457124')) {
    img.src = REAL_PHOTO_FALLBACKS.story2;
  } else {
    img.src = REAL_PHOTO_FALLBACKS.story1;
  }
};

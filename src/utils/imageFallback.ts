import React from 'react';
import {
  TEACHER_NEGAR_IMAGE,
  TEACHER_MEHDI_IMAGE,
  TEACHER_SARA_IMAGE,
  TEACHER_ALI_IMAGE,
  EVENT_STAGE_IMAGE,
  STORY_MAIN_IMAGE,
  STORY_SECONDARY_IMAGE
} from '../assets/imagesData';

export const MUSIC_FALLBACK_IMAGE = STORY_MAIN_IMAGE;

/**
 * Robust, zero-network fallback handler that dynamically inspects
 * the image alt/context and supplies a high-fidelity self-contained SVG asset.
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = e.currentTarget;
  img.onerror = null;

  const alt = (img.alt || '').toLowerCase();
  const src = (img.src || '').toLowerCase();

  if (alt.includes('نگار') || alt.includes('پیانو') || alt.includes('ارف')) {
    img.src = TEACHER_NEGAR_IMAGE;
  } else if (alt.includes('مهدی') || alt.includes('تار') || alt.includes('ردیف')) {
    img.src = TEACHER_MEHDI_IMAGE;
  } else if (alt.includes('سارا') || alt.includes('آواز') || alt.includes('صدا')) {
    img.src = TEACHER_SARA_IMAGE;
  } else if (alt.includes('علی') || alt.includes('گیتار')) {
    img.src = TEACHER_ALI_IMAGE;
  } else if (alt.includes('کنسرت') || alt.includes('رویداد') || alt.includes('شب موسیقی') || src.includes('501386761578')) {
    img.src = EVENT_STAGE_IMAGE;
  } else if (alt.includes('تمرین') || src.includes('493225457124')) {
    img.src = STORY_SECONDARY_IMAGE;
  } else {
    img.src = STORY_MAIN_IMAGE;
  }
};

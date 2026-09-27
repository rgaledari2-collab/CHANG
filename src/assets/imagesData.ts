/**
 * Self-Contained High-Fidelity Music Visual Assets for Chang Music School
 * 
 * These assets are 100% offline-ready, immune to Iranian ISP filters, CORS blocks,
 * and guaranteed to render instantly on GitHub Pages with zero external dependencies.
 */

// Helper to encode SVGs into clean Data URIs
const svgToUri = (svgString: string): string => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
};

// Teacher 1: نگار احمدی (پیانو کلاسیک و موسیقی کودک ارف)
export const TEACHER_NEGAR_IMAGE = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500">
  <defs>
    <linearGradient id="bgNegar" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B1720" />
      <stop offset="50%" stop-color="#241016" />
      <stop offset="100%" stop-color="#14070A" />
    </linearGradient>
    <linearGradient id="goldPiano" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e8c27a" />
      <stop offset="100%" stop-color="#f3d8a2" />
    </linearGradient>
    <radialGradient id="haloNegar" cx="50%" cy="38%" r="45%">
      <stop offset="0%" stop-color="#B92B3A" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#B92B3A" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="400" height="500" fill="url(#bgNegar)" />
  <circle cx="200" cy="190" r="150" fill="url(#haloNegar)" />

  <!-- Acoustic Harmonic Circles -->
  <circle cx="200" cy="180" r="110" fill="none" stroke="#F3C7CA" stroke-opacity="0.15" stroke-width="1.5" stroke-dasharray="6 4" />
  <circle cx="200" cy="180" r="135" fill="none" stroke="#e8c27a" stroke-opacity="0.12" stroke-width="1" />

  <!-- Stylized Educator Silhouette -->
  <!-- Shoulders & Torso -->
  <path d="M120 420 C120 340 150 310 200 310 C250 310 280 340 280 420 Z" fill="#2d131b" stroke="#B92B3A" stroke-width="1.5" />
  
  <!-- Scarf / Elegant drape -->
  <path d="M165 315 C180 340 220 340 235 315 C245 365 240 420 240 420 L160 420 C160 420 155 365 165 315 Z" fill="#B92B3A" opacity="0.6" />

  <!-- Head & Hair Silhouette -->
  <ellipse cx="200" cy="205" rx="55" ry="68" fill="#1f0c13" />
  <!-- Face Contour -->
  <ellipse cx="200" cy="215" rx="42" ry="50" fill="#eac9b8" />
  <!-- Hair Contour -->
  <path d="M150 200 C150 145 250 145 250 200 C250 235 240 270 235 275 C230 220 170 220 165 275 C160 270 150 235 150 200 Z" fill="#221117" />
  <path d="M170 185 Q200 160 230 185 Q200 175 170 185 Z" fill="#14070A" />

  <!-- Grand Piano Keyboard at the bottom -->
  <g transform="translate(40, 410)">
    <!-- Piano base -->
    <rect x="0" y="0" width="320" height="70" rx="6" fill="#120508" stroke="#e8c27a" stroke-width="1.5" />
    
    <!-- White Keys -->
    <g fill="#FDFBF7" stroke="#333" stroke-width="0.8">
      <rect x="10" y="5" width="18" height="58" rx="2" />
      <rect x="30" y="5" width="18" height="58" rx="2" />
      <rect x="50" y="5" width="18" height="58" rx="2" />
      <rect x="70" y="5" width="18" height="58" rx="2" />
      <rect x="90" y="5" width="18" height="58" rx="2" />
      <rect x="110" y="5" width="18" height="58" rx="2" />
      <rect x="130" y="5" width="18" height="58" rx="2" />
      <rect x="150" y="5" width="18" height="58" rx="2" />
      <rect x="170" y="5" width="18" height="58" rx="2" />
      <rect x="190" y="5" width="18" height="58" rx="2" />
      <rect x="210" y="5" width="18" height="58" rx="2" />
      <rect x="230" y="5" width="18" height="58" rx="2" />
      <rect x="250" y="5" width="18" height="58" rx="2" />
      <rect x="270" y="5" width="18" height="58" rx="2" />
      <rect x="290" y="5" width="18" height="58" rx="2" />
    </g>

    <!-- Black Keys -->
    <g fill="#1a1a1a">
      <rect x="22" y="5" width="12" height="38" rx="1" />
      <rect x="42" y="5" width="12" height="38" rx="1" />
      <rect x="82" y="5" width="12" height="38" rx="1" />
      <rect x="102" y="5" width="12" height="38" rx="1" />
      <rect x="122" y="5" width="12" height="38" rx="1" />
      <rect x="162" y="5" width="12" height="38" rx="1" />
      <rect x="182" y="5" width="12" height="38" rx="1" />
      <rect x="222" y="5" width="12" height="38" rx="1" />
      <rect x="242" y="5" width="12" height="38" rx="1" />
      <rect x="262" y="5" width="12" height="38" rx="1" />
    </g>
  </g>

  <!-- Musical Floating Notes -->
  <g fill="#e8c27a" opacity="0.85">
    <!-- Treble clef accent -->
    <path d="M70 120 Q80 90 65 75 Q55 90 70 120 M70 65 L70 135 M60 135 Q70 145 78 135" stroke="#e8c27a" stroke-width="2" fill="none" />
    <!-- Note 1 -->
    <ellipse cx="320" cy="140" rx="9" ry="7" transform="rotate(-20 320 140)" />
    <line x1="327" y1="138" x2="327" y2="95" stroke="#e8c27a" stroke-width="2.5" />
    <!-- Note 2 double -->
    <ellipse cx="90" cy="270" rx="8" ry="6" transform="rotate(-20 90 270)" />
    <line x1="97" y1="268" x2="97" y2="230" stroke="#e8c27a" stroke-width="2" />
  </g>

  <!-- Name Caption Inside Image -->
  <rect x="100" y="25" width="200" height="32" rx="16" fill="#14070A" fill-opacity="0.85" stroke="#e8c27a" stroke-opacity="0.4" />
  <text x="200" y="46" font-family="Vazirmatn, sans-serif" font-size="13" font-weight="bold" fill="#FDFBF7" text-anchor="middle">استاد نگار احمدی · پیانو و ارف</text>
</svg>
`);

// Teacher 2: مهدی رضایی (تار، سه‌تار و ردیف دستگاهی)
export const TEACHER_MEHDI_IMAGE = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500">
  <defs>
    <linearGradient id="bgMehdi" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2c1a11" />
      <stop offset="50%" stop-color="#1b0f0a" />
      <stop offset="100%" stop-color="#0e0705" />
    </linearGradient>
    <radialGradient id="haloMehdi" cx="50%" cy="36%" r="45%">
      <stop offset="0%" stop-color="#d49a4a" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#d49a4a" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="400" height="500" fill="url(#bgMehdi)" />
  <circle cx="200" cy="180" r="150" fill="url(#haloMehdi)" />

  <!-- Traditional Islamic Geometric Motif Ring -->
  <circle cx="200" cy="180" r="120" fill="none" stroke="#d49a4a" stroke-opacity="0.2" stroke-width="1.5" stroke-dasharray="8 6" />

  <!-- Silhouette Torso -->
  <path d="M100 440 C100 340 140 300 200 300 C260 300 300 340 300 440 Z" fill="#20110b" stroke="#8d4b1a" stroke-width="1.5" />
  <!-- Traditional Collar / Vest -->
  <path d="M160 305 L200 370 L240 305 Z" fill="#582a10" />

  <!-- Head & Facial Contour -->
  <ellipse cx="200" cy="195" rx="52" ry="65" fill="#180c07" />
  <ellipse cx="200" cy="205" rx="42" ry="50" fill="#e8c8b4" />
  <!-- Hair & Beard -->
  <path d="M152 190 C152 140 248 140 248 190 C248 205 240 220 236 210 C220 185 180 185 164 210 C160 220 152 205 152 190 Z" fill="#120805" />
  <!-- Beard -->
  <path d="M165 225 C165 270 235 270 235 225 C220 245 180 245 165 225 Z" fill="#1a0d08" />

  <!-- Iranian Tar Instrument Silhouette Across Chest -->
  <g transform="translate(110, 310) rotate(-22)">
    <!-- Small Bowl (Kaseh Kucheh) -->
    <ellipse cx="50" cy="50" rx="36" ry="28" fill="#a45b23" stroke="#e8c27a" stroke-width="1.5" />
    <ellipse cx="50" cy="50" rx="30" ry="22" fill="#6d3a14" />
    <!-- Big Bowl (Kaseh Bozorg) -->
    <ellipse cx="110" cy="50" rx="46" ry="34" fill="#a45b23" stroke="#e8c27a" stroke-width="1.5" />
    <ellipse cx="110" cy="50" rx="40" ry="28" fill="#6d3a14" />
    <!-- Skin (Poust) -->
    <ellipse cx="110" cy="50" rx="34" ry="22" fill="#ecd9b6" opacity="0.85" />
    <!-- Neck (Dasteh) -->
    <rect x="150" y="44" width="130" height="12" rx="2" fill="#522a0e" stroke="#e8c27a" stroke-width="1" />
    <!-- Frets (Pardeh) -->
    <line x1="170" y1="44" x2="170" y2="56" stroke="#e8c27a" stroke-width="1" />
    <line x1="190" y1="44" x2="190" y2="56" stroke="#e8c27a" stroke-width="1" />
    <line x1="210" y1="44" x2="210" y2="56" stroke="#e8c27a" stroke-width="1" />
    <line x1="230" y1="44" x2="230" y2="56" stroke="#e8c27a" stroke-width="1" />
    <line x1="250" y1="44" x2="250" y2="56" stroke="#e8c27a" stroke-width="1" />
    <!-- Pegbox (Sarpanjeh) -->
    <rect x="280" y="40" width="30" height="20" rx="3" fill="#3a1b07" stroke="#e8c27a" stroke-width="1" />
  </g>

  <!-- Badge / Name Caption -->
  <rect x="100" y="25" width="200" height="32" rx="16" fill="#14070A" fill-opacity="0.85" stroke="#d49a4a" stroke-opacity="0.4" />
  <text x="200" y="46" font-family="Vazirmatn, sans-serif" font-size="13" font-weight="bold" fill="#FDFBF7" text-anchor="middle">استاد مهدی رضایی · تار و ردیف</text>
</svg>
`);

// Teacher 3: سارا کریمی (آواز اصیل و صداسازی)
export const TEACHER_SARA_IMAGE = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500">
  <defs>
    <linearGradient id="bgSara" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#361320" />
      <stop offset="50%" stop-color="#1c0710" />
      <stop offset="100%" stop-color="#0e0308" />
    </linearGradient>
    <radialGradient id="haloSara" cx="50%" cy="38%" r="48%">
      <stop offset="0%" stop-color="#e2738a" stop-opacity="0.32" />
      <stop offset="100%" stop-color="#B92B3A" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="400" height="500" fill="url(#bgSara)" />
  <circle cx="200" cy="190" r="150" fill="url(#haloSara)" />

  <!-- Acoustic Vocal Resonance Rings -->
  <circle cx="200" cy="200" r="110" fill="none" stroke="#F3C7CA" stroke-opacity="0.2" stroke-width="1.5" />
  <circle cx="200" cy="200" r="135" fill="none" stroke="#F3C7CA" stroke-opacity="0.12" stroke-width="1" stroke-dasharray="4 4" />

  <!-- Torso / Dress -->
  <path d="M110 430 C110 330 145 305 200 305 C255 305 290 330 290 430 Z" fill="#260b16" stroke="#B92B3A" stroke-width="1.5" />
  <path d="M170 310 Q200 345 230 310 L220 430 L180 430 Z" fill="#B92B3A" opacity="0.45" />

  <!-- Head Contour -->
  <ellipse cx="200" cy="200" rx="50" ry="64" fill="#1b0810" />
  <ellipse cx="200" cy="210" rx="40" ry="48" fill="#ebd1c3" />
  <!-- Hair & Scarf -->
  <path d="M152 195 C152 140 248 140 248 195 C248 245 235 275 230 280 C220 220 180 220 170 280 C165 275 152 245 152 195 Z" fill="#17060d" />

  <!-- Vocal Resonance Waves Emanating -->
  <g fill="none" stroke="#F3C7CA" stroke-width="2" opacity="0.6">
    <path d="M250 210 Q275 200 295 215" />
    <path d="M255 200 Q285 185 315 205" />
    <path d="M260 190 Q295 170 330 195" />
  </g>

  <!-- Studio Vintage Microphone -->
  <g transform="translate(70, 240)">
    <rect x="0" y="20" width="22" height="42" rx="11" fill="#e8c27a" stroke="#fff" stroke-width="1" />
    <!-- Mic Grid -->
    <line x1="4" y1="30" x2="18" y2="30" stroke="#333" stroke-width="1" />
    <line x1="4" y1="38" x2="18" y2="38" stroke="#333" stroke-width="1" />
    <line x1="4" y1="46" x2="18" y2="46" stroke="#333" stroke-width="1" />
    <!-- Stand -->
    <path d="M-4 42 C-4 68 26 68 26 42" fill="none" stroke="#e8c27a" stroke-width="2.5" />
    <line x1="11" y1="68" x2="11" y2="120" stroke="#e8c27a" stroke-width="3" />
  </g>

  <!-- Name Caption -->
  <rect x="100" y="25" width="200" height="32" rx="16" fill="#14070A" fill-opacity="0.85" stroke="#B92B3A" stroke-opacity="0.5" />
  <text x="200" y="46" font-family="Vazirmatn, sans-serif" font-size="13" font-weight="bold" fill="#FDFBF7" text-anchor="middle">استاد سارا کریمی · آواز و صداسازی</text>
</svg>
`);

// Teacher 4: علی مرادی (گیتار کلاسیک و پاپ)
export const TEACHER_ALI_IMAGE = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500">
  <defs>
    <linearGradient id="bgAli" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a1c24" />
      <stop offset="50%" stop-color="#0f1117" />
      <stop offset="100%" stop-color="#07080a" />
    </linearGradient>
    <radialGradient id="haloAli" cx="50%" cy="36%" r="45%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="400" height="500" fill="url(#bgAli)" />
  <circle cx="200" cy="180" r="150" fill="url(#haloAli)" />
  <circle cx="200" cy="180" r="120" fill="none" stroke="#60a5fa" stroke-opacity="0.15" stroke-width="1.5" stroke-dasharray="6 4" />

  <!-- Silhouette Torso -->
  <path d="M100 430 C100 330 140 300 200 300 C260 300 300 330 300 430 Z" fill="#13161f" stroke="#2563eb" stroke-width="1.5" />
  
  <!-- Head & Hair -->
  <ellipse cx="200" cy="195" rx="52" ry="65" fill="#0d0e14" />
  <ellipse cx="200" cy="205" rx="42" ry="50" fill="#e2c8ba" />
  <!-- Hair style -->
  <path d="M152 185 C152 135 248 135 248 185 C248 195 240 210 230 195 C215 175 185 175 170 195 C160 210 152 195 152 185 Z" fill="#0a0a0f" />

  <!-- Acoustic Classical Spanish Guitar Silhouette -->
  <g transform="translate(130, 310) rotate(-28)">
    <!-- Upper Bout -->
    <ellipse cx="60" cy="60" rx="38" ry="32" fill="#c27438" stroke="#f3d8a2" stroke-width="1.5" />
    <!-- Lower Bout -->
    <ellipse cx="120" cy="60" rx="50" ry="42" fill="#c27438" stroke="#f3d8a2" stroke-width="1.5" />
    <!-- Soundhole (Rosette) -->
    <circle cx="75" cy="60" r="16" fill="#1a1c24" stroke="#f3d8a2" stroke-width="2" />
    <circle cx="75" cy="60" r="12" fill="#0b0d12" />
    <!-- Bridge -->
    <rect x="125" y="52" width="8" height="16" rx="1" fill="#451a03" />
    <!-- Fretboard & Neck -->
    <rect x="0" y="55" width="80" height="10" fill="#451a03" stroke="#f3d8a2" stroke-width="1" />
    <line x1="15" y1="55" x2="15" y2="65" stroke="#f3d8a2" stroke-width="0.8" />
    <line x1="30" y1="55" x2="30" y2="65" stroke="#f3d8a2" stroke-width="0.8" />
    <line x1="45" y1="55" x2="45" y2="65" stroke="#f3d8a2" stroke-width="0.8" />
    <line x1="60" y1="55" x2="60" y2="65" stroke="#f3d8a2" stroke-width="0.8" />
    <!-- Strings -->
    <line x1="-10" y1="58" x2="128" y2="58" stroke="#fff" stroke-width="0.8" opacity="0.8" />
    <line x1="-10" y1="60" x2="128" y2="60" stroke="#fff" stroke-width="0.8" opacity="0.8" />
    <line x1="-10" y1="62" x2="128" y2="62" stroke="#fff" stroke-width="0.8" opacity="0.8" />
  </g>

  <!-- Name Caption -->
  <rect x="100" y="25" width="200" height="32" rx="16" fill="#07080a" fill-opacity="0.85" stroke="#3b82f6" stroke-opacity="0.4" />
  <text x="200" y="46" font-family="Vazirmatn, sans-serif" font-size="13" font-weight="bold" fill="#FDFBF7" text-anchor="middle">استاد علی مرادی · گیتار و آنسامبل</text>
</svg>
`);

// Event Stage Poster: کنسرت هنرجویی شب موسیقی چنگ
export const EVENT_STAGE_IMAGE = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" width="1200" height="600">
  <defs>
    <linearGradient id="stageBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1f070e" />
      <stop offset="50%" stop-color="#3d1421" />
      <stop offset="100%" stop-color="#0a0204" />
    </linearGradient>
    <radialGradient id="spotlight1" cx="30%" cy="10%" r="70%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.45" />
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="spotlight2" cx="70%" cy="10%" r="70%">
      <stop offset="0%" stop-color="#ec4899" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#ec4899" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Stage Hall Background -->
  <rect width="1200" height="600" fill="url(#stageBg)" />
  <rect width="1200" height="600" fill="url(#spotlight1)" />
  <rect width="1200" height="600" fill="url(#spotlight2)" />

  <!-- Architectural Stage Frame & Proscenium -->
  <path d="M0 0 L150 120 L150 500 L0 600 Z" fill="#140409" opacity="0.8" />
  <path d="M1200 0 L1050 120 L1050 500 L1200 600 Z" fill="#140409" opacity="0.8" />
  
  <!-- Warm Stage Light Beams -->
  <polygon points="350,0 200,480 500,480" fill="#fef08a" opacity="0.12" />
  <polygon points="850,0 700,480 1000,480" fill="#f472b6" opacity="0.1" />

  <!-- Stage Wooden Floor -->
  <polygon points="150,450 1050,450 1200,600 0,600" fill="#2a1017" stroke="#e8c27a" stroke-width="1" />
  <!-- Stage Planks -->
  <line x1="300" y1="450" x2="220" y2="600" stroke="#1d090f" stroke-width="2" />
  <line x1="500" y1="450" x2="460" y2="600" stroke="#1d090f" stroke-width="2" />
  <line x1="700" y1="450" x2="740" y2="600" stroke="#1d090f" stroke-width="2" />
  <line x1="900" y1="450" x2="980" y2="600" stroke="#1d090f" stroke-width="2" />

  <!-- Concert Grand Piano on Stage -->
  <g transform="translate(320, 310)">
    <!-- Piano Body Silhouette -->
    <path d="M40 90 C30 30 110 20 180 40 C220 50 250 80 250 120 L250 135 L40 135 Z" fill="#0d0407" stroke="#e8c27a" stroke-width="1.5" />
    <!-- Piano Lid Raised -->
    <polygon points="40,90 200,10 220,15 70,95" fill="#18070d" stroke="#e8c27a" stroke-width="1" />
    <line x1="140" y1="50" x2="140" y2="105" stroke="#e8c27a" stroke-width="2" />
    <!-- Piano Legs -->
    <rect x="50" y="135" width="8" height="40" fill="#0d0407" />
    <rect x="235" y="135" width="8" height="40" fill="#0d0407" />
    <!-- Pianist Silhouette -->
    <circle cx="280" cy="115" r="16" fill="#0d0407" />
    <path d="M265 130 C265 125 295 125 295 130 L300 175 L260 175 Z" fill="#0d0407" />
  </g>

  <!-- Orchestra & Performer Silhouettes in Center -->
  <g fill="#0e0407" transform="translate(620, 360)">
    <!-- Violinist 1 -->
    <circle cx="40" cy="30" r="14" />
    <path d="M25 44 C25 40 55 40 55 44 L60 95 L20 95 Z" />
    <line x1="50" y1="48" x2="80" y2="35" stroke="#e8c27a" stroke-width="2" />
    <line x1="45" y1="30" x2="85" y2="40" stroke="#fff" stroke-width="1" />

    <!-- Traditional Tar Performer (Seated) -->
    <circle cx="130" cy="40" r="14" />
    <path d="M110 54 C110 50 150 50 150 54 L155 95 L105 95 Z" />
    <ellipse cx="140" cy="65" rx="16" ry="10" fill="#a45b23" stroke="#e8c27a" stroke-width="1" />

    <!-- Cellist (Seated) -->
    <circle cx="210" cy="35" r="14" />
    <path d="M190 49 C190 45 230 45 230 49 L235 95 L185 95 Z" />
    <ellipse cx="210" cy="70" rx="15" ry="24" fill="#a45b23" stroke="#e8c27a" stroke-width="1" />
    <line x1="210" y1="46" x2="210" y2="98" stroke="#e8c27a" stroke-width="2" />
  </g>

  <!-- Audience Silhouette in Foreground -->
  <g fill="#080204" opacity="0.95">
    <ellipse cx="100" cy="590" rx="45" ry="35" />
    <ellipse cx="220" cy="580" rx="40" ry="32" />
    <ellipse cx="340" cy="585" rx="42" ry="34" />
    <ellipse cx="460" cy="578" rx="46" ry="36" />
    <ellipse cx="580" cy="582" rx="40" ry="33" />
    <ellipse cx="700" cy="580" rx="44" ry="35" />
    <ellipse cx="820" cy="585" rx="42" ry="34" />
    <ellipse cx="940" cy="578" rx="45" ry="36" />
    <ellipse cx="1060" cy="585" rx="40" ry="33" />
  </g>

  <!-- Top Title Banner -->
  <rect x="350" y="40" width="500" height="60" rx="30" fill="#140409" fill-opacity="0.9" stroke="#e8c27a" stroke-width="1.5" />
  <text x="600" y="78" font-family="Vazirmatn, sans-serif" font-size="20" font-weight="900" fill="#FDFBF7" text-anchor="middle">کنسرت بزرگ هنرجویی شب موسیقی چنگ خرمشهر</text>
</svg>
`);

// Story Main Image: استودیو و آکوستیک آموزشگاه چنگ
export const STORY_MAIN_IMAGE = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="600" height="750">
  <defs>
    <linearGradient id="studioWall" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b1720" />
      <stop offset="50%" stop-color="#240f15" />
      <stop offset="100%" stop-color="#14070b" />
    </linearGradient>
    <radialGradient id="lampGlow" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#b92b3a" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="600" height="750" fill="url(#studioWall)" />
  <circle cx="300" cy="240" r="260" fill="url(#lampGlow)" />

  <!-- Acoustic Wall Wooden Slat Panels -->
  <g stroke="#4f1d2b" stroke-width="6" opacity="0.6">
    <line x1="60" y1="80" x2="60" y2="480" />
    <line x1="90" y1="80" x2="90" y2="480" />
    <line x1="120" y1="80" x2="120" y2="480" />
    <line x1="150" y1="80" x2="150" y2="480" />
    <line x1="450" y1="80" x2="450" y2="480" />
    <line x1="480" y1="80" x2="480" y2="480" />
    <line x1="510" y1="80" x2="510" y2="480" />
    <line x1="540" y1="80" x2="540" y2="480" />
  </g>

  <!-- Persian Heritage Arch Window -->
  <path d="M200 450 L200 240 C200 130 400 130 400 240 L400 450 Z" fill="#1b0a10" stroke="#e8c27a" stroke-width="2" />
  <circle cx="300" cy="220" r="45" fill="none" stroke="#e8c27a" stroke-width="1.5" stroke-dasharray="6 4" />

  <!-- Instruments on Stands -->
  <!-- Classical Cello / Violin on stand -->
  <g transform="translate(230, 260)">
    <ellipse cx="70" cy="180" rx="35" ry="50" fill="#9a471b" stroke="#e8c27a" stroke-width="1.5" />
    <ellipse cx="70" cy="180" rx="10" ry="10" fill="#14070b" />
    <rect x="66" y="90" width="8" height="90" fill="#3b1b0b" />
    <line x1="70" y1="80" x2="70" y2="240" stroke="#fff" stroke-width="1" opacity="0.7" />
  </g>

  <!-- Music Sheet Stand -->
  <g transform="translate(360, 320)">
    <!-- Stand -->
    <line x1="60" y1="120" x2="60" y2="260" stroke="#71717a" stroke-width="4" />
    <polygon points="60,260 20,340 100,340" fill="none" stroke="#71717a" stroke-width="3" />
    <!-- Desk & Sheet -->
    <rect x="10" y="60" width="100" height="70" rx="4" fill="#18181b" stroke="#e8c27a" stroke-width="1" />
    <!-- Sheet of Music Paper -->
    <rect x="20" y="68" width="80" height="54" rx="2" fill="#fafafa" />
    <!-- Music Staves -->
    <line x1="25" y1="78" x2="95" y2="78" stroke="#27272a" stroke-width="1" />
    <line x1="25" y1="84" x2="95" y2="84" stroke="#27272a" stroke-width="1" />
    <line x1="25" y1="90" x2="95" y2="90" stroke="#27272a" stroke-width="1" />
    <line x1="25" y1="96" x2="95" y2="96" stroke="#27272a" stroke-width="1" />
    <line x1="25" y1="102" x2="95" y2="102" stroke="#27272a" stroke-width="1" />
  </g>

  <!-- Wooden Parquet Floor -->
  <rect x="0" y="600" width="600" height="150" fill="#18090d" stroke="#e8c27a" stroke-width="1" />

  <!-- Badge in Corner -->
  <rect x="180" y="640" width="240" height="38" rx="19" fill="#2d131b" stroke="#e8c27a" stroke-width="1.5" />
  <text x="300" y="664" font-family="Vazirmatn, sans-serif" font-size="13" font-weight="bold" fill="#FDFBF7" text-anchor="middle">استودیو و کارگاه‌های آکوستیک چنگ</text>
</svg>
`);

// Story Secondary Image: تمرین و اجرای موسیقی
export const STORY_SECONDARY_IMAGE = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500">
  <defs>
    <linearGradient id="secBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2a0f16" />
      <stop offset="100%" stop-color="#120508" />
    </linearGradient>
  </defs>

  <rect width="400" height="500" fill="url(#secBg)" />
  <circle cx="200" cy="220" r="140" fill="#B92B3A" fill-opacity="0.2" />

  <!-- Persian Setar Silhouette -->
  <g transform="translate(140, 160) rotate(-15)">
    <ellipse cx="60" cy="180" rx="38" ry="46" fill="#8d4b1a" stroke="#e8c27a" stroke-width="1.5" />
    <ellipse cx="60" cy="180" rx="28" ry="36" fill="#582a10" />
    <rect x="56" y="30" width="8" height="150" fill="#3a1b07" />
    <rect x="52" y="10" width="16" height="25" rx="3" fill="#261104" stroke="#e8c27a" stroke-width="1" />
  </g>

  <!-- Floating notes -->
  <ellipse cx="90" cy="120" rx="8" ry="6" fill="#e8c27a" />
  <line x1="96" y1="118" x2="96" y2="85" stroke="#e8c27a" stroke-width="2" />
  <ellipse cx="300" cy="160" rx="8" ry="6" fill="#e8c27a" />
  <line x1="306" y1="158" x2="306" y2="125" stroke="#e8c27a" stroke-width="2" />

  <text x="200" y="440" font-family="Vazirmatn, sans-serif" font-size="13" font-weight="bold" fill="#FDFBF7" text-anchor="middle">همنوازی و تداوم هنر در خرمشهر</text>
</svg>
`);

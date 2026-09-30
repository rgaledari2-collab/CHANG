import React from 'react';

interface StageVectorArtworkProps {
  className?: string;
}

export const StageVectorArtwork: React.FC<StageVectorArtworkProps> = ({ className = '' }) => {
  return (
    <div className={`w-full h-full relative overflow-hidden bg-[#18050B] select-none ${className}`}>
      {/* Background theatrical stage ambiance */}
      <svg
        viewBox="0 0 1200 540"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="deepCrimsonCurtain" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A0610" />
            <stop offset="25%" stopColor="#8C1322" />
            <stop offset="60%" stopColor="#5E0914" />
            <stop offset="100%" stopColor="#250308" />
          </linearGradient>

          <linearGradient id="valanceShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E0206" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1E0206" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="foldShader" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2B0309" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#B32435" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#F06070" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#200206" stopOpacity="0.9" />
          </linearGradient>

          <radialGradient id="stageConcertSpot" cx="50%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.38" />
            <stop offset="40%" stopColor="#E59B34" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="goldCalligraphy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE8A3" />
            <stop offset="50%" stopColor="#D89D42" />
            <stop offset="100%" stopColor="#8F5E18" />
          </linearGradient>
        </defs>

        {/* Deep stage theater background */}
        <rect width="1200" height="540" fill="#18050B" />

        {/* Heavy velvet curtains across entire stage */}
        <rect width="1200" height="460" fill="url(#deepCrimsonCurtain)" />

        {/* Realistic vertical curtain ripples */}
        {Array.from({ length: 34 }).map((_, i) => (
          <rect
            key={i}
            x={i * 36 - 12}
            y="0"
            width="36"
            height="460"
            fill="url(#foldShader)"
          />
        ))}

        {/* Central Arch Drapery Aperture (Revealing the golden festival emblem) */}
        <g transform="translate(540, 40)">
          {/* Arch Curtain opening shadow */}
          <path
            d="M -10,0 L 130,0 L 125,290 C 120,270 95,250 60,250 C 25,250 0,270 -5,290 Z"
            fill="#120205"
          />
          {/* The authentic Golden Fajr Banner Board positioned in the center aperture */}
          <rect x="5" y="140" width="110" height="150" rx="4" fill="#3D1409" stroke="#C88E35" strokeWidth="2" />
          <rect x="10" y="145" width="100" height="140" rx="2" fill="#250904" opacity="0.9" />
          
          {/* Calligraphic artistic marks symbolizing Persian Nastaliq "جشنواره بین المللی موسیقی فجر" */}
          <g transform="translate(18, 160)" fill="url(#goldCalligraphy)">
            <path d="M 10,20 Q 35,5 70,18 Q 80,24 60,32 Q 35,28 15,35 Z" />
            <path d="M 5,50 Q 40,30 75,45 Q 85,55 55,60 Q 25,58 5,70 Z" />
            <path d="M 12,82 Q 45,65 78,78 Q 82,90 48,96 Q 20,92 10,105 Z" />
            <circle cx="68" cy="12" r="3" />
            <circle cx="38" cy="40" r="2.8" />
            <circle cx="72" cy="70" r="3.2" />
          </g>
          <text x="60" y="275" fill="#FFE59E" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            جشنواره موسیقی فجر
          </text>
        </g>

        {/* Theater Upper Pelmet with scalloped fringes */}
        <path
          d="M0 0 L1200 0 L1200 38
             C 1160 58, 1120 58, 1080 38
             C 1040 58, 1000 58, 960 38
             C 920 58, 880 58, 840 38
             C 800 58, 760 58, 720 38
             C 680 58, 640 58, 600 38
             C 560 58, 520 58, 480 38
             C 440 58, 400 58, 360 38
             C 320 58, 280 58, 240 38
             C 200 58, 160 58, 120 38
             C 80 58, 40 58, 0 38 Z"
          fill="#520712"
        />
        {/* Scalloped Gold Tassels */}
        <path
          d="M0 38 
             C 40 58, 80 58, 120 38
             C 160 58, 200 58, 240 38
             C 280 58, 320 58, 360 38
             C 400 58, 440 58, 480 38
             C 520 58, 560 58, 600 38
             C 640 58, 680 58, 720 38
             C 760 58, 800 58, 840 38
             C 880 58, 920 58, 960 38
             C 1000 58, 1040 58, 1080 38
             C 1120 58, 1160 58, 1200 38"
          fill="none"
          stroke="#F2C18D"
          strokeWidth="3.5"
          strokeDasharray="4 2.5"
        />

        {/* Center Stage Illumination */}
        <ellipse cx="600" cy="270" rx="500" ry="260" fill="url(#stageConcertSpot)" />

        {/* Stage Wooden Deck floor */}
        <rect x="0" y="445" width="1200" height="95" fill="#14060A" />
        <line x1="0" y1="445" x2="1200" y2="445" stroke="#C4883A" strokeWidth="2" opacity="0.75" />

        {/* Stage Sound Monitors */}
        <polygon points="25,532 95,532 82,498 38,498" fill="#1C1E24" stroke="#333842" strokeWidth="2" />
        <polygon points="1105,532 1175,532 1162,498 1118,498" fill="#1C1E24" stroke="#333842" strokeWidth="2" />
        <polygon points="560,538 640,538 630,505 570,505" fill="#1C1E24" stroke="#333842" strokeWidth="2" />

        {/* ================================================================= */}
        {/* ROW 1 (BACK): Persian Music Masters & Teachers in Suits (24 Figures) */}
        {/* ================================================================= */}
        <g>
          {[
            { x: 55, coat: '#1F2430', name: 'هنرمند' },
            { x: 95, coat: '#2C3240', name: 'هنرمند' },
            { x: 135, coat: '#D97706', name: 'مدرس با کت خردلی' }, // Yellow/Mustard jacket in original photo
            { x: 180, coat: '#1E293B', name: 'مدرس' },
            { x: 225, coat: '#1E293B', name: 'مدرس' },
            { x: 265, coat: '#334155', name: 'استاد' },
            { x: 305, coat: '#0F172A', name: 'استاد' },
            { x: 345, coat: '#475569', name: 'پیشکسوت' },
            { x: 390, coat: '#1E293B', name: 'استاد' },
            { x: 435, coat: '#C2A176', name: 'پیشکسوت با کت کرم' }, // Tan/Beige jacket in original photo
            { x: 480, coat: '#1E293B', name: 'مدیر رویداد' },
            { x: 520, coat: '#1E293B', name: 'استاد' },
            { x: 640, coat: '#334155', name: 'استاد' },
            { x: 685, coat: '#64748B', name: 'پیشکسوت' },
            { x: 730, coat: '#334155', name: 'استاد' },
            { x: 775, coat: '#1E293B', name: 'استاد' },
            { x: 820, coat: '#1E293B', name: 'مدرس' },
            { x: 865, coat: '#475569', name: 'مدرس' },
            { x: 905, coat: '#1E293B', name: 'مدرس' },
            { x: 945, coat: '#334155', name: 'استاد' },
            { x: 990, coat: '#1E293B', name: 'مدرس' },
            { x: 1030, coat: '#334155', name: 'مدرس' },
            { x: 1070, coat: '#1E293B', name: 'مدرس' },
            { x: 1115, coat: '#D97706', name: 'سرپرست با مانتو خردلی' }, // Woman in golden coat on far right
          ].map((fig, idx) => (
            <g key={idx} transform={`translate(${fig.x}, 275)`}>
              {/* Head */}
              <circle cx="16" cy="16" r="11" fill="#F0CDB0" />
              {/* Hair / Beard */}
              <path d="M5 14 C5 5 27 5 27 14 Z" fill="#26201E" />
              {/* Eyeglasses or details */}
              {idx % 2 === 1 && (
                <rect x="9" y="13" width="14" height="4" rx="1.5" fill="none" stroke="#2B2D42" strokeWidth="1" />
              )}
              {/* Suit Coat */}
              <path d="M0 26 L32 26 L36 100 L-4 100 Z" fill={fig.coat} />
              {/* White collar & necktie */}
              <polygon points="12,26 20,26 18,46 14,46" fill="#F8FAFC" />
            </g>
          ))}
        </g>

        {/* ================================================================= */}
        {/* ROW 2 (FRONT): Youth Choir & Traditional Ensemble (30 Children) */}
        {/* Matching exact choir garments: Red vests + White gowns / shirts */}
        {/* ================================================================= */}
        <g>
          {Array.from({ length: 30 }).map((_, idx) => {
            const posX = 42 + idx * 37;
            const isTraditionalBakhtiariBoy = idx === 6 || idx === 8;
            const isArabTradBoy = idx === 9;
            const isGirl = idx >= 10 && idx <= 21;
            const isRightSide = idx > 21;

            return (
              <g key={idx} transform={`translate(${posX}, 335)`}>
                {/* Face */}
                <circle cx="15" cy="15" r="9.5" fill="#FCE0CA" />

                {/* Headdress according to real photograph */}
                {isTraditionalBakhtiariBoy ? (
                  // Traditional Bakhtiari Chogha & Kolah (Felt Cap)
                  <g>
                    <ellipse cx="15" cy="8" rx="8" ry="5" fill="#1C1917" />
                    {/* Chogha black & white striped vest */}
                    <rect x="2" y="24" width="26" height="60" fill="#E2E8F0" />
                    <line x1="8" y1="24" x2="8" y2="84" stroke="#0F172A" strokeWidth="2.5" />
                    <line x1="15" y1="24" x2="15" y2="84" stroke="#0F172A" strokeWidth="2.5" />
                    <line x1="22" y1="24" x2="22" y2="84" stroke="#0F172A" strokeWidth="2.5" />
                    <rect x="0" y="84" width="30" height="45" fill="#0F172A" />
                  </g>
                ) : isArabTradBoy ? (
                  // Traditional Arab Dishdasha & Keffiyeh
                  <g>
                    <path d="M4 14 C4 4 26 4 26 14 L28 26 L2 26 Z" fill="#F8FAFC" />
                    <ellipse cx="15" cy="7" rx="9" ry="2" fill="#B91C1C" />
                    <rect x="2" y="24" width="26" height="105" fill="#FFFFFF" />
                  </g>
                ) : isGirl ? (
                  // Choir Girls: White headscarf + Red short jacket + White dress
                  <g>
                    {/* White scarf / bonnet */}
                    <path d="M4 16 C4 4 26 4 26 16 L28 26 L2 26 Z" fill="#FAF5F5" />
                    {/* Red short Bolero / Vest */}
                    <path d="M3 24 L27 24 L29 55 L1 55 Z" fill="#C52838" />
                    {/* White center dress panel */}
                    <polygon points="12,24 18,24 17,40 13,40" fill="#FFFFFF" />
                    {/* Pure white flowing lower dress */}
                    <path d="M1 55 L29 55 L32 120 L-2 120 Z" fill="#FAF8F8" stroke="#E2E8F0" strokeWidth="0.5" />
                    {/* White recorder flute held */}
                    <rect x="14" y="38" width="2.5" height="35" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" rx="1" />
                  </g>
                ) : (
                  // Choir Boys: Bright Red Shirt + White Trousers
                  <g>
                    {/* Dark tidy hair */}
                    <path d="M6 13 C6 6 24 6 24 13 Z" fill="#2B211E" />
                    {/* Bright Red collared shirt */}
                    <path d="M3 24 L27 24 L29 60 L1 60 Z" fill="#D22B3B" />
                    {/* White bow-tie or collar */}
                    <polygon points="12,24 18,24 16,32 14,32" fill="#FFFFFF" />
                    {/* White trousers */}
                    <path d="M3 60 L27 60 L29 120 L1 120 Z" fill="#FDFDFD" stroke="#E2E8F0" strokeWidth="0.5" />
                    {/* White recorder flute */}
                    <rect x="14" y="34" width="2.5" height="36" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" rx="1" />
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

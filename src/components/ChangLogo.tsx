import React from 'react';

interface ChangLogoProps {
  className?: string;
  variant?: 'white' | 'red' | 'dark' | 'currentColor';
}

export const ChangLogo: React.FC<ChangLogoProps> = ({
  className = 'w-auto h-10',
  variant = 'currentColor'
}) => {
  const colorClass = 
    variant === 'white' ? 'text-white' :
    variant === 'red' ? 'text-[#B92B3A]' :
    variant === 'dark' ? 'text-[#1A1B1E] dark:text-white' :
    '';

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 1200 480" 
      fill="none"
      className={`${className} ${colorClass} select-none transition-all duration-200 overflow-visible`}
      aria-label="لوگوی رسمی آموزشگاه موسیقی چنگ"
      role="img"
    >
      {/* 5 Stave lines (خطوط پنج‌گانه حامل موسیقی) */}
      <g stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" opacity="0.92">
        {/* Left Stave Lines */}
        <line x1="25" y1="280" x2="210" y2="280" />
        <line x1="25" y1="315" x2="200" y2="315" />
        <line x1="25" y1="350" x2="205" y2="350" />
        <line x1="25" y1="385" x2="215" y2="385" />
        <line x1="25" y1="420" x2="230" y2="420" />

        {/* Right Stave Lines */}
        <line x1="770" y1="280" x2="1175" y2="280" />
        <line x1="780" y1="315" x2="1175" y2="315" />
        <line x1="800" y1="350" x2="1175" y2="350" />
        <line x1="835" y1="385" x2="1175" y2="385" />
        <line x1="855" y1="420" x2="1175" y2="420" />

        {/* Bottom Baseline extension */}
        <line x1="210" y1="458" x2="990" y2="458" strokeWidth="6.5" />
      </g>

      {/* Left Eighth Note (نت چنگ سمت چپ) */}
      <g fill="currentColor">
        <ellipse cx="115" cy="365" rx="42" ry="28" transform="rotate(-25 115 365)" />
        <rect x="140" y="150" width="11" height="215" rx="5.5" />
        <path d="M151 150 C 176 190, 212 230, 207 285 C 202 305, 182 300, 177 275 C 177 235, 160 190, 151 170 Z" />
      </g>

      {/* Right Eighth Note (نت چنگ سمت راست) */}
      <g fill="currentColor">
        <ellipse cx="885" cy="405" rx="38" ry="26" transform="rotate(-25 885 405)" />
        <rect x="910" y="210" width="10.5" height="195" rx="5" />
        <path d="M920.5 210 C 944 245, 978 280, 972 330 C 968 348, 950 344, 946 320 C 945 285, 930 245, 920.5 228 Z" />
      </g>

      {/* Persian Calligraphy "چنگ" (Chang) */}
      <g fill="currentColor">
        {/* 1. Top Sarkash of "گ" (سرکش بالایی گاف) */}
        <polygon points="560,40 375,155 345,155 530,40" />
        {/* 2. Second Sarkash of "گ" (سرکش پایینی گاف) */}
        <polygon points="535,90 380,186 355,186 510,90" />

        {/* 3. Upper body and stem of "گ" */}
        <path d="M500 135 L385 208 C 360 224, 340 248, 330 278 L375 295 C 385 275, 400 258, 418 246 L518 182 C 532 173, 538 158, 532 144 C 526 132, 512 128, 500 135 Z" />

        {/* 4. Crest/Head of "چ" (سر چ) */}
        <path d="M660 175 C 720 120, 800 145, 805 215 C 808 245, 785 275, 750 300 C 700 335, 620 350, 540 350 L545 315 C 610 315, 680 300, 720 270 C 750 248, 760 228, 755 210 C 750 170, 700 160, 665 195 Z" />

        {/* 5. Center Dip connecting "ن" to "چ" */}
        <path d="M410 270 C 440 250, 480 245, 520 260 C 560 275, 600 275, 635 255 C 660 240, 685 240, 705 255 L690 285 C 675 272, 655 272, 635 285 C 590 315, 540 310, 495 290 C 465 278, 435 282, 410 298 Z" />

        {/* Center Dot of "ن" (نقطه ن) */}
        <circle cx="565" cy="205" r="32" />

        {/* Three Dots of "چ" (سه نقطه چ در پایین راست) */}
        <circle cx="700" cy="380" r="28" />
        <circle cx="765" cy="350" r="28" />
        <circle cx="800" cy="410" r="28" />

        {/* Three Harmonious Contour Wave Ribbons at Base (سه موج نواری موازی زیرین) */}
        {/* Ribbon 1 */}
        <path d="M220 280 C 225 340, 275 400, 375 405 C 465 410, 540 375, 615 350 C 685 328, 755 335, 815 375 L830 348 C 760 302, 675 295, 600 318 C 530 340, 460 372, 380 368 C 295 362, 255 315, 250 280 Z" />
        
        {/* Ribbon 2 */}
        <path d="M215 320 C 220 380, 270 435, 370 440 C 455 444, 530 412, 605 388 C 670 368, 735 375, 790 410 L805 383 C 740 342, 660 335, 590 358 C 520 380, 450 410, 375 405 C 290 400, 250 355, 245 320 Z" />

        {/* Ribbon 3 */}
        <path d="M210 360 C 215 418, 265 470, 365 475 C 445 478, 520 448, 595 425 C 655 408, 715 415, 765 448 L780 420 C 720 382, 645 375, 580 398 C 510 420, 440 448, 370 442 C 285 436, 245 392, 240 360 Z" />
      </g>
    </svg>
  );
};

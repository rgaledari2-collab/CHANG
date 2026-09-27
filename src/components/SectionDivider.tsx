import React from 'react';

export type SectionDividerVariant = 'wave' | 'slant' | 'curve' | 'layered-wave';

export interface SectionDividerProps {
  /** The shape pattern to render */
  variant?: SectionDividerVariant;
  /** Background color / class of the upper section */
  upperColor?: string;
  /** Background color / class of the lower section */
  lowerColor?: string;
  /** Whether to mirror horizontally */
  flip?: boolean;
  /** Whether to invert vertically */
  invert?: boolean;
  /** Optional decorative acoustic accent line along the boundary */
  withAccentLine?: boolean;
  /** Accent line stroke color class */
  accentColor?: string;
  /** Custom height classes (default: h-10 sm:h-14 lg:h-18) */
  heightClass?: string;
  /** Preset configuration for key section transitions */
  preset?: 'courses-to-story' | 'story-to-stats' | 'stats-to-teachers' | 'teachers-to-manifesto';
  /** Additional custom class names */
  className?: string;
}

/**
 * SectionDivider Component
 * 
 * Generates responsive, high-precision CSS/SVG shape dividers (subtle acoustic waves, 
 * architectural slants, and harmonic curves) to separate main content sections
 * and create organic visual depth across the page flow.
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'wave',
  upperColor,
  lowerColor,
  flip = false,
  invert = false,
  withAccentLine = true,
  accentColor,
  heightClass = 'h-10 sm:h-14 lg:h-20',
  preset,
  className = '',
}) => {
  // Apply presets if provided
  let activeVariant = variant;
  let activeUpper = upperColor;
  let activeLower = lowerColor;
  let activeAccent = accentColor;
  let activeFlip = flip;
  let activeInvert = invert;

  if (preset === 'courses-to-story') {
    activeVariant = 'wave';
    // Transition from Light canvas (#FCF8F8) down into Story dark maroon (#3B1720)
    activeUpper = 'bg-[#FCF8F8] dark:bg-[#0E1013]';
    activeLower = 'text-[#3B1720] dark:text-[#15080D]';
    activeAccent = 'text-[#B92B3A]/40 dark:text-[#e8c27a]/30';
    activeInvert = false;
  } else if (preset === 'story-to-stats') {
    activeVariant = 'slant';
    // Transition from Story dark maroon (#3B1720) down into Stats light canvas (#FCF8F8)
    activeUpper = 'bg-[#3B1720] dark:bg-[#15080D]';
    activeLower = 'text-[#FCF8F8] dark:text-[#0E1013]';
    activeAccent = 'text-[#F3C7CA]/50 dark:text-[#e8c27a]/35';
    activeFlip = true;
    activeInvert = false;
  } else if (preset === 'stats-to-teachers') {
    activeVariant = 'layered-wave';
    // Between Stats and Teachers (Subtle acoustic harmonic transition)
    activeUpper = 'bg-[#FCF8F8] dark:bg-[#0E1013]';
    activeLower = 'text-[#FCF8F8] dark:text-[#0E1013]';
    activeAccent = 'text-[#B92B3A]/40 dark:text-[#e8c27a]/40';
    activeFlip = false;
  } else if (preset === 'teachers-to-manifesto') {
    activeVariant = 'slant';
    activeUpper = 'bg-[#FCF8F8] dark:bg-[#0E1013]';
    activeLower = 'text-[#3B1720] dark:text-[#15080D]';
    activeAccent = 'text-[#B92B3A]/30 dark:text-[#e8c27a]/25';
  }

  // Fallbacks
  const containerBg = activeUpper || 'bg-transparent';
  const shapeFill = activeLower || 'text-current';
  const lineStroke = activeAccent || 'text-[#B92B3A]/25';

  const transformStyles: React.CSSProperties = {
    transform: `${activeFlip ? 'scaleX(-1)' : ''} ${activeInvert ? 'scaleY(-1)' : ''}`.trim() || undefined,
  };

  return (
    <div
      className={`relative w-full overflow-hidden leading-none select-none pointer-events-none z-10 ${containerBg} ${className}`}
      aria-hidden="true"
    >
      <div className={`w-full ${heightClass}`} style={transformStyles}>
        {activeVariant === 'wave' && (
          <svg
            className={`w-full h-full block ${shapeFill}`}
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Organic acoustic resonance wave */}
            <path d="M0,32 C280,72 520,8 800,48 C1080,86 1280,20 1440,36 L1440,80 L0,80 Z" />
            {withAccentLine && (
              <path
                d="M0,32 C280,72 520,8 800,48 C1080,86 1280,20 1440,36"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                className={lineStroke}
              />
            )}
          </svg>
        )}

        {activeVariant === 'layered-wave' && (
          <svg
            className={`w-full h-full block ${shapeFill}`}
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Harmonic Echo Wave */}
            <path
              d="M0,50 C360,20 640,75 1020,35 C1240,12 1360,40 1440,30 L1440,90 L0,90 Z"
              className="fill-[#F3C7CA]/35 dark:fill-[#e8c27a]/20"
            />
            {/* Foreground Main Soundwave */}
            <path d="M0,28 C320,68 620,12 940,54 C1160,82 1340,32 1440,40 L1440,90 L0,90 Z" />
            {withAccentLine && (
              <path
                d="M0,28 C320,68 620,12 940,54 C1160,82 1340,32 1440,40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={lineStroke}
              />
            )}
          </svg>
        )}

        {activeVariant === 'slant' && (
          <svg
            className={`w-full h-full block ${shapeFill}`}
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Crisp dynamic slant */}
            <path d="M0,60 L1440,12 L1440,60 Z" />
            {withAccentLine && (
              <path
                d="M0,60 L1440,12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={lineStroke}
              />
            )}
          </svg>
        )}

        {activeVariant === 'curve' && (
          <svg
            className={`w-full h-full block ${shapeFill}`}
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Gentle parabolic acoustic crest */}
            <path d="M0,20 Q720,65 1440,20 L1440,60 L0,60 Z" />
            {withAccentLine && (
              <path
                d="M0,20 Q720,65 1440,20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={lineStroke}
              />
            )}
          </svg>
        )}
      </div>
    </div>
  );
};

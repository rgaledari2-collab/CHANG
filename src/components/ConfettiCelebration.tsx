import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  speedX: number;
  speedY: number;
  opacity: number;
  shape: 'circle' | 'square' | 'ribbon' | 'note';
}

export const ConfettiCelebration: React.FC = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = [
      '#B92B3A', // Chang Burgundy
      '#F39200', // ZarinPal Gold
      '#10B981', // Emerald Green
      '#3B82F6', // Royal Blue
      '#EC4899', // Pink
      '#F59E0B', // Amber
      '#8B5CF6'  // Purple
    ];

    const shapes: ('circle' | 'square' | 'ribbon' | 'note')[] = ['circle', 'square', 'ribbon', 'note'];

    const initialPieces: ConfettiPiece[] = Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: -10 - Math.random() * 20, // start above viewport
      size: 6 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 15,
      speedX: (Math.random() - 0.5) * 2.5,
      speedY: 2.5 + Math.random() * 4,
      opacity: 0.95,
      shape: shapes[Math.floor(Math.random() * shapes.length)]
    }));

    setPieces(initialPieces);

    let animationFrameId: number;
    let startTime = Date.now();

    const updateConfetti = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed > 4500) {
        setPieces([]);
        return;
      }

      setPieces((prev) =>
        prev
          .map((p) => ({
            ...p,
            y: p.y + p.speedY * 0.4,
            x: p.x + p.speedX * 0.2,
            rotation: p.rotation + p.rotationSpeed,
            opacity: p.y > 75 ? Math.max(0, p.opacity - 0.02) : p.opacity
          }))
          .filter((p) => p.y < 110 && p.opacity > 0)
      );

      animationFrameId = requestAnimationFrame(updateConfetti);
    };

    animationFrameId = requestAnimationFrame(updateConfetti);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (pieces.length === 0) return null;

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden z-50 select-none"
      aria-hidden="true"
    >
      {pieces.map((p) => {
        if (p.shape === 'note') {
          return (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: `${p.x}%`,
                top: `${p.y}%`,
                transform: `rotate(${p.rotation}deg)`,
                opacity: p.opacity,
                color: p.color,
                fontSize: `${p.size + 4}px`,
                fontWeight: 'bold',
                transition: 'opacity 0.2s linear'
              }}
            >
              ♪
            </div>
          );
        }

        if (p.shape === 'ribbon') {
          return (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size * 0.5}px`,
                height: `${p.size * 2}px`,
                backgroundColor: p.color,
                borderRadius: '2px',
                transform: `rotate(${p.rotation}deg)`,
                opacity: p.opacity,
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
              }}
            />
          );
        }

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              borderRadius: p.shape === 'circle' ? '50%' : '2px',
              transform: `rotate(${p.rotation}deg)`,
              opacity: p.opacity,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
        );
      })}
    </div>
  );
};

import React, { useRef, useState } from 'react';
import { soundFx } from '../utils/soundFx';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number; // degrees
  scaleOnHover?: number;
  perspective?: number; // pixels
  glowColor?: string;
  enableSound?: boolean;
  onClick?: () => void;
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  className = '',
  maxRotation = 8,
  scaleOnHover = 1.02,
  perspective = 1000,
  glowColor = 'rgba(231, 196, 86, 0.25)',
  enableSound = true,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    glowX: 50,
    glowY: 50,
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxRotation;
    const rotateY = ((x - centerX) / centerX) * maxRotation;

    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    setTransform({
      rotateX,
      rotateY,
      scale: scaleOnHover,
      glowX,
      glowY,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (enableSound) {
      soundFx.playWhoosh(1.4);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      glowX: 50,
      glowY: 50,
    });
  };

  const handleClick = () => {
    if (enableSound) {
      soundFx.playClick(1.1);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className="inline-block w-full h-full"
    >
      <div
        ref={cardRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
        style={{
          transform: isHovered
            ? `rotateX(${transform.rotateX.toFixed(2)}deg) rotateY(${transform.rotateY.toFixed(2)}deg) scale3d(${transform.scale}, ${transform.scale}, ${transform.scale})`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}

        {/* Dynamic 3D Specular Flare */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 280px at ${transform.glowX}% ${transform.glowY}%, ${glowColor} 0%, rgba(255,255,255,0.08) 35%, transparent 70%)`,
              mixBlendMode: 'screen',
            }}
          />
        )}
      </div>
    </div>
  );
};

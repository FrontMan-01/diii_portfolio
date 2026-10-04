import React, { useRef, useState, useEffect } from 'react';

interface LiquidGlassContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'pill' | 'card' | 'badge' | 'island';
  glowColor?: string;
  specularIntensity?: number;
  interactive?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const LiquidGlassContainer: React.FC<LiquidGlassContainerProps> = ({
  children,
  className = '',
  variant = 'card',
  glowColor = 'rgba(231, 196, 86, 0.22)',
  specularIntensity = 1.0,
  interactive = true,
  onClick,
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const roundedClasses = {
    pill: 'rounded-full',
    island: 'rounded-full',
    card: 'rounded-3xl',
    badge: 'rounded-xl',
  }[variant];

  const basePadding = {
    pill: 'py-2 px-4',
    island: 'py-3 px-6',
    card: 'p-6',
    badge: 'py-1 px-3',
  }[variant];

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 50, y: 50 });
      }}
      className={`group relative overflow-hidden transition-all duration-300 ${roundedClasses} ${basePadding} ${className}`}
      style={{
        background: isHovered
          ? 'rgba(30, 32, 38, 0.85)'
          : 'rgba(26, 28, 33, 0.76)',
        backdropFilter: 'blur(30px) saturate(190%)',
        WebkitBackdropFilter: 'blur(30px) saturate(190%)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: `
          0 16px 36px -8px rgba(0, 0, 0, 0.6),
          0 4px 12px rgba(0, 0, 0, 0.35),
          inset 0 1.5px 2px rgba(255, 255, 255, 0.28),
          inset 0 -1.5px 2px rgba(0, 0, 0, 0.45)
        `,
        ...style,
      }}
    >
      {/* 1. Dynamic Liquid Specular Spotlight following mouse cursor */}
      {interactive && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.7 * specularIntensity : 0.25 * specularIntensity,
            background: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.25) 0%, rgba(231, 196, 86, 0.12) 40%, transparent 80%)`,
          }}
        />
      )}

      {/* 2. Chromatic Edge Refraction Bevel (Liquid Glass simulated prism) */}
      <div
        className={`absolute inset-0 pointer-events-none ${roundedClasses}`}
        style={{
          boxShadow: `
            inset 1px 1px 0px rgba(255, 230, 160, 0.18),
            inset -1px -1px 0px rgba(226, 125, 38, 0.15)
          `,
        }}
      />

      {/* 3. Ambient Fluid Rim Glow */}
      <div
        className="absolute -inset-px rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 240px at ${mousePos.x}% ${mousePos.y}%, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* 4. Content Children */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

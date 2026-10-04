import React, { useRef, useState, useCallback } from 'react';
import { Eye } from 'lucide-react';
import { LiquidLogo } from './LiquidLogo';
import { soundFx } from '../utils/soundFx';

interface ThreeDMagazineCardProps {
  imageUrl?: string;
  altText?: string;
  title?: string;
  onOpenLightbox: (imageUrl: string, title: string) => void;
  className?: string;
}

export const ThreeDMagazineCard: React.FC<ThreeDMagazineCardProps> = ({
  imageUrl = '/assets/photos/magazine-cover.png',
  altText = 'Akrati - Fashion Magazine Cover',
  title = 'Vogue Editorial Cover - Akrati Creates',
  onOpenLightbox,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 20,
    borderAngle: 135,
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalized coordinate from center: -1.0 to +1.0
    const x = (e.clientX - rect.left - width / 2) / (width / 2);
    const y = (e.clientY - rect.top - height / 2) / (height / 2);

    const maxTilt = 14; // Maximum degrees of 3D tilt
    const rotateX = -y * maxTilt;
    const rotateY = x * maxTilt;

    // Glare position (percentage)
    const glareX = 50 + x * 40;
    const glareY = 50 + y * 40;

    // Shadow offset reacts in opposite direction
    const shadowOffsetX = -x * 24;
    const shadowOffsetY = 24 - y * 16;

    // Angle of dynamic edge highlight
    const rad = Math.atan2(y, x);
    const borderAngle = rad * (180 / Math.PI) + 90;

    setTilt({
      rotateX,
      rotateY,
      glareX,
      glareY,
      glareOpacity: 0.65,
      shadowOffsetX,
      shadowOffsetY,
      borderAngle,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    soundFx.playWhoosh(1.6);
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 20,
      borderAngle: 135,
    });
  }, []);

  const handleClick = () => {
    soundFx.playClick(1.2);
    onOpenLightbox(imageUrl, title);
  };

  return (
    <div
      className={`relative select-none ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* 1. Ambient Golden Backlight Aura */}
      <div
        className="absolute -inset-2 bg-gradient-to-b from-[#E7C456]/40 via-[#E27D26]/25 to-[#E7C456]/30 rounded-3xl blur-2xl transition-all duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0.75,
          transform: `scale(${isHovered ? 1.05 : 0.98})`,
        }}
      />

      {/* 2. Main 3D Card Stage */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`Open ${title} in lightbox`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        className="relative group rounded-3xl cursor-pointer transition-transform duration-200 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered
            ? `rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg) translateZ(28px)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
          boxShadow: isHovered
            ? `${tilt.shadowOffsetX}px ${tilt.shadowOffsetY}px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(231, 196, 86, 0.25)`
            : '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 20px rgba(231, 196, 86, 0.15)',
        }}
      >
        {/* Dynamic Specular Rim Border Ring */}
        <div
          className="absolute -inset-px rounded-3xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `linear-gradient(${tilt.borderAngle}deg, rgba(255, 245, 220, 0.8) 0%, rgba(231, 196, 86, 0.6) 30%, rgba(226, 125, 38, 0.2) 70%, rgba(255, 255, 255, 0.05) 100%)`,
            opacity: isHovered ? 1 : 0.65,
            zIndex: 1,
          }}
        />

        {/* Card Content Body */}
        <div
          className="relative rounded-3xl overflow-hidden glass-warm bg-[#18191B]/80"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Magazine Cover Image */}
          <div className="relative overflow-hidden">
            <img
              src={imageUrl}
              alt={altText}
              className="w-full h-auto object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 block"
              loading="eager"
            />

            {/* Ambient Dark Gradient Vane */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Dynamic Gloss Spotlight / Glare Overlay */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-200 mix-blend-overlay"
              style={{
                opacity: tilt.glareOpacity,
                background: `radial-gradient(circle 380px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.7) 0%, rgba(231, 196, 86, 0.25) 45%, transparent 75%)`,
                transform: 'translateZ(15px)',
              }}
            />

            {/* Gloss Sheen Diagonal Strip */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
              style={{ transform: 'translateZ(20px)' }}
            />
          </div>

          {/* 3D Parallax Layer: Top Featured Badge */}
          <div
            className="absolute top-4 left-4 pointer-events-none"
            style={{
              transform: isHovered ? 'translateZ(38px)' : 'translateZ(10px)',
              transition: 'transform 0.2s ease-out',
            }}
          >
            <span className="px-3 py-1 rounded-md bg-black/85 backdrop-blur-md border border-[#E7C456]/60 text-[10px] font-mono text-[#F6DB85] tracking-widest uppercase font-bold shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              FEATURED COVER
            </span>
          </div>

          {/* 3D Parallax Layer: Bottom Hover Action */}
          <div
            className="absolute bottom-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{
              transform: isHovered ? 'translateZ(44px)' : 'translateZ(5px)',
              transition: 'transform 0.2s ease-out, opacity 0.3s ease',
            }}
          >
            <span className="px-3.5 py-1.5 rounded-full bg-black/90 backdrop-blur-md text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.7)] border border-white/25">
              <Eye className="w-3.5 h-3.5 text-[#E7C456]" />
              <span>Expand Cover</span>
            </span>
          </div>
        </div>

        {/* 3D Parallax Layer: Floating Verified Stamp with Molten Gold Seal */}
        <div
          className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 glass-warm-gold px-4 py-2.5 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.4)] flex items-center gap-3 border border-[#E7C456]/50 backdrop-blur-2xl transition-all duration-300 pointer-events-none"
          style={{
            transform: isHovered ? 'translateZ(54px) translateY(-3px)' : 'translateZ(20px)',
            transition: 'transform 0.25s ease-out',
          }}
        >
          <LiquidLogo size={36} glyph="A" className="shrink-0" />
          <div>
            <div className="text-xs font-bold text-white tracking-tight">Editorial Quality</div>
            <div className="text-[10px] font-mono text-[#F6DB85] font-semibold">Studio & Video Craft</div>
          </div>
        </div>
      </div>
    </div>
  );
};

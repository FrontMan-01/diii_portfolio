import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Rotate3d,
  Printer,
  Sparkles,
  Award,
  Eye,
  Sliders,
  Globe,
  Layers,
  ArrowRight,
  Maximize2,
  Sparkle,
} from 'lucide-react';
import { LiquidLogo } from './LiquidLogo';
import { soundFx } from '../utils/soundFx';

export interface ThreeDCompCardProps {
  onOpenLightbox: (imageUrl: string, title: string) => void;
  onOpenBooking?: () => void;
  className?: string;
}

export const ThreeDCompCard: React.FC<ThreeDCompCardProps> = ({
  onOpenLightbox,
  onOpenBooking,
  className = '',
}) => {
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [is3DActive, setIs3DActive] = useState(true);

  // 3D rotation state
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [activeHoverLook, setActiveHoverLook] = useState<number | null>(null);

  // Target values for smooth animation / lerping
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  // 4 Main Editorial Looks for Comp Card
  const compCardPhotos = [
    {
      id: 1,
      src: '/assets/photos/studio-noir-pose-2.jpeg',
      title: 'Studio Noir — Look 01 (Couture Corset & Bangles)',
      tag: 'LOOK 01 · NOIR',
      category: 'Couture Editorial',
    },
    {
      id: 2,
      src: '/assets/photos/studio-white-pose-5.jpeg',
      title: 'Studio Chic — Look 02 (Monochrome Contrast Split Skirt)',
      tag: 'LOOK 02 · CONTRAST',
      category: 'Contemporary Fashion',
    },
    {
      id: 3,
      src: '/assets/photos/studio-portrait-8.jpeg',
      title: 'Portrait Close-up — Look 03 (Editorial Lighting & Detail)',
      tag: 'LOOK 03 · CLOSEUP',
      category: 'Beauty & Jewelry',
    },
    {
      id: 4,
      src: '/assets/photos/studio-noir-chair-1.jpeg',
      title: 'Full Length — Look 04 (Seated Silhouette & Boots)',
      tag: 'LOOK 04 · FULL LENGTH',
      category: 'High-Fashion Silhouette',
    },
  ];

  // Casting & Physical Specs
  const castingSpecs = [
    { label: 'Height', value: `5'7" / 170 cm` },
    { label: 'Bust / Chest', value: '34B' },
    { label: 'Waist', value: '26" / 66 cm' },
    { label: 'Hips', value: '36" / 91 cm' },
    { label: 'Eye Color', value: 'Hazel Brown' },
    { label: 'Hair Color', value: 'Dark Espresso' },
    { label: 'Shoe Size', value: '7.5 US / 38 EU' },
    { label: 'Dress Size', value: 'S / 36 EU / 4 US' },
  ];

  // Smooth lerp loop
  const updatePhysics = useCallback(() => {
    if (!is3DActive) {
      currentRotation.current = { x: 0, y: 0 };
      setRotation({ x: 0, y: 0 });
      return;
    }

    const ease = 0.12;
    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * ease;
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * ease;

    setRotation({
      x: currentRotation.current.x,
      y: currentRotation.current.y,
    });

    if (
      Math.abs(targetRotation.current.x - currentRotation.current.x) > 0.01 ||
      Math.abs(targetRotation.current.y - currentRotation.current.y) > 0.01
    ) {
      animFrameId.current = requestAnimationFrame(updatePhysics);
    }
  }, [is3DActive]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!is3DActive || !cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();

    // Normalized from -1 to 1
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    // Specular shine percentage (0 to 100)
    const shineX = ((e.clientX - rect.left) / rect.width) * 100;
    const shineY = ((e.clientY - rect.top) / rect.height) * 100;
    setShinePos({ x: shineX, y: shineY });

    // Maximum tilt angles: ±14 deg Y, ±10 deg X
    const maxTiltY = 14;
    const maxTiltX = 10;

    targetRotation.current = {
      x: -normY * maxTiltX,
      y: normX * maxTiltY,
    };

    if (!animFrameId.current) {
      animFrameId.current = requestAnimationFrame(updatePhysics);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    animFrameId.current = requestAnimationFrame(updatePhysics);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setActiveHoverLook(null);
    targetRotation.current = { x: 0, y: 0 };
    setShinePos({ x: 50, y: 50 });
    if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    animFrameId.current = requestAnimationFrame(updatePhysics);
  };

  // Touch gesture support for mobile tilt
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!is3DActive || !cardContainerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = cardContainerRef.current.getBoundingClientRect();

    const normX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((touch.clientY - rect.top) / rect.height) * 2 - 1;

    targetRotation.current = {
      x: -Math.max(-1, Math.min(1, normY)) * 8,
      y: Math.max(-1, Math.min(1, normX)) * 10,
    };

    setShinePos({
      x: Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100)),
      y: Math.max(0, Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100)),
    });

    if (!animFrameId.current) {
      animFrameId.current = requestAnimationFrame(updatePhysics);
    }
  };

  const handleTouchEnd = () => {
    targetRotation.current = { x: 0, y: 0 };
    setShinePos({ x: 50, y: 50 });
    if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    animFrameId.current = requestAnimationFrame(updatePhysics);
  };

  useEffect(() => {
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Card Flip Toggle
  const handleFlip = () => {
    soundFx.playWhoosh(1.4);
    setIsFlipped((prev) => !prev);
  };

  // Calculate final 3D transform
  const currentTiltY = isFlipped ? 180 - rotation.y : rotation.y;
  const cardTransform = is3DActive
    ? `rotateX(${rotation.x}deg) rotateY(${currentTiltY}deg)`
    : `rotateY(${isFlipped ? 180 : 0}deg)`;

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* 1. Interactive 3D Utility Toolbar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-6 px-1">
        {/* Left: Mode Badge & Live Status */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/90 border border-white/10 text-xs font-mono text-stone-300 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#E7C456] animate-pulse"></span>
            <span className="text-[11px] font-bold tracking-wide text-white uppercase">
              {isFlipped ? 'Back: Casting Dossier' : 'Front: 4-Look Collage'}
            </span>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-mono text-stone-400">
            {is3DActive ? '• Gyro 3D Active' : '• 2D Mode'}
          </span>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Flip 3D Button */}
          <button
            onClick={handleFlip}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#E7C456]/20 via-[#E7C456]/30 to-[#E27D26]/20 hover:from-[#E7C456]/35 hover:to-[#E27D26]/35 border border-[#E7C456]/50 text-[#F6DB85] hover:text-white text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-[0_4px_16px_rgba(231,196,86,0.15)] active:scale-95 group cursor-pointer"
            title="Flip Card between Front Editorial Looks and Back Casting Dossier"
          >
            <Rotate3d
              className={`w-4 h-4 text-[#E7C456] transition-transform duration-500 ${
                isFlipped ? 'rotate-180' : 'group-hover:rotate-45'
              }`}
            />
            <span>{isFlipped ? 'Show Front (Looks)' : 'Flip Card in 3D'}</span>
          </button>

          {/* Print Comp Card Button */}
          <button
            onClick={() => {
              soundFx.playClick(1.0);
              window.print();
            }}
            className="px-3.5 py-2 rounded-full border border-white/15 hover:border-[#E7C456]/60 bg-white/10 hover:bg-white/15 text-stone-200 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Print Official 1-Page Comp Card"
          >
            <Printer className="w-3.5 h-3.5 text-[#E7C456]" />
            <span className="hidden sm:inline">Print Card</span>
          </button>

          {/* Toggle 3D Tilt button */}
          <button
            onClick={() => {
              soundFx.playClick(1.1);
              setIs3DActive(!is3DActive);
            }}
            className={`p-2 rounded-full border text-xs font-mono transition-all cursor-pointer ${
              is3DActive
                ? 'border-[#E7C456]/40 bg-[#E7C456]/10 text-[#F6DB85]'
                : 'border-white/15 bg-white/5 text-stone-400'
            }`}
            title={is3DActive ? 'Disable 3D tilt interaction' : 'Enable 3D tilt interaction'}
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Perspective Viewport Container */}
      <div
        className="w-full relative py-2"
        style={{
          perspective: '1400px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* 3. The 3D Rotating Double-Sided Card Core */}
        <div
          ref={cardContainerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full max-w-[560px] mx-auto cursor-grab active:cursor-grabbing transition-transform duration-100 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: cardTransform,
            transition: isHovered
              ? 'transform 0.08s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease'
              : 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s ease',
          }}
        >
          {/* Subtle 3D Ambient Drop Shadow Beneath Card */}
          <div
            className="absolute inset-x-8 -bottom-6 h-12 bg-black/70 blur-2xl rounded-full pointer-events-none transition-transform duration-300"
            style={{
              transform: `translateZ(-40px) scale(${isHovered ? 1.05 : 0.95}) translateY(${
                rotation.x * 0.8
              }px)`,
              opacity: isHovered ? 0.9 : 0.6,
            }}
          />

          {/* ========================================================================= */}
          {/* ======================= FRONT FACE (4-LOOK COLLAGE) ===================== */}
          {/* ========================================================================= */}
          <div
            className="w-full rounded-[28px] overflow-hidden p-5 sm:p-6 bg-gradient-to-b from-[#1C1E22] via-[#17181C] to-[#121316] border-2 border-[#E7C456]/40 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(231,196,86,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.22),inset_0_-2px_4px_rgba(0,0,0,0.6)] relative transition-all duration-300"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
              transform: 'rotateY(0deg)',
              display: isFlipped ? 'none' : 'block',
            }}
          >
            {/* Gilded Corner Accent Brackets (Luxury Physical Print Aesthetic) */}
            <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#E7C456]/70 rounded-tl-md pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#E7C456]/70 rounded-tr-md pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#E7C456]/70 rounded-bl-md pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#E7C456]/70 rounded-br-md pointer-events-none" />

            {/* Dynamic Holographic Iridescent Reflection Overlay */}
            {is3DActive && (
              <div
                className="absolute inset-0 pointer-events-none rounded-[28px] transition-opacity duration-300 z-30"
                style={{
                  opacity: isHovered ? 0.75 : 0.25,
                  background: `
                    radial-gradient(circle 380px at ${shinePos.x}% ${shinePos.y}%, rgba(255, 255, 255, 0.42) 0%, rgba(231, 196, 86, 0.2) 30%, transparent 70%),
                    linear-gradient(${
                      115 + rotation.y * 2.5 + rotation.x * 2
                    }deg, rgba(255,0,128,0.12) 0%, rgba(0,255,240,0.14) 25%, rgba(231,196,86,0.22) 50%, rgba(168,85,247,0.16) 75%, rgba(16,185,129,0.12) 100%)
                  `,
                  mixBlendMode: 'color-dodge',
                }}
              />
            )}

            {/* FRONT HEADER: Monogram, Name & Verified Stamp */}
            <div
              className="flex items-center justify-between pb-4 mb-4 border-b border-[#E7C456]/30 relative z-20"
              style={{
                transform: 'translateZ(30px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Left: Monogram & Name */}
              <div className="flex items-center gap-3">
                <div
                  className="shrink-0 drop-shadow-[0_4px_12px_rgba(231,196,86,0.4)]"
                  style={{ transform: 'translateZ(15px)' }}
                >
                  <LiquidLogo size={38} glyph="A" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-none">
                      AKRATI
                    </h3>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#E7C456] uppercase px-2 py-0.5 rounded-full bg-[#E7C456]/15 border border-[#E7C456]/40">
                      MODEL
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[#F6DB85] font-semibold tracking-wider">
                    @AKRATI.CREATES
                  </div>
                </div>
              </div>

              {/* Right: Issue Stamp & Verified Badge */}
              <div className="flex flex-col items-end gap-1 text-right">
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-[#E7C456]/50 text-[#F6DB85] text-[10px] font-mono font-bold backdrop-blur-md shadow-sm"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  <Award className="w-3 h-3 text-[#E7C456]" />
                  <span>VERIFIED CASTING</span>
                </div>
                <div className="text-[9px] font-mono text-stone-400 tracking-wider uppercase">
                  ISSUE NO. 03 · ED. 2026/27
                </div>
              </div>
            </div>

            {/* FRONT BODY: 4-Photo Editorial Collage Grid */}
            <div
              className="grid grid-cols-2 gap-3.5 sm:gap-4 relative z-20"
              style={{
                transform: 'translateZ(20px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {compCardPhotos.map((photo, idx) => {
                const isItemHovered = activeHoverLook === idx;
                return (
                  <div
                    key={photo.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFx.playClick(1.2);
                      onOpenLightbox(photo.src, photo.title);
                    }}
                    onMouseEnter={() => {
                      soundFx.playWhoosh(1.8);
                      setActiveHoverLook(idx);
                    }}
                    onMouseLeave={() => setActiveHoverLook(null)}
                    className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-stone-900 border border-[#E7C456]/30 hover:border-[#E7C456] shadow-[0_10px_25px_rgba(0,0,0,0.6)] cursor-pointer transition-all duration-300"
                    style={{
                      transform: isItemHovered ? 'translateZ(25px) scale(1.02)' : 'translateZ(10px)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Editorial Photo */}
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                      loading="eager"
                    />

                    {/* Gradient Shadow & Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 opacity-70 group-hover:opacity-85 transition-opacity" />

                    {/* Top Gold Frame Bevel */}
                    <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none group-hover:border-[#E7C456]/60 transition-colors" />

                    {/* Floating Look Tag (3D Layer) */}
                    <div
                      className="absolute top-2.5 left-2.5"
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      <span className="font-mono text-[9px] sm:text-[10px] text-white font-bold px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/20 shadow-md">
                        {photo.tag}
                      </span>
                    </div>

                    {/* Bottom Metadata & Hover Inspector */}
                    <div
                      className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs"
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      <span className="text-[10px] font-sans font-medium text-stone-200 line-clamp-1 pr-1">
                        {photo.category}
                      </span>
                      <div className="shrink-0 w-6 h-6 rounded-full bg-[#E7C456]/20 border border-[#E7C456]/60 flex items-center justify-center text-[#F6DB85] opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FRONT FOOTER: Physical Telemetry Bar & Flip Indicator */}
            <div
              className="mt-4 pt-3.5 border-t border-[#E7C456]/25 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-stone-300 relative z-20"
              style={{
                transform: 'translateZ(25px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Telemetry Summary */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-white font-semibold">
                <span className="text-[#E7C456]">5'7" (170cm)</span>
                <span className="text-stone-500">·</span>
                <span>34B - 26 - 36</span>
                <span className="text-stone-500">·</span>
                <span className="text-stone-400">Hazel / Espresso</span>
              </div>

              {/* Click to Flip Prompt */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip();
                }}
                className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#F6DB85] hover:text-white bg-[#E7C456]/10 hover:bg-[#E7C456]/20 px-2.5 py-1 rounded-full border border-[#E7C456]/40 transition-colors shadow-sm cursor-pointer"
              >
                <span>CASTING SPECS</span>
                <ArrowRight className="w-3 h-3 text-[#E7C456]" />
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ======================= BACK FACE (CASTING DOSSIER) ===================== */}
          {/* ========================================================================= */}
          <div
            className="w-full rounded-[28px] overflow-hidden p-5 sm:p-6 bg-gradient-to-b from-[#1C1E22] via-[#18191D] to-[#121316] border-2 border-[#E7C456]/40 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(231,196,86,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.22),inset_0_-2px_4px_rgba(0,0,0,0.6)] relative transition-all duration-300"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
              transform: 'rotateY(180deg)',
              display: isFlipped ? 'block' : 'none',
            }}
          >
            {/* Gilded Corner Accent Brackets */}
            <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#E7C456]/70 rounded-tl-md pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#E7C456]/70 rounded-tr-md pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#E7C456]/70 rounded-bl-md pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#E7C456]/70 rounded-br-md pointer-events-none" />

            {/* Dynamic Holographic Overlay on Back */}
            {is3DActive && (
              <div
                className="absolute inset-0 pointer-events-none rounded-[28px] transition-opacity duration-300 z-30"
                style={{
                  opacity: isHovered ? 0.75 : 0.25,
                  background: `
                    radial-gradient(circle 380px at ${shinePos.x}% ${shinePos.y}%, rgba(255, 255, 255, 0.38) 0%, rgba(231, 196, 86, 0.18) 30%, transparent 70%),
                    linear-gradient(${
                      115 - rotation.y * 2.5 + rotation.x * 2
                    }deg, rgba(255,0,128,0.12) 0%, rgba(0,255,240,0.14) 25%, rgba(231,196,86,0.22) 50%, rgba(168,85,247,0.16) 75%, rgba(16,185,129,0.12) 100%)
                  `,
                  mixBlendMode: 'color-dodge',
                }}
              />
            )}

            {/* BACK HEADER: Agency Specification Title & Dossier Token */}
            <div
              className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E7C456]/30 relative z-20"
              style={{
                transform: 'translateZ(30px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <div>
                <span className="text-[10px] font-mono text-[#E7C456] uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Sliders className="w-3 h-3" />
                  <span>OFFICIAL CASTING SPECIFICATION</span>
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  AKRATI <span className="text-stone-400 text-sm font-sans font-normal">/ DOSSIER</span>
                </h3>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-[9px] font-mono text-stone-400 uppercase">TALENT REF</span>
                <span className="text-[11px] font-mono text-[#F6DB85] font-bold tracking-wider px-2 py-0.5 rounded bg-black/60 border border-[#E7C456]/40">
                  #AKR-2026-IND-GLB
                </span>
              </div>
            </div>

            {/* 8-Slot Physical Measurements Grid */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4 relative z-20"
              style={{
                transform: 'translateZ(22px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {castingSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="p-2.5 rounded-xl bg-black/40 border border-white/10 hover:border-[#E7C456]/50 transition-colors shadow-inner"
                >
                  <div className="text-stone-400 text-[9px] font-mono uppercase font-bold tracking-wider">
                    {spec.label}
                  </div>
                  <div className="text-white font-mono font-bold text-xs mt-0.5 text-shadow-sm">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Middle Feature Split: Headshot Inset + Casting Disciplines */}
            <div
              className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 mb-4 relative z-20"
              style={{
                transform: 'translateZ(26px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Left Inset: Studio Portrait Inset */}
              <div
                onClick={() => {
                  soundFx.playClick(1.2);
                  onOpenLightbox(
                    '/assets/photos/studio-portrait-8.jpeg',
                    'Casting Headshot Archive — Akrati'
                  );
                }}
                className="sm:col-span-4 relative rounded-xl overflow-hidden aspect-[4/5] bg-black border border-[#E7C456]/40 cursor-pointer group shadow-md"
              >
                <img
                  src="/assets/photos/studio-portrait-8.jpeg"
                  alt="Akrati Headshot"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-white">
                  <span className="font-bold text-[#F6DB85]">HEADSHOT</span>
                  <Eye className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Right Inset: Disciplines & Direct Casting Info */}
              <div className="sm:col-span-8 p-3 rounded-xl bg-black/30 border border-white/10 space-y-2.5 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-[#E7C456] uppercase tracking-wider font-bold block mb-1">
                    Primary Casting Disciplines
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-stone-200">
                    <span className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/10">
                      Editorial & Runway
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/10">
                      Beauty & Skincare
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/10">
                      Commercial Film / UGC
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/10">
                      Hair Styling Breakdowns
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-1 border-t border-white/10">
                  <div>
                    <span className="text-stone-400 block font-bold">Mobility / Visa</span>
                    <span className="text-white font-medium flex items-center gap-1 mt-0.5">
                      <Globe className="w-3 h-3 text-[#E7C456]" /> Valid Passport
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-bold">Languages</span>
                    <span className="text-white font-medium mt-0.5 block">English, Hindi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Casting Barcode & Authentic Verification Seal */}
            <div
              className="p-3 rounded-xl bg-black/50 border border-[#E7C456]/30 flex items-center justify-between gap-4 mb-4 relative z-20"
              style={{
                transform: 'translateZ(28px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Barcode SVG representation */}
              <div className="flex flex-col gap-1">
                <svg
                  className="h-7 w-48 max-w-full text-[#E7C456]"
                  viewBox="0 0 200 30"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Realistic casting barcode lines */}
                  <rect x="0" y="0" width="3" height="30" />
                  <rect x="5" y="0" width="1.5" height="30" />
                  <rect x="8" y="0" width="4" height="30" />
                  <rect x="14" y="0" width="2" height="30" />
                  <rect x="18" y="0" width="1" height="30" />
                  <rect x="21" y="0" width="3" height="30" />
                  <rect x="26" y="0" width="5" height="30" />
                  <rect x="33" y="0" width="2" height="30" />
                  <rect x="37" y="0" width="1" height="30" />
                  <rect x="40" y="0" width="3.5" height="30" />
                  <rect x="46" y="0" width="2" height="30" />
                  <rect x="50" y="0" width="4" height="30" />
                  <rect x="56" y="0" width="1" height="30" />
                  <rect x="59" y="0" width="2.5" height="30" />
                  <rect x="64" y="0" width="4.5" height="30" />
                  <rect x="71" y="0" width="2" height="30" />
                  <rect x="75" y="0" width="1" height="30" />
                  <rect x="78" y="0" width="3" height="30" />
                  <rect x="83" y="0" width="5" height="30" />
                  <rect x="90" y="0" width="2" height="30" />
                  <rect x="94" y="0" width="3" height="30" />
                  <rect x="99" y="0" width="1.5" height="30" />
                  <rect x="103" y="0" width="4" height="30" />
                  <rect x="109" y="0" width="2" height="30" />
                  <rect x="113" y="0" width="1" height="30" />
                  <rect x="116" y="0" width="3" height="30" />
                  <rect x="121" y="0" width="5" height="30" />
                  <rect x="128" y="0" width="2" height="30" />
                  <rect x="132" y="0" width="1" height="30" />
                  <rect x="135" y="0" width="3.5" height="30" />
                  <rect x="141" y="0" width="2" height="30" />
                  <rect x="145" y="0" width="4" height="30" />
                  <rect x="151" y="0" width="1" height="30" />
                  <rect x="154" y="0" width="2.5" height="30" />
                  <rect x="159" y="0" width="4.5" height="30" />
                  <rect x="166" y="0" width="2" height="30" />
                  <rect x="170" y="0" width="1" height="30" />
                  <rect x="173" y="0" width="3" height="30" />
                  <rect x="178" y="0" width="5" height="30" />
                  <rect x="185" y="0" width="2" height="30" />
                  <rect x="189" y="0" width="3" height="30" />
                  <rect x="194" y="0" width="1.5" height="30" />
                  <rect x="198" y="0" width="2" height="30" />
                </svg>
                <div className="text-[8px] font-mono text-stone-400 tracking-widest text-center uppercase">
                  *AKRATI-CASTING-2026-COMP*
                </div>
              </div>

              {/* Digital Seal */}
              <div className="text-right">
                <div className="text-[9px] font-mono text-[#F6DB85] font-bold">DIGITAL COMPOSITE</div>
                <div className="text-[8px] font-mono text-stone-400">AGENCY READY</div>
              </div>
            </div>

            {/* BACK ACTIONS: Direct Booking CTA & Flip Back */}
            <div
              className="flex items-center gap-3 pt-1 relative z-20"
              style={{
                transform: 'translateZ(34px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {onOpenBooking ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFx.playShimmer();
                    onOpenBooking();
                  }}
                  className="flex-1 py-2.5 px-4 rounded-full bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] hover:from-[#ECCF6E] hover:to-[#EA8A35] text-stone-950 font-bold text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-2 shadow-warm-glow transition-all active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Direct Casting Booking</span>
                </button>
              ) : (
                <a
                  href="#contact"
                  className="flex-1 py-2.5 px-4 rounded-full bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] text-stone-950 font-bold text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-2 shadow-warm-glow"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Direct Casting Booking</span>
                </a>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip();
                }}
                className="px-4 py-2.5 rounded-full border border-white/20 hover:border-[#E7C456]/60 bg-white/10 hover:bg-white/15 text-stone-200 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Flip to Front (Editorial Looks)"
              >
                <Rotate3d className="w-3.5 h-3.5 text-[#E7C456]" />
                <span>Front</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Interactive Gesture / Exploration Hint */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-stone-400">
        <Sparkle className="w-3 h-3 text-[#E7C456] animate-pulse" />
        <span className="text-[11px]">
          Hover or drag across card to tilt in 3D • Click any photo for full 4K view
        </span>
      </div>
    </div>
  );
};

export default ThreeDCompCard;

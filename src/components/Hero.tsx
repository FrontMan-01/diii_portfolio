import React, { useState, useRef } from 'react';
import { Sparkles, Play, ArrowDown, Award, Instagram, Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { soundFx } from '../utils/soundFx';
import { CREATOR_CONFIG } from '../config';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenLightbox: (imageUrl: string, title: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenLightbox }) => {
  // 3D Tilt State for the Front Cover Card
  const coverRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!coverRef.current) return;
    const rect = coverRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth 3D tilt angles
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundFx.playWhoosh(1.4);
  };

  return (
    <section id="cover" className="relative pt-28 pb-20 md:pt-36 md:pb-24 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* =========================================================
            SLIDE 1: EDITORIAL COVER (CANVA BROCHURE SLIDE 1)
            Straight top magazine cover frame + 3D interactive physics
        ========================================================= */}
        <div className="relative rounded-[36px] bg-gradient-to-b from-[#3B0510] via-[#2A020B] to-[#1A0106] border border-[#E7C456]/35 p-8 sm:p-12 md:p-16 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.15)] overflow-hidden text-center flex flex-col items-center">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#E7C456]/12 blur-[130px] pointer-events-none" />

          {/* Top Decorative Folio */}
          <div className="relative z-10 w-full flex items-center justify-between text-xs font-mono text-stone-300 pb-4 border-b border-white/10">
            <span className="flex items-center gap-1.5 text-[#F6DB85] font-bold tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#E7C456]" />
              <span>OFFICIAL CREATOR PORTFOLIO & MEDIA KIT</span>
            </span>
            <span className="text-stone-400">VOL. 03 · 2026 EDITION</span>
          </div>

          {/* Centerpiece: Straight-Top 3D Interactive Magazine Cover */}
          <div className="relative z-10 my-8 sm:my-10 flex flex-col items-center">
            
            {/* Bold Editorial Header Banner */}
            <div className="space-y-1.5 mb-6 text-center">
              <div className="inline-block px-4 py-1 rounded-full bg-black/60 border border-[#E7C456]/30 text-[#F6DB85] text-[11px] font-mono font-bold tracking-[0.2em] uppercase shadow-sm">
                FASHION · BEAUTY · LIFESTYLE
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
                UGC PORTFOLIO
              </h1>
            </div>

            {/* Straight-Top Luxury 3D Perspective Card (Not Round at Top) */}
            <div
              ref={coverRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                soundFx.playWhoosh(1.0);
                onOpenLightbox('/assets/photos/magazine-cover.png', 'Akrati Creates — Official UGC Portfolio Cover');
              }}
              style={{
                perspective: '1200px',
              }}
              className="group cursor-pointer relative w-60 sm:w-72 md:w-80 aspect-[3/4] transition-all duration-200"
            >
              <div
                style={{
                  transform: isHovered
                    ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.04, 1.04, 1.04)`
                    : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                  transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  transformStyle: 'preserve-3d',
                }}
                className="relative w-full h-full rounded-2xl overflow-hidden bg-[#100205] border-2 border-[#E7C456] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(231,196,86,0.3)] flex flex-col justify-between"
              >
                {/* Cover Image */}
                <img
                  src="/assets/photos/magazine-cover.png"
                  alt="Akrati Creates UGC Portfolio Cover"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
                />

                {/* 3D Specular Glare Reflection */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: isHovered ? 0.35 : 0,
                    background: `radial-gradient(circle 280px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.8) 0%, rgba(231, 196, 86, 0.2) 40%, transparent 80%)`,
                    mixBlendMode: 'overlay',
                  }}
                />

                {/* Dark Editorial Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 opacity-70 group-hover:opacity-40 transition-opacity" />

                {/* Top Corner Registration Stamps */}
                <div className="relative z-10 p-4 flex items-center justify-between text-[10px] font-mono text-[#F6DB85] font-bold">
                  <span className="px-2 py-0.5 rounded bg-black/80 border border-[#E7C456]/40 backdrop-blur-md">
                    ISSUE Nº 03
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/80 border border-white/20 backdrop-blur-md text-white">
                    4K MASTER
                  </span>
                </div>

                {/* Inner Gold Hairline Frame */}
                <div className="absolute inset-2.5 rounded-xl border border-white/20 pointer-events-none" />

                {/* Bottom Card Title Overlay */}
                <div className="relative z-10 p-4 text-center space-y-1">
                  <div className="font-serif text-lg font-bold text-white tracking-wide">
                    AKRATI
                  </div>
                  <div className="text-[10px] font-mono text-[#F6DB85] uppercase tracking-widest font-semibold">
                    ✦ CLICK TO VIEW FULLSCREEN ✦
                  </div>
                </div>
              </div>
            </div>

            {/* Subtitle Pill Capsule: "by Akrati Creates" */}
            <div className="mt-6 inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-black/85 border border-[#E7C456]/50 shadow-md">
              <span className="font-serif text-sm sm:text-base font-bold text-[#F6DB85] tracking-widest uppercase">
                by Akrati Creates
              </span>
              <span className="text-[#E7C456] text-xs">✦</span>
            </div>
          </div>

          {/* Quick CTAs */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => {
                soundFx.playShimmer();
                onOpenBooking();
              }}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] hover:from-[#ECCF6E] hover:to-[#EA8A35] text-stone-950 font-bold text-xs font-mono tracking-widest uppercase flex items-center gap-2 shadow-[0_4px_20px_rgba(231,196,86,0.45)] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>Work With Me · Book Brand Deal</span>
            </button>

            <a
              href="#reels"
              onClick={() => soundFx.playWhoosh(1.2)}
              className="px-6 py-3.5 rounded-full border border-white/20 hover:border-[#E7C456]/60 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2 transition-all shadow-sm backdrop-blur-xl"
            >
              <Play className="w-3.5 h-3.5 text-[#E7C456] fill-[#E7C456]" />
              <span>View Selected Works · Watch Reels</span>
            </a>
          </div>
        </div>

        {/* =========================================================
            SLIDE 2: ABOUT & WHAT IS UGC? (CANVA BROCHURE SLIDE 2)
            "WHO AM I? / WHAT IS UGC?" (English Edition)
        ========================================================= */}
        <div className="relative rounded-[36px] bg-[#1A0106] border border-[#8B1E2D]/50 p-8 sm:p-12 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: "Who Am I?" (About Me) */}
            <div className="lg:col-span-4 space-y-4 text-left">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#E7C456] font-bold tracking-widest uppercase">
                  ABOUT THE CREATOR
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                  Who Am I?
                </h3>
              </div>
              <p className="text-sm text-stone-300 leading-relaxed">
                Hello! I'm <strong className="text-white">Akrati</strong>, a content creator and model specialized in editorial fashion, hair care & beauty rituals, and authentic lifestyle storytelling.
              </p>
              <p className="text-sm text-stone-400 leading-relaxed">
                My mission is to transform brand products into highly desirable visual experiences, uniting the sophistication of high fashion with the organic, magnetic pull of social media.
              </p>
              <div className="pt-2">
                <span className="badge-honey">
                  ✦ FASHION · BEAUTY · UGC CREATOR
                </span>
              </div>
            </div>

            {/* Center: Arched Portrait Cutout in Gold Wireframe */}
            <div className="lg:col-span-4 flex justify-center py-4">
              <div
                onClick={() => {
                  soundFx.playWhoosh(1.0);
                  onOpenLightbox('/assets/photos/studio-noir-pose-2.jpeg', 'Akrati Creates — Studio Noir Portrait');
                }}
                className="group cursor-pointer relative w-48 sm:w-56 h-64 sm:h-72 frame-arch overflow-hidden bg-black border-2 border-[#E7C456] shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(231,196,86,0.3)] transition-transform duration-500 hover:scale-105"
              >
                <img
                  src="/assets/photos/studio-noir-pose-2.jpeg"
                  alt="Akrati Portrait"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50" />
                <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-mono font-bold text-[#F6DB85]">
                  @AKRATI.CREATES
                </div>
              </div>
            </div>

            {/* Right Column: "What is UGC?" (Value Proposition for Brands) */}
            <div className="lg:col-span-4 space-y-4 text-left">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#E7C456] font-bold tracking-widest uppercase">
                  HIGH IMPACT & CONVERSION
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                  What is UGC?
                </h3>
              </div>
              <p className="text-sm text-stone-300 leading-relaxed">
                UGC (<em className="text-[#F6DB85]">User Generated Content</em>) is the highest-converting creative format in modern digital marketing: real, relatable videos filmed from the consumer's genuine perspective.
              </p>
              <p className="text-sm text-stone-400 leading-relaxed">
                It is an essential growth strategy that produces <strong className="text-white">scroll-stopping retention, immediate consumer trust, and scalable return on ad spend</strong> for global brands.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    soundFx.playShimmer();
                    onOpenBooking();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/10 hover:bg-[#E7C456] text-white hover:text-stone-950 border border-white/20 text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Work With Me</span>
                  <span>→</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll prompt */}
        <div className="pt-2 flex justify-center">
          <a
            href="#benefits"
            onClick={() => soundFx.playClick()}
            className="flex flex-col items-center gap-2 text-xs font-mono font-semibold text-stone-400 hover:text-[#E7C456] transition-colors"
          >
            <span>DISCOVER UGC BENEFITS FOR YOUR BRAND</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#E7C456]" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

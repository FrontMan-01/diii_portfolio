import React from 'react';
import { Camera, MapPin, CheckCircle2, Award, Printer, Sparkles, Sliders, MessageCircle, Mail, Instagram, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/soundFx';
import { CREATOR_CONFIG } from '../config';

interface CompCardAboutProps {
  onOpenLightbox: (imageUrl: string, title: string) => void;
  onOpenBooking?: () => void;
}

export const CompCardAbout: React.FC<CompCardAboutProps> = ({ onOpenLightbox, onOpenBooking }) => {
  const castingSpecs = [
    { label: 'Height', value: `5'7" / 170 cm` },
    { label: 'Bust', value: '34B' },
    { label: 'Waist', value: '26"' },
    { label: 'Hips', value: '36"' },
    { label: 'Eyes', value: 'Hazel Brown' },
    { label: 'Hair', value: 'Dark Brown' },
    { label: 'Shoe', value: '7.5 US / 38 EU' },
    { label: 'Dress', value: 'Small / 36 EU' },
  ];

  const statMetrics = [
    { value: '70%', label: 'average increase in viewer retention on UGC video ads compared to conventional studio spots' },
    { value: '73%', label: 'of consumers complete a purchase after watching a real-world product video demonstration' },
    { value: '84%', label: 'of Gen Z & Millennials trust creator recommendations significantly more than corporate ads' },
  ];

  return (
    <section id="comp-card" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#2A020B] border-t border-[#8B1E2D]/50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-20 relative z-10">
        
        {/* =========================================================
            SLIDE 10: STILL NOT SURE? (CANVA BROCHURE SLIDE 10)
        ========================================================= */}
        <div className="space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-2 text-left">
              <span className="badge-honey">
                <Sliders className="w-3.5 h-3.5" />
                <span>CASTING SPECS & PROVEN CONVERSION DATA</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Still Not <span className="italic text-[#E7C456]">Sure?</span> ✦
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundFx.playClick(1.0);
                  window.print();
                }}
                className="px-5 py-2.5 rounded-full border border-white/15 hover:border-[#E7C456] text-xs font-mono font-bold text-stone-200 hover:text-white bg-white/10 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[#E7C456]" />
                <span>Print 1-Page Comp Card</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: 70% / 73% / 84% Stat Metrics (Slide 10 Left) */}
            <div className="lg:col-span-6 space-y-4">
              {statMetrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#1A0106] border border-[#8B1E2D]/60 flex items-center gap-6 shadow-xl"
                >
                  <div className="font-serif text-4xl sm:text-5xl font-black text-[#F6DB85] shrink-0">
                    {m.value}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans text-left">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column: Casting Specifications & Agency Dossier */}
            <div className="lg:col-span-6 rounded-3xl bg-[#1A0106] border border-[#E7C456]/40 p-6 sm:p-8 shadow-2xl space-y-6 text-left">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
                <span className="text-[#E7C456] font-bold flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>PROFESSIONAL CASTING DOSSIER</span>
                </span>
                <span className="text-stone-400 text-[10px]">AGENCY APPROVED</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                {castingSpecs.map((spec) => (
                  <div key={spec.label} className="p-3 rounded-2xl bg-[#2A020B] border border-white/5">
                    <div className="text-stone-400 text-[10px] uppercase">{spec.label}</div>
                    <div className="text-white font-bold text-xs mt-1">{spec.value}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-xs text-stone-300 leading-relaxed">
                Available for in-studio shoots, on-location campaigns, and international travel upon prior inquiry.
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================
            SLIDE 11: LET'S WORK TOGETHER (CANVA BROCHURE SLIDE 11)
        ========================================================= */}
        <div className="rounded-[36px] bg-[#FAF6F0] text-[#141210] border border-stone-300 p-8 sm:p-14 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-center">
            
            {/* Left Arch Portrait */}
            <div className="lg:col-span-3 flex justify-center order-2 lg:order-1">
              <div
                onClick={() => {
                  soundFx.playWhoosh(1.0);
                  onOpenLightbox('/assets/photos/lifestyle-smile-1.png', 'Akrati Creates — Sunlit Smile Portrait');
                }}
                className="group cursor-pointer relative w-44 sm:w-48 h-60 sm:h-64 frame-arch overflow-hidden bg-black border-2 border-[#8B1E2D] shadow-xl transition-transform duration-500 hover:scale-105"
              >
                <img
                  src="/assets/photos/lifestyle-smile-1.png"
                  alt="Akrati Lifestyle"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Center: "LET'S WORK TOGETHER" */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2 flex flex-col items-center">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34050D] text-[#F6DB85] text-xs font-mono font-bold tracking-widest uppercase">
                  DIRECT REACH
                </span>
                <h3 className="font-serif text-3xl sm:text-5xl font-black text-[#2A020B] tracking-tight">
                  Let's Work <br />
                  <span className="italic text-[#8B1E2D]">Together</span> ✦
                </h3>
              </div>

              <p className="text-sm font-sans text-stone-700 max-w-md">
                Ready to elevate your brand positioning and scale conversions with high-impact UGC and immaculate visual aesthetic.
              </p>

              {/* Contact Pills */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono">
                <a
                  href={CREATOR_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white border border-stone-300 hover:border-[#8B1E2D] text-[#2A020B] font-bold flex items-center gap-2 shadow-sm transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#8B1E2D]" />
                  <span>{CREATOR_CONFIG.handle}</span>
                </a>

                <a
                  href={`mailto:${CREATOR_CONFIG.email}`}
                  className="px-4 py-2 rounded-full bg-white border border-stone-300 hover:border-[#8B1E2D] text-[#2A020B] font-bold flex items-center gap-2 shadow-sm transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#8B1E2D]" />
                  <span>{CREATOR_CONFIG.email}</span>
                </a>
              </div>

              {/* Big CTA */}
              <button
                onClick={() => {
                  soundFx.playShimmer();
                  if (onOpenBooking) onOpenBooking();
                }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#8B1E2D] to-[#4E0A16] hover:from-[#A82437] hover:to-[#6E1120] text-white font-bold text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#F6DB85]" />
                <span>Submit Campaign Brief (Instant)</span>
              </button>
            </div>

            {/* Right Arch Portrait */}
            <div className="lg:col-span-3 flex justify-center order-3">
              <div
                onClick={() => {
                  soundFx.playWhoosh(1.0);
                  onOpenLightbox('/assets/photos/studio-noir-chair-1.jpeg', 'Akrati Creates — Studio Noir Chair');
                }}
                className="group cursor-pointer relative w-44 sm:w-48 h-60 sm:h-64 frame-arch overflow-hidden bg-black border-2 border-[#8B1E2D] shadow-xl transition-transform duration-500 hover:scale-105"
              >
                <img
                  src="/assets/photos/studio-noir-chair-1.jpeg"
                  alt="Akrati Couture"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CompCardAbout;

import React from 'react';
import { Sparkles, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/soundFx';

interface UGCBenefitsStatsProps {
  onOpenBooking: () => void;
}

export const UGCBenefitsStats: React.FC<UGCBenefitsStatsProps> = ({ onOpenBooking }) => {
  const benefitsList = [
    'Authentic storytelling and relatable connection that outperforms traditional studio ads',
    'Proven increase in Click-Through Rate (CTR) and direct checkout conversions',
    'High-retention visual hooks in the first 3 seconds designed to stop the scroll',
    'Fast turnaround (3–5 business days) with 100% color-graded, ready-to-launch 4K assets',
    'Full commercial advertising rights for Meta Ads, TikTok Ads, and YouTube Shorts',
    'Cinema-grade 4K filming with professional studio lighting and directional audio',
  ];

  return (
    <section id="benefits" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#2A020B] border-t border-[#8B1E2D]/40 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[#E7C456]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: 93% Stat Spotlight (Slide 3 Left) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="flex items-center gap-2 text-[#E7C456]">
              <Sparkles className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">
                GLOBAL CONVERSION BENCHMARK
              </span>
            </div>

            {/* Giant 93% Stat */}
            <div className="space-y-2">
              <div className="font-serif text-7xl sm:text-8xl md:text-9xl font-black text-[#F6DB85] leading-none tracking-tight">
                93%<span className="text-white text-5xl sm:text-6xl">*</span>
              </div>
              <p className="font-serif text-xl sm:text-2xl text-stone-200 leading-snug">
                of consumers declare that <span className="italic text-[#E7C456]">UGC content</span> is the single most decisive factor when making online purchasing decisions.
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 text-xs font-mono text-stone-400">
              SOURCE: FORRESTER & ECOMMERCE CONSUMER SURVEY 2026
            </div>
          </div>

          {/* Right Column: Benefits Checklist (Slide 3 Right) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#1F0307]/85 border border-[#E7C456]/30 p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="space-y-1 pb-4 border-b border-white/10">
              <span className="text-xs font-mono text-[#E7C456] font-bold tracking-widest uppercase">
                RETURN ON INVESTMENT
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Benefits of UGC for Your Brand
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3.5 text-xs sm:text-sm text-stone-200">
              {benefitsList.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-[#E7C456] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <button
                onClick={() => {
                  soundFx.playShimmer();
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] hover:from-[#ECCF6E] hover:to-[#EA8A35] text-stone-950 font-bold text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Work With Me</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-[11px] font-mono text-stone-400">
                Campaign briefs answered within 24 hours
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UGCBenefitsStats;

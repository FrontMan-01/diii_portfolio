import React from 'react';
import { Play, Sparkles, Download, ArrowDown, Eye, Heart, Flame } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenLightbox: (imageUrl: string, title: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenLightbox }) => {
  return (
    <section id="cover" className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Editorial Label */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200/80">
          <div className="flex items-center gap-2">
            <span className="badge-honey">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Media Kit & Portfolio</span>
            </span>
          </div>
          <div className="text-xs font-mono text-espresso-500 tracking-wider uppercase font-medium">
            <span>Issue 03 · September 2026 Edition</span>
          </div>
        </div>

        {/* Hero 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Bio */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6 text-left order-2 lg:order-1">
            <div className="space-y-2">
              <span className="text-xs font-mono text-gold-600 tracking-widest uppercase font-bold">
                Fashion · Beauty · Lifestyle Creator
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-espresso-950 leading-[1.08]">
                Akrati <br />
                <span className="italic font-normal text-gold-600">Creates.</span>
              </h1>
            </div>

            <p className="text-sm sm:text-base text-espresso-700 font-normal leading-relaxed">
              Merging high-fashion editorial aesthetics with authentic, relatable social storytelling. Specializing in hair styling breakdowns, beauty routines, couture modeling, and high-conversion brand partnerships.
            </p>

            {/* Quick CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-warm-glow transition-all duration-300 hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Partner with Akrati</span>
              </button>

              <a
                href="#reels"
                className="px-5 py-3 rounded-full border border-stone-300 hover:border-gold-500/60 bg-white/80 hover:bg-white text-espresso-800 text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-sm font-semibold"
              >
                <Play className="w-3.5 h-3.5 text-gold-600 fill-gold-600" />
                <span>Watch Reels</span>
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-stone-200/80">
              <div>
                <div className="text-xl font-serif font-bold text-gold-600">@akrati.creates</div>
                <div className="text-[11px] font-mono text-espresso-500 uppercase tracking-wider font-medium">Primary Channel</div>
              </div>
              <div>
                <div className="text-xl font-serif font-bold text-espresso-900">Editorial + UGC</div>
                <div className="text-[11px] font-mono text-espresso-500 uppercase tracking-wider font-medium">Content Specialty</div>
              </div>
            </div>
          </div>

          {/* Center Column: The Magazine Cover Banner (Hero Focus) */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative group w-full max-w-[380px] sm:max-w-[420px]">
              {/* Warm Golden Glow Aura */}
              <div className="absolute -inset-1.5 bg-gradient-to-b from-amber-300/40 via-yellow-200/30 to-amber-400/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-90" />

              {/* Magazine Card Container */}
              <div
                onClick={() => onOpenLightbox('/assets/photos/magazine-cover.png', 'Vogue Editorial Cover - Akrati Creates')}
                className="relative rounded-3xl overflow-hidden glass-warm border border-amber-300/60 shadow-warm-luxury cursor-pointer transition-transform duration-500 group-hover:scale-[1.01]"
              >
                <img
                  src="/assets/photos/magazine-cover.png"
                  alt="Akrati - Fashion Magazine Cover"
                  className="w-full h-auto object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Badges on Banner */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md bg-espresso-950/80 backdrop-blur-md border border-gold-400/40 text-[10px] font-mono text-gold-300 tracking-widest uppercase font-bold">
                    FEATURED COVER
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-espresso-900 text-xs font-mono font-bold flex items-center gap-1.5 shadow-md border border-stone-200">
                    <Eye className="w-3.5 h-3.5 text-gold-600" />
                    <span>Expand Cover</span>
                  </span>
                </div>
              </div>

              {/* Floating Verified Stamp */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 glass-warm-gold px-4 py-2.5 rounded-2xl shadow-warm-glow flex items-center gap-3 border border-amber-400/40 animate-float-slow">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-gold-600">
                  <Flame className="w-4 h-4 text-gold-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-espresso-950">Editorial Quality</div>
                  <div className="text-[10px] font-mono text-gold-700 font-semibold">Studio & Video Craft</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Profile & Core Metrics */}
          <div className="lg:col-span-3 space-y-5 order-3">
            <div className="glass-warm p-6 rounded-3xl border border-stone-200/80 shadow-warm-card space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-gold-600 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Creator Metrics</span>
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-white/80 border border-stone-200/80 flex items-center justify-between shadow-sm">
                  <div>
                    <div className="text-xs text-espresso-500 font-mono font-medium">Engagement Rate</div>
                    <div className="text-2xl font-serif font-extrabold text-espresso-950">4.8%</div>
                  </div>
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-100" />
                </div>

                <div className="p-3.5 rounded-2xl bg-white/80 border border-stone-200/80 flex items-center justify-between shadow-sm">
                  <div>
                    <div className="text-xs text-espresso-500 font-mono font-medium">Audience Ratio</div>
                    <div className="text-xl font-serif font-bold text-espresso-950">78% Female</div>
                  </div>
                  <span className="text-[11px] font-mono text-gold-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    18–34 YRS
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/80 border border-stone-200/80 flex items-center justify-between shadow-sm">
                  <div>
                    <div className="text-xs text-espresso-500 font-mono font-medium">Content Formats</div>
                    <div className="text-base font-serif font-bold text-espresso-950">Reels · Stills · UGC</div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold">
                    AD READY
                  </span>
                </div>
              </div>

              <a
                href="#media-kit"
                className="w-full py-2.5 rounded-2xl border border-stone-300 hover:border-gold-500/50 text-center text-xs font-mono font-bold tracking-wider text-espresso-800 hover:text-gold-600 bg-white/90 flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>View Full Media Kit</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-14 pt-8 border-t border-stone-200/80 flex justify-center">
          <a
            href="#comp-card"
            className="flex flex-col items-center gap-2 text-xs font-mono font-semibold text-espresso-500 hover:text-gold-600 transition-colors"
          >
            <span>DISCOVER THE PORTFOLIO</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-gold-600" />
          </a>
        </div>
      </div>
    </section>
  );
};

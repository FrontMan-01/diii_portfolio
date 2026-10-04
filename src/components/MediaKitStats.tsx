import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, Video, Camera, Layers, Zap, Download } from 'lucide-react';
import { soundFx } from '../utils/soundFx';

interface MediaKitStatsProps {
  onOpenBooking: () => void;
}

export const MediaKitStats: React.FC<MediaKitStatsProps> = ({ onOpenBooking }) => {
  const servicePackages = [
    {
      id: 'single-reel',
      title: '1 Dedicated 4K UGC Reel',
      badge: 'MOST POPULAR',
      icon: Video,
      description: 'High-retention 9:16 short-form video demonstrating your product in real routines, unboxings, or tutorials with scroll-stopping hooks.',
      deliverables: [
        '1 Edited 4K video (up to 60s) with captions & audio',
        '2 Alternate 3-second hook intros for A/B testing',
        '90-day digital advertising & social usage rights',
        'Turnaround in 3 to 5 business days',
      ],
    },
    {
      id: 'pack-3-reels',
      title: '3-Video UGC Ads Bundle',
      badge: 'BEST VALUE & SCALE',
      icon: Layers,
      description: 'Strategic creative bundle with 3 diverse angles (Problem/Solution, Authentic Review, Step-by-Step Styling Tutorial).',
      deliverables: [
        '3 Complete 4K videos designed for paid ad scaling',
        '4 Alternate hook variations for Meta & TikTok Ads',
        'Full paid advertising rights (Whitelisting ready)',
        'Phased delivery within 5 business days',
      ],
    },
    {
      id: 'editorial-stills',
      title: 'Editorial Lookbook & Stills',
      badge: 'E-COMMERCE & SOCIAL',
      icon: Camera,
      description: 'High-resolution studio photography with professional lighting for product catalogs, e-commerce PDPs, banners, and carousels.',
      deliverables: [
        '8 to 12 Retouched high-resolution studio photos',
        'Editorial composition highlighting product textures',
        'Full commercial web & social media licensing',
        'Delivery of raw + color-graded assets',
      ],
    },
    {
      id: 'custom-campaign',
      title: 'Custom Bespoke Campaign',
      badge: 'SPECIAL PROJECTS',
      icon: Zap,
      description: 'Full tailored multi-channel campaign combining 4K reels, interactive stories, studio photo shoots, and event presence.',
      deliverables: [
        'Customized asset mix matched to your brand goals',
        'Creative strategy co-developed with your marketing team',
        'Priority production scheduling & alignment calls',
        'Post-campaign engagement performance report',
      ],
    },
  ];

  const workflowSteps = [
    {
      number: '01',
      title: 'Submit Campaign Brief',
      description: 'Send your campaign goals, product details, and target dates through our instant booking form.',
    },
    {
      number: '02',
      title: 'Creative Strategy & Script',
      description: 'We align on hooks, narrative scripts, and visual aesthetics for your team’s quick approval.',
    },
    {
      number: '03',
      title: 'Production & Delivery',
      description: '4K cinema filming, dynamic pacing, pro color grading, and delivery of final broadcast-ready files.',
    },
  ];

  return (
    <section id="media-kit" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#1A0106] border-t border-[#8B1E2D]/50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-20 relative z-10">
        
        {/* =========================================================
            SLIDE 8: COLLABORATION PACKAGES (CANVA BROCHURE SLIDE 8)
        ========================================================= */}
        <div className="space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-2 text-left">
              <span className="badge-honey">
                <Sparkles className="w-3.5 h-3.5" />
                <span>COLLABORATION PACKAGES · COMMERCIAL RATES</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Commercial <span className="italic text-[#E7C456]">Partnership Formats</span>
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
                <Download className="w-3.5 h-3.5" />
                <span>Save Media Kit</span>
              </button>
            </div>
          </div>

          {/* 4 Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicePackages.map((pkg) => {
              const IconComp = pkg.icon;
              return (
                <div
                  key={pkg.id}
                  className="rounded-3xl bg-[#2A020B] border border-[#8B1E2D]/70 hover:border-[#E7C456] p-6 shadow-xl flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1.5 group"
                >
                  <div className="space-y-4">
                    {/* Top Icon & Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#E7C456]/15 border border-[#E7C456]/30 flex items-center justify-center text-[#E7C456] group-hover:scale-110 transition-transform">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[9px] font-mono font-bold text-[#F6DB85] bg-[#E7C456]/15 border border-[#E7C456]/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {pkg.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#F6DB85] transition-colors">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-stone-300 mt-2 leading-relaxed font-normal">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-stone-300">
                      {pkg.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E7C456] shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Select Format Button */}
                  <button
                    onClick={() => {
                      soundFx.playShimmer();
                      onOpenBooking();
                    }}
                    className="w-full py-3 rounded-full bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#E7C456] group-hover:to-[#E27D26] text-white group-hover:text-stone-950 border border-white/20 group-hover:border-transparent text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Select Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            SLIDE 9: HOW IT WORKS (CANVA BROCHURE SLIDE 9)
        ========================================================= */}
        <div className="rounded-[36px] bg-[#220308] border border-[#E7C456]/30 p-8 sm:p-12 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 3-Step Process Cards */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="space-y-1 pb-4 border-b border-white/10">
                <span className="text-xs font-mono text-[#E7C456] font-bold tracking-widest uppercase">
                  STREAMLINED WORKFLOW
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                  How It Works ✦
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {workflowSteps.map((step) => (
                  <div
                    key={step.number}
                    className="p-5 rounded-2xl bg-[#150105] border border-white/10 space-y-2.5"
                  >
                    <div className="font-serif text-3xl font-black text-[#F6DB85]">
                      {step.number}
                    </div>
                    <div className="font-serif text-sm font-bold text-white">
                      {step.title}
                    </div>
                    <p className="text-[11px] text-stone-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arch Portrait Cutout Frame */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-48 sm:w-56 h-64 sm:h-72 frame-arch overflow-hidden bg-black border-2 border-[#E7C456] shadow-2xl">
                <img
                  src="/assets/photos/studio-white-pose-5.jpeg"
                  alt="Akrati Creating Content"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-mono font-bold text-[#F6DB85]">
                  4K CINEMA PRODUCTION
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default MediaKitStats;

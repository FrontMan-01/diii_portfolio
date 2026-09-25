import React from 'react';
import { Camera, MapPin, CheckCircle2, Award } from 'lucide-react';

interface CompCardAboutProps {
  onOpenLightbox: (imageUrl: string, title: string) => void;
}

export const CompCardAbout: React.FC<CompCardAboutProps> = ({ onOpenLightbox }) => {
  const compCardPhotos = [
    {
      src: '/assets/photos/studio-noir-pose-2.jpeg',
      title: 'Studio Noir - Look 01 (Couture Corset & Bangles)',
      tag: 'LOOK 01 · NOIR'
    },
    {
      src: '/assets/photos/studio-white-pose-5.jpeg',
      title: 'Studio Chic - Look 02 (Monochrome Contrast Split Skirt)',
      tag: 'LOOK 02 · CONTRAST'
    },
    {
      src: '/assets/photos/studio-portrait-8.jpeg',
      title: 'Portrait Close-up - Look 03 (Editorial Lighting & Detail)',
      tag: 'LOOK 03 · CLOSEUP'
    },
    {
      src: '/assets/photos/studio-noir-chair-1.jpeg',
      title: 'Full Length - Look 04 (Seated Silhouette & Boots)',
      tag: 'LOOK 04 · FULL LENGTH'
    }
  ];

  return (
    <section id="comp-card" className="py-24 sm:py-32 px-4 sm:px-8 bg-white/[0.02] backdrop-blur-lg border-y border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <span className="text-xs font-mono text-[#E7C456] tracking-widest uppercase font-bold flex items-center gap-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Digital Comp Card & Persona</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              The Creative Behind <span className="italic text-[#E7C456]">The Frame</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-stone-300 font-normal leading-relaxed">
            High production values meet effortless charm. Delivering elevated visuals designed to capture attention and convert audiences for premium lifestyle and beauty brands.
          </p>
        </div>

        {/* Comp Card Grid Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 4-Photo Comp Card Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {compCardPhotos.map((photo, idx) => (
              <div
                key={photo.tag}
                onClick={() => onOpenLightbox(photo.src, photo.title)}
                className="group relative rounded-3xl overflow-hidden glass-warm border border-white/10 shadow-warm-card cursor-pointer aspect-[3/4]"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-white font-bold px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20">
                    {photo.tag}
                  </span>
                  <span className="text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                    VIEW #0{idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Creator Description & Spec Sheet Card (Warm Frosted Glass) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl p-6 sm:p-8 glass-warm-gold border border-[#E7C456]/40 shadow-warm-luxury space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="font-serif text-2xl font-bold text-white">AKRATI</div>
                  <div className="text-xs font-mono text-[#E7C456] font-bold">@AKRATI.CREATES</div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7C456]/15 border border-[#E7C456]/40 text-[#F6DB85] text-xs font-mono font-bold backdrop-blur-md">
                  <Award className="w-3.5 h-3.5" />
                  <span>VERIFIED CREATOR</span>
                </div>
              </div>

              {/* Attributes & Metrics Table */}
              <div className="grid grid-cols-2 gap-3.5 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/10 shadow-sm">
                  <span className="text-stone-400 block mb-1 text-[10px] uppercase font-bold">Location</span>
                  <span className="font-bold text-white flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#E7C456]" /> India / Remote UGC
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/10 shadow-sm">
                  <span className="text-stone-400 block mb-1 text-[10px] uppercase font-bold">Primary Categories</span>
                  <span className="font-bold text-white">Fashion · Beauty · Lifestyle</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/10 shadow-sm">
                  <span className="text-stone-400 block mb-1 text-[10px] uppercase font-bold">Content Specialty</span>
                  <span className="font-bold text-white">Hair Care, GRWM & Vlogs</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/10 shadow-sm">
                  <span className="text-stone-400 block mb-1 text-[10px] uppercase font-bold">Production Quality</span>
                  <span className="font-bold text-white">4K Video & Studio Lighting</span>
                </div>
              </div>

              {/* Creative Vision & Life Philosophy */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#E7C456] font-bold">
                  Aesthetic Vision & Life Philosophy
                </h4>
                <p className="text-sm text-stone-300 leading-relaxed">
                  Akrati bridges the gap between high-concept editorial fashion and genuine, heartfelt community interaction. While she brings precision and high standards to every camera roll and brand shoot, she never lets her professional hustle get in the way of living life to the absolute fullest.
                </p>
                <p className="text-sm text-stone-300 leading-relaxed">
                  From spontaneous cafe explorations and catching golden hours to discovering indie tracks and sharing unfiltered laughs, her core philosophy is simple: <span className="text-[#F6DB85] italic font-serif font-bold">“live authentically first, create from joy second.”</span> This radiant, grounded energy is why her audience trusts her — they see a creative who truly embraces every moment and inspires them to romanticize their daily routines, own their unique style, and feel effortless in their skin.
                </p>
                {/* Personality & Lifestyle Badges */}
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono text-stone-200 font-medium">
                  <span className="px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/10 shadow-sm flex items-center gap-1.5">
                    ☕ Cafe Hopping & Aesthetic Nooks
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/10 shadow-sm flex items-center gap-1.5">
                    🌻 Sunlit Radiance & Good Vibes
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/10 shadow-sm flex items-center gap-1.5">
                    ✨ Living Life in Full Color
                  </span>
                </div>
              </div>

              {/* What Brands Gain */}
              <div className="space-y-2.5 pt-4 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-widest text-stone-400 font-bold">
                  Why Brands Partner with Akrati:
                </h4>
                <div className="grid grid-cols-1 gap-2 text-xs text-stone-200">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Native short-form storytelling that retains viewer attention</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>High-res studio assets suitable for digital ad whitelisting</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Fast turnaround (3-5 business days from product delivery)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

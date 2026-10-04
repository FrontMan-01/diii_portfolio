import React, { useState, useMemo } from 'react';
import { Camera, Eye, Sparkles, ZoomIn } from 'lucide-react';
import { soundFx } from '../utils/soundFx';

interface LookbookGalleryProps {
  onOpenLightbox: (imageUrl: string, title: string) => void;
}

export const LookbookGallery: React.FC<LookbookGalleryProps> = ({ onOpenLightbox }) => {
  const [filter, setFilter] = useState<'all' | 'noir' | 'minimal' | 'lifestyle'>('all');

  const galleryItems: {
    id: string;
    title: string;
    category: 'noir' | 'minimal' | 'lifestyle';
    imageUrl: string;
    aspect: string;
    caption: string;
    badge: string;
    figNumber: string;
  }[] = [
    {
      id: 'look-1',
      title: 'Vogue Vol. 03 Cover Feature',
      category: 'noir',
      imageUrl: '/assets/photos/magazine-cover.png',
      aspect: 'tall',
      caption: 'Luxury editorial shoot featuring corset couture and statement silver bangles.',
      badge: 'COVER EDITORIAL',
      figNumber: 'FIG. 01'
    },
    {
      id: 'look-2',
      title: 'Studio Noir — Seated Silhouette',
      category: 'noir',
      imageUrl: '/assets/photos/studio-noir-chair-1.jpeg',
      aspect: 'tall',
      caption: 'Minimalist studio chair pose emphasizing clean lines and monochrome lighting.',
      badge: 'LOOKBOOK NOIR',
      figNumber: 'FIG. 02'
    },
    {
      id: 'look-3',
      title: 'Studio Noir — Head Tilt & Elegance',
      category: 'noir',
      imageUrl: '/assets/photos/studio-noir-pose-2.jpeg',
      aspect: 'tall',
      caption: 'Close-up editorial focus on texture, jewelry, and dramatic expression.',
      badge: 'HIGH FASHION',
      figNumber: 'FIG. 03'
    },
    {
      id: 'look-4',
      title: 'Monochrome Split Skirt — Dynamic Pose',
      category: 'minimal',
      imageUrl: '/assets/photos/studio-white-pose-5.jpeg',
      aspect: 'tall',
      caption: 'White collared crop vest paired with a slit maxi skirt and lace-up boots.',
      badge: 'STYLING LOOK 02',
      figNumber: 'FIG. 04'
    },
    {
      id: 'look-5',
      title: 'Studio Portrait — Delicate Focus',
      category: 'noir',
      imageUrl: '/assets/photos/studio-portrait-8.jpeg',
      aspect: 'square',
      caption: 'Soft natural portrait study with emphasis on facial angles and gaze.',
      badge: 'PORTRAIT STUDY',
      figNumber: 'FIG. 05'
    },
    {
      id: 'look-6',
      title: 'Studio White — Relaxed Seated Pose',
      category: 'minimal',
      imageUrl: '/assets/photos/studio-white-seated-6.jpeg',
      aspect: 'tall',
      caption: 'Ground-level seated perspective showcasing styling versatility.',
      badge: 'STUDIO EDIT',
      figNumber: 'FIG. 06'
    },
    {
      id: 'look-7',
      title: 'Autumn Knitwear & Cafe Day Out',
      category: 'lifestyle',
      imageUrl: '/assets/photos/lifestyle-cafe-2.png',
      aspect: 'square',
      caption: 'Warm multi-toned knit sweater in cozy ambient cafe light.',
      badge: 'LIFESTYLE & CAFE',
      figNumber: 'FIG. 07'
    },
    {
      id: 'look-8',
      title: 'Sunlit Smile & Candid Warmth',
      category: 'lifestyle',
      imageUrl: '/assets/photos/lifestyle-smile-1.png',
      aspect: 'tall',
      caption: 'Approachable, radiant, community-first creator energy.',
      badge: 'VIBRANT UGC',
      figNumber: 'FIG. 08'
    },
    {
      id: 'look-9',
      title: 'Full Length Silhouette Study',
      category: 'minimal',
      imageUrl: '/assets/photos/studio-white-full-7.jpeg',
      aspect: 'tall',
      caption: 'High-contrast studio frame highlighting posture and boot detailing.',
      badge: 'FULL LOOK',
      figNumber: 'FIG. 09'
    }
  ];

  const filteredItems = useMemo(() => {
    return filter === 'all'
      ? galleryItems
      : galleryItems.filter(item => item.category === filter);
  }, [filter, galleryItems]);

  return (
    <section id="lookbook" className="py-24 sm:py-32 px-4 sm:px-8 bg-[#0C0D0F] border-t border-white/10 relative overflow-hidden">
      {/* Editorial Background Folio Text */}
      <div className="absolute top-12 left-6 select-none pointer-events-none opacity-[0.03] font-serif text-[120px] font-black uppercase text-white leading-none">
        ARCHIVES
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header (Inspired by ZYLYRA & Canva "FOTOGRAFIA DE PRODUTO" Editorial Gallery) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <span className="badge-honey">
              <Camera className="w-3.5 h-3.5" />
              <span>EDITORIAL ARCHIVES · PRODUCT & FASHION PHOTOGRAPHY</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Curated <span className="italic text-[#E7C456]">Visual Archives</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick(1.0);
                setFilter('all');
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 font-bold cursor-pointer ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] text-stone-950 shadow-md'
                  : 'bg-white/[0.06] border border-white/12 text-stone-400 hover:text-white hover:border-[#E7C456]/50'
              }`}
            >
              All Archives ({galleryItems.length})
            </button>
            <button
              onClick={() => {
                soundFx.playClick(1.0);
                setFilter('noir');
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 font-bold cursor-pointer ${
                filter === 'noir'
                  ? 'bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] text-stone-950 shadow-md'
                  : 'bg-white/[0.06] border border-white/12 text-stone-400 hover:text-white hover:border-[#E7C456]/50'
              }`}
            >
              Studio Noir
            </button>
            <button
              onClick={() => {
                soundFx.playClick(1.0);
                setFilter('minimal');
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 font-bold cursor-pointer ${
                filter === 'minimal'
                  ? 'bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] text-stone-950 shadow-md'
                  : 'bg-white/[0.06] border border-white/12 text-stone-400 hover:text-white hover:border-[#E7C456]/50'
              }`}
            >
              Monochrome
            </button>
            <button
              onClick={() => {
                soundFx.playClick(1.0);
                setFilter('lifestyle');
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 font-bold cursor-pointer ${
                filter === 'lifestyle'
                  ? 'bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] text-stone-950 shadow-md'
                  : 'bg-white/[0.06] border border-white/12 text-stone-400 hover:text-white hover:border-[#E7C456]/50'
              }`}
            >
              Lifestyle & UGC
            </button>
          </div>
        </div>

        {/* =========================================================
            HAUTE COUTURE EDITORIAL MASONRY / COLLAGE GRID
        ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                soundFx.playClick(1.2);
                onOpenLightbox(item.imageUrl, item.title);
              }}
              className="group relative rounded-3xl overflow-hidden bg-[#121316] border border-white/12 hover:border-[#E7C456]/70 shadow-[0_16px_36px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(231,196,86,0.2)] cursor-pointer transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Photo Frame Container with Symmetrical / Arch Framing */}
              <div className="relative aspect-[3/4] overflow-hidden bg-black">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Editorial Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                {/* Top Folio Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-[#F6DB85] font-bold text-[10px] uppercase tracking-widest">
                    {item.badge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/15 text-stone-300 font-bold text-[10px]">
                    {item.figNumber}
                  </span>
                </div>

                {/* Center Hover Magnifier */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border border-[#E7C456] text-[#E7C456] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                {/* Bottom Card Annotation */}
                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1.5 bg-gradient-to-t from-black via-black/80 to-transparent text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#F6DB85] transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-mono text-stone-400 font-semibold">
                      #0{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

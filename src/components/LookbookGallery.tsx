import React, { useState } from 'react';
import { Camera, Eye } from 'lucide-react';

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
  }[] = [
    {
      id: 'look-1',
      title: 'Vogue Vol. 03 Cover Feature',
      category: 'noir',
      imageUrl: '/assets/photos/magazine-cover.png',
      aspect: 'tall',
      caption: 'Luxury editorial shoot featuring corset couture and statement silver bangles.',
      badge: 'COVER EDITORIAL'
    },
    {
      id: 'look-2',
      title: 'Studio Noir - Seated Silhouette',
      category: 'noir',
      imageUrl: '/assets/photos/studio-noir-chair-1.jpeg',
      aspect: 'tall',
      caption: 'Minimalist studio chair pose emphasizing clean lines and monochrome lighting.',
      badge: 'LOOKBOOK NOIR'
    },
    {
      id: 'look-3',
      title: 'Studio Noir - Head Tilt & Elegance',
      category: 'noir',
      imageUrl: '/assets/photos/studio-noir-pose-2.jpeg',
      aspect: 'tall',
      caption: 'Close-up editorial focus on texture, jewelry, and dramatic expression.',
      badge: 'HIGH FASHION'
    },
    {
      id: 'look-4',
      title: 'Monochrome Split Skirt - Dynamic Pose',
      category: 'minimal',
      imageUrl: '/assets/photos/studio-white-pose-5.jpeg',
      aspect: 'tall',
      caption: 'White collared crop vest paired with a slit maxi skirt and lace-up boots.',
      badge: 'STYLING LOOK 02'
    },
    {
      id: 'look-5',
      title: 'Studio Portrait - Delicate Focus',
      category: 'noir',
      imageUrl: '/assets/photos/studio-portrait-8.jpeg',
      aspect: 'square',
      caption: 'Soft natural portrait study with emphasis on facial angles and gaze.',
      badge: 'PORTRAIT STUDY'
    },
    {
      id: 'look-6',
      title: 'Studio White - Relaxed Seated Pose',
      category: 'minimal',
      imageUrl: '/assets/photos/studio-white-seated-6.jpeg',
      aspect: 'tall',
      caption: 'Ground-level seated perspective showcasing styling versatility.',
      badge: 'STUDIO EDIT'
    },
    {
      id: 'look-7',
      title: 'Autumn Knitwear & Cafe Day',
      category: 'lifestyle',
      imageUrl: '/assets/photos/lifestyle-cafe-2.png',
      aspect: 'square',
      caption: 'Warm multi-toned knit sweater in cozy ambient cafe light.',
      badge: 'LIFESTYLE & CAFE'
    },
    {
      id: 'look-8',
      title: 'Sunlit Smile & Candid Warmth',
      category: 'lifestyle',
      imageUrl: '/assets/photos/lifestyle-smile-1.png',
      aspect: 'tall',
      caption: 'Approachable, radiant, community-first creator energy.',
      badge: 'VIBRANT UGC'
    },
    {
      id: 'look-9',
      title: 'Full Length Silhouette Study',
      category: 'minimal',
      imageUrl: '/assets/photos/studio-white-full-7.jpeg',
      aspect: 'tall',
      caption: 'High-contrast studio frame highlighting posture and boot detailing.',
      badge: 'FULL LOOK'
    }
  ];

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <section id="lookbook" className="py-24 sm:py-32 px-4 sm:px-8 bg-white/[0.02] backdrop-blur-md border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-xs font-mono text-[#E7C456] tracking-widest uppercase font-bold flex items-center gap-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Editorial Lookbook & Stills</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Curated <span className="italic text-[#E7C456]">Visual Archives</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all font-semibold ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] text-stone-950 font-bold shadow-warm-glow'
                  : 'bg-white/[0.08] border border-white/15 text-stone-300 hover:text-white hover:border-[#E7C456]/50'
              }`}
            >
              All Archives ({galleryItems.length})
            </button>
            <button
              onClick={() => setFilter('noir')}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all font-semibold ${
                filter === 'noir'
                  ? 'bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] text-stone-950 font-bold shadow-warm-glow'
                  : 'bg-white/[0.08] border border-white/15 text-stone-300 hover:text-white hover:border-[#E7C456]/50'
              }`}
            >
              Studio Noir
            </button>
            <button
              onClick={() => setFilter('minimal')}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all font-semibold ${
                filter === 'minimal'
                  ? 'bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] text-stone-950 font-bold shadow-warm-glow'
                  : 'bg-white/[0.08] border border-white/15 text-stone-300 hover:text-white hover:border-[#E7C456]/50'
              }`}
            >
              Minimal Monochrome
            </button>
            <button
              onClick={() => setFilter('lifestyle')}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all font-semibold ${
                filter === 'lifestyle'
                  ? 'bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] text-stone-950 font-bold shadow-warm-glow'
                  : 'bg-white/[0.08] border border-white/15 text-stone-300 hover:text-white hover:border-[#E7C456]/50'
              }`}
            >
              Lifestyle & UGC
            </button>
          </div>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item.imageUrl, item.title)}
              className="group relative rounded-3xl overflow-hidden glass-warm border border-white/10 hover:border-[#E7C456]/70 shadow-warm-card hover:shadow-warm-luxury cursor-pointer transition-all duration-500 hover:-translate-y-1.5"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-espresso-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/20 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-md bg-espresso-950/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-gold-300 font-bold uppercase tracking-widest">
                    {item.badge}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1.5 transform transition-transform duration-300 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                      {item.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xs text-stone-200 line-clamp-2">
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

import React, { useState } from 'react';
import { Play, Film, Heart, Eye, Music } from 'lucide-react';
import { ReelItem } from '../types';

interface ReelsShowcaseProps {
  onSelectReel: (reel: ReelItem) => void;
}

export const ReelsShowcase: React.FC<ReelsShowcaseProps> = ({ onSelectReel }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const reelsData: ReelItem[] = [
    {
      id: 'reel-1',
      title: 'Hair Styling & Volume Spray Routine',
      category: 'beauty',
      duration: '0:41',
      views: '48.5K',
      likes: '3.9K',
      videoUrl: '/assets/videos/reel-beauty-grwm.mp4',
      posterUrl: '/assets/posters/poster-reel-1.png',
      description: 'Step-by-step hair styling & volume setting spray routine. Demonstrating product application, texture holding, and natural shine under studio light.',
      tags: ['#HairStyling', '#VolumeSpray', '#HairCare', '#BeautyRoutine'],
      audioTrack: 'Kali Uchis · All I Can Say'
    },
    {
      id: 'reel-2',
      title: 'Meet Akrati — Behind the Creator Vision',
      category: 'lifestyle',
      duration: '0:35',
      views: '62.1K',
      likes: '5.4K',
      videoUrl: '/assets/videos/reel-intro-akrati.mp4',
      posterUrl: '/assets/posters/poster-reel-2.png',
      description: 'An honest, grounded sit-down intro connecting with followers about authenticity, styling experiments, and future collaborations.',
      tags: ['#CreatorStory', '#Aesthetic', '#Authenticity'],
      audioTrack: 'Original Audio · @akrati.creates'
    },
    {
      id: 'reel-3',
      title: 'Confidence, Styling & Modern Storytime',
      category: 'editorial',
      duration: '0:40',
      views: '54.2K',
      likes: '4.7K',
      videoUrl: '/assets/videos/reel-storytelling.mp4',
      posterUrl: '/assets/posters/poster-reel-3.png',
      description: 'Floral silhouette styling combined with narrative engagement on self-expression and personal style development.',
      tags: ['#Storytime', '#FloralChic', '#FashionMindset'],
      audioTrack: 'Trending Audio · Ambient Mix'
    },
    {
      id: 'reel-4',
      title: 'Cafe Day Out & Cozy Knitwear Styling',
      category: 'lifestyle',
      duration: '0:31',
      views: '71.8K',
      likes: '6.2K',
      videoUrl: '/assets/videos/reel-lifestyle-cafe.mp4',
      posterUrl: '/assets/posters/poster-reel-4.png',
      description: 'Cozy autumn palette knitwear, warm cafe coffee aesthetics, and effortless lifestyle moments captured in cinematic short-form.',
      tags: ['#CafeVlog', '#KnitwearAesthetic', '#Lifestyle'],
      audioTrack: 'Nova, Anubha Bajaj · Savera'
    },
    {
      id: 'reel-5',
      title: 'Tu Hi Savera — Sunlit Morning Vibe',
      category: 'lifestyle',
      duration: '0:19',
      views: '39.4K',
      likes: '3.1K',
      videoUrl: '/assets/videos/reel-vibe-savera.mp4',
      posterUrl: '/assets/posters/poster-reel-5.png',
      description: 'Vibrant smile, golden hour radiance, and heartwarming positivity that boosts engagement and brand retention.',
      tags: ['#MorningVibes', '#Sunlit', '#CreatorJoy'],
      audioTrack: 'Tu Hi Savera · Sunflower Edit'
    }
  ];

  const categories = [
    { key: 'all', label: 'All Content' },
    { key: 'beauty', label: 'Hair Care & Beauty' },
    { key: 'editorial', label: 'Editorial & Storytelling' },
    { key: 'lifestyle', label: 'Lifestyle & Cafe Vlogs' },
  ];

  const filteredReels = activeCategory === 'all'
    ? reelsData
    : reelsData.filter(r => r.category === activeCategory);

  return (
    <section id="reels" className="py-24 sm:py-32 px-4 sm:px-8 bg-transparent relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-xs font-mono text-[#E7C456] tracking-widest uppercase font-bold flex items-center gap-2">
              <Film className="w-3.5 h-3.5" />
              <span>Interactive Short-Form Video Feed</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Featured <span className="italic text-[#E7C456]">Reels & Videos</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-stone-300 leading-relaxed">
            Click any reel to play the native 9:16 high-definition video directly in the interactive modal player.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/10">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 font-semibold ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] text-stone-950 font-bold shadow-warm-glow'
                  : 'bg-white/[0.08] border border-white/15 text-stone-300 hover:text-white hover:border-[#E7C456]/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 9:16 Reel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredReels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => onSelectReel(reel)}
              className="group relative rounded-3xl overflow-hidden glass-warm border border-white/10 hover:border-[#E7C456]/70 shadow-warm-card hover:shadow-warm-luxury cursor-pointer transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* 9:16 Thumbnail Container */}
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
                <img
                  src={reel.posterUrl}
                  alt={reel.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 opacity-70 group-hover:opacity-50 transition-opacity" />

                {/* Top Badge: Category + Duration */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-[#E7C456]/40 text-[#F6DB85] font-bold uppercase tracking-widest text-[9px]">
                    {reel.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-white font-medium text-[10px]">
                    {reel.duration}
                  </span>
                </div>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#E7C456]/90 text-stone-950 flex items-center justify-center shadow-warm-glow transition-all duration-300 group-hover:scale-110 group-hover:bg-[#E7C456]">
                    <Play className="w-6 h-6 fill-stone-950 translate-x-0.5" />
                  </div>
                </div>

                {/* Audio Track Tag at Bottom-Right */}
                <div className="absolute bottom-16 left-3 right-3 flex items-center gap-1.5 text-[10px] font-mono text-white bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 truncate">
                  <Music className="w-3 h-3 text-[#F6DB85] shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="truncate">{reel.audioTrack}</span>
                </div>

                {/* Bottom Engagement Stats on Image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white font-bold">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#F6DB85]" />
                    <span>{reel.views}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                    <span>{reel.likes}</span>
                  </span>
                </div>
              </div>

              {/* Reel Title & Description Footer */}
              <div className="p-4 bg-[#1C1E22]/95 border-t border-white/10 space-y-2">
                <h3 className="font-serif text-base font-bold text-white group-hover:text-[#E7C456] transition-colors line-clamp-1">
                  {reel.title}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                  {reel.description}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {reel.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-[10px] font-mono font-semibold text-[#F6DB85]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

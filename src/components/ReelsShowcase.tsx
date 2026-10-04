import React, { useState, useMemo } from 'react';
import { Play, Film, Heart, Eye, Music, Sparkles, Video } from 'lucide-react';
import { ReelItem } from '../types';
import { soundFx } from '../utils/soundFx';

interface ReelsShowcaseProps {
  onSelectReel: (reel: ReelItem) => void;
}

export const ReelsShowcase: React.FC<ReelsShowcaseProps> = ({ onSelectReel }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const reelsData: ReelItem[] = [
    {
      id: 'reel-1',
      title: 'Hair Styling & Volume Setting Routine',
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
    { key: 'all', label: 'All Content (5)' },
    { key: 'beauty', label: 'Hair Care & Beauty' },
    { key: 'editorial', label: 'Editorial & Storytelling' },
    { key: 'lifestyle', label: 'Lifestyle & Cafe Vlogs' },
  ];

  const filteredReels = useMemo(() => {
    return activeCategory === 'all'
      ? reelsData
      : reelsData.filter(r => r.category === activeCategory);
  }, [activeCategory, reelsData]);

  return (
    <section id="reels" className="py-24 sm:py-32 px-4 sm:px-8 bg-[#0F1013] border-t border-white/10 relative overflow-hidden">
      {/* Editorial Watermark */}
      <div className="absolute top-12 right-6 select-none pointer-events-none opacity-[0.03] font-serif text-[120px] font-black uppercase text-white leading-none">
        MY WORK
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header (Inspired by Canva Business Portfolio "MY WORK / UGC REELS") */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <span className="badge-honey">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MY WORK · UGC VIDEO CONTENT</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Featured <span className="italic text-[#E7C456]">Reels & Videos</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => {
                  soundFx.playClick(1.0);
                  setActiveCategory(cat.key);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 font-bold cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] text-stone-950 shadow-md'
                    : 'bg-white/[0.06] border border-white/12 text-stone-400 hover:text-white hover:border-[#E7C456]/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================
            UGC PHONE BEZEL GRID (Canva Portfolio 9:16 Phone Showcase)
        ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-7">
          {filteredReels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => {
                soundFx.playClick(1.1);
                onSelectReel(reel);
              }}
              className="group cursor-pointer flex flex-col items-center"
            >
              {/* Luxury iPhone Device Bezel */}
              <div className="relative w-full aspect-[9/18] rounded-[36px] bg-[#16181C] p-2 border-[3px] border-stone-700/80 group-hover:border-[#E7C456] shadow-[0_20px_45px_rgba(0,0,0,0.7)] group-hover:shadow-[0_25px_50px_rgba(231,196,86,0.25)] transition-all duration-500 group-hover:-translate-y-2 flex flex-col overflow-hidden">
                
                {/* Dynamic Island / Speaker Pill */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-30 w-20 h-4 bg-black rounded-full border border-white/10 flex items-center justify-end px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
                </div>

                {/* Video Screen Container */}
                <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-black flex flex-col justify-between">
                  <img
                    src={reel.posterUrl}
                    alt={reel.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Top Screen Gradient & Badges */}
                  <div className="relative z-10 p-3 pt-6 bg-gradient-to-b from-black/80 via-black/20 to-transparent flex items-center justify-between text-[9px] font-mono">
                    <span className="px-2 py-0.5 rounded-full bg-black/80 border border-[#E7C456]/50 text-[#F6DB85] font-bold uppercase tracking-widest">
                      {reel.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/70 text-stone-200 font-bold">
                      {reel.duration}
                    </span>
                  </div>

                  {/* Central Play Pulse */}
                  <div className="relative z-10 flex items-center justify-center my-auto">
                    <div className="w-14 h-14 rounded-full bg-[#E7C456]/90 group-hover:bg-[#E7C456] text-stone-950 flex items-center justify-center shadow-[0_4px_20px_rgba(231,196,86,0.6)] transition-all duration-300 group-hover:scale-110">
                      <Play className="w-6 h-6 fill-stone-950 translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom Screen Overlay: Audio Track + Metrics */}
                  <div className="relative z-10 p-3.5 bg-gradient-to-t from-black/95 via-black/70 to-transparent space-y-2">
                    {/* Audio Ticker */}
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/90 bg-black/70 px-2 py-1 rounded-full border border-white/15">
                      <Music className="w-2.5 h-2.5 text-[#F6DB85] shrink-0 animate-spin" style={{ animationDuration: '5s' }} />
                      <span className="truncate">{reel.audioTrack}</span>
                    </div>

                    {/* Views & Likes */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-white font-bold pt-0.5">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-[#F6DB85]" />
                        <span>{reel.views}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                        <span>{reel.likes}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reel Caption Footer (Canva "MARCA AQUI" Label Style) */}
              <div className="w-full mt-3 text-center space-y-1 px-1">
                <h3 className="font-serif text-sm font-bold text-white group-hover:text-[#E7C456] transition-colors line-clamp-1">
                  {reel.title}
                </h3>
                <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest font-semibold">
                  <span>9:16 SHORT-FORM · AD READY</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom UGC Trust Banner (From Canva Brochure Slide 5) */}
        <div className="p-6 rounded-3xl bg-[#14161A]/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-stone-300 font-medium">
              <span className="text-white font-bold">93% of consumers</span> declare UGC video content is highly influential in shopping decisions.
            </span>
          </div>
          <div className="text-stone-400 text-[11px] uppercase tracking-wider font-semibold">
            4K CINEMA RECORDING · CRISP DIRECTIONAL AUDIO
          </div>
        </div>
      </div>
    </section>
  );
};

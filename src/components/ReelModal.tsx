import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Heart, Eye, Music, Sparkles } from 'lucide-react';
import { ReelItem } from '../types';

interface ReelModalProps {
  reel: ReelItem | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const ReelModal: React.FC<ReelModalProps> = ({ reel, onClose, onOpenBooking }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (reel && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [reel]);

  if (!reel) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/70 backdrop-blur-2xl animate-fadeIn">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white border border-stone-300 text-espresso-700 hover:text-gold-600 shadow-md z-50 transition-all"
        aria-label="Close Reel Modal"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Modal Card Grid */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12">
        {/* Left: 9:16 Video Player Column */}
        <div className="md:col-span-6 bg-espresso-950 flex items-center justify-center relative aspect-[9/16] md:aspect-auto max-h-[60vh] md:max-h-[85vh] overflow-hidden">
          <video
            ref={videoRef}
            src={reel.videoUrl}
            poster={reel.posterUrl}
            playsInline
            loop
            className="w-full h-full object-contain cursor-pointer"
            onClick={togglePlay}
          />

          {/* Center Play/Pause Indicator on tap */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 bg-espresso-950/40 flex items-center justify-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-gold-500 text-white flex items-center justify-center shadow-warm-glow">
                <Play className="w-8 h-8 fill-white translate-x-0.5" />
              </div>
            </div>
          )}

          {/* Bottom Floating Video Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
            <button
              onClick={togglePlay}
              className="p-2.5 rounded-full bg-espresso-950/80 backdrop-blur-md border border-white/20 text-white hover:text-gold-300 text-xs"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-2.5 rounded-full bg-espresso-950/80 backdrop-blur-md border border-white/20 text-white hover:text-gold-300 text-xs"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-gold-300" />}
            </button>
          </div>
        </div>

        {/* Right: Reel Info, Description, Audio, & Engagement */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto bg-[#F7F8F7]">
          <div className="space-y-4">
            {/* Header badges */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-gold-700 uppercase tracking-widest">
                {reel.category}
              </span>
              <span className="text-xs font-mono text-espresso-500 font-medium">
                Duration: {reel.duration}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl font-bold text-espresso-950">
              {reel.title}
            </h3>

            {/* Creator Attribution */}
            <div className="flex items-center gap-3 py-2 border-y border-stone-200">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-400/60 shadow-sm">
                <img
                  src="/assets/photos/magazine-cover.png"
                  alt="Akrati"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-espresso-950">Akrati</div>
                <div className="text-xs font-mono text-gold-600 font-semibold">@akrati.creates</div>
              </div>
            </div>

            {/* Full Description */}
            <p className="text-sm text-espresso-700 leading-relaxed">
              {reel.description}
            </p>

            {/* Audio Track Tag */}
            <div className="p-3.5 rounded-2xl bg-white border border-stone-200 flex items-center gap-3 text-xs font-mono shadow-sm">
              <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-gold-600 shrink-0">
                <Music className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
              <div>
                <span className="text-espresso-400 text-[10px] block font-semibold">AUDIO TRACK</span>
                <span className="text-espresso-800 font-bold">{reel.audioTrack}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {reel.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-xs font-mono text-espresso-700 font-medium shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-stone-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-espresso-700 font-semibold">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    liked ? 'text-rose-600' : 'hover:text-rose-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{liked ? 'Liked' : reel.likes}</span>
                </button>
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-gold-600" />
                  <span>{reel.views} Views</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-warm-glow transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Sponsor a Reel Like This</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

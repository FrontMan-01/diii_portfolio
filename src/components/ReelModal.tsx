import React, { useRef, useState, useEffect, useCallback } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Heart, Eye, Music, Sparkles } from 'lucide-react';
import { ReelItem } from '../types';
import { soundFx } from '../utils/soundFx';

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

  const handleClose = useCallback(() => {
    soundFx.playPop();
    onClose();
  }, [onClose]);

  // Handle Escape key & body scroll locking
  useEffect(() => {
    if (!reel) return;

    soundFx.playWhoosh(1.2);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [reel, handleClose]);

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
    soundFx.playClick(1.2);
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
    soundFx.playClick(0.9);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = () => {
    soundFx.playShimmer();
    setLiked(!liked);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reel-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-fadeIn"
      onClick={handleClose}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 border border-white/15 text-white hover:text-[#E7C456] shadow-md z-50 transition-all hover:scale-110 active:scale-95"
        aria-label="Close Reel Modal"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Modal Card Grid */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#1E2024] border border-white/15 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 text-white"
      >
        {/* Left: 9:16 Video Player Column */}
        <div className="md:col-span-6 bg-black flex items-center justify-center relative aspect-[9/16] md:aspect-auto max-h-[60vh] md:max-h-[85vh] overflow-hidden">
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
              className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-[#E7C456] text-stone-950 flex items-center justify-center shadow-warm-glow">
                <Play className="w-8 h-8 fill-stone-950 translate-x-0.5" />
              </div>
            </div>
          )}

          {/* Bottom Floating Video Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
            <button
              onClick={togglePlay}
              className="p-2.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white hover:text-[#E7C456] text-xs"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-2.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white hover:text-[#E7C456] text-xs"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#F6DB85]" />}
            </button>
          </div>
        </div>

        {/* Right: Reel Info, Description, Audio, & Engagement */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto bg-[#18191B]">
          <div className="space-y-4">
            {/* Header badges */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#E7C456]/15 border border-[#E7C456]/35 text-[#F6DB85] uppercase tracking-widest">
                {reel.category}
              </span>
              <span className="text-xs font-mono text-stone-400 font-medium">
                Duration: {reel.duration}
              </span>
            </div>

            {/* Title */}
            <h3 id="reel-modal-title" className="font-serif text-2xl font-bold text-white">
              {reel.title}
            </h3>

            {/* Creator Attribution */}
            <div className="flex items-center gap-3 py-2 border-y border-white/10">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#E7C456]/60 shadow-sm">
                <img
                  src="/assets/photos/magazine-cover.png"
                  alt="Akrati"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Akrati</div>
                <div className="text-xs font-mono text-[#E7C456] font-semibold">@akrati.creates</div>
              </div>
            </div>

            {/* Full Description */}
            <p className="text-sm text-stone-300 leading-relaxed">
              {reel.description}
            </p>

            {/* Audio Track Tag */}
            <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center gap-3 text-xs font-mono shadow-sm">
              <div className="w-8 h-8 rounded-full bg-[#E7C456]/15 border border-[#E7C456]/30 flex items-center justify-center text-[#E7C456] shrink-0">
                <Music className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
              <div>
                <span className="text-stone-400 text-[10px] block font-semibold">AUDIO TRACK</span>
                <span className="text-white font-bold">{reel.audioTrack}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {reel.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 text-xs font-mono text-stone-300 font-medium shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-stone-300 font-semibold">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 transition-colors ${
                    liked ? 'text-rose-400' : 'hover:text-rose-400'
                  }`}
                  aria-label="Like Reel"
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{liked ? 'Liked' : reel.likes}</span>
                </button>
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#E7C456]" />
                  <span>{reel.views} Views</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playShimmer();
                handleClose();
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] hover:from-[#ECCF6E] text-stone-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-warm-glow transition-all active:scale-95"
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

export default ReelModal;

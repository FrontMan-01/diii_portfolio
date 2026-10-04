import React, { useEffect, useCallback } from 'react';
import { X, ZoomIn, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/soundFx';

interface LightboxModalProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  imageUrl,
  title,
  onClose,
}) => {
  const handleClose = useCallback(() => {
    soundFx.playPop();
    onClose();
  }, [onClose]);

  // Handle Escape key listener & body scroll locking
  useEffect(() => {
    if (!isOpen) return;

    soundFx.playWhoosh(1.3);

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
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-modal-title"
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fadeIn"
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 border border-white/15 text-white hover:text-[#E7C456] shadow-md z-50 transition-all hover:scale-110 active:scale-95"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl max-h-[90vh] bg-[#1E2024] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center"
      >
        <div className="relative max-h-[80vh] overflow-hidden flex items-center justify-center bg-black">
          <img
            src={imageUrl}
            alt={title}
            className="max-w-full max-h-[78vh] object-contain"
          />
        </div>

        {/* Footer info */}
        <div className="w-full p-4 bg-[#18191B] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white">
          <div className="flex items-center gap-2 text-white">
            <Sparkles className="w-4 h-4 text-[#E7C456]" />
            <span id="lightbox-modal-title" className="font-serif text-base font-bold text-white">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-3 text-stone-300">
            <span>© Akrati Creates Studio Archive</span>
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick(1.2)}
              className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/15 hover:bg-[#E7C456] hover:text-stone-950 text-stone-200 transition-colors flex items-center gap-1.5 font-bold shadow-sm"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Full Resolution</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;

import React from 'react';
import { X, ZoomIn, Sparkles } from 'lucide-react';

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
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fadeIn"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 border border-white/15 text-white hover:text-[#E7C456] shadow-md z-50 transition-all"
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
            <span className="font-serif text-base font-bold text-white">{title}</span>
          </div>

          <div className="flex items-center gap-3 text-stone-300">
            <span>© Akrati Creates Studio Archive</span>
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
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

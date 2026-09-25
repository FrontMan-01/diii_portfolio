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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/80 backdrop-blur-2xl animate-fadeIn"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white border border-stone-300 text-espresso-700 hover:text-gold-600 shadow-md z-50 transition-all"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl max-h-[90vh] bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center"
      >
        <div className="relative max-h-[80vh] overflow-hidden flex items-center justify-center bg-espresso-950">
          <img
            src={imageUrl}
            alt={title}
            className="max-w-full max-h-[78vh] object-contain"
          />
        </div>

        {/* Footer info */}
        <div className="w-full p-4 bg-[#F7F8F7] border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-espresso-900">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <span className="font-serif text-base font-bold text-espresso-950">{title}</span>
          </div>

          <div className="flex items-center gap-3 text-espresso-600">
            <span>© Akrati Creates Studio Archive</span>
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-white border border-stone-300 hover:bg-gold-500 hover:text-white text-espresso-800 transition-colors flex items-center gap-1.5 font-bold shadow-sm"
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

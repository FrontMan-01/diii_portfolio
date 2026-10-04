import React, { useState, useEffect, useCallback } from 'react';
import { X, Sparkles, CheckCircle2, Instagram, MessageCircle, Mail } from 'lucide-react';
import { CREATOR_CONFIG } from '../config';
import { soundFx } from '../utils/soundFx';

interface BrandContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandContactModal: React.FC<BrandContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [brandName, setBrandName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formatType, setFormatType] = useState('Dedicated 4K Reel / Short');
  const [budget, setBudget] = useState('$500 - $2,000');
  const [brief, setBrief] = useState(
    `Hi Akrati,\n\nWe would love to partner with you for an upcoming campaign on [Brand / Product Name].\n\nDeliverables: Dedicated 4K Reel & Lookbook Stills\nTimeline: Next 2–3 weeks`
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = useCallback(() => {
    soundFx.playPop();
    onClose();
  }, [onClose]);

  // Handle Escape key listener & body scroll locking
  useEffect(() => {
    if (!isOpen) return;

    soundFx.playShimmer();

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

  const generateMessageText = () => {
    return (
      `✨ *NEW BRAND COLLABORATION INQUIRY* ✨\n\n` +
      `🏢 *Brand / Agency:* ${brandName || 'Brand Partner'}\n` +
      `👤 *Contact Person:* ${contactName || 'Team'}\n` +
      `📧 *Work Email:* ${email || 'Provided via chat'}\n` +
      `📱 *Contact Phone:* ${phone || 'Not provided'}\n` +
      `🎬 *Deliverable Format:* ${formatType}\n` +
      `💰 *Budget / Range:* ${budget}\n\n` +
      `📝 *Campaign Brief:*\n${brief}\n\n` +
      `— Sent from Akrati Creates Portfolio`
    );
  };

  // Direct WhatsApp instant phone dispatch
  const handleSendToPhone = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSuccess();
    const message = encodeURIComponent(generateMessageText());
    const whatsappUrl = `https://wa.me/${CREATOR_CONFIG.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  // Direct Email dispatch
  const handleSendViaEmail = () => {
    soundFx.playSuccess();
    const subject = encodeURIComponent(`Brand Collaboration Brief: ${brandName || 'New Campaign'}`);
    const body = encodeURIComponent(generateMessageText().replace(/\*/g, ''));
    window.open(`mailto:${CREATOR_CONFIG.email}?subject=${subject}&body=${body}`, '_blank');
    setIsSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="brand-modal-title"
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-fadeIn"
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 border border-white/15 text-white hover:text-[#E7C456] shadow-md z-50 transition-all hover:scale-110 active:scale-95"
        aria-label="Close Contact Modal"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#1E2024] border border-white/15 rounded-3xl p-6 sm:p-8 overflow-y-auto shadow-2xl text-white"
      >
        {!isSubmitted ? (
          <form onSubmit={handleSendToPhone} className="space-y-6">
            <div className="space-y-2 border-b border-white/10 pb-4">
              <span className="badge-honey">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Phone Notification Enabled</span>
              </span>
              <h3 id="brand-modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Book a Brand Deal with <span className="italic text-[#E7C456]">Akrati</span>
              </h3>
              <p className="text-xs text-stone-300">
                Submitting this brief instantly pings Akrati's phone directly via WhatsApp & Email for immediate response.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-stone-300 font-semibold block uppercase text-[11px]">
                  Brand / Agency Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nykaa / Zara / L'Oréal"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/15 focus:border-[#E7C456] text-white text-xs font-sans outline-none focus:bg-black/50 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-stone-300 font-semibold block uppercase text-[11px]">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name & Title"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/15 focus:border-[#E7C456] text-white text-xs font-sans outline-none focus:bg-black/50 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-stone-300 font-semibold block uppercase text-[11px]">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="collab@yourbrand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/15 focus:border-[#E7C456] text-white text-xs font-sans outline-none focus:bg-black/50 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-stone-300 font-semibold block uppercase text-[11px]">
                  Your Phone / WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/15 focus:border-[#E7C456] text-white text-xs font-sans outline-none focus:bg-black/50 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-stone-300 font-semibold block uppercase text-[11px]">
                  Deliverable Format
                </label>
                <select
                  value={formatType}
                  onChange={(e) => {
                    soundFx.playClick(1.0);
                    setFormatType(e.target.value);
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-[#141517] border border-white/15 focus:border-[#E7C456] text-white text-xs font-sans outline-none transition-colors"
                >
                  <option value="Dedicated 4K Reel / Short">Dedicated 4K Reel / Short</option>
                  <option value="UGC Ad Creative Pack">UGC Ad Creative Pack</option>
                  <option value="Editorial Studio Photoshoot">Editorial Studio Photoshoot</option>
                  <option value="Instagram Story Sequence">Instagram Story Sequence</option>
                  <option value="Multi-Format Campaign">Multi-Format Full Campaign</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-stone-300 font-semibold block uppercase text-[11px]">
                  Estimated Budget / Range
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="$500 - $2,500"
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/15 focus:border-[#E7C456] text-white text-xs font-sans outline-none focus:bg-black/50 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <label className="text-stone-300 font-semibold block uppercase text-[11px]">
                Campaign Brief & Notes
              </label>
              <textarea
                rows={4}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/15 focus:border-[#E7C456] text-white text-xs font-sans outline-none resize-none leading-relaxed focus:bg-black/50 transition-colors"
              />
            </div>

            {/* Direct Instant Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Send to Akrati's WhatsApp (Instant)</span>
              </button>

              <button
                type="button"
                onClick={handleSendViaEmail}
                className="w-full sm:w-auto py-3.5 px-5 rounded-full bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] hover:from-[#ECCF6E] hover:to-[#EA8A35] text-stone-950 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-95"
              >
                <Mail className="w-4 h-4" />
                <span>Send via Email</span>
              </button>

              <a
                href={CREATOR_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick(1.1)}
                className="w-full sm:w-auto p-3.5 rounded-full border border-white/15 hover:border-[#E7C456] text-stone-200 hover:text-white text-xs font-mono flex items-center justify-center gap-2 bg-white/10 transition-colors shadow-sm active:scale-95"
                title="Direct Message on Instagram"
              >
                <Instagram className="w-4 h-4 text-[#E7C456]" />
              </a>
            </div>
          </form>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-white">
              Deal Brief Prepared!
            </h3>
            <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
              Your campaign inquiry has been formatted and dispatched directly to Akrati's phone. She will review your details and respond shortly.
            </p>
            <button
              onClick={() => {
                soundFx.playClick(1.0);
                setIsSubmitted(false);
                handleClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] text-stone-950 font-bold text-xs font-mono uppercase tracking-wider shadow-warm-glow active:scale-95 transition-all"
            >
              Back to Portfolio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandContactModal;

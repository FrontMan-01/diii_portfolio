import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Instagram, MessageCircle, Mail } from 'lucide-react';
import { CREATOR_CONFIG } from '../config';

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
    const message = encodeURIComponent(generateMessageText());
    const whatsappUrl = `https://wa.me/${CREATOR_CONFIG.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  // Direct Email dispatch
  const handleSendViaEmail = () => {
    const subject = encodeURIComponent(`Brand Collaboration Brief: ${brandName || 'New Campaign'}`);
    const body = encodeURIComponent(generateMessageText().replace(/\*/g, ''));
    window.open(`mailto:${CREATOR_CONFIG.email}?subject=${subject}&body=${body}`, '_blank');
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/60 backdrop-blur-xl animate-fadeIn">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white border border-stone-300 text-espresso-700 hover:text-gold-600 shadow-md z-50 transition-all"
        aria-label="Close Contact Modal"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 overflow-y-auto shadow-2xl">
        {!isSubmitted ? (
          <form onSubmit={handleSendToPhone} className="space-y-6">
            <div className="space-y-2 border-b border-stone-200 pb-4">
              <span className="badge-honey">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Phone Notification Enabled</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-950">
                Book a Brand Deal with <span className="italic text-gold-600">Akrati</span>
              </h3>
              <p className="text-xs text-espresso-600">
                Submitting this brief instantly pings Akrati's phone directly via WhatsApp & Email for immediate response.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-espresso-700 font-semibold block uppercase text-[11px]">
                  Brand / Agency Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nykaa / Zara / L'Oréal"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-stone-300 focus:border-gold-500 text-espresso-950 text-xs font-sans outline-none focus:bg-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-espresso-700 font-semibold block uppercase text-[11px]">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name & Title"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-stone-300 focus:border-gold-500 text-espresso-950 text-xs font-sans outline-none focus:bg-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-espresso-700 font-semibold block uppercase text-[11px]">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="collab@yourbrand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-stone-300 focus:border-gold-500 text-espresso-950 text-xs font-sans outline-none focus:bg-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-espresso-700 font-semibold block uppercase text-[11px]">
                  Your Phone / WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-stone-300 focus:border-gold-500 text-espresso-950 text-xs font-sans outline-none focus:bg-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-espresso-700 font-semibold block uppercase text-[11px]">
                  Deliverable Format
                </label>
                <select
                  value={formatType}
                  onChange={(e) => setFormatType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-stone-300 focus:border-gold-500 text-espresso-950 text-xs font-sans outline-none focus:bg-white transition-colors"
                >
                  <option value="Dedicated 4K Reel / Short">Dedicated 4K Reel / Short</option>
                  <option value="UGC Ad Creative Pack">UGC Ad Creative Pack</option>
                  <option value="Editorial Studio Photoshoot">Editorial Studio Photoshoot</option>
                  <option value="Instagram Story Sequence">Instagram Story Sequence</option>
                  <option value="Multi-Format Campaign">Multi-Format Full Campaign</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-espresso-700 font-semibold block uppercase text-[11px]">
                  Estimated Budget / Range
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="$500 - $2,500"
                  className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-stone-300 focus:border-gold-500 text-espresso-950 text-xs font-sans outline-none focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <label className="text-espresso-700 font-semibold block uppercase text-[11px]">
                Campaign Brief & Notes
              </label>
              <textarea
                rows={4}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-stone-300 focus:border-gold-500 text-espresso-950 text-xs font-sans outline-none resize-none leading-relaxed focus:bg-white transition-colors"
              />
            </div>

            {/* Direct Instant Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Send to Akrati's WhatsApp (Instant)</span>
              </button>

              <button
                type="button"
                onClick={handleSendViaEmail}
                className="w-full sm:w-auto py-3.5 px-5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Send via Email</span>
              </button>

              <a
                href={CREATOR_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto p-3.5 rounded-full border border-stone-300 hover:border-gold-500 text-espresso-700 hover:text-gold-600 text-xs font-mono flex items-center justify-center gap-2 bg-cream-100 transition-colors shadow-sm"
                title="Direct Message on Instagram"
              >
                <Instagram className="w-4 h-4 text-gold-600" />
              </a>
            </div>
          </form>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-espresso-950">
              Deal Brief Prepared!
            </h3>
            <p className="text-sm text-espresso-700 max-w-md mx-auto leading-relaxed">
              Your campaign inquiry has been formatted and dispatched directly to Akrati's phone. She will review your details and respond shortly.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold text-xs font-mono uppercase tracking-wider shadow-warm-glow"
            >
              Back to Portfolio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { ArrowUp, Instagram, Mail, Heart } from 'lucide-react';
import { CREATOR_CONFIG } from '../config';
import { soundFx } from '../utils/soundFx';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFx.playWhoosh(1.4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#180206]/98 border-t border-[#E7C456]/20 py-16 px-4 sm:px-8 relative overflow-hidden text-stone-100">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Big Magazine Masthead */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-12 border-b border-white/10">
          <div className="space-y-4">
            <span className="font-serif text-5xl sm:text-7xl font-extrabold tracking-tight text-white block">
              AKRATI
            </span>
            <p className="text-sm text-stone-300 font-mono max-w-md">
              Fashion, Beauty & Lifestyle Creator · Available for Worldwide Collaborations, UGC Campaigns & Editorial Shoots.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <button
              onClick={scrollToTop}
              className="p-4 rounded-full border border-[#E7C456]/30 hover:border-[#E7C456] text-stone-200 hover:text-white bg-white/5 hover:bg-[#E7C456]/15 transition-all flex items-center gap-2 text-xs font-mono font-bold group shadow-sm"
              aria-label="Back to Top"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform text-[#E7C456]" />
            </button>
          </div>
        </div>

        {/* Links & Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs font-mono">
          <div>
            <span className="text-[#E7C456] uppercase tracking-widest block mb-3 font-bold">
              Portfolio Navigation
            </span>
            <ul className="space-y-2 text-stone-300 font-medium">
              <li><a href="#cover" onClick={() => soundFx.playClick(1.0)} className="hover:text-[#E7C456] transition-colors">Cover & Creator Bio</a></li>
              <li><a href="#benefits" onClick={() => soundFx.playClick(1.0)} className="hover:text-[#E7C456] transition-colors">UGC Benefits (93% Metric)</a></li>
              <li><a href="#reels" onClick={() => soundFx.playClick(1.0)} className="hover:text-[#E7C456] transition-colors">Featured UGC Reels</a></li>
              <li><a href="#lookbook" onClick={() => soundFx.playClick(1.0)} className="hover:text-[#E7C456] transition-colors">Product & Fashion Lookbook</a></li>
              <li><a href="#feedbacks" onClick={() => soundFx.playClick(1.0)} className="hover:text-[#E7C456] transition-colors">Client Reviews & Testimonials</a></li>
              <li><a href="#media-kit" onClick={() => soundFx.playClick(1.0)} className="hover:text-[#E7C456] transition-colors">Service Packages & Workflow</a></li>
              <li><a href="#comp-card" onClick={() => soundFx.playClick(1.0)} className="hover:text-[#E7C456] transition-colors">Casting Specs & Booking</a></li>
            </ul>
          </div>

          <div>
            <span className="text-[#E7C456] uppercase tracking-widest block mb-3 font-bold">
              Channels & Direct Reach
            </span>
            <ul className="space-y-2 text-stone-300 font-medium">
              <li>
                <a
                  href={CREATOR_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#E7C456] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#E7C456]" />
                  <span>{CREATOR_CONFIG.handle}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CREATOR_CONFIG.email}`}
                  className="flex items-center gap-2 hover:text-[#E7C456] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E7C456]" />
                  <span>{CREATOR_CONFIG.email}</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[#E7C456] uppercase tracking-widest block mb-3 font-bold">
              Production Specs
            </span>
            <p className="text-stone-400 leading-relaxed font-sans">
              Shot with Sony 4K mirrorless cinema cameras, professional studio lighting, and high-fidelity directional audio for broadcast-ready deliverables.
            </p>
          </div>

          <div>
            <span className="text-[#E7C456] uppercase tracking-widest block mb-3 font-bold">
              Editorial Imprint
            </span>
            <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/10 space-y-1 shadow-sm">
              <div className="text-[11px] text-white font-bold">VOL. 03 · 2026 EDITION</div>
              <div className="text-[10px] text-stone-400">All Visual Rights Reserved</div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-stone-400">
          <p>© 2026 Akrati Creates. All portfolio imagery, video footage and rights reserved.</p>
          <p className="flex items-center gap-1.5 text-stone-300 font-semibold">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#E7C456] fill-[#E7C456]" />
            <span>for high-fashion digital storytelling</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

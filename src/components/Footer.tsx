import React from 'react';
import { ArrowUp, Instagram, Mail, Heart } from 'lucide-react';
import { CREATOR_CONFIG } from '../config';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-cream-200/70 border-t border-stone-200/90 py-16 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Big Magazine Masthead */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-12 border-b border-stone-300">
          <div className="space-y-4">
            <span className="font-serif text-5xl sm:text-7xl font-extrabold tracking-tight text-espresso-950 block">
              AKRATI
            </span>
            <p className="text-sm text-espresso-600 font-mono max-w-md">
              Fashion, Beauty & Lifestyle Creator · Available for Worldwide Collaborations, UGC Campaigns & Editorial Shoots.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <button
              onClick={scrollToTop}
              className="p-4 rounded-full border border-stone-300 hover:border-gold-500 text-espresso-700 hover:text-gold-600 bg-white transition-all flex items-center gap-2 text-xs font-mono font-bold group shadow-sm"
              aria-label="Back to Top"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform text-gold-600" />
            </button>
          </div>
        </div>

        {/* Links & Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs font-mono">
          <div>
            <span className="text-gold-700 uppercase tracking-widest block mb-3 font-bold">
              Navigation
            </span>
            <ul className="space-y-2 text-espresso-700 font-medium">
              <li><a href="#cover" className="hover:text-gold-600 transition-colors">Magazine Cover</a></li>
              <li><a href="#comp-card" className="hover:text-gold-600 transition-colors">Comp Card & Bio</a></li>
              <li><a href="#reels" className="hover:text-gold-600 transition-colors">Featured Video Reels</a></li>
              <li><a href="#lookbook" className="hover:text-gold-600 transition-colors">Editorial Archives</a></li>
              <li><a href="#media-kit" className="hover:text-gold-600 transition-colors">Media Kit & Insights</a></li>
            </ul>
          </div>

          <div>
            <span className="text-gold-700 uppercase tracking-widest block mb-3 font-bold">
              Channels & Direct Reach
            </span>
            <ul className="space-y-2 text-espresso-700 font-medium">
              <li>
                <a
                  href={CREATOR_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gold-600 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-gold-600" />
                  <span>{CREATOR_CONFIG.handle}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CREATOR_CONFIG.email}`}
                  className="flex items-center gap-2 hover:text-gold-600 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-gold-600" />
                  <span>{CREATOR_CONFIG.email}</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-gold-700 uppercase tracking-widest block mb-3 font-bold">
              Production Specs
            </span>
            <p className="text-espresso-600 leading-relaxed font-sans">
              Shot with Sony 4K mirrorless cinema cameras, professional studio lighting, and high-fidelity directional audio for broadcast-ready deliverables.
            </p>
          </div>

          <div>
            <span className="text-gold-700 uppercase tracking-widest block mb-3 font-bold">
              Editorial Imprint
            </span>
            <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-1 shadow-sm">
              <div className="text-[11px] text-espresso-950 font-bold">VOL. 03 · 2026 EDITION</div>
              <div className="text-[10px] text-espresso-500">All Visual Rights Reserved</div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-espresso-500">
          <p>© 2026 Akrati Creates. All portfolio imagery, video footage and rights reserved.</p>
          <p className="flex items-center gap-1.5 text-espresso-700 font-semibold">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>for high-fashion digital storytelling</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

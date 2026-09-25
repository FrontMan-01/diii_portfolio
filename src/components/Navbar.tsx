import React, { useState, useEffect } from 'react';
import { Sparkles, Instagram, Mail, Menu, X, ArrowUpRight, Radio } from 'lucide-react';
import { CREATOR_CONFIG } from '../config';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Cover', href: '#cover' },
    { label: 'Comp Card', href: '#comp-card' },
    { label: 'Video Reels', href: '#reels' },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'Media Kit', href: '#media-kit' },
  ];

  return (
    <header className="fixed top-2 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        {/* iPhone Floating Liquid Glass Navigation Capsule */}
        <nav
          className={`relative rounded-full transition-all duration-300 ${
            isScrolled
              ? 'bg-white/80 backdrop-blur-2xl backdrop-saturate-200 border border-white/90 shadow-[0_20px_45px_-10px_rgba(28,25,23,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.98),inset_0_-1px_1px_rgba(0,0,0,0.04)] py-2.5 px-4 sm:px-6'
              : 'bg-white/65 backdrop-blur-2xl backdrop-saturate-180 border border-white/75 shadow-[0_12px_32px_-6px_rgba(28,25,23,0.08),inset_0_1.5px_2px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(0,0,0,0.03)] py-3 px-4 sm:px-7'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Left: Brand Logo & iOS Live Activity Badge */}
            <div className="flex items-center gap-3">
              <a href="#cover" className="group flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-black tracking-tight text-stone-900 group-hover:text-amber-600 transition-colors">
                  AKRATI
                </span>
              </a>

              {/* iOS Live Status Pill */}
              <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/[0.04] border border-black/[0.06] backdrop-blur-md text-[11px] font-mono font-medium text-stone-700 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="tracking-wide">OPEN FOR 2026 DEALS</span>
              </div>
            </div>

            {/* Middle: Apple Segmented Nav Pills */}
            <div className="hidden md:flex items-center gap-1 bg-black/[0.03] p-1 rounded-full border border-black/[0.04] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium text-stone-700 hover:text-stone-950 hover:bg-white/80 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all duration-200 tracking-tight"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right: iOS Action Buttons & Socials */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={CREATOR_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-white/60 transition-colors"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-3.5 h-3.5 text-stone-600" />
                <span className="font-mono text-[11px]">@akrati.creates</span>
              </a>

              <a
                href={`mailto:${CREATOR_CONFIG.email}?subject=Brand%20Collaboration%20Inquiry%20-%20Akrati`}
                className="p-2 sm:p-2.5 rounded-full bg-white/70 hover:bg-white border border-white/80 hover:border-white text-stone-700 hover:text-stone-950 shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all duration-200 active:scale-95"
                aria-label="Send Email Inquiry"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onOpenBooking}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] hover:from-[#ECCF6E] hover:to-[#EA8A35] text-stone-950 font-bold text-xs tracking-tight flex items-center gap-1.5 shadow-[0_4px_16px_rgba(231,196,86,0.4),0_2px_6px_rgba(226,125,38,0.25),inset_0_1px_1px_rgba(255,255,255,0.7)] hover:shadow-[0_6px_20px_rgba(231,196,86,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.9)] transition-all duration-200 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                <span className="whitespace-nowrap">Book Brand Deal</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full bg-white/70 border border-white/80 text-stone-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-95 transition-all"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile iOS Glass Dropdown Sheet */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-3xl bg-white/85 backdrop-blur-2xl backdrop-saturate-200 border border-white/90 shadow-[0_20px_50px_rgba(28,25,23,0.15),inset_0_1.5px_2px_rgba(255,255,255,0.95)] flex flex-col gap-2 animate-fadeIn">
            {/* Live status badge inside mobile sheet */}
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.06] text-xs font-mono text-stone-600">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                AVAILABLE FOR 2026 DEALS
              </span>
              <span>VOL. 03</span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3.5 rounded-2xl text-sm font-semibold text-stone-800 hover:text-stone-950 hover:bg-black/[0.04] flex items-center justify-between transition-colors"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-stone-400" />
              </a>
            ))}

            <div className="pt-2 border-t border-black/[0.06] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] text-stone-950 font-bold text-xs tracking-tight flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(231,196,86,0.35)]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Brand Deal (Instant)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

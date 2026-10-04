import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Instagram, Mail, Menu, X, ArrowUpRight } from 'lucide-react';
import { CREATOR_CONFIG } from '../config';
import { LiquidLogo } from './LiquidLogo';
import { soundFx } from '../utils/soundFx';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('cover');
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const navRef = useRef<HTMLElement | null>(null);

  const navLinks = [
    { label: 'Cover', href: '#cover', id: 'cover' },
    { label: 'Benefits', href: '#benefits', id: 'benefits' },
    { label: 'UGC Videos', href: '#reels', id: 'reels' },
    { label: 'Lookbook', href: '#lookbook', id: 'lookbook' },
    { label: 'Reviews', href: '#feedbacks', id: 'feedbacks' },
    { label: 'Packages', href: '#media-kit', id: 'media-kit' },
    { label: 'Contact', href: '#comp-card', id: 'comp-card' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll Spy: detect which section is currently in view
      const scrollPos = window.scrollY + 200;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(navLinks[i].id);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(navLinks[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navLinks]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };


  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    soundFx.playClick(1.0);
    setActiveSection(targetId);
    setMobileMenuOpen(false);

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const topOffset = targetEl.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({
        top: Math.max(0, topOffset),
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="fixed top-2 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        {/* Floating Merlot Glass Navigation Capsule with Optical Refraction & Specular Sheen */}
        <nav
          ref={navRef}
          onMouseMove={handleMouseMove}
          className={`group relative rounded-full transition-all duration-300 overflow-hidden ${
            isScrolled
              ? 'bg-[#1F0307]/95 backdrop-blur-2xl backdrop-saturate-200 border border-[#E7C456]/35 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85),inset_0_1.5px_2px_rgba(255,255,255,0.2)] py-2 px-3.5 sm:px-5'
              : 'bg-[#160205]/90 backdrop-blur-2xl backdrop-saturate-180 border border-[#E7C456]/25 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.65),inset_0_1.5px_2px_rgba(255,255,255,0.15)] py-2.5 px-4 sm:px-6'
          }`}
        >
          {/* Dynamic Light Spotlight following cursor */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 240px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.22) 0%, rgba(231, 196, 86, 0.12) 45%, transparent 80%)`,
            }}
          />

          {/* Chromatic Prism Bevel */}
          <div
            className="absolute inset-0 pointer-events-none rounded-full"
            style={{
              boxShadow: 'inset 1px 1px 0px rgba(255, 235, 180, 0.2), inset -1px -1px 0px rgba(226, 125, 38, 0.15)',
            }}
          />

          <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Liquid Gold Monogram Emblem + Brand Wordmark */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <a
                href="#cover"
                onClick={(e) => handleNavClick(e, 'cover')}
                className="group/brand flex items-center gap-2"
                aria-label="Akrati Portfolio Home"
              >
                {/* Real-time Molten Gold Monogram Canvas */}
                <LiquidLogo size={34} className="shrink-0" glyph="A" />
                <span className="font-serif text-lg sm:text-xl font-black tracking-tight text-white group-hover/brand:text-[#E7C456] transition-colors">
                  AKRATI
                </span>
              </a>

              {/* iOS Live Activity Badge (Visible on wide screens) */}
              <div
                onMouseEnter={() => soundFx.playShimmer()}
                className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md text-[10px] font-mono font-semibold text-stone-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] cursor-default transition-transform hover:scale-105"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="tracking-wide text-stone-200">OPEN FOR 2026 DEALS</span>
              </div>
            </div>

            {/* Middle: Apple Segmented Nav Pills with Active State Pill indicator */}
            <div className="hidden lg:flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 tracking-tight active:scale-95 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#E7C456] to-[#E27D26] text-stone-950 font-bold shadow-[0_2px_10px_rgba(231,196,86,0.4)]'
                        : 'text-stone-300 hover:text-white hover:bg-white/12'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* Right: Instagram, Email, Primary CTA & Mobile Hamburger */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Instagram Quick Link */}
              <a
                href={CREATOR_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick(1.1)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-stone-200 hover:text-white transition-colors"
                title="Instagram @akrati.creates"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-3.5 h-3.5 text-[#E7C456]" />
                <span className="font-mono text-[11px] hidden xl:inline">@akrati.creates</span>
              </a>

              {/* Email Quick Link */}
              <a
                href={`mailto:${CREATOR_CONFIG.email}?subject=Brand%20Collaboration%20Inquiry%20-%20Akrati`}
                onClick={() => soundFx.playClick(1.0)}
                className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-stone-200 hover:text-white transition-all active:scale-95"
                title="Email Inquiry"
                aria-label="Send Email Inquiry"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>

              {/* Book Brand Deal Primary CTA */}
              <button
                onClick={() => {
                  soundFx.playShimmer();
                  onOpenBooking();
                }}
                className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] hover:from-[#ECCF6E] hover:to-[#EA8A35] text-stone-950 font-bold text-xs tracking-tight flex items-center gap-1.5 shadow-[0_4px_16px_rgba(231,196,86,0.4),0_2px_6px_rgba(226,125,38,0.25),inset_0_1px_1px_rgba(255,255,255,0.7)] hover:shadow-[0_6px_20px_rgba(231,196,86,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.9)] transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-stone-950 shrink-0" />
                <span className="whitespace-nowrap hidden sm:inline">Book Brand Deal</span>
                <span className="whitespace-nowrap sm:hidden">Book</span>
              </button>

              {/* Mobile / Tablet Menu Toggle */}
              <button
                onClick={() => {
                  soundFx.playClick(1.1);
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="lg:hidden p-2 rounded-full bg-white/10 border border-white/15 text-stone-200 shadow-[0_2px_8px_rgba(0,0,0,0.2)] active:scale-95 transition-all cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile / Tablet Luxury Glass Dropdown Sheet */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-3xl bg-[#1E0308]/98 backdrop-blur-2xl backdrop-saturate-200 border border-[#E7C456]/30 shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1.5px_2px_rgba(255,255,255,0.2)] flex flex-col gap-1.5 animate-fadeIn text-stone-100">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10 text-xs font-mono text-stone-300">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                AVAILABLE FOR 2026 DEALS
              </span>
              <span className="text-[#E7C456] font-bold">VOL. 03</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`py-2 px-3.5 rounded-xl text-xs font-mono font-medium flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-[#E7C456] to-[#E27D26] text-stone-950 font-bold'
                        : 'text-stone-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                  </a>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  soundFx.playShimmer();
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] text-stone-950 font-bold text-xs tracking-tight flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(231,196,86,0.35)] active:scale-95 transition-transform"
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

export default Navbar;

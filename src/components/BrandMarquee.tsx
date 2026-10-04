import React from 'react';

export const BrandMarquee: React.FC = () => {
  const brandNames = [
    'VOGUE EDITORIAL',
    'SEPHORA',
    'NYKAA BEAUTY',
    'ZARA WOMAN',
    'H&M STUDIO',
    "L'ORÉAL PARIS",
    'URBANIC',
    'MAYBELLINE NEW YORK',
    'MAC COSMETICS',
    'ESTÉE LAUDER',
    'MYNTRA LUXE',
  ];

  // Duplicate for seamless infinite loop
  const marqueeList = [...brandNames, ...brandNames];

  return (
    <div className="relative py-10 overflow-hidden border-y border-white/10 bg-white/[0.015] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-4 flex items-center justify-between">
        <div className="text-[11px] font-mono tracking-widest text-[#E7C456] uppercase font-bold flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E7C456]"></span>
          <span>Trusted By & Featured Across Leading Fashion & Beauty Brands</span>
        </div>
        <div className="hidden sm:block text-[10px] font-mono text-stone-300 uppercase tracking-widest">
          Campaigns · UGC · Brand Deals
        </div>
      </div>

      {/* Infinite scrolling marquee track */}
      <div className="relative flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-12 sm:gap-16 py-3 whitespace-nowrap">
          {marqueeList.map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center gap-12 sm:gap-16 text-stone-300 hover:text-[#E7C456] transition-colors duration-300 select-none cursor-default font-serif text-lg sm:text-xl md:text-2xl font-black tracking-wider uppercase group"
            >
              <span className="group-hover:drop-shadow-[0_0_12px_rgba(231,196,86,0.5)]">
                {brand}
              </span>
              <span className="text-stone-700 text-xs font-mono">✦</span>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 animate-marquee items-center gap-12 sm:gap-16 py-3 whitespace-nowrap" aria-hidden="true">
          {marqueeList.map((brand, idx) => (
            <div
              key={`dup-${idx}`}
              className="flex items-center gap-12 sm:gap-16 text-stone-300 hover:text-[#E7C456] transition-colors duration-300 select-none cursor-default font-serif text-lg sm:text-xl md:text-2xl font-black tracking-wider uppercase group"
            >
              <span className="group-hover:drop-shadow-[0_0_12px_rgba(231,196,86,0.5)]">
                {brand}
              </span>
              <span className="text-stone-700 text-xs font-mono">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

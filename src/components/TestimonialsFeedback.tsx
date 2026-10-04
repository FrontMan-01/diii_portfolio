import React from 'react';
import { Star, Sparkles, Quote } from 'lucide-react';

export const TestimonialsFeedback: React.FC = () => {
  const feedbacks = [
    {
      name: 'Olivia Martins',
      role: 'Head of Growth Marketing',
      brand: 'Nykaa Beauty',
      quote: "Akrati's dedicated video for our Hair Styling range exceeded every engagement KPI for the quarter. Her crystal-clear demonstration and immaculate aesthetic drove our highest conversion spike across Meta Ads.",
      avatarUrl: '/assets/photos/studio-portrait-9.jpeg',
    },
    {
      name: 'Andrea Campos',
      role: 'Brand Partnerships Director',
      brand: "L'Oréal Luxe",
      quote: 'Collaborating with Akrati was a first-class experience from start to finish. Beyond the rapid turnaround and flawless script adherence, her genuine rapport with her community lends immense credibility to luxury products.',
      avatarUrl: '/assets/photos/lifestyle-smile-1.png',
    },
    {
      name: 'Amanda Machado',
      role: 'Creative Brand Strategist',
      brand: 'Zara Woman',
      quote: 'The lookbook stills and 4K reels created by Akrati captured the minimalist DNA of our new collection perfectly. The assets were approved on first submission and immediately launched across our e-commerce channels.',
      avatarUrl: '/assets/photos/studio-noir-pose-2.jpeg',
    },
  ];

  return (
    <section id="feedbacks" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#FAF6F0] text-[#141210] border-t border-stone-300 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Header (Canva Brochure "FEEDBACKS" Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-300">
          <div className="space-y-2 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34050D] text-[#F6DB85] text-xs font-mono font-bold tracking-widest uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CLIENT & BRAND REVIEWS</span>
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-black tracking-tight text-[#2A020B]">
              Client <span className="italic text-[#8B1E2D]">Feedback</span> ✦
            </h2>
          </div>
          <p className="text-sm font-sans text-stone-600 max-w-md text-left md:text-right">
            Authentic testimonials from marketing directors, creative strategists, and global brands that scaled campaign performance with high-impact UGC.
          </p>
        </div>

        {/* 3 Testimonials Cards (Slide 7 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {feedbacks.map((fb, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-stone-200/80 p-6 sm:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-6 hover:border-[#8B1E2D] hover:shadow-xl transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* 5-Star Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#E7C456]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E7C456]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#8B1E2D]/20 group-hover:text-[#8B1E2D]/50 transition-colors" />
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm font-serif italic text-stone-800 leading-relaxed">
                  "{fb.quote}"
                </p>
              </div>

              {/* Author & Brand Details with Arch Avatar Frame */}
              <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
                <div className="w-12 h-14 frame-arch overflow-hidden bg-stone-900 shrink-0 border border-[#8B1E2D]/40">
                  <img
                    src={fb.avatarUrl}
                    alt={fb.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-serif font-bold text-stone-950 text-sm">
                    {fb.name}
                  </div>
                  <div className="text-[11px] font-mono text-[#8B1E2D] font-semibold">
                    {fb.brand}
                  </div>
                  <div className="text-[10px] font-mono text-stone-500">
                    {fb.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsFeedback;

import React from 'react';
import { BarChart3, Users, Zap, CheckCircle2, ShieldCheck, Download, Sparkles, MessageSquare, Video, Camera, Compass } from 'lucide-react';

interface MediaKitStatsProps {
  onOpenBooking: () => void;
}

export const MediaKitStats: React.FC<MediaKitStatsProps> = ({ onOpenBooking }) => {
  const collaborationFormats = [
    {
      id: 'dedicated-reels',
      title: 'Dedicated 4K Short-Form Videos',
      icon: Video,
      description: 'Engaging, narrative-driven 9:16 videos integrating your brand or product into authentic styling tutorials, hair routines, and GRWMs.',
      highlights: [
        'Native short-form storytelling with high viewer retention',
        'Direct product tags, pinned comment & bio link inclusion',
        '24h Instagram Story push + permanent highlight placement'
      ]
    },
    {
      id: 'ugc-ads',
      title: 'Performance UGC Ad Creatives',
      icon: Sparkles,
      description: 'Ad-ready direct response video assets built specifically for brand paid social campaigns across Meta, TikTok, and YouTube.',
      highlights: [
        'Multiple hook variations and problem-solution angles',
        'High-converting CTAs with broadcast studio audio quality',
        'Full digital advertising usage & whitelisting rights'
      ]
    },
    {
      id: 'editorial-shoots',
      title: 'High-Fashion Studio Stills & Carousels',
      icon: Camera,
      description: 'Bespoke studio photography featuring your apparel, jewelry, or cosmetics in editorial couture and contemporary lighting.',
      highlights: [
        'High-resolution retouched stills for brand website & lookbooks',
        'Co-authored Instagram Carousel posts with in-depth captions',
        'Commercial licensing options for digital marketing'
      ]
    },
    {
      id: 'event-coverage',
      title: 'Event Attendance & Live Story Sequences',
      icon: Compass,
      description: 'Real-time coverage for red carpet events, product launches, VIP unboxings, and brand experiences.',
      highlights: [
        'Sequential story frames with interactive poll and link stickers',
        'Real-time unboxing and genuine community reactions',
        'Detailed 24h engagement analytics report'
      ]
    }
  ];

  return (
    <section id="media-kit" className="py-24 sm:py-32 px-4 sm:px-8 bg-transparent border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <span className="text-xs font-mono text-[#E7C456] tracking-widest uppercase font-bold flex items-center gap-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Media Kit & Brand Partnerships</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Audience Insights & <span className="italic text-[#E7C456]">Collaboration Formats</span>
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-full border border-white/15 hover:border-[#E7C456]/50 text-xs font-mono font-bold text-stone-200 hover:text-white bg-white/10 hover:bg-white/15 flex items-center gap-2 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Media Kit</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E7C456] via-[#E5B83B] to-[#E27D26] hover:from-[#ECCF6E] hover:to-[#EA8A35] text-stone-950 text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 shadow-warm-glow transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Book Campaign</span>
            </button>
          </div>
        </div>

        {/* Audience Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-warm p-6 rounded-3xl border border-white/10 shadow-warm-card space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#E7C456] font-bold">
              <span>GENDER DEMOGRAPHICS</span>
              <Users className="w-4 h-4" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-serif font-bold text-white">78% Female</span>
                <span className="text-xs font-mono text-stone-400 font-medium">22% Male</span>
              </div>
              <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-gradient-to-r from-[#E7C456] to-[#E27D26]" style={{ width: '78%' }} />
                <div className="h-full bg-stone-700" style={{ width: '22%' }} />
              </div>
              <p className="text-xs text-stone-300 pt-1">
                Concentrated community actively shopping for hair styling, beauty, skincare, and fashion.
              </p>
            </div>
          </div>

          <div className="glass-warm p-6 rounded-3xl border border-white/10 shadow-warm-card space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#E7C456] font-bold">
              <span>AGE BRACKET</span>
              <Zap className="w-4 h-4" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-serif font-bold text-white">18–34 Years</span>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                  88% CORE
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
                <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10 shadow-sm">
                  <div className="text-stone-400 text-[10px]">18–24</div>
                  <div className="font-bold text-[#F6DB85] text-sm">52%</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10 shadow-sm">
                  <div className="text-stone-400 text-[10px]">25–34</div>
                  <div className="font-bold text-white text-sm">36%</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10 shadow-sm">
                  <div className="text-stone-400 text-[10px]">35+</div>
                  <div className="font-bold text-stone-400 text-sm">12%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-warm p-6 rounded-3xl border border-white/10 shadow-warm-card space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#E7C456] font-bold">
              <span>TOP AUDIENCE LOCATIONS</span>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="text-stone-300 font-medium">Delhi NCR & North</span>
                <span className="text-[#F6DB85] font-bold">38%</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="text-stone-300 font-medium">Mumbai & Maharashtra</span>
                <span className="text-[#F6DB85] font-bold">29%</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="text-stone-300 font-medium">Bangalore & South Hubs</span>
                <span className="text-[#F6DB85] font-bold">18%</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-stone-300 font-medium">International (US/UK/UAE)</span>
                <span className="text-[#F6DB85] font-bold">15%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Collaboration Offerings Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-white">
              Available Collaboration Formats
            </h3>
            <span className="text-xs font-mono text-[#E7C456] font-bold">Custom Briefs & Tailored Deliverables</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collaborationFormats.map((format) => {
              const IconComponent = format.icon;
              return (
                <div
                  key={format.id}
                  className="glass-warm p-6 rounded-3xl border border-white/10 hover:border-[#E7C456]/70 shadow-warm-card hover:shadow-warm-luxury transition-all duration-300 flex flex-col justify-between space-y-6 group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E7C456]/15 border border-[#E7C456]/30 flex items-center justify-center text-[#E7C456] shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div>
                      <h4 className="font-serif text-xl font-bold text-white group-hover:text-[#E7C456] transition-colors">
                        {format.title}
                      </h4>
                      <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                        {format.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-stone-300 font-medium">
                      {format.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-snug">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={onOpenBooking}
                    className="w-full py-2.5 rounded-full bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#E7C456] group-hover:via-[#E5B83B] group-hover:to-[#E27D26] text-stone-200 group-hover:text-stone-950 font-bold text-xs tracking-wider uppercase border border-white/15 group-hover:border-[#E7C456] transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm group-hover:shadow-warm-glow"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Inquire for Campaign</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

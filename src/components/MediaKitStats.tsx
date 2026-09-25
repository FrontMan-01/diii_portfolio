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
    <section id="media-kit" className="py-24 sm:py-32 px-4 sm:px-8 bg-transparent border-t border-stone-300/60 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <span className="text-xs font-mono text-gold-600 tracking-widest uppercase font-bold flex items-center gap-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Media Kit & Brand Partnerships</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-espresso-950">
              Audience Insights & <span className="italic text-gold-600">Collaboration Formats</span>
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-full border border-stone-300 hover:border-gold-500/50 text-xs font-mono font-bold text-espresso-700 hover:text-gold-600 bg-white/90 flex items-center gap-2 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Media Kit</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-white text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 shadow-warm-glow transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Book Campaign</span>
            </button>
          </div>
        </div>

        {/* Audience Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-warm p-6 rounded-3xl border border-stone-200 shadow-warm-card space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-gold-700 font-bold">
              <span>GENDER DEMOGRAPHICS</span>
              <Users className="w-4 h-4" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-serif font-bold text-espresso-950">78% Female</span>
                <span className="text-xs font-mono text-espresso-500 font-medium">22% Male</span>
              </div>
              <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden flex">
                <div className="h-full bg-gold-500" style={{ width: '78%' }} />
                <div className="h-full bg-stone-400" style={{ width: '22%' }} />
              </div>
              <p className="text-xs text-espresso-600 pt-1">
                Concentrated community actively shopping for hair styling, beauty, skincare, and fashion.
              </p>
            </div>
          </div>

          <div className="glass-warm p-6 rounded-3xl border border-stone-200 shadow-warm-card space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-gold-700 font-bold">
              <span>AGE BRACKET</span>
              <Zap className="w-4 h-4" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-serif font-bold text-espresso-950">18–34 Years</span>
                <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                  88% CORE
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
                <div className="p-2.5 rounded-xl bg-white/90 border border-stone-200 shadow-sm">
                  <div className="text-espresso-500 text-[10px]">18–24</div>
                  <div className="font-bold text-gold-700 text-sm">52%</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/90 border border-stone-200 shadow-sm">
                  <div className="text-espresso-500 text-[10px]">25–34</div>
                  <div className="font-bold text-espresso-950 text-sm">36%</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/90 border border-stone-200 shadow-sm">
                  <div className="text-espresso-500 text-[10px]">35+</div>
                  <div className="font-bold text-espresso-500 text-sm">12%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-warm p-6 rounded-3xl border border-stone-200 shadow-warm-card space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-gold-700 font-bold">
              <span>TOP AUDIENCE LOCATIONS</span>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center py-1.5 border-b border-stone-200">
                <span className="text-espresso-800 font-medium">Delhi NCR & North</span>
                <span className="text-gold-700 font-bold">38%</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-stone-200">
                <span className="text-espresso-800 font-medium">Mumbai & Maharashtra</span>
                <span className="text-gold-700 font-bold">29%</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-stone-200">
                <span className="text-espresso-800 font-medium">Bangalore & South Hubs</span>
                <span className="text-gold-700 font-bold">18%</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-espresso-800 font-medium">International (US/UK/UAE)</span>
                <span className="text-gold-700 font-bold">15%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Collaboration Offerings Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-espresso-950">
              Available Collaboration Formats
            </h3>
            <span className="text-xs font-mono text-gold-700 font-bold">Custom Briefs & Tailored Deliverables</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collaborationFormats.map((format) => {
              const IconComponent = format.icon;
              return (
                <div
                  key={format.id}
                  className="glass-warm p-6 rounded-3xl border border-stone-300 hover:border-amber-400/80 shadow-warm-card hover:shadow-warm-luxury transition-all duration-300 flex flex-col justify-between space-y-6 group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-gold-600 shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div>
                      <h4 className="font-serif text-xl font-bold text-espresso-950 group-hover:text-gold-600 transition-colors">
                        {format.title}
                      </h4>
                      <p className="text-xs text-espresso-600 mt-2 leading-relaxed">
                        {format.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-stone-200 text-xs text-espresso-800 font-medium">
                      {format.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-snug">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={onOpenBooking}
                    className="w-full py-2.5 rounded-full bg-white group-hover:bg-gradient-to-r group-hover:from-gold-500 group-hover:to-gold-600 text-espresso-800 group-hover:text-white font-bold text-xs tracking-wider uppercase border border-stone-300 group-hover:border-gold-500 transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm group-hover:shadow-warm-glow"
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

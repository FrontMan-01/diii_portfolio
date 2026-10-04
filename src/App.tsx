import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandMarquee } from './components/BrandMarquee';
import { UGCBenefitsStats } from './components/UGCBenefitsStats';
import { ReelsShowcase } from './components/ReelsShowcase';
import { LookbookGallery } from './components/LookbookGallery';
import { TestimonialsFeedback } from './components/TestimonialsFeedback';
import { MediaKitStats } from './components/MediaKitStats';
import { CompCardAbout } from './components/CompCardAbout';
import { Footer } from './components/Footer';
import { ReelModal } from './components/ReelModal';
import { LightboxModal } from './components/LightboxModal';
import { BrandContactModal } from './components/BrandContactModal';
import { AmbientSunlitBackground } from './components/AmbientSunlitBackground';
import { ReelItem } from './types';

export function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; imageUrl: string; title: string }>({
    isOpen: false,
    imageUrl: '',
    title: '',
  });

  const handleOpenBooking = () => {
    setBookingModalOpen(true);
  };

  const handleOpenLightbox = (imageUrl: string, title: string) => {
    setLightbox({
      isOpen: true,
      imageUrl,
      title,
    });
  };

  return (
    <div className="relative min-h-screen bg-[#1F0307] text-stone-100 flex flex-col selection:bg-[#E7C456] selection:text-stone-950 font-sans overflow-x-hidden">
      {/* 1. Ambient Sunlit Lightscapes & Warm Floating Motes */}
      <AmbientSunlitBackground />

      {/* 2. Glassy Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* 3. Main Content Flow (Aligned with Canva Business Portfolio & Brochure Slides) */}
      <main className="flex-1 relative z-10">
        {/* Slide 1 & 2: Circular Typography Cover & Quem Sou Eu / O Que é UGC */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Brand Commercial Authority Marquee */}
        <BrandMarquee />

        {/* Slide 3: Benefícios do UGC para sua Marca (93% Stat Callout & Checklist) */}
        <UGCBenefitsStats onOpenBooking={handleOpenBooking} />

        {/* Slide 4 & 5: My Work — Conteúdo de Vídeo UGC (9:16 Phone Bezel Grid) */}
        <ReelsShowcase onSelectReel={(reel) => setActiveReel(reel)} />

        {/* Slide 6: Fotografia de Produto & Editorial Lookbook (Cream Background) */}
        <LookbookGallery onOpenLightbox={handleOpenLightbox} />

        {/* Slide 7: Feedbacks & Client Reviews (Cream Background) */}
        <TestimonialsFeedback />

        {/* Slide 8 & 9: Pacotes de Serviços & Como Funciona (Merlot Background) */}
        <MediaKitStats onOpenBooking={handleOpenBooking} />

        {/* Slide 10 & 11: Ainda Não Tem Certeza? (Casting Specs) & Vamos Trabalhar Juntos */}
        <CompCardAbout
          onOpenLightbox={handleOpenLightbox}
          onOpenBooking={handleOpenBooking}
        />
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Modals & Overlays */}
      <ReelModal
        reel={activeReel}
        onClose={() => setActiveReel(null)}
        onOpenBooking={handleOpenBooking}
      />

      <LightboxModal
        isOpen={lightbox.isOpen}
        imageUrl={lightbox.imageUrl}
        title={lightbox.title}
        onClose={() => setLightbox({ isOpen: false, imageUrl: '', title: '' })}
      />

      <BrandContactModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}

export default App;

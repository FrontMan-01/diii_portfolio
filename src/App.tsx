import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CompCardAbout } from './components/CompCardAbout';
import { ReelsShowcase } from './components/ReelsShowcase';
import { LookbookGallery } from './components/LookbookGallery';
import { MediaKitStats } from './components/MediaKitStats';
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
    <div className="relative min-h-screen bg-[#18191B] text-stone-100 flex flex-col selection:bg-[#E7C456] selection:text-stone-950 font-sans overflow-x-hidden">
      {/* 1. Ambient Sunlit Lightscapes & Warm Floating Motes */}
      <AmbientSunlitBackground />

      {/* 2. Glassy Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* 3. Main Content Flow */}
      <main className="flex-1 relative z-10">
        {/* Hero & Magazine Cover */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Digital Comp Card & Glassy Creator Bio */}
        <CompCardAbout onOpenLightbox={handleOpenLightbox} />

        {/* Featured Video Reels */}
        <ReelsShowcase onSelectReel={(reel) => setActiveReel(reel)} />

        {/* Curated Editorial Archives */}
        <LookbookGallery onOpenLightbox={handleOpenLightbox} />

        {/* Audience Telemetry & Collaboration Packages */}
        <MediaKitStats onOpenBooking={handleOpenBooking} />
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

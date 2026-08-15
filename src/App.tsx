import { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { AdminPortal } from './components/admin/AdminPortal';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { VisualMarqueeSection } from './components/sections/VisualMarqueeSection';
import { AboutSection } from './components/sections/AboutSection';
import { WhatIDoSection } from './components/sections/WhatIDoSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { HometownSection } from './components/sections/HometownSection';
import { GoogleMapsSection } from './components/sections/GoogleMapsSection';
import { MomentsGallerySection } from './components/sections/MomentsGallerySection';
import { JourneyTimelineSection } from './components/sections/JourneyTimelineSection';
import { ContactSection } from './components/sections/ContactSection';

function PortfolioMain() {
  const [adminOpen, setAdminOpen] = useState(false);

  // Global keyboard shortcut to toggle Admin Portal (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit antialiased selection:bg-[#0066FF]/40 selection:text-white overflow-x-clip">
      {/* 0. Top Navigation Bar */}
      <Navbar />

      <main className="relative w-full overflow-x-clip">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Visual Story Marquee */}
        <VisualMarqueeSection />

        {/* 3. About Me */}
        <AboutSection />

        {/* 4. What I Do (Warm Light Section) */}
        <WhatIDoSection />

        {/* 5. Selected Projects (Sticky Stacking Cards) */}
        <ProjectsSection />

        {/* 6. My Hometown (Cinematic Cát Tiến - Bình Định) */}
        <HometownSection />

        {/* 7. Google Maps Section */}
        <GoogleMapsSection />

        {/* 8. Personal Moments Gallery (Horizontal + Lightbox) */}
        <MomentsGallerySection />

        {/* 9. My Journey (Timeline on Warm Light) */}
        <JourneyTimelineSection />

        {/* 10. Contact Section */}
        <ContactSection />
      </main>

      {/* 11. Poster Footer */}
      <Footer onOpenAdmin={() => setAdminOpen(true)} />

      {/* 12. Admin Management Modal Portal */}
      <AdminPortal isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
}

export function App() {
  return (
    <DataProvider>
      <PortfolioMain />
    </DataProvider>
  );
}

export default App;


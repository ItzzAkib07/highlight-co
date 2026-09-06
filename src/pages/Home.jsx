import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { MarqueeTicker } from '../components/sections/MarqueeTicker';
import { FeaturedWork } from '../components/sections/FeaturedWork';
import { HorizontalReel } from '../components/sections/HorizontalReel';
import { InteractiveServices } from '../components/sections/InteractiveServices';
import { AboutManifesto } from '../components/sections/AboutManifesto';
import { ParallaxStory } from '../components/sections/ParallaxStory';
import { Testimonials } from '../components/sections/Testimonials';
import { ClientMarquee } from '../components/sections/ClientMarquee';
import { ContactCTA } from '../components/sections/ContactCTA';

export const Home = () => {
  return (
    <div className="relative w-full bg-white text-brand-navy min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Marquee Ticker */}
      <MarqueeTicker />

      {/* 3. Featured Selected Works */}
      <FeaturedWork />

      {/* 4. Horizontal Film Reel */}
      <HorizontalReel />

      {/* 5. Interactive Capabilities Portal */}
      <InteractiveServices />

      {/* 6. Studio Manifesto & Live Stats */}
      <AboutManifesto />

      {/* 7. Vertical Parallax Case Study */}
      <ParallaxStory />

      {/* 8. Testimonials & Client Reviews */}
      <Testimonials />

      {/* 9. Laurels & Client Brand Marquee */}
      <ClientMarquee />

      {/* 10. Final High-Impact CTA */}
      <ContactCTA />
    </div>
  );
};


import React, { Suspense, lazy } from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { MarqueeTicker } from '../components/sections/MarqueeTicker';
import { FeaturedWork } from '../components/sections/FeaturedWork';
import { HorizontalReel } from '../components/sections/HorizontalReel';

// Lazy loaded below-the-fold sections for instant initial page paint
const InteractiveServices = lazy(() =>
  import('../components/sections/InteractiveServices').then((m) => ({ default: m.InteractiveServices }))
);
const AboutManifesto = lazy(() =>
  import('../components/sections/AboutManifesto').then((m) => ({ default: m.AboutManifesto }))
);
const ParallaxStory = lazy(() =>
  import('../components/sections/ParallaxStory').then((m) => ({ default: m.ParallaxStory }))
);
const Testimonials = lazy(() =>
  import('../components/sections/Testimonials').then((m) => ({ default: m.Testimonials }))
);
const ClientMarquee = lazy(() =>
  import('../components/sections/ClientMarquee').then((m) => ({ default: m.ClientMarquee }))
);
const ContactCTA = lazy(() =>
  import('../components/sections/ContactCTA').then((m) => ({ default: m.ContactCTA }))
);

const SectionLoader = () => (
  <div className="w-full py-20 flex items-center justify-center bg-white text-[#0A1128]">
    <div className="flex items-center gap-2 font-mono text-xs font-black">
      <span className="w-2 h-2 rounded-full bg-[#F5C400] animate-ping" />
      <span>Loading Module...</span>
    </div>
  </div>
);

export const Home = () => {
  return (
    <div className="relative w-full bg-white text-brand-navy min-h-screen">
      {/* 1. Hero Section (Eagerly Loaded for Immediate First Paint) */}
      <HeroSection />

      {/* 2. Marquee Ticker */}
      <MarqueeTicker />

      {/* 3. Featured Selected Works (Interactive 3D Spatial Cylinder) */}
      <FeaturedWork />

      {/* 4. Horizontal Pinned Film Reel */}
      <HorizontalReel />

      {/* 5. Interactive Capabilities Portal */}
      <Suspense fallback={<SectionLoader />}>
        <InteractiveServices />
      </Suspense>

      {/* 6. Studio Manifesto & Live Stats */}
      <Suspense fallback={<SectionLoader />}>
        <AboutManifesto />
      </Suspense>

      {/* 7. Vertical Parallax Case Study */}
      <Suspense fallback={<SectionLoader />}>
        <ParallaxStory />
      </Suspense>

      {/* 8. Testimonials & Client Reviews */}
      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>

      {/* 10. Laurels & Client Brand Marquee */}
      <Suspense fallback={<SectionLoader />}>
        <ClientMarquee />
      </Suspense>

      {/* 11. Final High-Impact CTA */}
      <Suspense fallback={<SectionLoader />}>
        <ContactCTA />
      </Suspense>
    </div>
  );
};


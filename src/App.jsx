import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CursorProvider } from './context/CursorContext';
import { SoundProvider } from './context/SoundContext';
import { useLenis } from './hooks/useLenis';
import { CustomCursor } from './components/common/CustomCursor';
import { FilmGrain } from './components/common/FilmGrain';
import { IntroSplash } from './components/common/IntroSplash';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { PageTransition } from './components/common/PageTransition';

// Direct page imports for instantaneous SPA navigation without loading flash
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { ProjectDetails } from './pages/ProjectDetails';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Team } from './pages/Team';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

function MainApp() {
  // Initialize Lenis smooth scroll
  useLenis();
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="relative min-h-screen bg-white text-brand-navy selection:bg-brand-yellow selection:text-brand-navy">
      {/* 1. Cinematic Intro Splash */}
      <IntroSplash onComplete={() => setIntroFinished(true)} />

      {/* 2. Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* 3. Ambient Subtle Film Grain */}
      <FilmGrain />

      {/* 4. Global Navigation */}
      <Navbar />

      {/* 5. Scroll To Top on Route Changes */}
      <ScrollToTop />

      {/* 6. Main Routing Viewports with Instant Seamless Transitions */}
      <main className="relative z-20">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<ProjectDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>

      {/* 7. Massive Editorial Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <SoundProvider>
        <CursorProvider>
          <MainApp />
        </CursorProvider>
      </SoundProvider>
    </Router>
  );
}

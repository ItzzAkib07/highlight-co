import React, { useState, Suspense, lazy } from 'react';
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
import { LoadingFallback } from './components/common/LoadingFallback';

// Lazy loaded page chunks for instant initial bundle loading
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Work = lazy(() => import('./pages/Work').then((m) => ({ default: m.Work })));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails').then((m) => ({ default: m.ProjectDetails })));
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Team = lazy(() => import('./pages/Team').then((m) => ({ default: m.Team })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

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

      {/* 6. Main Routing Viewports with Suspense Lazy Loading */}
      <main className="relative z-20">
        <PageTransition>
          <Suspense fallback={<LoadingFallback />}>
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
          </Suspense>
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

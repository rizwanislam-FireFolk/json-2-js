/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ConverterWorkspace } from './components/ConverterWorkspace';
import { WikipediaGuide } from './components/WikipediaGuide';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { OfflineIndicator } from './components/OfflineIndicator';

type ViewMode = 'converter' | 'about' | 'privacy' | 'terms';

const pathToView = (pathname: string): ViewMode => {
  const clean = pathname.replace(/\/+$/, '').toLowerCase();
  if (clean === '/about') return 'about';
  if (clean === '/privacy' || clean === '/privacy-policy') return 'privacy';
  if (clean === '/terms' || clean === '/terms-of-service') return 'terms';
  return 'converter';
};

const viewToPath = (view: ViewMode): string => {
  if (view === 'about') return '/about';
  if (view === 'privacy') return '/privacy-policy';
  if (view === 'terms') return '/terms-of-service';
  return '/';
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>(() => {
    return pathToView(window.location.pathname);
  });

  useEffect(() => {
    // Ensure dark theme is permanently enabled
    document.documentElement.classList.add('dark');

    // Handle browser back/forward buttons
    const handlePopState = () => {
      try {
        setCurrentView(pathToView(window.location.pathname));
      } catch {
        // Ignored in sandboxed iframes
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = useCallback((view: ViewMode) => {
    try {
      const targetPath = viewToPath(view);
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
    } catch {
      // Ignored in sandboxed environments
    }
    setCurrentView(view);
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // Ignored
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-zinc-950 text-gray-100 selection:bg-[#F7DF1E] selection:text-black">
      {/* Top Header with brand and PWA button */}
      <Header onNavigate={navigateTo} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center">
        {currentView === 'converter' && (
          <>
            <HeroSection />
            <ConverterWorkspace />
            <WikipediaGuide />
          </>
        )}

        {currentView === 'about' && (
          <AboutPage onBack={() => navigateTo('converter')} />
        )}

        {currentView === 'privacy' && (
          <PrivacyPolicyPage onBack={() => navigateTo('converter')} />
        )}

        {currentView === 'terms' && (
          <TermsOfServicePage onBack={() => navigateTo('converter')} />
        )}
      </main>

      {/* Clean Minimalist Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Non-intrusive Offline Indicator */}
      <OfflineIndicator />
    </div>
  );
}

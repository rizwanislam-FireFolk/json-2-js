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
import { TargetLanguage } from './types';

type ViewMode = 'converter' | 'about' | 'privacy' | 'terms';

const pathToView = (pathname: string): ViewMode => {
  const clean = pathname.replace(/\/+$/, '').toLowerCase();
  if (clean === '/about') return 'about';
  if (clean === '/privacy' || clean === '/privacy-policy') return 'privacy';
  if (clean === '/terms' || clean === '/terms-of-service') return 'terms';
  return 'converter';
};

const viewToPath = (view: ViewMode, targetLanguage: TargetLanguage = 'javascript'): string => {
  if (view === 'about') return '/about';
  if (view === 'privacy') return '/privacy-policy';
  if (view === 'terms') return '/terms-of-service';
  return targetLanguage === 'typescript' ? '/json-to-typescript' : '/';
};

const getInitialTargetLanguage = (): TargetLanguage => {
  try {
    const cleanPath = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    if (cleanPath === '/json-to-typescript' || cleanPath === '/json-to-ts') {
      return 'typescript';
    }

    const params = new URLSearchParams(window.location.search);
    const to = params.get('to')?.toLowerCase();
    const format = params.get('format')?.toLowerCase();
    const target = params.get('target')?.toLowerCase();
    const q = params.get('q')?.toLowerCase() || params.get('search')?.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (
      to === 'typescript' ||
      to === 'ts' ||
      format === 'typescript' ||
      format === 'ts' ||
      target === 'typescript' ||
      target === 'ts' ||
      cleanPath.includes('typescript') ||
      cleanPath.includes('json-to-ts') ||
      hash.includes('typescript') ||
      (q && (q.includes('typescript') || q.includes('ts')))
    ) {
      return 'typescript';
    }
  } catch {
    // Ignored in sandboxed iframes
  }
  return 'javascript';
};

const updateSeoMetadata = (targetLang: TargetLanguage) => {
  try {
    const isTs = targetLang === 'typescript';
    const title = isTs
      ? 'JSON to TypeScript Converter - Free Online Interface & Type Generator'
      : 'JSON to JavaScript Object Converter for Free';
    const description = isTs
      ? 'Free online JSON to TypeScript converter. Transform JSON into clean TypeScript interfaces, type aliases, and typed objects with advanced settings. 100% free, offline, and private.'
      : 'Convert your JSON file into JavaScript and TypeScript with advanced settings at your fingertips. All are 100% FREE, easy to use and offline conversion with no hidden fees!';
    const canonicalUrl = isTs ? 'https://json2.js.org/json-to-typescript' : 'https://json2.js.org/';
    const keywords = isTs
      ? 'json to typescript, convert json to typescript, json to ts, json to typescript interface, json to ts types, json to type, json to ts interface generator, generate typescript from json, online json to typescript converter, json to typescript free offline'
      : 'json to javascript, json to js object, json to js converter, convert json to javascript object, json to object converter, json formatter, json validator, json parser, json to es6 object, free json converter, offline json to js';

    document.title = title;

    const setMeta = (nameOrProp: string, value: string, attr: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attr}="${nameOrProp}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, nameOrProp);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    setMeta('description', description, 'name');
    setMeta('keywords', keywords, 'name');
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('twitter:title', title, 'name');
    setMeta('twitter:description', description, 'name');
    setMeta('twitter:url', canonicalUrl, 'name');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Dynamic JSON-LD Structured Data for TypeScript SEO rich snippets
    let ldScript = document.getElementById('dynamic-jsonld') as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.id = 'dynamic-jsonld';
      ldScript.type = 'application/ld+json';
      document.head.appendChild(ldScript);
    }

    if (isTs) {
      ldScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebApplication',
            '@id': 'https://json2.js.org/json-to-typescript#webapp',
            'name': 'JSON to TypeScript Converter',
            'url': 'https://json2.js.org/json-to-typescript',
            'applicationCategory': 'DeveloperApplication',
            'operatingSystem': 'All',
            'browserRequirements': 'Requires JavaScript. Requires HTML5.',
            'description': 'Free online developer tool to convert JSON documents and API payloads into strongly typed TypeScript interfaces, type aliases, and typed objects.',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD'
            },
            'featureList': [
              'JSON to TypeScript interface generation',
              'JSON to TypeScript type aliases',
              'as const deep literal narrowing',
              'Nested object PascalCase interface extraction',
              'Typed array and union type inference',
              '100% Client-side and offline processing',
              'Direct .ts file export and download'
            ]
          },
          {
            '@type': 'FAQPage',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': 'Should I use interface or type when converting JSON to TypeScript?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'interface is recommended for standard object models and API contracts as it supports declaration merging and extends. type is preferred for union types and primitive aliases.'
                }
              },
              {
                '@type': 'Question',
                'name': 'What is the difference between an interface and as const?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'An interface defines a static compile-time type contract. as const is a literal assertion on a runtime object that locks in exact readonly literal types without separate type definitions.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Is my data secure when converting to TypeScript?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Yes. All conversion logic runs 100% client-side inside your browser. No JSON payloads or schemas are transmitted to any remote servers.'
                }
              }
            ]
          }
        ]
      });
    } else {
      ldScript.textContent = '';
    }
  } catch {
    // Ignored in restricted environments
  }
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>(() => {
    return pathToView(window.location.pathname);
  });

  const [targetLanguage, setTargetLanguage] = useState<TargetLanguage>(getInitialTargetLanguage);

  useEffect(() => {
    // Ensure dark theme is permanently enabled
    document.documentElement.classList.add('dark');

    // Handle browser back/forward buttons
    const handlePopState = () => {
      try {
        const cleanPath = window.location.pathname.toLowerCase().replace(/\/+$/, '');
        if (cleanPath === '/json-to-typescript' || cleanPath === '/json-to-ts') {
          setCurrentView('converter');
          setTargetLanguage('typescript');
        } else if (cleanPath === '' || cleanPath === '/') {
          setCurrentView('converter');
          setTargetLanguage('javascript');
        } else {
          setCurrentView(pathToView(window.location.pathname));
          setTargetLanguage(getInitialTargetLanguage());
        }
      } catch {
        // Ignored in sandboxed iframes
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Synchronize targetLanguage with URL path and SEO
  useEffect(() => {
    if (currentView === 'converter') {
      try {
        const targetPath = targetLanguage === 'typescript' ? '/json-to-typescript' : '/';
        const currentPath = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
        const desiredPath = targetPath.toLowerCase().replace(/\/+$/, '') || '/';

        if (currentPath !== desiredPath) {
          window.history.replaceState(null, '', targetPath);
        }
      } catch {
        // Ignored
      }
    }
    updateSeoMetadata(targetLanguage);
  }, [targetLanguage, currentView]);

  const navigateTo = useCallback((view: ViewMode) => {
    try {
      const targetPath = viewToPath(view, targetLanguage);
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
  }, [targetLanguage]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-zinc-950 text-gray-100 selection:bg-[#F7DF1E] selection:text-black">
      {/* Top Header with brand and PWA button */}
      <Header onNavigate={navigateTo} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center">
        {currentView === 'converter' && (
          <>
            <HeroSection
              targetLanguage={targetLanguage}
              onSelectLanguage={setTargetLanguage}
            />
            <ConverterWorkspace
              targetLanguage={targetLanguage}
              onSelectLanguage={setTargetLanguage}
            />
            <WikipediaGuide
              targetLanguage={targetLanguage}
              onSelectLanguage={setTargetLanguage}
            />
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

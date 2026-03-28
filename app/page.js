'use client';
import { useState, useEffect } from 'react';
import { useLocalStorage } from '../lib/useLocalStorage';
import { defaultData } from '../lib/defaultData';

import Navigation from './components/Navigation';
import HomeHub from './components/HomeHub';
import Records from './components/Records';
import Projects from './components/Projects';
import Recalibrate from './components/Recalibrate';
import Onboarding from './components/Onboarding';
import SystemMap from './components/SystemMap';
import FAQ from './components/FAQ';
import PWARegister from './components/PWARegister';

export default function App() {
  const [data, setData, hydrated] = useLocalStorage('fixr-home-os', defaultData);
  const [currentSpace, setCurrentSpace] = useState('home-hub');
  const [showMap, setShowMap] = useState(false);
  const [showFaq, setShowFaq] = useState(false);

  // Merge any new default keys into stored data (handles app updates)
  useEffect(() => {
    if (!hydrated) return;
    const hasNewKeys = Object.keys(defaultData).some(k => !(k in data));
    if (hasNewKeys) {
      setData(prev => ({ ...defaultData, ...prev }));
    }
  }, [hydrated]);

  const updateData = (partial) => {
    setData(prev => ({ ...prev, ...partial }));
  };

  const completeOnboarding = () => {
    setData(prev => ({ ...prev, onboardingComplete: true }));
    setCurrentSpace('home-hub');
  };

  // Don't render until localStorage is loaded to avoid hydration flash
  if (!hydrated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 bg-sage-600 rounded-xl flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
          </div>
          <p className="text-stone-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Onboarding modal — shown on first visit */}
      {!data.onboardingComplete && (
        <Onboarding onComplete={completeOnboarding} />
      )}

      {/* System Map modal */}
      {showMap && <SystemMap onClose={() => setShowMap(false)} />}

      {/* FAQ modal */}
      {showFaq && <FAQ onClose={() => setShowFaq(false)} />}

      {/* PWA service worker + install prompt */}
      <PWARegister />

      {/* Navigation */}
      <Navigation
        current={currentSpace}
        onNavigate={setCurrentSpace}
        onMapOpen={() => setShowMap(true)}
        onFaqOpen={() => setShowFaq(true)}
      />

      {/* Main content area */}
      <main className="md:ml-56 pb-20 md:pb-0">
        <div className="px-4 py-6 md:px-8 md:py-8 max-w-3xl">
          {/* Top bar for mobile */}
          <div className="md:hidden flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-sage-600 rounded-lg flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              </div>
              <span className="text-xs font-bold tracking-widest text-stone-700 uppercase">FIXR HOME OS</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowMap(true)}
                className="text-stone-400 hover:text-stone-600 p-1.5 rounded-lg hover:bg-stone-100 transition-all"
                title="System Map"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                  <line x1="9" y1="3" x2="9" y2="18" />
                  <line x1="15" y1="6" x2="15" y2="21" />
                </svg>
              </button>
              <button
                onClick={() => setShowFaq(true)}
                className="text-stone-400 hover:text-stone-600 p-1.5 rounded-lg hover:bg-stone-100 transition-all"
                title="FAQ"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </button>
            </div>
          </div>

          {/* Space content */}
          {currentSpace === 'home-hub' && (
            <HomeHub data={data} onUpdate={updateData} />
          )}
          {currentSpace === 'records' && (
            <Records data={data} onUpdate={updateData} />
          )}
          {currentSpace === 'projects' && (
            <Projects data={data} onUpdate={updateData} />
          )}
          {currentSpace === 'recalibrate' && (
            <Recalibrate data={data} onUpdate={updateData} />
          )}
        </div>
      </main>
    </div>
  );
}

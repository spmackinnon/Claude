'use client';
import { useEffect, useState } from 'react';

export default function PWARegister() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('SW registration failed:', err);
      });
    }

    // Show iOS install hint if:
    // - on iOS Safari
    // - not already installed (not in standalone mode)
    // - user hasn't dismissed it this session
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isInStandalone = window.navigator.standalone === true;
    const dismissed = sessionStorage.getItem('pwa-banner-dismissed');

    if (isIOS && !isInStandalone && !dismissed) {
      // Small delay so it doesn't flash immediately on load
      setTimeout(() => setShowBanner(true), 2500);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem('pwa-banner-dismissed', '1');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:hidden">
      <div className="bg-stone-800 text-white rounded-2xl p-4 shadow-xl flex items-start gap-3">
        <div className="w-8 h-8 bg-sage-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">Install FIXR Home OS</p>
          <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
            Tap the <span className="font-medium text-white">Share</span> button{' '}
            <svg className="inline w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>{' '}
            then <span className="font-medium text-white">"Add to Home Screen"</span> to install.
          </p>
        </div>
        <button onClick={dismiss} className="text-stone-400 hover:text-white transition-colors flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

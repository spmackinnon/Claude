'use client';
import { useState, useEffect } from 'react';
import { useUndoableStorage } from '../lib/useUndoableStorage';
import { defaultData } from '../lib/defaultData';

import Navigation from './components/Navigation';
import HomeHub from './components/HomeHub';
import Records from './components/Records';
import Projects from './components/Projects';
import Recalibrate from './components/Recalibrate';
import Calendar from './components/Calendar';
import MaintenanceLibrary from './components/MaintenanceLibrary';
import Onboarding from './components/Onboarding';
import SystemMap from './components/SystemMap';
import FAQ from './components/FAQ';
import PWARegister from './components/PWARegister';
import UndoToast from './components/UndoToast';

export default function App() {
  const { data, setData, hydrated, undo, canUndo, lastChanged } = useUndoableStorage('fixr-home-os', defaultData);
  const [currentSpace, setCurrentSpace] = useState('home-hub');
  const [showMap, setShowMap] = useState(false);
  const [showFaq, setShowFaq] = useState(false);

  useEffect(() => {
    if (!hydrated) return;

    let migrated = { ...data };
    let changed = false;

    // Migrate old flat tasks array → new taskLists structure
    if (Array.isArray(data.tasks) && !data.taskLists) {
      migrated.taskLists = {
        'this-week': data.tasks.map(t => ({
          ...t,
          notes: t.notes || '',
          links: t.links || [],
          priority: t.priority || null,
          assignedTo: t.assignedTo || null,
        })),
        'routines': defaultData.taskLists['routines'],
        'errands': defaultData.taskLists['errands'],
      };
      delete migrated.tasks;
      changed = true;
    }

    // Fill in any top-level keys added in new versions
    for (const key of Object.keys(defaultData)) {
      if (!(key in migrated)) {
        migrated[key] = defaultData[key];
        changed = true;
      }
    }

    if (changed) setData(migrated);
  }, [hydrated]);

  const updateData = (partial) => setData(prev => ({ ...prev, ...partial }));

  const completeOnboarding = () => {
    setData(prev => ({ ...prev, onboardingComplete: true }));
    setCurrentSpace('home-hub');
  };

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
      {!data.onboardingComplete && <Onboarding onComplete={completeOnboarding} />}
      {showMap && <SystemMap onClose={() => setShowMap(false)} />}
      {showFaq && <FAQ onClose={() => setShowFaq(false)} />}

      <PWARegister />
      <UndoToast lastChanged={lastChanged} canUndo={canUndo} onUndo={undo} />

      <Navigation
        current={currentSpace}
        onNavigate={setCurrentSpace}
        onMapOpen={() => setShowMap(true)}
        onFaqOpen={() => setShowFaq(true)}
        onLibraryOpen={() => setCurrentSpace('library')}
      />

      <main className="md:ml-56 pb-20 md:pb-0">
        <div className="px-4 py-6 md:px-8 md:py-8 max-w-3xl">
          {/* Mobile top bar */}
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
              <button onClick={() => setCurrentSpace('library')} className={`p-1.5 rounded-lg transition-all ${currentSpace === 'library' ? 'text-sage-600 bg-sage-50' : 'text-stone-400 hover:text-stone-600 hover:bg-stone-100'}`} title="Task Library">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </button>
              <button onClick={() => setShowMap(true)} className="text-stone-400 hover:text-stone-600 p-1.5 rounded-lg hover:bg-stone-100 transition-all" title="System Map">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                  <line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" />
                </svg>
              </button>
              <button onClick={() => setShowFaq(true)} className="text-stone-400 hover:text-stone-600 p-1.5 rounded-lg hover:bg-stone-100 transition-all" title="FAQ">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </button>
            </div>
          </div>

          {currentSpace === 'home-hub' && <HomeHub data={data} onUpdate={updateData} onNavigate={setCurrentSpace} />}
          {currentSpace === 'calendar' && <Calendar data={data} onUpdate={updateData} />}
          {currentSpace === 'records' && <Records data={data} onUpdate={updateData} />}
          {currentSpace === 'projects' && <Projects data={data} onUpdate={updateData} />}
          {currentSpace === 'library' && <MaintenanceLibrary taskLists={data.taskLists} appointments={data.appointments} onUpdate={updateData} />}
          {currentSpace === 'recalibrate' && <Recalibrate data={data} onUpdate={updateData} />}
        </div>
      </main>
    </div>
  );
}

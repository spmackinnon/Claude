'use client';
import { useState } from 'react';

const STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to FIXR Home OS',
    subtitle: 'Your family\'s operating system — built for clarity, not complexity.',
    content: (
      <div className="space-y-4">
        <p className="text-stone-600 text-sm leading-relaxed">
          You're already doing the work of a CEO — managing people, money, logistics, and long-term plans. This system gives that work a home.
        </p>
        <p className="text-stone-600 text-sm leading-relaxed">
          FIXR Home OS is designed to reduce the mental load of running your household — not add to it. It's built for real life: busy schedules, limited time, and the reality that you can't do everything at once.
        </p>
        <div className="bg-sage-50 rounded-xl p-4">
          <p className="text-sage-700 text-sm font-medium">You can start using this in under 5 minutes.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'what-it-is',
    title: 'What This Is (and Isn\'t)',
    subtitle: 'Set the right expectations from the start.',
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide">This IS</p>
          {[
            'A simple, central place for your household operations',
            'A daily task hub you check in under 5 minutes',
            'A place to store information you\'re always searching for',
            'A friction log — so you capture problems without solving them immediately',
          ].map((item, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <div className="w-4 h-4 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#4E724E" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-sm text-stone-600">{item}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide">This is NOT</p>
          {[
            'A complex project management system',
            'Something you need to fully set up before using',
            'A tool that requires daily maintenance',
            'A replacement for your calendar or other tools',
          ].map((item, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <div className="w-4 h-4 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-stone-400 text-xs leading-none">–</span>
              </div>
              <p className="text-sm text-stone-500">{item}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'spaces',
    title: 'Your Four Spaces',
    subtitle: 'Each space has one job. Start with Home Hub.',
    content: (
      <div className="space-y-3">
        {[
          {
            name: 'Home Hub',
            emoji: '🏠',
            role: 'Daily Execute',
            desc: 'Your home base. Tasks, weekly reset, and meal planning. Check here first — every single day.',
            highlight: true,
          },
          {
            name: 'Records & Resources',
            emoji: '📁',
            role: 'Info Storage',
            desc: 'Bills, documents, and important contacts. Add things here so you never search for the same thing twice.',
          },
          {
            name: 'Projects & Events',
            emoji: '✅',
            role: 'Start to Finish',
            desc: 'For anything with a start, end, and multiple steps — room resets, trips, big events.',
          },
          {
            name: 'Recalibrate',
            emoji: '🔄',
            role: 'Reflect & Adjust',
            desc: 'Log friction when something feels off. You don\'t need to solve it here — just capture it.',
          },
        ].map((space) => (
          <div key={space.name} className={`rounded-xl p-3 border ${space.highlight ? 'border-sage-200 bg-sage-50' : 'border-stone-100 bg-white'}`}>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="text-lg">{space.emoji}</span>
              <div>
                <span className="text-sm font-semibold text-stone-700">{space.name}</span>
                <span className="ml-2 text-xs text-stone-400">{space.role}</span>
              </div>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">{space.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'what-not-to-do',
    title: 'What Not to Do',
    subtitle: 'You have permission to keep this simple.',
    content: (
      <div className="space-y-4">
        <p className="text-sm text-stone-600 leading-relaxed">
          Most people abandon systems because they try to set everything up perfectly before using it. Don't do that.
        </p>
        <div className="space-y-2">
          {[
            { label: 'No automations required', desc: 'The system works without any. Add them later if you want.' },
            { label: 'No advanced hierarchy needed', desc: 'You don\'t need tags, folders, or categories to start.' },
            { label: 'No need to use every space', desc: 'Home Hub alone is enough. Add others when they make sense.' },
            { label: 'No need to track everything', desc: 'Only track what saves you mental energy.' },
            { label: 'No need to fill it all in now', desc: 'Add records when you look something up. Not before.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 bg-stone-50 rounded-xl p-3">
              <span className="text-terracotta-400 font-bold text-sm flex-shrink-0">✕</span>
              <div>
                <p className="text-sm font-medium text-stone-700">{item.label}</p>
                <p className="text-xs text-stone-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'start',
    title: 'You\'re Ready to Start',
    subtitle: 'Everything is already set up with examples.',
    content: (
      <div className="space-y-4">
        <div className="bg-sage-50 rounded-xl p-4 space-y-3">
          <p className="text-sm font-semibold text-sage-700">Your first 5 minutes:</p>
          {[
            'Open Home Hub',
            'Review the example tasks — delete what doesn\'t apply',
            'Add 1–3 things you actually need to do today',
            'Scroll down and see the Weekly Reset checklist',
            'That\'s it — come back tomorrow and repeat',
          ].map((step, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <div className="w-5 h-5 rounded-full bg-sage-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                {i + 1}
              </div>
              <p className="text-sm text-stone-700">{step}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-stone-400 text-center leading-relaxed">
          Everything is saved automatically in your browser.<br />
          No account needed. No sign-up. Just open and use it.
        </p>
      </div>
    ),
  },
];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="modal-backdrop fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="modal-panel bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col">
        {/* Progress bar */}
        <div className="h-1 bg-stone-100 rounded-t-2xl overflow-hidden">
          <div
            className="h-full bg-sage-500 transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-sage-600 rounded-md flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
            </div>
            <span className="text-xs font-bold tracking-widest text-stone-400 uppercase">FIXR HOME OS</span>
          </div>
          <h2 className="font-serif text-xl text-stone-800">{current.title}</h2>
          <p className="text-sm text-stone-500 mt-1">{current.subtitle}</p>
        </div>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto flex-1">
          {current.content}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-4 border-t border-stone-100 flex items-center justify-between">
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === step ? 'bg-sage-600 w-4' : i < step ? 'bg-sage-300' : 'bg-stone-200'}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="text-sm text-stone-400 px-4 py-2 hover:text-stone-600 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={() => isLast ? onComplete() : setStep(s => s + 1)}
              className="bg-sage-600 text-white text-sm font-medium px-5 py-2 rounded-xl hover:bg-sage-700 transition-colors"
            >
              {isLast ? 'Go to Home Hub →' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

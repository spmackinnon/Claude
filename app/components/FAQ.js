'use client';
import { useState } from 'react';

const FAQS = [
  {
    q: "Where do I put things I'm not sure about?",
    a: "Take it to Recalibrate and log it in the Friction Log. You don't need to categorize or solve it — just name it. \"I don't know where this goes\" is a valid entry.",
  },
  {
    q: "Do I need to set everything up before I start?",
    a: "No. Start with Home Hub today. Add tasks, run the Weekly Reset on Sunday. That's enough to get value from this system immediately. Everything else fills in over time.",
  },
  {
    q: "What's the difference between a project and a routine?",
    a: "Routines repeat regularly — school pickups, weekly planning, meal prep. Projects have a finish line — organizing a room, planning a trip, hosting a dinner party. If it ends, it's a project.",
  },
  {
    q: "What if I stop using it for a few weeks?",
    a: "Restart in Home Hub. Delete old tasks that no longer matter. Do a quick Weekly Reset. You don't need to catch up — just pick up from today. The system doesn't punish you for pausing.",
  },
  {
    q: "Do I need to use every feature?",
    a: "No. Home Hub alone is a complete system. Add Records when you're tired of searching for the same thing. Add Projects when you have a multi-step effort. Use Recalibrate when something keeps bothering you. Go at your own pace.",
  },
  {
    q: "How long should the Weekly Reset take?",
    a: "5–10 minutes. That's the goal. Review tasks, move or delete what's outdated, add what's coming up, set a focus area, plan a few meals, and stop. Over-planning is not the goal.",
  },
  {
    q: "What if my household is too complicated for this?",
    a: "Start simpler, not more complex. The value of this system is in reducing mental load, not in tracking every variable. If something feels like too much to track here, it probably doesn't need to be tracked at all.",
  },
  {
    q: "Can I use this alongside my calendar?",
    a: "Absolutely. Your calendar handles time-specific commitments (meetings, appointments, events). FIXR handles everything else — the ongoing tasks, household info, projects, and friction that doesn't fit neatly into a calendar.",
  },
  {
    q: "Is my data saved?",
    a: "Yes — everything is saved automatically in your browser's local storage. It's private and doesn't require an account. Note: clearing your browser data will reset the app, so consider exporting or backing up occasionally.",
  },
  {
    q: "How do I know if I'm using this correctly?",
    a: "If your mental load feels lighter after a week, you're using it correctly. There is no wrong way. The system adapts to you — not the other way around.",
  },
];

export default function FAQ({ onClose }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="modal-backdrop fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="modal-panel bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-stone-100">
          <div>
            <h2 className="font-serif text-xl text-stone-800">Frequently Asked Questions</h2>
            <p className="text-sm text-stone-500 mt-0.5">Common questions about using FIXR Home OS</p>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* FAQ list */}
        <div className="px-6 py-4 overflow-y-auto flex-1 space-y-1">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-stone-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-3 px-4 py-3.5 text-left hover:bg-stone-50 transition-colors"
              >
                <span className={`text-sm font-medium leading-snug ${open === i ? 'text-sage-700' : 'text-stone-700'}`}>
                  {faq.q}
                </span>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A8A29E" strokeWidth="2"
                  className={`flex-shrink-0 mt-0.5 transition-transform ${open === i ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {open === i && (
                <div className="px-4 pb-4 bg-stone-50 border-t border-stone-100">
                  <p className="text-sm text-stone-600 leading-relaxed pt-3">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer tip */}
        <div className="px-6 pb-5 pt-4 border-t border-stone-100">
          <div className="bg-sage-50 rounded-xl px-4 py-3 mb-3">
            <p className="text-xs text-sage-700 leading-relaxed">
              <span className="font-semibold">Remember:</span> Progress over perfection. Simple use is enough. You don't need to master this — you just need it to make your life a little easier each week.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium py-2.5 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

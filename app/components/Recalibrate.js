'use client';
import { useState } from 'react';
import { FRICTION_CATEGORIES } from '../../lib/defaultData';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const REFLECTION_PROMPTS = [
  { section: 'Friction', prompts: [
    'What feels harder than it should right now?',
    'What keeps getting missed or falling through the cracks?',
    'What feels repetitive without any system behind it?',
  ]},
  { section: 'Weekly', prompts: [
    'What actually needs to happen this week?',
    "What's one thing that would make life easier right now?",
    'What can I let go of — at least for now?',
  ]},
  { section: 'Monthly', prompts: [
    'What worked well this month that I want to keep?',
    "What's one area that needs more structure or support?",
    'Am I working on the right things — or just the urgent ones?',
  ]},
];

export default function Recalibrate({ data, onUpdate }) {
  const { frictionLog } = data;
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ text: '', category: 'Other', date: new Date().toISOString().split('T')[0] });
  const [filter, setFilter] = useState('All');
  const [openPrompt, setOpenPrompt] = useState(null);

  const addEntry = (e) => {
    e.preventDefault();
    if (!form.text.trim()) return;
    const entry = {
      id: `f${Date.now()}`,
      text: form.text.trim(),
      category: form.category,
      date: form.date,
      resolved: false,
    };
    onUpdate({ frictionLog: [entry, ...frictionLog] });
    setForm({ text: '', category: 'Other', date: new Date().toISOString().split('T')[0] });
    setShowAdd(false);
  };

  const toggleResolved = (id) => {
    onUpdate({
      frictionLog: frictionLog.map(f => f.id === id ? { ...f, resolved: !f.resolved } : f)
    });
  };

  const deleteEntry = (id) => {
    onUpdate({ frictionLog: frictionLog.filter(f => f.id !== id) });
  };

  const categories = ['All', ...new Set(frictionLog.map(f => f.category))];
  const filtered = filter === 'All'
    ? frictionLog
    : frictionLog.filter(f => f.category === filter);

  const activeCount = frictionLog.filter(f => !f.resolved).length;
  const resolvedCount = frictionLog.filter(f => f.resolved).length;

  return (
    <div className="space-fade max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-stone-800">Recalibrate</h1>
        <p className="text-stone-500 text-sm mt-1">
          Capture friction instead of solving it immediately. One thing at a time.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white rounded-2xl shadow-card p-3 text-center">
          <p className="text-xl font-bold text-stone-700">{frictionLog.length}</p>
          <p className="text-xs text-stone-400 mt-0.5">Total logged</p>
        </div>
        <div className="bg-white rounded-2xl shadow-card p-3 text-center">
          <p className="text-xl font-bold text-terracotta-500">{activeCount}</p>
          <p className="text-xs text-stone-400 mt-0.5">Open</p>
        </div>
        <div className="bg-white rounded-2xl shadow-card p-3 text-center">
          <p className="text-xl font-bold text-sage-600">{resolvedCount}</p>
          <p className="text-xs text-stone-400 mt-0.5">Resolved</p>
        </div>
      </div>

      {/* Reflection Prompts */}
      <div className="bg-white rounded-2xl shadow-card p-4 mb-4">
        <h2 className="text-sm font-semibold text-stone-600 uppercase tracking-wide mb-3">Reflection Prompts</h2>
        <div className="space-y-2">
          {REFLECTION_PROMPTS.map((section) => (
            <div key={section.section}>
              <button
                onClick={() => setOpenPrompt(openPrompt === section.section ? null : section.section)}
                className="w-full flex items-center justify-between py-2 text-left"
              >
                <span className="text-sm font-medium text-stone-600">{section.section} Check-In</span>
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A8A29E" strokeWidth="2"
                  className={`transition-transform ${openPrompt === section.section ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {openPrompt === section.section && (
                <ul className="pb-2 space-y-2">
                  {section.prompts.map((q, i) => (
                    <li key={i} className="flex gap-2 bg-stone-50 rounded-lg px-3 py-2">
                      <span className="text-stone-300 flex-shrink-0">›</span>
                      <span className="text-sm text-stone-600 italic">{q}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Friction Log */}
      <div className="bg-white rounded-2xl shadow-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-stone-600 uppercase tracking-wide">Friction Log</h2>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1.5 text-sm text-sage-600 hover:text-sage-700 font-medium transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Log Friction
          </button>
        </div>

        {/* Add Form */}
        {showAdd && (
          <form onSubmit={addEntry} className="bg-stone-50 rounded-xl p-4 mb-4 space-y-3">
            <div className="bg-white rounded-lg p-3 text-xs text-stone-400 space-y-1 mb-1">
              <p className="font-medium text-stone-500">Prompt yourself:</p>
              <p>› What feels harder than it should?</p>
              <p>› What keeps getting missed?</p>
              <p>› What feels repetitive without a system?</p>
            </div>
            <textarea
              autoFocus
              value={form.text}
              onChange={e => setForm({ ...form, text: e.target.value })}
              placeholder="Describe the friction... (no need to solve it yet)"
              rows={3}
              className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300 resize-none"
            />
            <div className="flex gap-3">
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="flex-1 text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 bg-white"
              >
                {FRICTION_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-500"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setShowAdd(false)} className="text-sm text-stone-400 px-3 py-1.5 hover:text-stone-600">Cancel</button>
              <button type="submit" className="text-sm bg-sage-600 text-white px-4 py-1.5 rounded-lg hover:bg-sage-700 transition-colors">Log It</button>
            </div>
          </form>
        )}

        {/* Category filter */}
        {frictionLog.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mb-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  filter === cat
                    ? 'bg-sage-600 text-white'
                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Entries */}
        <div className="space-y-3">
          {filtered.filter(f => !f.resolved).map(entry => (
            <div key={entry.id} className="flex gap-3 p-3 rounded-xl border border-stone-100 group hover:border-stone-200 transition-colors">
              <button
                onClick={() => toggleResolved(entry.id)}
                title="Mark resolved"
                className="mt-0.5 w-5 h-5 rounded-full border-2 border-stone-300 flex-shrink-0 hover:border-sage-500 transition-colors flex items-center justify-center"
              >
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-stone-700">{entry.text}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="badge bg-stone-100 text-stone-500">{entry.category}</span>
                  <span className="text-xs text-stone-400">{formatDate(entry.date)}</span>
                </div>
              </div>
              <button
                onClick={() => deleteEntry(entry.id)}
                className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-400 transition-all flex-shrink-0 mt-0.5"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}

          {/* Resolved entries */}
          {filtered.some(f => f.resolved) && (
            <div className="mt-4">
              <p className="text-xs text-stone-400 font-medium mb-2">Resolved</p>
              <div className="space-y-2 opacity-60">
                {filtered.filter(f => f.resolved).map(entry => (
                  <div key={entry.id} className="flex gap-3 p-3 rounded-xl border border-stone-100 group">
                    <button
                      onClick={() => toggleResolved(entry.id)}
                      className="mt-0.5 w-5 h-5 rounded-full border-2 border-sage-400 bg-sage-400 flex-shrink-0 flex items-center justify-center"
                    >
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-stone-500 line-through">{entry.text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="badge bg-stone-100 text-stone-400">{entry.category}</span>
                        <span className="text-xs text-stone-300">{formatDate(entry.date)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-400 transition-all flex-shrink-0"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-8">
              <p className="text-stone-300 text-sm">Nothing logged yet.</p>
              <p className="text-xs text-stone-300 mt-1">When something feels off — log it here instead of trying to solve it immediately.</p>
            </div>
          )}
        </div>
      </div>

      {/* Key reminder */}
      <div className="mt-4 bg-terracotta-50 rounded-xl p-4">
        <p className="text-xs text-terracotta-600 font-medium mb-1.5">The rule of this space</p>
        <p className="text-sm text-stone-600">
          You don't need to fix friction when you log it. The act of naming it is enough for now. When you have time and energy, come back and work through one item at a time.
        </p>
      </div>
    </div>
  );
}

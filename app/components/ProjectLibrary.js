'use client';
import { useState } from 'react';
import { PROJECT_TEMPLATES, PROJECT_CATEGORIES, createProjectFromTemplate } from '../../lib/projectTemplates';

const CATEGORY_ICONS = {
  Celebrations: '🎉',
  Holidays: '🎄',
  Travel: '✈️',
  Seasonal: '🌿',
};

const PRIORITY_COLORS = { high: 'text-red-400', medium: 'text-amber-400', low: 'text-blue-300' };

function TemplateCard({ template, onUse }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">{CATEGORY_ICONS[template.category] || '📋'}</span>
              <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wide">{template.category}</span>
            </div>
            <h3 className="text-sm font-semibold text-stone-800 leading-snug">{template.name}</h3>
            <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">{template.description}</p>
          </div>
          <button
            onClick={() => onUse(template)}
            className="flex-shrink-0 bg-sage-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-sage-700 transition-colors"
          >
            Use
          </button>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-[10px] text-stone-400 mt-3">
          <span className="flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ~{template.estimatedTotalHours}h total
          </span>
          <span className="flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            {template.subtasks.length} tasks
          </span>
          <span className="flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {template.timeline}
          </span>
        </div>

        {/* Expand/collapse subtask preview */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="mt-3 text-[11px] text-stone-400 hover:text-stone-600 flex items-center gap-1 transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${expanded ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
          {expanded ? 'Hide tasks' : 'Preview tasks'}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-stone-50 px-4 py-3 max-h-64 overflow-y-auto">
          {/* Group by phase */}
          {(() => {
            const phases = [];
            const seen = new Set();
            template.subtasks.forEach(st => { if (!seen.has(st.phase)) { seen.add(st.phase); phases.push(st.phase); } });
            return phases.map(phase => (
              <div key={phase} className="mb-3">
                <p className="text-[9px] font-semibold text-stone-400 uppercase tracking-widest mb-1.5">{phase}</p>
                <ul className="space-y-1">
                  {template.subtasks.filter(st => st.phase === phase).map(st => (
                    <li key={st.id} className="flex items-start gap-2">
                      <span className={`mt-0.5 flex-shrink-0 text-[9px] font-bold uppercase ${PRIORITY_COLORS[st.priority]}`}>●</span>
                      <span className="text-xs text-stone-600 leading-snug">{st.task}</span>
                      <span className="ml-auto text-[10px] text-stone-300 flex-shrink-0">{st.estimatedMinutes}m</span>
                    </li>
                  ))}
                </ul>
              </div>
            ));
          })()}
        </div>
      )}
    </div>
  );
}

function UseTemplateModal({ template, onConfirm, onClose }) {
  const [name, setName] = useState(template.name);
  const [eventDate, setEventDate] = useState('');

  const handleConfirm = () => {
    if (!eventDate) return;
    onConfirm(template, eventDate, name.trim() || template.name);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ animation: 'backdropIn 0.15s ease' }}>
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl" style={{ animation: 'modalIn 0.2s ease' }}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-stone-100">
          <div>
            <h3 className="font-serif text-lg text-stone-800">Use Template</h3>
            <p className="text-xs text-stone-400 mt-0.5">{template.name}</p>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 transition-colors p-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="px-5 py-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-1.5">Project name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2.5 text-stone-700 focus:border-sage-400 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-1.5">
              Target / event date <span className="text-terracotta-400">*</span>
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={e => setEventDate(e.target.value)}
              className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2.5 text-stone-600"
            />
            <p className="text-[11px] text-stone-400 mt-1.5">
              All {template.subtasks.length} tasks will be automatically scheduled backwards from this date.
            </p>
          </div>

          <div className="bg-sage-50 rounded-xl p-3 text-xs text-stone-500 space-y-1">
            <p><span className="font-medium text-stone-600">Timeline:</span> {template.timeline}</p>
            <p><span className="font-medium text-stone-600">Estimated effort:</span> ~{template.estimatedTotalHours} hours</p>
          </div>
        </div>

        <div className="px-5 pb-5 flex gap-2">
          <button onClick={onClose} className="flex-1 text-sm text-stone-500 border border-stone-200 py-2.5 rounded-xl hover:bg-stone-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!eventDate}
            className="flex-1 bg-sage-600 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-sage-700 transition-colors disabled:opacity-40"
          >
            Add to Projects
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectLibrary({ projects, onUpdate, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [usingTemplate, setUsingTemplate] = useState(null);
  const [addedIds, setAddedIds] = useState(() => new Set((projects || []).map(p => p.templateId).filter(Boolean)));

  const filtered = PROJECT_TEMPLATES.filter(t => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleConfirm = (template, eventDate, name) => {
    const project = createProjectFromTemplate(template, eventDate, name);
    project.templateId = template.id;
    onUpdate({ projects: [...(projects || []), project] });
    setAddedIds(prev => new Set([...prev, template.id]));
    setUsingTemplate(null);
    onNavigate('projects');
  };

  return (
    <div className="space-fade max-w-2xl mx-auto space-y-4">
      {usingTemplate && (
        <UseTemplateModal
          template={usingTemplate}
          onConfirm={handleConfirm}
          onClose={() => setUsingTemplate(null)}
        />
      )}

      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl text-stone-800">Project Library</h1>
        <p className="text-sm text-stone-400 mt-1">Ready-made project templates with auto-scheduled tasks.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {/* Search */}
        <div className="px-4 pt-4 pb-3 border-b border-stone-50">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2 text-stone-700 placeholder-stone-300 focus:border-sage-400 transition-colors"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-1.5 px-4 py-3 overflow-x-auto border-b border-stone-50">
          {PROJECT_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-medium whitespace-nowrap px-3 py-1.5 rounded-full border transition-all ${
                activeCategory === cat
                  ? 'bg-sage-600 text-white border-sage-600'
                  : 'border-stone-200 text-stone-500 hover:border-sage-300 hover:text-sage-600'
              }`}
            >
              {cat !== 'All' && CATEGORY_ICONS[cat] ? `${CATEGORY_ICONS[cat]} ` : ''}{cat}
            </button>
          ))}
        </div>

        {/* Template list */}
        <div className="p-4 space-y-3">
          {filtered.length === 0 ? (
            <p className="text-stone-300 text-sm py-6 text-center">No templates found.</p>
          ) : (
            filtered.map(template => (
              <div key={template.id} className="relative">
                <TemplateCard
                  template={template}
                  onUse={t => setUsingTemplate(t)}
                />
                {addedIds.has(template.id) && (
                  <span className="absolute top-4 right-16 text-[10px] font-medium text-sage-500 bg-sage-50 px-2 py-0.5 rounded-full">
                    Added
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

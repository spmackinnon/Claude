'use client';
import { useState, useMemo } from 'react';
import {
  MAINTENANCE_TASKS,
  MAINTENANCE_CATEGORIES,
  FREQUENCY_LABELS,
  libraryTaskToItem,
  libraryTaskToAppointment,
} from '../../lib/homeMaintenanceData';

const PRIORITY_BADGE = {
  high: 'bg-red-50 text-red-500 border-red-100',
  medium: 'bg-amber-50 text-amber-500 border-amber-100',
  low: 'bg-stone-50 text-stone-400 border-stone-100',
};

const FREQ_ICONS = {
  weekly: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  monthly: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 2v4M16 2v4M3 10h18M21 8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z" />
    </svg>
  ),
  quarterly: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-.49-4.49" />
    </svg>
  ),
  seasonal: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
};

function TaskCard({ task, frequency, addedIds, onAddToRoutines, onSchedule }) {
  const [expanded, setExpanded] = useState(false);
  const isAdded = addedIds.has(task.id);

  return (
    <div className={`bg-white border rounded-2xl overflow-hidden transition-all ${isAdded ? 'border-sage-200 bg-sage-50' : 'border-stone-100 hover:border-stone-200'}`}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${PRIORITY_BADGE[task.priority] || PRIORITY_BADGE.low}`}>
                {task.priority}
              </span>
              <span className="text-[10px] text-stone-400">{task.estimatedTime}</span>
            </div>
            <p className={`text-sm font-medium leading-snug ${isAdded ? 'text-sage-700' : 'text-stone-700'}`}>{task.name}</p>
            <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">{task.description}</p>
          </div>
          {isAdded && (
            <span className="flex-shrink-0 text-sage-500 mt-0.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          )}
        </div>

        {task.subtasks && task.subtasks.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-xs text-stone-400 hover:text-stone-600 flex items-center gap-1 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
            {task.subtasks.length} subtask{task.subtasks.length !== 1 ? 's' : ''}
          </button>
        )}

        {expanded && task.subtasks.length > 0 && (
          <ul className="mt-2 space-y-1 pl-1 border-l-2 border-stone-100 ml-1">
            {task.subtasks.map((sub, i) => (
              <li key={i} className="text-xs text-stone-500 pl-2 leading-relaxed">{sub}</li>
            ))}
          </ul>
        )}

        {!isAdded && (
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onAddToRoutines(task, frequency)}
              className="flex-1 text-xs font-medium bg-sage-600 text-white py-1.5 px-3 rounded-xl hover:bg-sage-700 transition-colors"
            >
              Add to Routines
            </button>
            <button
              onClick={() => onSchedule(task)}
              className="flex-1 text-xs font-medium border border-stone-200 text-stone-600 py-1.5 px-3 rounded-xl hover:border-stone-300 hover:bg-stone-50 transition-colors"
            >
              Schedule
            </button>
          </div>
        )}
        {isAdded && (
          <p className="mt-2 text-xs text-sage-600 font-medium">Added ✓</p>
        )}
      </div>
    </div>
  );
}

function ScheduleModal({ task, onClose, onConfirm }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ animation: 'backdropIn 0.15s ease' }}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-5 space-y-4" style={{ animation: 'modalIn 0.2s ease' }}>
        <div>
          <h3 className="text-base font-semibold text-stone-800">Schedule task</h3>
          <p className="text-sm text-stone-500 mt-0.5">"{task.name}"</p>
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 block mb-1.5">Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2 text-stone-700"
          />
        </div>
        <div className="flex gap-3 pt-1">
          <button onClick={onClose} className="flex-1 text-sm text-stone-500 border border-stone-200 py-2 rounded-xl hover:bg-stone-50">Cancel</button>
          <button
            onClick={() => { onConfirm(task, date); onClose(); }}
            disabled={!date}
            className="flex-1 text-sm font-medium bg-sage-600 text-white py-2 rounded-xl hover:bg-sage-700 disabled:opacity-40"
          >
            Add to Calendar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MaintenanceLibrary({ taskLists, appointments, onUpdate, onClose }) {
  const [activeFreq, setActiveFreq] = useState('weekly');
  const [activeCategory, setActiveCategory] = useState('All');
  const [addedIds, setAddedIds] = useState(new Set());
  const [schedulingTask, setSchedulingTask] = useState(null);
  const [search, setSearch] = useState('');

  const categories = useMemo(() => {
    const cats = MAINTENANCE_CATEGORIES[activeFreq] || [];
    return ['All', ...cats];
  }, [activeFreq]);

  // Reset category filter when switching frequency
  const handleFreqChange = (freq) => {
    setActiveFreq(freq);
    setActiveCategory('All');
    setSearch('');
  };

  const filteredTasks = useMemo(() => {
    let tasks = MAINTENANCE_TASKS[activeFreq] || [];
    if (activeCategory !== 'All') {
      tasks = tasks.filter(t => t.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      tasks = tasks.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }
    return tasks;
  }, [activeFreq, activeCategory, search]);

  const handleAddToRoutines = (task, frequency) => {
    const item = libraryTaskToItem(task, frequency);
    const updated = { ...taskLists, routines: [...(taskLists.routines || []), item] };
    onUpdate({ taskLists: updated });
    setAddedIds(prev => new Set([...prev, task.id]));
  };

  const handleScheduleConfirm = (task, date) => {
    const apt = libraryTaskToAppointment(task, date);
    onUpdate({ appointments: [...(appointments || []), apt] });
    setAddedIds(prev => new Set([...prev, task.id]));
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white" style={{ animation: 'fadeIn 0.2s ease' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-stone-100 flex-shrink-0">
        <div>
          <h2 className="text-base font-semibold text-stone-800">Maintenance Library</h2>
          <p className="text-xs text-stone-400 mt-0.5">Browse tasks and add them to your routines or calendar</p>
        </div>
        <button onClick={onClose} className="text-stone-400 hover:text-stone-600 p-2 rounded-xl hover:bg-stone-100 transition-all">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Frequency tabs */}
      <div className="flex border-b border-stone-100 px-4 flex-shrink-0 overflow-x-auto">
        {Object.entries(FREQUENCY_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => handleFreqChange(key)}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
              activeFreq === key
                ? 'border-sage-500 text-sage-700'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <span className={activeFreq === key ? 'text-sage-600' : 'text-stone-400'}>{FREQ_ICONS[key]}</span>
            {label}
            <span className="text-xs text-stone-400">({(MAINTENANCE_TASKS[key] || []).length})</span>
          </button>
        ))}
      </div>

      {/* Search + Category filters */}
      <div className="px-4 pt-3 pb-2 flex-shrink-0 space-y-2">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2 text-stone-700 placeholder-stone-300 focus:border-sage-400 transition-colors"
        />
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-medium whitespace-nowrap px-3 py-1.5 rounded-full border transition-all ${
                activeCategory === cat
                  ? 'bg-sage-600 text-white border-sage-600'
                  : 'border-stone-200 text-stone-500 hover:border-sage-300 hover:text-sage-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Task cards */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {filteredTasks.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-stone-400 text-sm">No tasks found.</p>
          </div>
        ) : (
          <div className="space-y-3 pt-1">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                frequency={activeFreq}
                addedIds={addedIds}
                onAddToRoutines={handleAddToRoutines}
                onSchedule={setSchedulingTask}
              />
            ))}
          </div>
        )}
      </div>

      {schedulingTask && (
        <ScheduleModal
          task={schedulingTask}
          onClose={() => setSchedulingTask(null)}
          onConfirm={handleScheduleConfirm}
        />
      )}
    </div>
  );
}

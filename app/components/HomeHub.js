'use client';
import { useState } from 'react';
import TaskDetailModal from './TaskDetailModal';
import { generateMealPlan, buildGroceryList, MEAL_DATABASE } from '../../lib/mealDatabase';

// ── Helpers ────────────────────────────────────────────────────────
function getDayGreeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}
function formatDate() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}
function isToday(d) { return d === new Date().toISOString().split('T')[0]; }
function isThisWeek(d) {
  if (!d) return false;
  const today = new Date(); today.setHours(0,0,0,0);
  const due = new Date(d); due.setHours(0,0,0,0);
  const diff = (due - today) / 86400000;
  return diff >= 0 && diff <= 7;
}
const PRIORITY_COLORS = { high: 'bg-red-400', medium: 'bg-amber-400', low: 'bg-blue-300' };
const today = () => new Date().toISOString().split('T')[0];

// ── Single task row ────────────────────────────────────────────────
function TaskRow({ task, familyMembers, onToggle, onOpen }) {
  const member = familyMembers.find(m => m.id === task.assignedTo);
  const hasDetails = task.notes || (task.links && task.links.length > 0);

  return (
    <li className="flex items-center gap-3 group py-1.5">
      <input
        type="checkbox"
        className="custom-checkbox flex-shrink-0"
        checked={task.completed}
        onChange={onToggle}
      />
      <button
        onClick={onOpen}
        className={`flex-1 text-left text-sm leading-snug ${task.completed ? 'line-through text-stone-400' : 'text-stone-700 hover:text-stone-900'}`}
      >
        {task.text}
      </button>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {task.priority && <span className={`w-2 h-2 rounded-full ${PRIORITY_COLORS[task.priority]}`} title={task.priority} />}
        {member && (
          <span className="w-5 h-5 rounded-full text-white text-[9px] font-bold flex items-center justify-center" style={{ backgroundColor: member.color }}>
            {member.name.charAt(0)}
          </span>
        )}
        {task.dueDate && (
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
            isToday(task.dueDate) ? 'bg-terracotta-50 text-terracotta-500' : 'bg-stone-100 text-stone-400'
          }`}>
            {isToday(task.dueDate) ? 'Today' : new Date(task.dueDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        )}
        {hasDetails && (
          <span className="text-stone-300 group-hover:text-stone-400 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </span>
        )}
        <button
          onClick={onOpen}
          className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-stone-500 transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </li>
  );
}

// ── Task list tab content ──────────────────────────────────────────
function TaskListTab({ listKey, tasks, familyMembers, viewMode, onUpdate }) {
  const [newTask, setNewTask] = useState('');
  const [openTask, setOpenTask] = useState(null);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task = { id: `t${Date.now()}`, text: newTask.trim(), completed: false, dueDate: listKey === 'this-week' ? today() : '', notes: '', links: [], priority: null, assignedTo: null };
    onUpdate([task, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id) => onUpdate(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const saveTask = (updated) => {
    onUpdate(tasks.map(t => t.id === updated.id ? updated : t));
    setOpenTask(null);
  };

  const deleteTask = (id) => {
    onUpdate(tasks.filter(t => t.id !== id));
    setOpenTask(null);
  };

  const active = tasks.filter(t => !t.completed);
  const done = tasks.filter(t => t.completed);

  // Board view: group by Today / This Week / Later
  if (viewMode === 'board') {
    const cols = [
      { label: 'Today', items: active.filter(t => t.dueDate && isToday(t.dueDate)) },
      { label: 'This Week', items: active.filter(t => t.dueDate && isThisWeek(t.dueDate) && !isToday(t.dueDate)) },
      { label: 'Later / No date', items: active.filter(t => !t.dueDate || (!isToday(t.dueDate) && !isThisWeek(t.dueDate))) },
    ];
    return (
      <>
        {openTask && (
          <TaskDetailModal
            task={openTask} familyMembers={familyMembers}
            onSave={saveTask} onDelete={() => deleteTask(openTask.id)} onClose={() => setOpenTask(null)}
          />
        )}
        <form onSubmit={addTask} className="flex gap-2 mb-4">
          <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Add a task..." className="flex-1 text-sm border border-stone-200 rounded-xl px-3 py-2 text-stone-700 placeholder-stone-300 focus:border-sage-400 transition-colors" />
          <button type="submit" disabled={!newTask.trim()} className="bg-sage-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-sage-700 transition-colors disabled:opacity-40">Add</button>
        </form>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {cols.map(col => (
            <div key={col.label} className="min-w-[200px] flex-1">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2">{col.label} <span className="font-normal">({col.items.length})</span></p>
              <div className="space-y-2">
                {col.items.map(task => (
                  <div key={task.id} className="bg-stone-50 rounded-xl p-3 cursor-pointer hover:bg-stone-100 transition-colors" onClick={() => setOpenTask(task)}>
                    <div className="flex items-start gap-2">
                      <input type="checkbox" className="custom-checkbox mt-0.5 flex-shrink-0" checked={task.completed} onChange={e => { e.stopPropagation(); toggleTask(task.id); }} />
                      <span className="text-sm text-stone-700 leading-snug flex-1">{task.text}</span>
                    </div>
                    {task.priority && <span className={`mt-1.5 inline-block w-2 h-2 rounded-full ${PRIORITY_COLORS[task.priority]}`} />}
                  </div>
                ))}
                {col.items.length === 0 && <p className="text-xs text-stone-300 py-2 px-1">Nothing here</p>}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  // List view (default)
  return (
    <>
      {openTask && (
        <TaskDetailModal
          task={openTask} familyMembers={familyMembers}
          onSave={saveTask} onDelete={() => deleteTask(openTask.id)} onClose={() => setOpenTask(null)}
        />
      )}
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Add a task..." className="flex-1 text-sm border border-stone-200 rounded-xl px-3 py-2 text-stone-700 placeholder-stone-300 focus:border-sage-400 transition-colors" />
        <button type="submit" disabled={!newTask.trim()} className="bg-sage-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-sage-700 transition-colors disabled:opacity-40">Add</button>
      </form>
      {active.length === 0 && done.length === 0 ? (
        <p className="text-stone-300 text-sm py-4 text-center">No tasks yet. Add one above.</p>
      ) : (
        <ul className="divide-y divide-stone-50">
          {active.map(task => (
            <TaskRow key={task.id} task={task} familyMembers={familyMembers} onToggle={() => toggleTask(task.id)} onOpen={() => setOpenTask(task)} />
          ))}
          {done.length > 0 && (
            <>
              <li className="pt-3 pb-1"><p className="text-xs text-stone-400">Done ({done.length})</p></li>
              {done.map(task => (
                <TaskRow key={task.id} task={task} familyMembers={familyMembers} onToggle={() => toggleTask(task.id)} onOpen={() => setOpenTask(task)} />
              ))}
            </>
          )}
        </ul>
      )}
    </>
  );
}

// ── Meals Tab ──────────────────────────────────────────────────────
function MealsTab({ meals, mealPreferences, groceryItems, familyMembers, onUpdate }) {
  const [editingMeal, setEditingMeal] = useState(null);
  const [mealInput, setMealInput] = useState('');
  const [showPrefs, setShowPrefs] = useState(false);
  const [showGrocery, setShowGrocery] = useState(false);
  const [prefInput, setPrefInput] = useState({ type: null, value: '' });
  const [generatedList, setGeneratedList] = useState([]);
  const [newGrocery, setNewGrocery] = useState('');

  const curDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const saveMeal = (index) => {
    const name = mealInput.trim();
    const dbMatch = MEAL_DATABASE.find(m => m.name.toLowerCase() === name.toLowerCase());
    const updated = meals.map((m, i) => i === index ? { ...m, meal: name, ingredients: dbMatch ? dbMatch.ingredients : m.ingredients } : m);
    onUpdate({ meals: updated });
    setEditingMeal(null);
  };

  const handleGenerate = () => {
    const suggested = generateMealPlan(mealPreferences);
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const updated = meals.map(m => {
      const idx = weekdays.indexOf(m.day);
      if (idx >= 0 && idx < suggested.length) {
        const dbMatch = MEAL_DATABASE.find(db => db.name === suggested[idx]);
        return { ...m, meal: suggested[idx], ingredients: dbMatch ? dbMatch.ingredients : [] };
      }
      return m;
    });
    onUpdate({ meals: updated });
  };

  const handleBuildList = () => {
    const list = buildGroceryList(meals);
    setGeneratedList(list);
    setShowGrocery(true);
    const combined = [...new Set([...list, ...(groceryItems || []).map(g => g.text)])];
    const items = combined.map((text, i) => ({ id: `g${Date.now()}_${i}`, text, checked: false }));
    onUpdate({ groceryItems: items });
  };

  const toggleGroceryItem = (id) => {
    const updated = (groceryItems || []).map(g => g.id === id ? { ...g, checked: !g.checked } : g);
    onUpdate({ groceryItems: updated });
  };

  const addGroceryItem = (e) => {
    e.preventDefault();
    if (!newGrocery.trim()) return;
    const item = { id: `g${Date.now()}`, text: newGrocery.trim(), checked: false };
    onUpdate({ groceryItems: [...(groceryItems || []), item] });
    setNewGrocery('');
  };

  const clearChecked = () => onUpdate({ groceryItems: (groceryItems || []).filter(g => !g.checked) });

  const addPref = (type) => {
    if (!prefInput.value.trim()) return;
    const updated = { ...mealPreferences, [type]: [...(mealPreferences[type] || []), prefInput.value.trim()] };
    onUpdate({ mealPreferences: updated });
    setPrefInput({ type: null, value: '' });
  };

  const removePref = (type, val) => {
    onUpdate({ mealPreferences: { ...mealPreferences, [type]: mealPreferences[type].filter(v => v !== val) } });
  };

  return (
    <div className="space-y-4">
      {/* Meal plan */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wide">This Week's Meals</h3>
          <div className="flex gap-2">
            <button onClick={handleGenerate} className="text-xs text-sage-600 hover:text-sage-700 font-medium flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              Suggest plan
            </button>
            <button onClick={handleBuildList} className="text-xs bg-sage-600 text-white px-3 py-1 rounded-lg hover:bg-sage-700 transition-colors">
              Build grocery list
            </button>
          </div>
        </div>

        <div className="space-y-1">
          {meals.map((item, index) => (
            <div key={item.day} className={`flex items-center gap-3 rounded-xl px-3 py-2 ${item.day === curDay ? 'bg-sage-50' : ''}`}>
              <span className={`text-xs font-medium w-10 flex-shrink-0 ${item.day === curDay ? 'text-sage-600' : 'text-stone-400'}`}>
                {item.day.slice(0, 3)}
              </span>
              {editingMeal === index ? (
                <div className="flex-1 flex gap-2">
                  <input autoFocus type="text" value={mealInput} onChange={e => setMealInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') saveMeal(index); if (e.key === 'Escape') setEditingMeal(null); }}
                    onBlur={() => saveMeal(index)}
                    list="meal-suggestions"
                    className="flex-1 text-sm border border-stone-200 rounded-lg px-2 py-1 text-stone-700" />
                  <datalist id="meal-suggestions">
                    {MEAL_DATABASE.map(m => <option key={m.name} value={m.name} />)}
                  </datalist>
                </div>
              ) : (
                <button onClick={() => { setEditingMeal(index); setMealInput(item.meal); }} className="flex-1 text-left">
                  <span className={`text-sm ${item.meal ? 'text-stone-700' : 'text-stone-300'}`}>{item.meal || 'Add a meal...'}</span>
                </button>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-stone-400 mt-2 px-1">Tap any meal to edit · "Suggest plan" fills Mon–Fri from your preferences</p>
      </div>

      {/* Family preferences */}
      <div className="border border-stone-100 rounded-2xl overflow-hidden">
        <button onClick={() => setShowPrefs(!showPrefs)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-stone-50 transition-colors">
          <span className="text-sm font-medium text-stone-700">Family Preferences</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A8A29E" strokeWidth="2" className={`transition-transform ${showPrefs ? 'rotate-180' : ''}`}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {showPrefs && (
          <div className="px-4 pb-4 space-y-4 border-t border-stone-50">
            {[
              { key: 'restrictions', label: 'Dietary restrictions', placeholder: 'e.g. vegetarian, gluten-free' },
              { key: 'favorites', label: 'Family favorites', placeholder: 'e.g. pasta, tacos, chicken' },
              { key: 'avoid', label: 'Foods to avoid', placeholder: 'e.g. fish, lamb, spicy food' },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mt-3 mb-2">{label}</p>
                <div className="flex gap-1.5 flex-wrap mb-2">
                  {(mealPreferences[key] || []).map(val => (
                    <span key={val} className="badge bg-stone-100 text-stone-600 gap-1">
                      {val}
                      <button onClick={() => removePref(key, val)} className="text-stone-400 hover:text-red-400 ml-1">×</button>
                    </span>
                  ))}
                </div>
                {prefInput.type === key ? (
                  <div className="flex gap-2">
                    <input autoFocus type="text" value={prefInput.value} onChange={e => setPrefInput(p => ({ ...p, value: e.target.value }))}
                      onKeyDown={e => { if (e.key === 'Enter') addPref(key); if (e.key === 'Escape') setPrefInput({ type: null, value: '' }); }}
                      placeholder={placeholder}
                      className="flex-1 text-sm border border-stone-200 rounded-lg px-3 py-1.5 text-stone-700 placeholder-stone-300" />
                    <button onClick={() => addPref(key)} className="text-sm bg-sage-600 text-white px-3 py-1.5 rounded-lg">Add</button>
                  </div>
                ) : (
                  <button onClick={() => setPrefInput({ type: key, value: '' })} className="text-xs text-sage-600 hover:text-sage-700 font-medium">+ Add</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grocery list */}
      {(groceryItems && groceryItems.length > 0) && (
        <div className="border border-stone-100 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-stone-50">
            <span className="text-sm font-medium text-stone-700">Grocery List</span>
            <div className="flex gap-3">
              <button onClick={() => {
                const text = (groceryItems || []).filter(g => !g.checked).map(g => `• ${g.text}`).join('\n');
                navigator.clipboard?.writeText(text);
              }} className="text-xs text-stone-400 hover:text-stone-600">Copy</button>
              <button onClick={clearChecked} className="text-xs text-stone-400 hover:text-red-400 transition-colors">Clear checked</button>
            </div>
          </div>
          <div className="px-4 py-3">
            <form onSubmit={addGroceryItem} className="flex gap-2 mb-3">
              <input type="text" value={newGrocery} onChange={e => setNewGrocery(e.target.value)} placeholder="Add item..." className="flex-1 text-sm border border-stone-200 rounded-lg px-3 py-1.5 text-stone-700 placeholder-stone-300" />
              <button type="submit" disabled={!newGrocery.trim()} className="text-sm bg-sage-600 text-white px-3 py-1.5 rounded-lg disabled:opacity-40">Add</button>
            </form>
            <ul className="space-y-1.5 max-h-64 overflow-y-auto">
              {(groceryItems || []).map(item => (
                <li key={item.id} className="flex items-center gap-3">
                  <input type="checkbox" className="custom-checkbox" checked={item.checked} onChange={() => toggleGroceryItem(item.id)} />
                  <span className={`text-sm flex-1 ${item.checked ? 'line-through text-stone-400' : 'text-stone-700'}`}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {(!groceryItems || groceryItems.length === 0) && (
        <p className="text-xs text-stone-400 text-center py-2">Set your meal plan above then tap "Build grocery list" to auto-generate your shopping list.</p>
      )}
    </div>
  );
}

// ── Weekly Reset ───────────────────────────────────────────────────
function WeeklyReset({ weeklyReset, projects, onUpdate }) {
  const [open, setOpen] = useState(false);
  const done = weeklyReset.checklist.filter(i => i.completed).length;
  const total = weeklyReset.checklist.length;
  const activeProjects = (projects || []).filter(p => p.status === 'active');

  const toggle = (id) => {
    const updated = weeklyReset.checklist.map(i => i.id === id ? { ...i, completed: !i.completed } : i);
    onUpdate({ weeklyReset: { ...weeklyReset, checklist: updated } });
  };

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-terracotta-50 flex items-center justify-center">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C4603E" strokeWidth="2">
              <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-stone-700">Weekly Reset</p>
            <p className="text-xs text-stone-400">{done}/{total} · 5–10 min</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-14"><div className="progress-bar"><div className="progress-fill" style={{ width: `${Math.round((done/total)*100)}%` }} /></div></div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A8A29E" strokeWidth="2" className={`transition-transform ${open ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9" /></svg>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-stone-50">
          <div className="mt-3 mb-3">
            <label className="text-xs text-stone-400 mb-1.5 block">This week's focus area</label>
            <input
              type="text"
              list="focus-suggestions"
              value={weeklyReset.focusArea || ''}
              onChange={e => onUpdate({ weeklyReset: { ...weeklyReset, focusArea: e.target.value } })}
              placeholder="Type or pick an active project…"
              className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2 text-stone-700 placeholder-stone-300"
            />
            {activeProjects.length > 0 && (
              <datalist id="focus-suggestions">
                {activeProjects.map(p => <option key={p.id} value={p.title} />)}
              </datalist>
            )}
            {activeProjects.length > 0 && (
              <div className="flex gap-1.5 flex-wrap mt-2">
                {activeProjects.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onUpdate({ weeklyReset: { ...weeklyReset, focusArea: p.title } })}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                      weeklyReset.focusArea === p.title
                        ? 'bg-sage-600 text-white border-sage-600'
                        : 'border-stone-200 text-stone-500 hover:border-sage-300 hover:text-sage-600'
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            )}
          </div>
          <ul className="space-y-2">
            {weeklyReset.checklist.map(item => (
              <li key={item.id} className="flex items-center gap-3">
                <input type="checkbox" className="custom-checkbox" checked={item.completed} onChange={() => toggle(item.id)} />
                <span className={`text-sm ${item.completed ? 'line-through text-stone-400' : 'text-stone-700'}`}>{item.text}</span>
              </li>
            ))}
          </ul>
          {done === total && <div className="mt-3 bg-sage-50 rounded-xl p-3 text-center"><p className="text-sm text-sage-700 font-medium">Reset complete. You're set for the week.</p></div>}
        </div>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────
const TABS = [
  { key: 'this-week', label: 'This Week' },
  { key: 'routines', label: 'Routines' },
  { key: 'errands', label: 'Errands' },
  { key: 'meals', label: 'Meals' },
];

export default function HomeHub({ data, onUpdate }) {
  const { taskLists = {}, weeklyReset, meals, mealPreferences, groceryItems, familyMembers = [] } = data;
  const [activeTab, setActiveTab] = useState('this-week');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'board'

  const updateList = (key, items) => onUpdate({ taskLists: { ...taskLists, [key]: items } });

  return (
    <div className="space-fade max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <div className="mb-2">
        <p className="text-stone-400 text-sm">{formatDate()}</p>
        <h1 className="font-serif text-2xl text-stone-800 mt-1">{getDayGreeting()} 👋</h1>
        {weeklyReset.focusArea && (
          <div className="mt-3 flex items-center gap-2 bg-sage-50 border border-sage-100 rounded-xl px-4 py-2.5">
            <span className="text-xs text-sage-600 font-medium">This week:</span>
            <span className="text-sm text-stone-700 font-medium flex-1">{weeklyReset.focusArea}</span>
            <button onClick={() => onUpdate({ weeklyReset: { ...weeklyReset, focusArea: '' } })} className="text-stone-300 hover:text-stone-500 transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
        )}
      </div>

      {/* Tab bar + view toggle */}
      <div className="bg-white rounded-2xl shadow-card">
        <div className="flex items-center border-b border-stone-100 px-1 pt-1">
          <div className="flex flex-1 overflow-x-auto">
            {TABS.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.key ? 'border-sage-500 text-sage-700' : 'border-transparent text-stone-400 hover:text-stone-600'
                }`}>
                {tab.label}
                {tab.key !== 'meals' && taskLists[tab.key] && (
                  <span className="ml-1.5 text-xs text-stone-400">
                    {(taskLists[tab.key] || []).filter(t => !t.completed).length}
                  </span>
                )}
              </button>
            ))}
          </div>
          {activeTab !== 'meals' && (
            <div className="flex gap-1 px-2 pb-1 flex-shrink-0">
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-stone-100 text-stone-600' : 'text-stone-400 hover:text-stone-500'}`} title="List view">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
              </button>
              <button onClick={() => setViewMode('board')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'board' ? 'bg-stone-100 text-stone-600' : 'text-stone-400 hover:text-stone-500'}`} title="Board view">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="5" height="18" rx="1" /><rect x="10" y="3" width="5" height="12" rx="1" /><rect x="17" y="3" width="5" height="15" rx="1" /></svg>
              </button>
            </div>
          )}
        </div>

        <div className="p-4">
          {activeTab === 'meals' ? (
            <MealsTab meals={meals} mealPreferences={mealPreferences} groceryItems={groceryItems} familyMembers={familyMembers} onUpdate={onUpdate} />
          ) : (
            <TaskListTab
              listKey={activeTab}
              tasks={taskLists[activeTab] || []}
              familyMembers={familyMembers}
              viewMode={viewMode}
              onUpdate={(items) => updateList(activeTab, items)}
            />
          )}
        </div>
      </div>

      {/* Weekly Reset */}
      <WeeklyReset weeklyReset={weeklyReset} projects={data.projects} onUpdate={onUpdate} />
    </div>
  );
}

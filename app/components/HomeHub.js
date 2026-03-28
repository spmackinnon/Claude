'use client';
import { useState } from 'react';

function getDayGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });
}

export default function HomeHub({ data, onUpdate }) {
  const { tasks, weeklyReset, meals } = data;
  const [newTask, setNewTask] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [mealInput, setMealInput] = useState('');

  // ── Tasks ──────────────────────────────────────────────
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task = {
      id: `t${Date.now()}`,
      text: newTask.trim(),
      completed: false,
      date: new Date().toISOString().split('T')[0],
    };
    onUpdate({ tasks: [task, ...tasks] });
    setNewTask('');
  };

  const toggleTask = (id) => {
    onUpdate({ tasks: tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t) });
  };

  const deleteTask = (id) => {
    onUpdate({ tasks: tasks.filter(t => t.id !== id) });
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  // ── Weekly Reset ───────────────────────────────────────
  const toggleResetItem = (id) => {
    const updated = weeklyReset.checklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    const allDone = updated.every(i => i.completed);
    onUpdate({
      weeklyReset: {
        ...weeklyReset,
        checklist: updated,
        lastCompleted: allDone ? new Date().toISOString() : weeklyReset.lastCompleted,
      }
    });
  };

  const resetChecklist = () => {
    onUpdate({
      weeklyReset: {
        ...weeklyReset,
        checklist: weeklyReset.checklist.map(i => ({ ...i, completed: false })),
      }
    });
  };

  const completedCount = weeklyReset.checklist.filter(i => i.completed).length;
  const totalCount = weeklyReset.checklist.length;
  const resetProgress = Math.round((completedCount / totalCount) * 100);

  // ── Meals ──────────────────────────────────────────────
  const startEditMeal = (index, currentMeal) => {
    setEditingMeal(index);
    setMealInput(currentMeal);
  };

  const saveMeal = (index) => {
    const updated = meals.map((m, i) => i === index ? { ...m, meal: mealInput.trim() } : m);
    onUpdate({ meals: updated });
    setEditingMeal(null);
    setMealInput('');
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="space-fade max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <p className="text-stone-400 text-sm">{formatDate()}</p>
        <h1 className="font-serif text-2xl text-stone-800 mt-1">{getDayGreeting()} 👋</h1>
        <p className="text-stone-500 text-sm mt-1">
          Your home base for today. Start here — everything else can wait.
        </p>
      </div>

      {/* Focus Area Banner */}
      {weeklyReset.focusArea && (
        <div className="bg-sage-50 border border-sage-200 rounded-xl px-4 py-3 mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-sage-600 font-medium uppercase tracking-wide">This Week's Focus</p>
            <p className="text-stone-700 font-medium mt-0.5">{weeklyReset.focusArea}</p>
          </div>
          <button
            onClick={() => onUpdate({ weeklyReset: { ...weeklyReset, focusArea: '' } })}
            className="text-stone-300 hover:text-stone-500 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {/* Add Task */}
      <div className="bg-white rounded-2xl shadow-card p-4 mb-4">
        <form onSubmit={addTask} className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="Add a task for today..."
            className="flex-1 text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300 focus:border-sage-400 transition-colors"
          />
          <button
            type="submit"
            disabled={!newTask.trim()}
            className="bg-sage-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sage-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </form>
      </div>

      {/* Active Tasks */}
      <div className="bg-white rounded-2xl shadow-card p-4 mb-4">
        <h2 className="text-sm font-semibold text-stone-600 uppercase tracking-wide mb-3">
          Tasks ({activeTasks.length})
        </h2>
        {activeTasks.length === 0 ? (
          <p className="text-stone-300 text-sm py-2">No active tasks — enjoy the breathing room.</p>
        ) : (
          <ul className="space-y-2">
            {activeTasks.map(task => (
              <li key={task.id} className="flex items-center gap-3 group">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="flex-1 text-sm text-stone-700">{task.text}</span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-400 transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Completed tasks */}
        {completedTasks.length > 0 && (
          <div className="mt-3 pt-3 border-t border-stone-100">
            <p className="text-xs text-stone-400 mb-2">Completed ({completedTasks.length})</p>
            <ul className="space-y-1.5">
              {completedTasks.map(task => (
                <li key={task.id} className="flex items-center gap-3 group">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className="flex-1 text-sm text-stone-400 line-through">{task.text}</span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-400 transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Weekly Reset */}
      <div className="bg-white rounded-2xl shadow-card p-4 mb-4">
        <button
          onClick={() => setShowReset(!showReset)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-terracotta-50 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4603E" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            </div>
            <div className="text-left">
              <h2 className="text-sm font-semibold text-stone-700">Weekly Reset</h2>
              <p className="text-xs text-stone-400">{completedCount}/{totalCount} done · 5–10 min</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-16">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${resetProgress}%` }} />
              </div>
            </div>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A8A29E" strokeWidth="2"
              className={`transition-transform ${showReset ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </button>

        {showReset && (
          <div className="mt-4 space-y-2">
            {/* Weekly prompts */}
            <div className="bg-stone-50 rounded-xl p-3 mb-3">
              <p className="text-xs font-medium text-stone-500 mb-2">Planning prompts</p>
              <ul className="space-y-1">
                {['What actually needs to happen this week?', "What's one thing that would make life easier right now?", 'What can you let go of?'].map((q, i) => (
                  <li key={i} className="text-xs text-stone-500 flex gap-1.5">
                    <span className="text-stone-300">›</span> {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* Focus area */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={weeklyReset.focusArea}
                onChange={e => onUpdate({ weeklyReset: { ...weeklyReset, focusArea: e.target.value } })}
                placeholder="This week's focus area (optional)..."
                className="flex-1 text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300"
              />
            </div>

            {/* Checklist */}
            <ul className="space-y-2">
              {weeklyReset.checklist.map(item => (
                <li key={item.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={item.completed}
                    onChange={() => toggleResetItem(item.id)}
                  />
                  <span className={`text-sm ${item.completed ? 'line-through text-stone-400' : 'text-stone-700'}`}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
            {completedCount === totalCount && (
              <div className="mt-3 bg-sage-50 rounded-xl p-3 text-center">
                <p className="text-sm text-sage-700 font-medium">Reset complete. You're set for the week.</p>
              </div>
            )}
            <button
              onClick={resetChecklist}
              className="mt-3 text-xs text-stone-400 hover:text-stone-600 transition-colors"
            >
              Start over
            </button>
          </div>
        )}
      </div>

      {/* Meal Plan */}
      <div className="bg-white rounded-2xl shadow-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-stone-600 uppercase tracking-wide">This Week's Meals</h2>
          <span className="text-xs text-stone-400">Click to edit</span>
        </div>
        <div className="space-y-1.5">
          {meals.map((item, index) => {
            const isToday = item.day === today;
            return (
              <div
                key={item.day}
                className={`flex items-center gap-3 rounded-lg px-2 py-1.5 ${isToday ? 'bg-sage-50' : ''}`}
              >
                <span className={`text-xs font-medium w-10 ${isToday ? 'text-sage-600' : 'text-stone-400'}`}>
                  {item.day.slice(0, 3)}
                </span>
                {editingMeal === index ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      autoFocus
                      type="text"
                      value={mealInput}
                      onChange={e => setMealInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && saveMeal(index)}
                      onBlur={() => saveMeal(index)}
                      className="flex-1 text-sm border border-stone-200 rounded-lg px-2 py-1 text-stone-700"
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => startEditMeal(index, item.meal)}
                    className="flex-1 text-left"
                  >
                    <span className={`text-sm ${item.meal ? 'text-stone-700' : 'text-stone-300'}`}>
                      {item.meal || 'Add a meal...'}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <p className="text-xs text-stone-400 mt-3">Tip: Plan 3–5 meals. You don't need all 7.</p>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';

const STATUS_STYLES = {
  active: { label: 'Active', bg: 'bg-sage-50', text: 'text-sage-700', dot: 'bg-sage-500' },
  paused: { label: 'Paused', bg: 'bg-stone-100', text: 'text-stone-500', dot: 'bg-stone-400' },
  done: { label: 'Done', bg: 'bg-terracotta-50', text: 'text-terracotta-600', dot: 'bg-terracotta-400' },
};

function ProjectCard({ project, onClick }) {
  const style = STATUS_STYLES[project.status] || STATUS_STYLES.active;
  const done = project.subtasks.filter(s => s.completed).length;
  const total = project.subtasks.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl shadow-card p-4 text-left hover:shadow-card-hover transition-all group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="text-base font-semibold text-stone-800 group-hover:text-sage-700 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-stone-500 mt-0.5 line-clamp-2">{project.description}</p>
        </div>
        <span className={`badge ${style.bg} ${style.text} flex-shrink-0`}>
          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${style.dot}`} />
          {style.label}
        </span>
      </div>

      {total > 0 && (
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-stone-400">{done}/{total} subtasks</span>
            <span className="text-xs text-stone-400">{pct}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      {project.dueDate && (
        <p className="text-xs text-stone-400 mt-2">
          📅 Due {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
      )}
    </button>
  );
}

function ProjectDetail({ project, onUpdate, onDelete, onBack }) {
  const [showAddSubtask, setShowAddSubtask] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState(project.notes);

  const toggleSubtask = (id) => {
    const updated = {
      ...project,
      subtasks: project.subtasks.map(s => s.id === id ? { ...s, completed: !s.completed } : s),
    };
    onUpdate(updated);
  };

  const addSubtask = (e) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    const updated = {
      ...project,
      subtasks: [...project.subtasks, { id: `ps${Date.now()}`, text: newSubtask.trim(), completed: false }],
    };
    onUpdate(updated);
    setNewSubtask('');
    setShowAddSubtask(false);
  };

  const deleteSubtask = (id) => {
    onUpdate({ ...project, subtasks: project.subtasks.filter(s => s.id !== id) });
  };

  const setStatus = (status) => onUpdate({ ...project, status });

  const saveNotes = () => {
    onUpdate({ ...project, notes });
    setEditingNotes(false);
  };

  const done = project.subtasks.filter(s => s.completed).length;
  const total = project.subtasks.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const style = STATUS_STYLES[project.status] || STATUS_STYLES.active;

  return (
    <div className="space-fade">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-600 mb-5 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        All Projects
      </button>

      <div className="bg-white rounded-2xl shadow-card p-5 mb-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-1">
            <h2 className="font-serif text-xl text-stone-800">{project.title}</h2>
            <p className="text-sm text-stone-500 mt-1">{project.description}</p>
          </div>
          <div className="flex gap-1">
            {Object.entries(STATUS_STYLES).map(([status, s]) => (
              <button
                key={status}
                onClick={() => setStatus(status)}
                className={`badge ${project.status === status ? `${s.bg} ${s.text}` : 'bg-stone-50 text-stone-400'} transition-all`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Progress */}
        {total > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-stone-500 font-medium">{done} of {total} done</span>
              <span className="text-xs text-sage-600 font-medium">{pct}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}

        {/* Subtasks */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Subtasks</h3>
            <button
              onClick={() => setShowAddSubtask(!showAddSubtask)}
              className="text-xs text-sage-600 hover:text-sage-700 font-medium"
            >
              + Add
            </button>
          </div>

          {showAddSubtask && (
            <form onSubmit={addSubtask} className="flex gap-2 mb-3">
              <input
                autoFocus
                type="text"
                value={newSubtask}
                onChange={e => setNewSubtask(e.target.value)}
                placeholder="Add a subtask..."
                className="flex-1 text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300"
              />
              <button
                type="submit"
                className="text-sm bg-sage-600 text-white px-3 py-2 rounded-lg hover:bg-sage-700 transition-colors"
              >
                Add
              </button>
            </form>
          )}

          {project.subtasks.length === 0 ? (
            <p className="text-sm text-stone-300 py-2">No subtasks yet — add one above.</p>
          ) : (
            <ul className="space-y-2">
              {project.subtasks.map(subtask => (
                <li key={subtask.id} className="flex items-center gap-3 group">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={subtask.completed}
                    onChange={() => toggleSubtask(subtask.id)}
                  />
                  <span className={`flex-1 text-sm ${subtask.completed ? 'line-through text-stone-400' : 'text-stone-700'}`}>
                    {subtask.text}
                  </span>
                  <button
                    onClick={() => deleteSubtask(subtask.id)}
                    className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-400 transition-all"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-2xl shadow-card p-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Notes</h3>
          {!editingNotes && (
            <button onClick={() => setEditingNotes(true)} className="text-xs text-sage-600 hover:text-sage-700">
              Edit
            </button>
          )}
        </div>
        {editingNotes ? (
          <div>
            <textarea
              autoFocus
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={4}
              className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2 text-stone-700 resize-none"
              placeholder="Notes, reminders, context..."
            />
            <div className="flex gap-2 mt-2 justify-end">
              <button onClick={() => setEditingNotes(false)} className="text-xs text-stone-400 px-3 py-1.5">Cancel</button>
              <button onClick={saveNotes} className="text-xs bg-sage-600 text-white px-4 py-1.5 rounded-lg">Save</button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-stone-600 whitespace-pre-wrap">
            {project.notes || <span className="text-stone-300">No notes yet.</span>}
          </p>
        )}
      </div>

      {/* Prompt */}
      <div className="bg-stone-50 rounded-xl p-4 mb-4">
        <p className="text-xs text-stone-400 font-medium mb-1">Project prompt</p>
        <p className="text-sm text-stone-500 italic">"What's one small reset that would improve your home?"</p>
      </div>

      {/* Delete */}
      <button
        onClick={onDelete}
        className="text-xs text-stone-300 hover:text-red-400 transition-colors"
      >
        Delete this project
      </button>
    </div>
  );
}

export default function Projects({ data, onUpdate }) {
  const { projects } = data;
  const [selectedId, setSelectedId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', status: 'active', dueDate: '' });

  const selectedProject = projects.find(p => p.id === selectedId);

  const addProject = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const newProject = {
      id: `p${Date.now()}`,
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      dueDate: form.dueDate,
      subtasks: [],
      notes: '',
    };
    onUpdate({ projects: [...projects, newProject] });
    setForm({ title: '', description: '', status: 'active', dueDate: '' });
    setShowAdd(false);
  };

  const updateProject = (updated) => {
    onUpdate({ projects: projects.map(p => p.id === updated.id ? updated : p) });
  };

  const deleteProject = () => {
    onUpdate({ projects: projects.filter(p => p.id !== selectedId) });
    setSelectedId(null);
  };

  if (selectedProject) {
    return (
      <div className="max-w-2xl mx-auto">
        <ProjectDetail
          project={selectedProject}
          onUpdate={updateProject}
          onDelete={deleteProject}
          onBack={() => setSelectedId(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-fade max-w-2xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl text-stone-800">Projects & Events</h1>
          <p className="text-stone-500 text-sm mt-1">
            For anything that has a start, end, and multiple steps.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 bg-sage-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-sage-700 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Project
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <form onSubmit={addProject} className="bg-white rounded-2xl shadow-card p-5 mb-4 space-y-3">
          <h3 className="text-sm font-semibold text-stone-700">New Project</h3>
          <input
            type="text"
            placeholder="Project name *"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300"
            autoFocus
          />
          <textarea
            placeholder="What's this project about? (optional)"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={2}
            className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300 resize-none"
          />
          <div className="flex gap-3">
            <select
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
              className="text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 bg-white"
            >
              <option value="active">Active</option>
              <option value="paused">Paused</option>
            </select>
            <input
              type="date"
              value={form.dueDate}
              onChange={e => setForm({ ...form, dueDate: e.target.value })}
              className="text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-500"
            />
          </div>
          <div className="flex gap-2 justify-end pt-1">
            <button type="button" onClick={() => setShowAdd(false)} className="text-sm text-stone-400 px-3 py-1.5 hover:text-stone-600">Cancel</button>
            <button type="submit" className="text-sm bg-sage-600 text-white px-4 py-2 rounded-lg hover:bg-sage-700 transition-colors">Create Project</button>
          </div>
        </form>
      )}

      {/* Project cards */}
      <div className="space-y-3">
        {projects.filter(p => p.status !== 'done').map(project => (
          <ProjectCard key={project.id} project={project} onClick={() => setSelectedId(project.id)} />
        ))}
      </div>

      {/* Done projects */}
      {projects.some(p => p.status === 'done') && (
        <div className="mt-6">
          <p className="text-xs text-stone-400 font-medium uppercase tracking-wide mb-3">Completed</p>
          <div className="space-y-3 opacity-60">
            {projects.filter(p => p.status === 'done').map(project => (
              <ProjectCard key={project.id} project={project} onClick={() => setSelectedId(project.id)} />
            ))}
          </div>
        </div>
      )}

      {projects.length === 0 && !showAdd && (
        <div className="text-center py-12">
          <p className="text-stone-300 text-sm mb-2">No projects yet.</p>
          <p className="text-xs text-stone-300">Projects are for anything that ends — a room reset, a trip, an event.</p>
        </div>
      )}

      {/* Clarifier */}
      <div className="mt-6 bg-stone-50 rounded-xl p-4">
        <p className="text-xs text-stone-400 font-medium mb-1.5">Project vs. Routine?</p>
        <p className="text-sm text-stone-500">
          <span className="font-medium">Routine</span> = repeats regularly (weekly dinner planning, school pickups).<br />
          <span className="font-medium">Project</span> = has a finish line (guest room refresh, planning a birthday party).
        </p>
      </div>
    </div>
  );
}

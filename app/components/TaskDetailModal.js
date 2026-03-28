'use client';
import { useState } from 'react';

const PRIORITIES = [
  { value: null, label: 'None', color: 'text-stone-400', dot: 'bg-stone-300' },
  { value: 'high', label: 'High', color: 'text-red-500', dot: 'bg-red-400' },
  { value: 'medium', label: 'Medium', color: 'text-amber-500', dot: 'bg-amber-400' },
  { value: 'low', label: 'Low', color: 'text-blue-400', dot: 'bg-blue-300' },
];

export default function TaskDetailModal({ task, familyMembers, onSave, onDelete, onClose }) {
  const [form, setForm] = useState({
    text: task.text,
    dueDate: task.dueDate || '',
    priority: task.priority || null,
    assignedTo: task.assignedTo || null,
    notes: task.notes || '',
    links: task.links || [],
  });
  const [newLink, setNewLink] = useState({ url: '', label: '' });
  const [showAddLink, setShowAddLink] = useState(false);

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const addLink = () => {
    if (!newLink.url.trim()) return;
    update('links', [...form.links, { ...newLink, url: newLink.url.trim(), label: newLink.label.trim() || newLink.url.trim() }]);
    setNewLink({ url: '', label: '' });
    setShowAddLink(false);
  };

  const removeLink = (idx) => {
    update('links', form.links.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    if (!form.text.trim()) return;
    onSave({ ...task, ...form });
  };

  return (
    <div className="modal-backdrop fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="modal-panel bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-stone-100">
          <h3 className="font-serif text-lg text-stone-800">Task Details</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 p-1 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-4 overflow-y-auto flex-1 space-y-4">
          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-1.5">Task</label>
            <textarea
              value={form.text}
              onChange={e => update('text', e.target.value)}
              rows={2}
              className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2.5 text-stone-700 resize-none focus:border-sage-400 transition-colors"
            />
          </div>

          {/* Due date + Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-1.5">Due Date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={e => update('dueDate', e.target.value)}
                className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2.5 text-stone-600"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-1.5">Priority</label>
              <div className="flex gap-1 flex-wrap">
                {PRIORITIES.map(p => (
                  <button
                    key={String(p.value)}
                    onClick={() => update('priority', p.value)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      form.priority === p.value
                        ? 'border-stone-300 bg-stone-100 text-stone-700'
                        : 'border-stone-100 text-stone-400 hover:border-stone-200'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${p.dot}`} />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Assigned to */}
          {familyMembers.length > 0 && (
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-1.5">Assigned To</label>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => update('assignedTo', null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    !form.assignedTo ? 'bg-stone-800 text-white border-stone-800' : 'bg-stone-50 text-stone-400 border-stone-100 hover:border-stone-200'
                  }`}
                >
                  Anyone
                </button>
                {familyMembers.map(m => (
                  <button
                    key={m.id}
                    onClick={() => update('assignedTo', m.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      form.assignedTo === m.id ? 'text-white border-transparent' : 'bg-stone-50 text-stone-500 border-stone-100 hover:border-stone-200'
                    }`}
                    style={form.assignedTo === m.id ? { backgroundColor: m.color, borderColor: m.color } : {}}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-1.5">Notes</label>
            <textarea
              value={form.notes}
              onChange={e => update('notes', e.target.value)}
              rows={3}
              placeholder="Add context, reminders, or details..."
              className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2.5 text-stone-700 resize-none placeholder-stone-300 focus:border-sage-400 transition-colors"
            />
          </div>

          {/* Links */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Links</label>
              <button
                onClick={() => setShowAddLink(!showAddLink)}
                className="text-xs text-sage-600 hover:text-sage-700 font-medium"
              >
                + Add link
              </button>
            </div>

            {showAddLink && (
              <div className="bg-stone-50 rounded-xl p-3 mb-2 space-y-2">
                <input
                  type="url"
                  value={newLink.url}
                  onChange={e => setNewLink(l => ({ ...l, url: e.target.value }))}
                  placeholder="https://..."
                  className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300"
                />
                <input
                  type="text"
                  value={newLink.label}
                  onChange={e => setNewLink(l => ({ ...l, label: e.target.value }))}
                  placeholder="Label (optional)"
                  className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300"
                />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setShowAddLink(false)} className="text-xs text-stone-400 px-3 py-1.5">Cancel</button>
                  <button onClick={addLink} className="text-xs bg-sage-600 text-white px-4 py-1.5 rounded-lg hover:bg-sage-700 transition-colors">Add</button>
                </div>
              </div>
            )}

            {form.links.length > 0 && (
              <div className="space-y-1.5">
                {form.links.map((link, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-stone-50 rounded-lg px-3 py-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#78716C" strokeWidth="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-xs text-sage-600 hover:underline truncate"
                    >
                      {link.label}
                    </a>
                    <button onClick={() => removeLink(idx)} className="text-stone-300 hover:text-red-400 transition-colors">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
          <button
            onClick={onDelete}
            className="text-xs text-stone-300 hover:text-red-400 transition-colors"
          >
            Delete task
          </button>
          <div className="flex gap-2">
            <button onClick={onClose} className="text-sm text-stone-400 px-4 py-2 hover:text-stone-600 transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!form.text.trim()}
              className="bg-sage-600 text-white text-sm font-medium px-5 py-2 rounded-xl hover:bg-sage-700 transition-colors disabled:opacity-40"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

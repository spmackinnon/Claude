'use client';
import { useState } from 'react';
import { FAMILY_COLORS } from '../../lib/defaultData';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const EVENT_TYPES = ['appointment', 'event', 'reminder'];

function toDateStr(date) {
  return date.toISOString().split('T')[0];
}

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const days = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ date: new Date(year, month - 1, daysInPrev - i), current: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ date: new Date(year, month, d), current: true });
  }
  while (days.length < 42) {
    days.push({ date: new Date(year, month + 1, days.length - firstDay - daysInMonth + 1), current: false });
  }
  return days;
}

// ── Appointment form modal ─────────────────────────────────────────
function AppointmentModal({ appointment, initialDate, familyMembers, onSave, onDelete, onClose }) {
  const isNew = !appointment;
  const [form, setForm] = useState(appointment ? { ...appointment } : {
    title: '',
    date: initialDate || toDateStr(new Date()),
    startTime: '',
    endTime: '',
    personId: null,
    type: 'appointment',
    notes: '',
  });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="modal-backdrop fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="modal-panel bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-stone-100">
          <h3 className="font-serif text-lg text-stone-800">{isNew ? 'Add Appointment' : 'Edit Appointment'}</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-4 space-y-4 overflow-y-auto">
          <div>
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-1.5">Title *</label>
            <input type="text" value={form.title} onChange={e => update('title', e.target.value)} placeholder="What is this?" autoFocus
              className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2.5 text-stone-700 placeholder-stone-300 focus:border-sage-400 transition-colors" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-3 sm:col-span-1">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-1.5">Date</label>
              <input type="date" value={form.date} onChange={e => update('date', e.target.value)}
                className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2.5 text-stone-600" />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-1.5">Start</label>
              <input type="time" value={form.startTime} onChange={e => update('startTime', e.target.value)}
                className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2.5 text-stone-600" />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-1.5">End</label>
              <input type="time" value={form.endTime} onChange={e => update('endTime', e.target.value)}
                className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2.5 text-stone-600" />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-1.5">Type</label>
            <div className="flex gap-2">
              {EVENT_TYPES.map(t => (
                <button key={t} onClick={() => update('type', t)}
                  className={`flex-1 py-2 text-xs font-medium rounded-xl border capitalize transition-all ${
                    form.type === t ? 'bg-sage-600 text-white border-sage-600' : 'border-stone-200 text-stone-500 hover:border-stone-300'
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Who */}
          <div>
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-1.5">Who</label>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => update('personId', null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  !form.personId ? 'bg-stone-800 text-white border-stone-800' : 'border-stone-200 text-stone-500 hover:border-stone-300'
                }`}>
                Everyone
              </button>
              {familyMembers.map(m => (
                <button key={m.id} onClick={() => update('personId', m.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    form.personId === m.id ? 'text-white border-transparent' : 'border-stone-200 text-stone-500 hover:border-stone-300'
                  }`}
                  style={form.personId === m.id ? { backgroundColor: m.color } : {}}>
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-1.5">Notes</label>
            <textarea value={form.notes} onChange={e => update('notes', e.target.value)} rows={2} placeholder="Any details..."
              className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2.5 text-stone-700 placeholder-stone-300 resize-none" />
          </div>
        </div>

        <div className="px-5 pb-5 pt-3 border-t border-stone-100 flex items-center justify-between">
          {!isNew ? (
            <button onClick={onDelete} className="text-xs text-stone-300 hover:text-red-400 transition-colors">Delete</button>
          ) : <div />}
          <div className="flex gap-2">
            <button onClick={onClose} className="text-sm text-stone-400 px-4 py-2 hover:text-stone-600">Cancel</button>
            <button onClick={() => form.title.trim() && onSave(form)} disabled={!form.title.trim()}
              className="bg-sage-600 text-white text-sm font-medium px-5 py-2 rounded-xl hover:bg-sage-700 transition-colors disabled:opacity-40">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Family member settings ─────────────────────────────────────────
function FamilySettings({ familyMembers, onUpdate, onClose }) {
  const [members, setMembers] = useState([...familyMembers]);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState(FAMILY_COLORS[members.length % FAMILY_COLORS.length]);

  const addMember = () => {
    if (!newName.trim()) return;
    setMembers(m => [...m, { id: `fm${Date.now()}`, name: newName.trim(), color: newColor }]);
    setNewName('');
    setNewColor(FAMILY_COLORS[(members.length + 1) % FAMILY_COLORS.length]);
  };

  const removeMember = (id) => setMembers(m => m.filter(fm => fm.id !== id));

  return (
    <div className="modal-backdrop fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="modal-panel bg-white rounded-2xl shadow-2xl max-w-sm w-full">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-stone-100">
          <h3 className="font-serif text-lg text-stone-800">Family Members</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="px-5 py-4 space-y-3">
          {members.map(m => (
            <div key={m.id} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full flex-shrink-0" style={{ backgroundColor: m.color }} />
              <span className="flex-1 text-sm text-stone-700">{m.name}</span>
              <button onClick={() => removeMember(m.id)} className="text-stone-300 hover:text-red-400 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
          <div className="flex gap-2 pt-2 border-t border-stone-100">
            <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Add person..."
              onKeyDown={e => e.key === 'Enter' && addMember()}
              className="flex-1 text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300" />
            <div className="flex gap-1 flex-wrap max-w-[80px]">
              {FAMILY_COLORS.map(c => (
                <button key={c} onClick={() => setNewColor(c)} className={`w-5 h-5 rounded-full transition-all ${newColor === c ? 'ring-2 ring-offset-1 ring-stone-400' : ''}`} style={{ backgroundColor: c }} />
              ))}
            </div>
            <button onClick={addMember} disabled={!newName.trim()}
              className="text-sm bg-sage-600 text-white px-3 py-2 rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-40">
              Add
            </button>
          </div>
        </div>
        <div className="px-5 pb-5">
          <button onClick={() => onUpdate(members)} className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium py-2.5 rounded-xl transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Calendar ──────────────────────────────────────────────────
export default function Calendar({ data, onUpdate }) {
  const { appointments = [], familyMembers = [], taskLists = {} } = data;

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [addingFor, setAddingFor] = useState(null);   // date string
  const [editing, setEditing] = useState(null);         // appointment object
  const [showFamily, setShowFamily] = useState(false);

  const todayStr = toDateStr(now);
  const calDays = getCalendarDays(year, month);

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const getEventsForDay = (dateStr) => {
    const appts = appointments.filter(a => a.date === dateStr);
    // Also show tasks with due dates on this day
    const tasks = Object.values(taskLists).flat().filter(t => t.dueDate === dateStr && !t.completed);
    return { appts, tasks };
  };

  const getMemberColor = (personId) => {
    if (!personId) return '#A8A29E';
    return familyMembers.find(m => m.id === personId)?.color || '#A8A29E';
  };

  const saveAppointment = (form) => {
    if (editing) {
      onUpdate({ appointments: appointments.map(a => a.id === editing.id ? { ...editing, ...form } : a) });
    } else {
      onUpdate({ appointments: [...appointments, { id: `ap${Date.now()}`, ...form }] });
    }
    setAddingFor(null);
    setEditing(null);
  };

  const deleteAppointment = () => {
    onUpdate({ appointments: appointments.filter(a => a.id !== editing.id) });
    setEditing(null);
  };

  // Upcoming events list (next 30 days)
  const upcoming = appointments
    .filter(a => a.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))
    .slice(0, 10);

  return (
    <div className="space-fade max-w-2xl mx-auto">
      {/* Modals */}
      {(addingFor || editing) && (
        <AppointmentModal
          appointment={editing}
          initialDate={addingFor}
          familyMembers={familyMembers}
          onSave={saveAppointment}
          onDelete={deleteAppointment}
          onClose={() => { setAddingFor(null); setEditing(null); }}
        />
      )}
      {showFamily && (
        <FamilySettings
          familyMembers={familyMembers}
          onUpdate={(members) => { onUpdate({ familyMembers: members }); setShowFamily(false); }}
          onClose={() => setShowFamily(false)}
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="font-serif text-2xl text-stone-800">Calendar</h1>
          <p className="text-stone-500 text-sm mt-1">Appointments, events, and reminders.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowFamily(true)} className="flex items-center gap-1.5 text-sm text-stone-500 border border-stone-200 px-3 py-2 rounded-xl hover:bg-stone-50 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Family
          </button>
          <button onClick={() => setAddingFor(todayStr)} className="flex items-center gap-1.5 bg-sage-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-sage-700 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add
          </button>
        </div>
      </div>

      {/* Family legend */}
      {familyMembers.length > 0 && (
        <div className="flex gap-3 flex-wrap mb-3">
          {familyMembers.map(m => (
            <div key={m.id} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }} />
              <span className="text-xs text-stone-500">{m.name}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-stone-400" />
            <span className="text-xs text-stone-400">Everyone</span>
          </div>
        </div>
      )}

      {/* Calendar grid */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden mb-4">
        {/* Month nav */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100">
          <button onClick={prevMonth} className="p-2 hover:bg-stone-50 rounded-lg transition-colors text-stone-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button onClick={() => { setMonth(now.getMonth()); setYear(now.getFullYear()); }}
            className="text-sm font-semibold text-stone-700 hover:text-sage-600 transition-colors">
            {MONTHS[month]} {year}
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-stone-50 rounded-lg transition-colors text-stone-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-stone-50">
          {DAYS.map(d => (
            <div key={d} className="text-center text-[10px] font-semibold text-stone-400 py-2 uppercase tracking-wide">{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7">
          {calDays.map(({ date, current }, idx) => {
            const dateStr = toDateStr(date);
            const isToday = dateStr === todayStr;
            const { appts, tasks } = getEventsForDay(dateStr);
            const allEvents = [...appts, ...tasks.map(t => ({ ...t, _isTask: true }))];

            return (
              <div key={idx}
                className={`min-h-[72px] border-b border-r border-stone-50 p-1.5 cursor-pointer transition-colors group ${
                  current ? 'hover:bg-sage-50/50' : 'bg-stone-50/50'
                }`}
                onClick={() => setAddingFor(dateStr)}>
                {/* Date number */}
                <div className={`text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full mb-1 ${
                  isToday ? 'bg-sage-600 text-white' : current ? 'text-stone-700' : 'text-stone-300'
                }`}>
                  {date.getDate()}
                </div>

                {/* Events */}
                <div className="space-y-0.5">
                  {allEvents.slice(0, 3).map((ev, i) => (
                    <div key={i}
                      onClick={e => { e.stopPropagation(); if (!ev._isTask) setEditing(ev); }}
                      className="flex items-center gap-1 rounded-sm px-1 py-0.5 hover:opacity-80 transition-opacity cursor-pointer"
                      style={{ backgroundColor: ev._isTask ? '#EFF4EF' : `${getMemberColor(ev.personId)}22` }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: ev._isTask ? '#4E724E' : getMemberColor(ev.personId) }} />
                      <span className="text-[9px] text-stone-700 truncate leading-tight">{ev._isTask ? ev.text : ev.title}</span>
                    </div>
                  ))}
                  {allEvents.length > 3 && (
                    <p className="text-[9px] text-stone-400 px-1">+{allEvents.length - 3} more</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming list */}
      <div className="bg-white rounded-2xl shadow-card p-4">
        <h2 className="text-sm font-semibold text-stone-600 uppercase tracking-wide mb-3">Upcoming</h2>
        {upcoming.length === 0 ? (
          <p className="text-stone-300 text-sm py-2">No upcoming appointments. Tap a day on the calendar to add one.</p>
        ) : (
          <div className="space-y-2">
            {upcoming.map(ap => {
              const member = familyMembers.find(m => m.id === ap.personId);
              const d = new Date(ap.date + 'T12:00:00');
              return (
                <button key={ap.id} onClick={() => setEditing(ap)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-stone-100 hover:border-stone-200 text-left transition-colors group">
                  <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: member?.color || '#A8A29E' }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-700">{ap.title}</p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      {ap.startTime && ` · ${ap.startTime}`}
                      {ap.endTime && ` – ${ap.endTime}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs badge bg-stone-50 text-stone-500 capitalize">{ap.type}</span>
                    {member && (
                      <span className="w-6 h-6 rounded-full text-white text-[9px] font-bold flex items-center justify-center" style={{ backgroundColor: member.color }}>
                        {member.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Sharing note */}
      <div className="mt-4 bg-stone-50 rounded-xl p-4">
        <p className="text-xs text-stone-400 font-medium mb-1">Want to share this calendar?</p>
        <p className="text-sm text-stone-500">Sharing with a partner or nanny requires a backend sync. This is ready to connect to Supabase (free) — ask your developer to set it up when you're ready.</p>
      </div>
    </div>
  );
}

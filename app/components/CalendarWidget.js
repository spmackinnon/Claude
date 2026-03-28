'use client';
import { useState } from 'react';
import Calendar from './Calendar';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS_SHORT = ['S','M','T','W','T','F','S'];

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

export default function CalendarWidget({ data, onUpdate }) {
  const { appointments = [], familyMembers = [], taskLists = {} } = data;
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [expanded, setExpanded] = useState(false);

  const todayStr = toDateStr(now);
  const calDays = getCalendarDays(year, month);

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const getEventsForDay = (dateStr) => {
    const appts = appointments.filter(a => a.date === dateStr);
    const tasks = Object.values(taskLists).flat().filter(t => t.dueDate === dateStr && !t.completed);
    return [
      ...appts.map(a => ({ ...a, _isTask: false })),
      ...tasks.map(t => ({ ...t, _isTask: true })),
    ];
  };

  const getMemberColor = (personId) => {
    if (!personId) return '#A8A29E';
    return familyMembers.find(m => m.id === personId)?.color || '#A8A29E';
  };

  const upcoming = appointments
    .filter(a => a.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date) || (a.startTime || '').localeCompare(b.startTime || ''))
    .slice(0, 4);

  return (
    <>
      {/* Expanded modal */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setExpanded(false)}
          style={{ animation: 'backdropIn 0.15s ease' }}
        >
          <div
            className="bg-cream rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
            style={{ animation: 'modalIn 0.2s ease' }}
          >
            <div className="sticky top-0 bg-cream/95 backdrop-blur-sm flex items-center justify-between px-5 pt-5 pb-3 border-b border-stone-200 z-10">
              <h2 className="font-serif text-xl text-stone-800">Calendar</h2>
              <button
                onClick={() => setExpanded(false)}
                className="text-stone-400 hover:text-stone-600 p-2 rounded-xl hover:bg-stone-100 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="px-5 py-5">
              <Calendar data={data} onUpdate={onUpdate} compact />
            </div>
          </div>
        </div>
      )}

      {/* Widget */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-stone-100">
          <div className="flex items-center gap-1.5">
            <button onClick={prevMonth} className="p-1 hover:bg-stone-50 rounded-lg text-stone-400 transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button
              onClick={() => { setMonth(now.getMonth()); setYear(now.getFullYear()); }}
              className="text-xs font-semibold text-stone-700 hover:text-sage-600 transition-colors min-w-[80px] text-center"
            >
              {MONTHS[month].slice(0, 3)} {year}
            </button>
            <button onClick={nextMonth} className="p-1 hover:bg-stone-50 rounded-lg text-stone-400 transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
          <button
            onClick={() => setExpanded(true)}
            className="text-[10px] font-medium text-stone-400 hover:text-sage-600 flex items-center gap-1 transition-colors px-1.5 py-1 rounded-lg hover:bg-sage-50"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
            </svg>
            Expand
          </button>
        </div>

        {/* Mini grid */}
        <div className="px-2.5 pt-2 pb-1">
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS_SHORT.map((d, i) => (
              <div key={i} className="text-center text-[9px] font-semibold text-stone-300 py-0.5">{d}</div>
            ))}
          </div>
          {/* Day cells */}
          <div className="grid grid-cols-7">
            {calDays.map(({ date, current }, idx) => {
              const dateStr = toDateStr(date);
              const isToday = dateStr === todayStr;
              const events = getEventsForDay(dateStr);

              return (
                <div
                  key={idx}
                  onClick={() => setExpanded(true)}
                  className={`flex flex-col items-center py-0.5 rounded-lg cursor-pointer transition-colors ${
                    isToday ? 'bg-sage-50' : 'hover:bg-stone-50'
                  } ${!current ? 'opacity-25' : ''}`}
                >
                  <span className={`text-[10px] font-medium w-5 h-5 flex items-center justify-center rounded-full leading-none ${
                    isToday ? 'bg-sage-600 text-white' : 'text-stone-600'
                  }`}>
                    {date.getDate()}
                  </span>
                  {events.length > 0 && (
                    <div className="flex gap-px mt-0.5 flex-wrap justify-center max-w-[18px]">
                      {events.slice(0, 3).map((ev, i) => (
                        <span
                          key={i}
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: ev._isTask ? '#4E724E' : getMemberColor(ev.personId) }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming events */}
        {upcoming.length > 0 && (
          <div className="border-t border-stone-50 px-3 py-2.5 space-y-2">
            <p className="text-[9px] font-semibold text-stone-300 uppercase tracking-widest">Upcoming</p>
            {upcoming.map(ap => {
              const member = familyMembers.find(m => m.id === ap.personId);
              const d = new Date(ap.date + 'T12:00:00');
              return (
                <button
                  key={ap.id}
                  onClick={() => setExpanded(true)}
                  className="w-full flex items-center gap-2 text-left hover:bg-stone-50 rounded-lg px-1.5 py-1 -mx-1.5 transition-colors"
                >
                  <div className="w-0.5 h-7 rounded-full flex-shrink-0" style={{ backgroundColor: member?.color || '#A8A29E' }} />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-stone-700 leading-tight truncate">{ap.title}</p>
                    <p className="text-[10px] text-stone-400 leading-tight">
                      {d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      {ap.startTime ? ` · ${ap.startTime}` : ''}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {upcoming.length === 0 && (
          <div className="border-t border-stone-50 px-3 py-3">
            <p className="text-[10px] text-stone-300 text-center">No upcoming events</p>
          </div>
        )}
      </div>
    </>
  );
}

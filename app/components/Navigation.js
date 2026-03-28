'use client';

const NAV_ITEMS = [
  {
    id: 'home-hub',
    label: 'Home Hub',
    sublabel: 'Daily execute',
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'records',
    label: 'Records',
    sublabel: 'Info & storage',
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    sublabel: 'Start to finish',
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" fill={active ? 'currentColor' : 'none'} />
        <rect x="14" y="3" width="7" height="7" rx="1" fill={active ? 'currentColor' : 'none'} />
        <rect x="3" y="14" width="7" height="7" rx="1" fill={active ? 'currentColor' : 'none'} />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'recalibrate',
    label: 'Recalibrate',
    sublabel: 'Reflect & adjust',
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
  },
];

export default function Navigation({ current, onNavigate, onMapOpen, onFaqOpen, onLibraryOpen }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 min-h-screen bg-white border-r border-stone-200 fixed left-0 top-0 z-30">
        <div className="px-5 pt-6 pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-sage-600 rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-bold tracking-widest text-stone-800 uppercase">FIXR</div>
              <div className="text-[10px] text-stone-400 tracking-wide -mt-0.5">HOME OS</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = current === item.id;
            return (
              <button key={item.id} onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                  active ? 'bg-sage-50 text-sage-700' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-700'
                }`}>
                <span className={active ? 'text-sage-600' : 'text-stone-400'}>{item.icon(active)}</span>
                <div>
                  <div className={`text-sm font-medium ${active ? 'text-sage-700' : ''}`}>{item.label}</div>
                  <div className={`text-[11px] ${active ? 'text-sage-500' : 'text-stone-400'}`}>{item.sublabel}</div>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="px-3 pb-5 space-y-1 border-t border-stone-100 pt-3">
          <button onClick={onLibraryOpen} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${current === 'library' ? 'bg-sage-50 text-sage-700' : 'text-stone-400 hover:bg-stone-50 hover:text-stone-600'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
            Task Library
          </button>
          <button onClick={onMapOpen} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-stone-400 hover:bg-stone-50 hover:text-stone-600 transition-all text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" /></svg>
            System Map
          </button>
          <button onClick={onFaqOpen} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-stone-400 hover:bg-stone-50 hover:text-stone-600 transition-all text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
            FAQ
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav — 5 items, smaller labels */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-30 flex">
        {NAV_ITEMS.map((item) => {
          const active = current === item.id;
          return (
            <button key={item.id} onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-all ${active ? 'text-sage-600' : 'text-stone-400'}`}>
              {item.icon(active)}
              <span className={`text-[9px] font-medium leading-tight ${active ? 'text-sage-600' : 'text-stone-400'}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

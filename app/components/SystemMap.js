'use client';

const SPACES = [
  {
    id: 'home-hub',
    name: 'Home Hub',
    role: 'Daily Execute',
    desc: 'Start here every day. Tasks, weekly reset, meal planning.',
    color: 'bg-sage-50 border-sage-200',
    headColor: 'text-sage-700',
    icon: '🏠',
    primary: true,
  },
  {
    id: 'records',
    name: 'Records & Resources',
    role: 'Info Storage',
    desc: 'Bills, documents, key contacts. Save it once, find it always.',
    color: 'bg-blue-50 border-blue-200',
    headColor: 'text-blue-700',
    icon: '📁',
  },
  {
    id: 'projects',
    name: 'Projects & Events',
    role: 'Start to Finish',
    desc: 'Multi-step efforts with a clear end — room resets, events, big tasks.',
    color: 'bg-purple-50 border-purple-200',
    headColor: 'text-purple-700',
    icon: '✅',
  },
  {
    id: 'recalibrate',
    name: 'Recalibrate',
    role: 'Reflect & Adjust',
    desc: 'Capture friction. Reflect weekly. Adjust what isn\'t working.',
    color: 'bg-terracotta-50 border-terracotta-200',
    headColor: 'text-terracotta-600',
    icon: '🔄',
  },
];

const FLOWS = [
  { from: 'Home Hub', to: 'Projects', label: 'Big tasks become projects' },
  { from: 'Recalibrate', to: 'Home Hub', label: 'Resolved friction → new routines' },
  { from: 'Records', to: 'Home Hub', label: 'Info supports daily decisions' },
  { from: 'Home Hub', to: 'Recalibrate', label: 'Patterns & friction get logged' },
];

export default function SystemMap({ onClose }) {
  return (
    <div className="modal-backdrop fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="modal-panel bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-stone-100">
          <div>
            <h2 className="font-serif text-xl text-stone-800">System Map</h2>
            <p className="text-sm text-stone-500 mt-0.5">How your four spaces connect</p>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 overflow-y-auto flex-1">
          {/* Visual map */}
          <div className="relative">
            {/* Center label */}
            <div className="flex justify-center mb-6">
              <div className="bg-stone-800 text-white rounded-full px-5 py-2 text-sm font-semibold tracking-wide">
                FIXR HOME OS
              </div>
            </div>

            {/* Four spaces grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {SPACES.map(space => (
                <div
                  key={space.id}
                  className={`rounded-xl border-2 p-4 ${space.color} ${space.primary ? 'col-span-2' : ''}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{space.icon}</span>
                    <div>
                      <div className={`text-sm font-bold ${space.headColor}`}>{space.name}</div>
                      <div className="text-xs text-stone-400">{space.role}</div>
                    </div>
                    {space.primary && (
                      <span className="ml-auto badge bg-sage-600 text-white text-xs">Start Here</span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">{space.desc}</p>

                  {/* What goes here */}
                  {space.id === 'home-hub' && (
                    <div className="mt-2 flex gap-1.5 flex-wrap">
                      {['Daily tasks', 'Weekly reset', 'Meal plan', 'Focus area'].map(tag => (
                        <span key={tag} className="badge bg-sage-100 text-sage-700">{tag}</span>
                      ))}
                    </div>
                  )}
                  {space.id === 'records' && (
                    <div className="mt-2 flex gap-1.5 flex-wrap">
                      {['Bills', 'Documents', 'Contacts'].map(tag => (
                        <span key={tag} className="badge bg-blue-100 text-blue-700">{tag}</span>
                      ))}
                    </div>
                  )}
                  {space.id === 'projects' && (
                    <div className="mt-2 flex gap-1.5 flex-wrap">
                      {['Home resets', 'Events', 'Big tasks'].map(tag => (
                        <span key={tag} className="badge bg-purple-100 text-purple-700">{tag}</span>
                      ))}
                    </div>
                  )}
                  {space.id === 'recalibrate' && (
                    <div className="mt-2 flex gap-1.5 flex-wrap">
                      {['Friction log', 'Weekly reflection', 'Patterns'].map(tag => (
                        <span key={tag} className="badge bg-terracotta-100 text-terracotta-600">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Information flows */}
            <div>
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-3">How information flows</p>
              <div className="space-y-2">
                {FLOWS.map((flow, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-stone-600">
                    <span className="font-medium text-stone-700 min-w-[90px] text-right">{flow.from}</span>
                    <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                      <path d="M0 6 H20 M16 2 L20 6 L16 10" stroke="#A8A29E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-medium text-stone-700 min-w-[90px]">{flow.to}</span>
                    <span className="text-xs text-stone-400 hidden sm:block">{flow.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key principle */}
          <div className="mt-6 bg-stone-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1.5">Core principle</p>
            <p className="text-sm text-stone-600">
              <span className="font-medium">Home Hub is your daily home.</span> The other three spaces support it — you don't need to visit them every day. Records stores what you look up, Projects tracks what you're working toward, and Recalibrate captures what isn't working yet.
            </p>
          </div>
        </div>

        <div className="px-6 pb-5 pt-3 border-t border-stone-100">
          <button
            onClick={onClose}
            className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium py-2.5 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

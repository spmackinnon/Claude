const today = new Date().toISOString().split('T')[0];

export const defaultData = {
  onboardingComplete: false,
  tasks: [
    { id: 't1', text: 'Pick up dry cleaning', completed: false, date: today },
    { id: 't2', text: 'Review school permission forms', completed: false, date: today },
    { id: 't3', text: 'Call pediatrician — annual checkup', completed: false, date: '' },
    { id: 't4', text: 'Order birthday gift for Maya', completed: true, date: today },
    { id: 't5', text: 'Sunday prep — groceries + meal plan', completed: false, date: '' },
  ],
  weeklyReset: {
    checklist: [
      { id: 'wr1', text: 'Review this week\'s tasks', completed: false },
      { id: 'wr2', text: 'Move or remove incomplete items', completed: false },
      { id: 'wr3', text: 'Add upcoming commitments', completed: false },
      { id: 'wr4', text: 'Choose one focus area or project', completed: false },
      { id: 'wr5', text: 'Plan 3–5 meals', completed: false },
      { id: 'wr6', text: 'Stop — do not over-plan', completed: false },
    ],
    lastCompleted: null,
    focusArea: 'Guest Room Reset',
  },
  meals: [
    { day: 'Monday', meal: 'Sheet pan chicken & veggies' },
    { day: 'Tuesday', meal: 'Pasta night' },
    { day: 'Wednesday', meal: '' },
    { day: 'Thursday', meal: 'Taco bar' },
    { day: 'Friday', meal: 'Pizza night' },
    { day: 'Saturday', meal: '' },
    { day: 'Sunday', meal: 'Slow cooker pot roast' },
  ],
  bills: [
    { id: 'b1', name: 'Mortgage / Rent', amount: '2,100', dueDay: '1st', autopay: true, notes: '' },
    { id: 'b2', name: 'Electric', amount: '120', dueDay: '15th', autopay: false, notes: 'Check monthly — spikes in summer' },
    { id: 'b3', name: 'Car Insurance', amount: '165', dueDay: '20th', autopay: true, notes: '' },
    { id: 'b4', name: 'Internet', amount: '80', dueDay: '25th', autopay: true, notes: '' },
    { id: 'b5', name: 'Subscriptions (streaming + cloud)', amount: '45', dueDay: '1st', autopay: true, notes: 'Netflix, Spotify, iCloud' },
  ],
  documents: [
    { id: 'd1', name: 'Passports', location: 'Filing cabinet — top drawer', notes: 'Check expiration dates each year' },
    { id: 'd2', name: 'Birth Certificates', location: 'Fireproof safe', notes: '' },
    { id: 'd3', name: 'Car Titles', location: 'Filing cabinet — top drawer', notes: '' },
    { id: 'd4', name: 'Home Insurance Policy', location: 'Email inbox + cloud storage', notes: 'Annual renewal in March' },
    { id: 'd5', name: 'Kids\' Vaccination Records', location: 'Pediatrician portal + binder on shelf', notes: '' },
    { id: 'd6', name: 'Wills / Estate Docs', location: 'Attorney\'s office + fireproof safe', notes: '' },
  ],
  contacts: [
    { id: 'c1', name: 'Dr. Chen', role: 'Pediatrician', phone: '(555) 234-5678', notes: 'Best to call before 9am' },
    { id: 'c2', name: 'Mike\'s Plumbing', role: 'Plumber', phone: '(555) 876-5432', notes: 'Reliable, fair pricing' },
    { id: 'c3', name: 'Jennifer', role: 'School Secretary', phone: '(555) 345-6789', notes: '' },
    { id: 'c4', name: 'State Farm — Rachel', role: 'Insurance Agent', phone: '(555) 567-8901', notes: 'Policy #: SF-44821' },
  ],
  projects: [
    {
      id: 'p1',
      title: 'Guest Room Reset',
      description: 'Declutter and reorganize the guest room before the holidays. One small task at a time.',
      status: 'active',
      dueDate: '',
      subtasks: [
        { id: 'ps1', text: 'Remove all clutter and donate bag to Goodwill', completed: false },
        { id: 'ps2', text: 'Deep clean — dust, vacuum, wipe all surfaces', completed: true },
        { id: 'ps3', text: 'New bedding and throw pillows', completed: false },
        { id: 'ps4', text: 'Swap in the lamp from the garage', completed: false },
        { id: 'ps5', text: 'Stock guest essentials (towels, toiletries)', completed: false },
      ],
      notes: 'Prompt: What\'s one small reset that would improve this space?',
    },
  ],
  frictionLog: [
    { id: 'f1', text: 'Dinner decision takes too long every single night', category: 'Food & Meals', date: '2026-03-20', resolved: false },
    { id: 'f2', text: 'Can never find the kids\' medical records when I need them fast', category: 'Admin & Docs', date: '2026-03-18', resolved: false },
    { id: 'f3', text: 'Sunday prep always feels chaotic and rushed — never have a plan', category: 'Routines', date: '2026-03-15', resolved: true },
  ],
};

export const FRICTION_CATEGORIES = [
  'Food & Meals',
  'Admin & Docs',
  'Routines',
  'Household',
  'Childcare',
  'Work-Life Balance',
  'Finances',
  'Health',
  'Other',
];

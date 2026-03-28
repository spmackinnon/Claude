const today = new Date().toISOString().split('T')[0];

export const defaultData = {
  onboardingComplete: false,

  // ── Family members (for color-coding and task assignment) ──
  familyMembers: [
    { id: 'fm1', name: 'Me', color: '#4E724E' },
    { id: 'fm2', name: 'Partner', color: '#C4603E' },
  ],

  // ── Task lists (replaces flat tasks array) ──
  taskLists: {
    'this-week': [
      { id: 't1', text: 'Pick up dry cleaning', completed: false, dueDate: today, notes: '', links: [], priority: null, assignedTo: null },
      { id: 't2', text: 'Review school permission forms', completed: false, dueDate: today, notes: 'Forms are on the kitchen counter', links: [], priority: 'high', assignedTo: null },
      { id: 't3', text: 'Call pediatrician — annual checkup', completed: false, dueDate: '', notes: 'Ask about flu shots and updated vaccination records', links: [], priority: null, assignedTo: null },
      { id: 't4', text: 'Order birthday gift for Maya', completed: true, dueDate: today, notes: '', links: [{ label: 'Wishlist', url: 'https://example.com' }], priority: 'high', assignedTo: null },
    ],
    'routines': [
      { id: 'r1', text: 'Vacuum all floors', completed: false, dueDate: '', notes: 'Vacuum carpets, rugs, and hard floors throughout the house.\n\nChecklist:\n• Vacuum living room\n• Vacuum bedrooms\n• Vacuum hallways and stairs\n• Vacuum under furniture edges', links: [], priority: 'medium', assignedTo: null },
      { id: 'r2', text: 'Clean kitchen surfaces', completed: false, dueDate: '', notes: 'Wipe down countertops, stovetop, and exterior of appliances.\n\nChecklist:\n• Wipe stovetop and burners\n• Clean countertops\n• Wipe microwave inside and out\n• Clean exterior of fridge\n• Wipe down cabinet fronts near the stove', links: [], priority: 'high', assignedTo: null },
      { id: 'r3', text: 'Clean toilets', completed: false, dueDate: '', notes: 'Scrub toilet bowl, wipe the seat, lid, tank, and base.\n\nChecklist:\n• Add cleaner to bowl and let sit\n• Scrub bowl with brush\n• Wipe seat, lid, and hinge\n• Wipe tank and base', links: [], priority: 'high', assignedTo: null },
      { id: 'r4', text: 'Do laundry', completed: false, dueDate: '', notes: 'Wash, dry, fold, and put away laundry for the household.\n\nChecklist:\n• Sort clothes by color/fabric\n• Wash and dry loads\n• Fold and put away\n• Change bed linens', links: [], priority: 'high', assignedTo: null },
      { id: 'r5', text: 'Dust surfaces', completed: false, dueDate: '', notes: 'Dust shelves, furniture tops, ceiling fans, and baseboards.\n\nChecklist:\n• Dust ceiling fans and light fixtures\n• Dust shelves and decor\n• Wipe furniture surfaces\n• Dust baseboards', links: [], priority: 'medium', assignedTo: null },
      { id: 'r6', text: 'Tidy common areas', completed: false, dueDate: '', notes: 'Pick up clutter, put things back where they belong, fluff pillows.\n\nChecklist:\n• Clear flat surfaces of clutter\n• Return items to their homes\n• Straighten couch pillows and blankets', links: [], priority: 'medium', assignedTo: null },
      { id: 'r7', text: 'Sunday grocery run', completed: false, dueDate: '', notes: '', links: [], priority: null, assignedTo: null },
    ],
    'errands': [
      { id: 'e1', text: 'Return Amazon package', completed: false, dueDate: '', notes: '', links: [], priority: null, assignedTo: null },
      { id: 'e2', text: 'Refill kids\' prescriptions', completed: false, dueDate: '', notes: '', links: [], priority: null, assignedTo: null },
    ],
  },

  // ── Weekly reset ──
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
    focusArea: '',
  },

  // ── Calendar appointments ──
  appointments: [
    { id: 'ap1', title: 'Pediatrician checkup', date: '2026-04-05', startTime: '10:00', endTime: '11:00', personId: 'fm1', notes: 'Bring vaccination record', type: 'appointment' },
    { id: 'ap2', title: 'Early school dismissal', date: '2026-04-10', startTime: '13:00', endTime: '13:30', personId: null, notes: '', type: 'reminder' },
    { id: 'ap3', title: 'Date night', date: '2026-04-12', startTime: '19:00', endTime: '22:00', personId: 'fm2', notes: 'Reservation at Le Petit', type: 'event' },
  ],

  // ── Meals ──
  meals: [
    { day: 'Monday', meal: 'Sheet pan chicken & veggies', ingredients: ['chicken breasts', 'broccoli', 'bell peppers', 'olive oil', 'garlic', 'Italian seasoning'] },
    { day: 'Tuesday', meal: 'Pasta night', ingredients: ['pasta', 'marinara sauce', 'ground beef', 'parmesan', 'garlic bread'] },
    { day: 'Wednesday', meal: '', ingredients: [] },
    { day: 'Thursday', meal: 'Taco bar', ingredients: ['ground beef', 'taco shells', 'shredded cheese', 'lettuce', 'tomatoes', 'sour cream', 'taco seasoning', 'salsa'] },
    { day: 'Friday', meal: 'Pizza night', ingredients: ['pizza dough', 'tomato sauce', 'mozzarella', 'pepperoni', 'toppings of choice'] },
    { day: 'Saturday', meal: '', ingredients: [] },
    { day: 'Sunday', meal: 'Slow cooker pot roast', ingredients: ['chuck roast', 'potatoes', 'carrots', 'onion', 'beef broth', 'Worcestershire sauce'] },
  ],

  mealPreferences: {
    restrictions: [],
    favorites: ['pasta', 'tacos', 'chicken'],
    avoid: [],
    servings: 4,
  },

  groceryItems: [],

  // ── Records ──
  bills: [
    { id: 'b1', name: 'Mortgage / Rent', amount: '2,100', dueDay: '1st', autopay: true, notes: '' },
    { id: 'b2', name: 'Electric', amount: '120', dueDay: '15th', autopay: false, notes: 'Check monthly — spikes in summer' },
    { id: 'b3', name: 'Car Insurance', amount: '165', dueDay: '20th', autopay: true, notes: '' },
    { id: 'b4', name: 'Internet', amount: '80', dueDay: '25th', autopay: true, notes: '' },
    { id: 'b5', name: 'Subscriptions', amount: '45', dueDay: '1st', autopay: true, notes: 'Netflix, Spotify, iCloud' },
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

  // ── Kids info ──
  kids: [],

  // ── In Case I Die / Emergency Info ──
  emergencyInfo: {
    accounts: [
      { id: 'ic1', name: 'Primary Bank Account', username: '', password: '', url: '', notes: 'Joint checking account' },
      { id: 'ic2', name: 'Primary Email', username: '', password: '', url: '', notes: '' },
      { id: 'ic3', name: 'Life Insurance', username: '', password: '', url: '', notes: 'Policy in the fireproof safe' },
    ],
    personalMessage: '',
    instructions: 'Important accounts and access info for my family in an emergency.',
  },

  // ── Projects ──
  projects: [
    {
      id: 'p1',
      title: 'Guest Room Reset',
      description: 'Declutter and reorganize the guest room before the holidays.',
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

  somedayList: [
    { id: 's1', text: 'Convert garage into a proper mudroom', notes: '' },
    { id: 's2', text: 'Plan a family reunion trip', notes: '' },
    { id: 's3', text: 'Set up a proper home office', notes: '' },
  ],

  // ── Recalibrate ──
  frictionLog: [
    { id: 'f1', text: 'Dinner decision takes too long every single night', category: 'Food & Meals', date: '2026-03-20', resolved: false },
    { id: 'f2', text: 'Can never find the kids\' medical records when I need them fast', category: 'Admin & Docs', date: '2026-03-18', resolved: false },
    { id: 'f3', text: 'Sunday prep always feels chaotic and rushed', category: 'Routines', date: '2026-03-15', resolved: true },
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

export const FAMILY_COLORS = [
  '#4E724E', '#C4603E', '#5B7FA6', '#9B6B9E',
  '#C9A84C', '#4A8FA0', '#D4726A', '#6B8E6E',
];

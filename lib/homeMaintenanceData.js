/**
 * Home Maintenance Task Library
 * 87 tasks organized by frequency and category.
 * Each task has: id, name, description, estimatedTime, priority, category, subtasks[]
 */

export const MAINTENANCE_TASKS = {
  weekly: [
    // Kitchen
    {
      id: 'mw1', name: 'Clean kitchen surfaces', category: 'Kitchen',
      description: 'Wipe down countertops, stovetop, and exterior of appliances.',
      estimatedTime: '20 min', priority: 'high',
      subtasks: ['Wipe stovetop and burners', 'Clean countertops', 'Wipe microwave inside and out', 'Clean exterior of fridge', 'Wipe down cabinet fronts near the stove'],
    },
    {
      id: 'mw2', name: 'Empty and wipe trash cans', category: 'Kitchen',
      description: 'Take out kitchen trash and wipe the bin with a damp cloth to prevent odors.',
      estimatedTime: '10 min', priority: 'high',
      subtasks: ['Remove trash bag', 'Wipe inside of can', 'Replace with fresh bag'],
    },
    {
      id: 'mw3', name: 'Run dishwasher / hand-wash dishes', category: 'Kitchen',
      description: 'Ensure no dirty dishes sit overnight. Run the dishwasher if full.',
      estimatedTime: '15 min', priority: 'medium',
      subtasks: [],
    },
    {
      id: 'mw4', name: 'Wipe down sink and faucet', category: 'Kitchen',
      description: 'Scrub the kitchen sink, rinse the drain, and polish the faucet.',
      estimatedTime: '10 min', priority: 'medium',
      subtasks: ['Scrub sink basin', 'Clean drain strainer', 'Polish faucet and handles'],
    },
    // Bathroom
    {
      id: 'mw5', name: 'Clean toilets', category: 'Bathroom',
      description: 'Scrub toilet bowl, wipe the seat, lid, tank, and base.',
      estimatedTime: '15 min', priority: 'high',
      subtasks: ['Add cleaner to bowl and let sit', 'Scrub bowl with brush', 'Wipe seat, lid, and hinge', 'Wipe tank and base'],
    },
    {
      id: 'mw6', name: 'Wipe bathroom sinks and counters', category: 'Bathroom',
      description: 'Clean sink basin, faucet, and counter. Dispose of empty containers.',
      estimatedTime: '10 min', priority: 'high',
      subtasks: ['Scrub sink basin', 'Wipe counter and soap dish', 'Polish faucet'],
    },
    {
      id: 'mw7', name: 'Wipe bathroom mirrors', category: 'Bathroom',
      description: 'Clean mirrors with glass cleaner and a lint-free cloth.',
      estimatedTime: '5 min', priority: 'low',
      subtasks: [],
    },
    {
      id: 'mw8', name: 'Replace hand towels', category: 'Bathroom',
      description: 'Swap out used hand towels and bath mats for clean ones.',
      estimatedTime: '5 min', priority: 'medium',
      subtasks: [],
    },
    // Laundry
    {
      id: 'mw9', name: 'Do laundry', category: 'Laundry',
      description: 'Wash, dry, fold, and put away laundry for the household.',
      estimatedTime: '1–2 hrs', priority: 'high',
      subtasks: ['Sort clothes by color/fabric', 'Wash and dry loads', 'Fold and put away', 'Change bed linens'],
    },
    {
      id: 'mw10', name: 'Clean lint trap', category: 'Laundry',
      description: 'Remove lint from the dryer trap after every load to prevent fire hazard.',
      estimatedTime: '2 min', priority: 'high',
      subtasks: [],
    },
    // Living Spaces
    {
      id: 'mw11', name: 'Vacuum all floors', category: 'Living Spaces',
      description: 'Vacuum carpets, rugs, and hard floors throughout the house.',
      estimatedTime: '30 min', priority: 'high',
      subtasks: ['Vacuum living room', 'Vacuum bedrooms', 'Vacuum hallways and stairs', 'Vacuum under furniture edges'],
    },
    {
      id: 'mw12', name: 'Dust surfaces', category: 'Living Spaces',
      description: 'Dust shelves, furniture tops, ceiling fans, and baseboards.',
      estimatedTime: '20 min', priority: 'medium',
      subtasks: ['Dust ceiling fans and light fixtures', 'Dust shelves and decor', 'Wipe furniture surfaces', 'Dust baseboards'],
    },
    {
      id: 'mw13', name: 'Tidy common areas', category: 'Living Spaces',
      description: 'Pick up clutter, put things back where they belong, fluff pillows.',
      estimatedTime: '20 min', priority: 'medium',
      subtasks: ['Clear flat surfaces of clutter', 'Return items to their homes', 'Straighten couch pillows and blankets'],
    },
    {
      id: 'mw14', name: 'Mop hard floors', category: 'Living Spaces',
      description: 'Damp-mop kitchen, bathrooms, and entryway tile/hardwood.',
      estimatedTime: '20 min', priority: 'medium',
      subtasks: [],
    },
  ],

  monthly: [
    // Kitchen
    {
      id: 'mm1', name: 'Clean inside of microwave', category: 'Kitchen',
      description: 'Steam-clean the interior with a bowl of water and vinegar, then wipe.',
      estimatedTime: '15 min', priority: 'medium',
      subtasks: ['Microwave water+vinegar bowl for 5 min', 'Wipe interior walls and turntable', 'Clean exterior and vents'],
    },
    {
      id: 'mm2', name: 'Clean oven and range hood', category: 'Kitchen',
      description: 'Run the self-clean cycle or scrub manually. Clean range hood filters.',
      estimatedTime: '45 min', priority: 'medium',
      subtasks: ['Remove and soak oven racks', 'Apply oven cleaner and let sit', 'Wipe oven interior', 'Clean range hood filter (dishwasher or degreaser)'],
    },
    {
      id: 'mm3', name: 'Clean refrigerator inside', category: 'Kitchen',
      description: 'Remove expired food, wipe shelves and drawers, check door seals.',
      estimatedTime: '30 min', priority: 'high',
      subtasks: ['Remove and check expiration dates on all items', 'Remove shelves and drawers and wash', 'Wipe interior walls', 'Check and clean door gaskets'],
    },
    {
      id: 'mm4', name: 'Run dishwasher cleaning cycle', category: 'Kitchen',
      description: 'Use a dishwasher cleaner tablet or run an empty hot cycle with vinegar.',
      estimatedTime: '5 min', priority: 'low',
      subtasks: ['Clean dishwasher filter', 'Run empty hot cycle with cleaner'],
    },
    {
      id: 'mm5', name: 'Sanitize trash cans', category: 'Kitchen',
      description: 'Spray with disinfectant, scrub, rinse, and let dry.',
      estimatedTime: '15 min', priority: 'medium',
      subtasks: [],
    },
    // Bathroom
    {
      id: 'mm6', name: 'Deep clean shower and tub', category: 'Bathroom',
      description: 'Scrub tile grout, clean showerhead, wipe tracks, and polish fixtures.',
      estimatedTime: '30 min', priority: 'high',
      subtasks: ['Spray and scrub tile grout', 'Clean showerhead (vinegar soak if needed)', 'Wipe shower door tracks', 'Polish chrome fixtures'],
    },
    {
      id: 'mm7', name: 'Wash shower curtain and liner', category: 'Bathroom',
      description: 'Machine wash the shower curtain and liner on a gentle cycle.',
      estimatedTime: '10 min + machine time', priority: 'low',
      subtasks: [],
    },
    {
      id: 'mm8', name: 'Organize medicine cabinet', category: 'Bathroom',
      description: 'Check expiration dates on medications and first-aid supplies. Restock low items.',
      estimatedTime: '15 min', priority: 'medium',
      subtasks: ['Discard expired medications', 'Restock band-aids, pain relievers, etc.', 'Organize by category'],
    },
    // Laundry
    {
      id: 'mm9', name: 'Clean washing machine', category: 'Laundry',
      description: 'Run a hot empty cycle with washing machine cleaner or vinegar + baking soda.',
      estimatedTime: '10 min + machine time', priority: 'medium',
      subtasks: ['Wipe door seal and drum rim', 'Run cleaning cycle', 'Leave door open after to air dry'],
    },
    {
      id: 'mm10', name: 'Clean dryer vent duct', category: 'Laundry',
      description: 'Vacuum the duct behind the dryer to remove lint buildup (fire prevention).',
      estimatedTime: '20 min', priority: 'high',
      subtasks: ['Pull dryer away from wall', 'Disconnect duct and vacuum out lint', 'Reconnect and push dryer back'],
    },
    // Living Spaces
    {
      id: 'mm11', name: 'Wash bed linens and pillows', category: 'Living Spaces',
      description: 'Strip beds, wash sheets and pillowcases, and wash pillows (check care labels).',
      estimatedTime: '1–2 hrs', priority: 'high',
      subtasks: ['Strip all beds', 'Wash sheets and pillowcases', 'Wash pillow protectors', 'Wash or fluff pillows in dryer'],
    },
    {
      id: 'mm12', name: 'Clean windows and window sills', category: 'Living Spaces',
      description: 'Wipe down window glass inside and clean the sills and tracks.',
      estimatedTime: '30 min', priority: 'low',
      subtasks: ['Spray and wipe glass', 'Vacuum window sill debris', 'Wipe sills with damp cloth', 'Clean window tracks'],
    },
    {
      id: 'mm13', name: 'Test smoke and CO detectors', category: 'Living Spaces',
      description: 'Press the test button on every smoke and carbon monoxide detector.',
      estimatedTime: '10 min', priority: 'high',
      subtasks: ['Test each detector', 'Replace batteries in any that are low', 'Note any detectors that need replacement'],
    },
    {
      id: 'mm14', name: 'Wipe light switches and door handles', category: 'Living Spaces',
      description: 'Disinfect all frequently touched surfaces throughout the house.',
      estimatedTime: '10 min', priority: 'medium',
      subtasks: [],
    },
    // Outdoor
    {
      id: 'mm15', name: 'Sweep porch and entryway', category: 'Outdoor',
      description: 'Sweep front porch, back deck, and entryways. Hose off as needed.',
      estimatedTime: '15 min', priority: 'low',
      subtasks: [],
    },
    {
      id: 'mm16', name: 'Weed garden beds', category: 'Outdoor',
      description: 'Remove weeds from garden beds and around the foundation.',
      estimatedTime: '30 min', priority: 'medium',
      subtasks: [],
    },
    // Maintenance
    {
      id: 'mm17', name: 'Change HVAC air filter', category: 'Maintenance',
      description: 'Replace the furnace/AC air filter. Check filter size on the old one.',
      estimatedTime: '10 min', priority: 'high',
      subtasks: ['Note current filter size', 'Purchase replacement if needed', 'Replace filter and mark date'],
    },
    {
      id: 'mm18', name: 'Check water softener salt', category: 'Maintenance',
      description: 'Check the salt level in the water softener and add salt if low.',
      estimatedTime: '5 min', priority: 'medium',
      subtasks: [],
    },
  ],

  quarterly: [
    // Kitchen
    {
      id: 'mq1', name: 'Clean behind and under refrigerator', category: 'Kitchen',
      description: 'Pull out fridge, vacuum the coils, and clean the floor underneath.',
      estimatedTime: '20 min', priority: 'medium',
      subtasks: ['Pull fridge out', 'Vacuum condenser coils', 'Sweep and mop under fridge', 'Push back and level fridge'],
    },
    {
      id: 'mq2', name: 'Deep clean pantry', category: 'Kitchen',
      description: 'Remove everything, wipe shelves, check expiration dates, reorganize.',
      estimatedTime: '45 min', priority: 'medium',
      subtasks: ['Remove all items', 'Wipe shelves and walls', 'Discard expired items', 'Reorganize by category'],
    },
    {
      id: 'mq3', name: 'Descale coffee maker and kettle', category: 'Kitchen',
      description: 'Run a descaling cycle with vinegar or a commercial descaler.',
      estimatedTime: '20 min + cycle time', priority: 'low',
      subtasks: [],
    },
    // Bathroom
    {
      id: 'mq4', name: 'Re-caulk shower and tub if needed', category: 'Bathroom',
      description: 'Inspect caulk lines for cracking or mold. Remove and replace if needed.',
      estimatedTime: '1–2 hrs', priority: 'high',
      subtasks: ['Inspect all caulk lines', 'Score and remove damaged caulk', 'Apply fresh caulk', 'Let cure 24 hrs before use'],
    },
    {
      id: 'mq5', name: 'Deep clean bathroom grout', category: 'Bathroom',
      description: 'Scrub tile grout with a stiff brush and bleach-based cleaner.',
      estimatedTime: '30 min', priority: 'medium',
      subtasks: [],
    },
    // Living Spaces
    {
      id: 'mq6', name: 'Rotate mattresses', category: 'Living Spaces',
      description: 'Rotate (and flip if double-sided) mattresses to even out wear.',
      estimatedTime: '20 min', priority: 'medium',
      subtasks: ['Rotate mattress 180°', 'Flip if double-sided', 'Vacuum mattress surface', 'Replace mattress protector'],
    },
    {
      id: 'mq7', name: 'Wash curtains and blinds', category: 'Living Spaces',
      description: 'Machine wash curtains (check label). Wipe or vacuum blinds.',
      estimatedTime: '1 hr', priority: 'low',
      subtasks: ['Remove curtains and check care labels', 'Wash and rehang', 'Wipe or vacuum blinds'],
    },
    {
      id: 'mq8', name: 'Clean under and behind furniture', category: 'Living Spaces',
      description: 'Move sofas, beds, and dressers to vacuum and mop underneath.',
      estimatedTime: '45 min', priority: 'medium',
      subtasks: ['Move sofa and chairs', 'Vacuum dust bunnies', 'Mop hard floors', 'Replace furniture'],
    },
    {
      id: 'mq9', name: 'Check and replace batteries', category: 'Living Spaces',
      description: 'Replace batteries in smoke detectors, CO detectors, remotes, and flashlights.',
      estimatedTime: '20 min', priority: 'high',
      subtasks: ['Smoke detectors', 'CO detectors', 'Remotes', 'Flashlights and emergency kit'],
    },
    // Outdoor
    {
      id: 'mq10', name: 'Clean gutters and downspouts', category: 'Outdoor',
      description: 'Remove leaves and debris from gutters. Check downspout flow.',
      estimatedTime: '1–2 hrs', priority: 'high',
      subtasks: ['Clear debris from gutters by hand or scoop', 'Flush with hose', 'Check downspout drainage', 'Inspect for sags or damage'],
    },
    {
      id: 'mq11', name: 'Fertilize lawn', category: 'Outdoor',
      description: 'Apply lawn fertilizer appropriate for the current season.',
      estimatedTime: '30 min', priority: 'low',
      subtasks: [],
    },
    {
      id: 'mq12', name: 'Inspect exterior of home', category: 'Outdoor',
      description: 'Walk around and look for peeling paint, damaged siding, pest entry points.',
      estimatedTime: '20 min', priority: 'medium',
      subtasks: ['Check siding for damage or rot', 'Look for gaps or cracks in foundation', 'Inspect window caulk and trim', 'Check roof from ground level'],
    },
    // Maintenance
    {
      id: 'mq13', name: 'Flush water heater', category: 'Maintenance',
      description: 'Drain a few gallons from the water heater to remove sediment buildup.',
      estimatedTime: '30 min', priority: 'medium',
      subtasks: ['Attach hose to drain valve', 'Turn off cold water supply', 'Drain 2–3 gallons', 'Close valve and refill'],
    },
    {
      id: 'mq14', name: 'Check plumbing for leaks', category: 'Maintenance',
      description: 'Inspect under sinks, around toilets, and near the water heater for drips.',
      estimatedTime: '15 min', priority: 'high',
      subtasks: ['Under kitchen sink', 'Under bathroom sinks', 'Around toilet bases', 'Near water heater and washer'],
    },
    {
      id: 'mq15', name: 'Clean dryer vent (exterior)', category: 'Maintenance',
      description: 'Check and clear the exterior dryer vent cap of lint and debris.',
      estimatedTime: '10 min', priority: 'high',
      subtasks: [],
    },
    {
      id: 'mq16', name: 'Inspect garage door operation', category: 'Maintenance',
      description: 'Test the auto-reverse safety feature and lubricate moving parts.',
      estimatedTime: '15 min', priority: 'medium',
      subtasks: ['Test auto-reverse with a roll of paper towels', 'Lubricate hinges, springs, and rollers', 'Check weatherstripping'],
    },
  ],

  seasonal: [
    // Spring
    {
      id: 'ms1', name: 'Spring deep clean', category: 'Spring',
      description: 'Full top-to-bottom deep clean — windows, walls, baseboards, inside closets.',
      estimatedTime: '4–6 hrs', priority: 'high',
      subtasks: ['Wash all windows inside and out', 'Wipe walls and light switches', 'Clean closets and donate unused items', 'Deep clean all bathrooms', 'Shampoo carpets or steam mop floors'],
    },
    {
      id: 'ms2', name: 'Service AC system', category: 'Spring',
      description: 'Change AC filter, clean vents, and schedule annual HVAC service.',
      estimatedTime: '30 min + service', priority: 'high',
      subtasks: ['Change filter', 'Vacuum and wipe all vents', 'Schedule HVAC tune-up', 'Clear debris from outdoor condenser unit'],
    },
    {
      id: 'ms3', name: 'Set up outdoor spaces', category: 'Spring',
      description: 'Bring out patio furniture, clean and inspect the grill, plant spring garden.',
      estimatedTime: '2–3 hrs', priority: 'medium',
      subtasks: ['Bring out and clean patio furniture', 'Deep clean grill (inside and out)', 'Check outdoor lighting', 'Plant flowers or prep garden beds'],
    },
    {
      id: 'ms4', name: 'Inspect roof and attic', category: 'Spring',
      description: 'After winter, check for missing shingles, ice dam damage, or attic leaks.',
      estimatedTime: '30 min', priority: 'high',
      subtasks: ['Walk roof perimeter from ground', 'Check attic for water stains or mold', 'Look for damaged or missing shingles', 'Inspect flashing around chimney and vents'],
    },
    {
      id: 'ms5', name: 'Check sprinkler system', category: 'Spring',
      description: 'Turn on the irrigation system, test all zones, and adjust spray heads.',
      estimatedTime: '30 min', priority: 'medium',
      subtasks: ['Turn on system and test each zone', 'Check for broken or clogged heads', 'Adjust spray direction', 'Set seasonal watering schedule'],
    },
    {
      id: 'ms6', name: 'Reverse ceiling fans', category: 'Spring',
      description: 'Switch ceiling fans to counter-clockwise (summer mode) for cooling.',
      estimatedTime: '10 min', priority: 'low',
      subtasks: [],
    },
    // Summer
    {
      id: 'ms7', name: 'Check exterior caulking and seals', category: 'Summer',
      description: 'Inspect and re-caulk around windows, doors, and penetrations to keep cool air in.',
      estimatedTime: '1 hr', priority: 'medium',
      subtasks: ['Inspect all window caulk lines', 'Check door weatherstripping', 'Re-caulk where needed', 'Check around plumbing penetrations'],
    },
    {
      id: 'ms8', name: 'Clean outdoor furniture and grill', category: 'Summer',
      description: 'Mid-season wipe-down of patio furniture and a thorough grill scrub.',
      estimatedTime: '45 min', priority: 'low',
      subtasks: ['Scrub grill grates', 'Clean grill drip pan', 'Wipe patio furniture', 'Treat wood furniture if needed'],
    },
    {
      id: 'ms9', name: 'Treat deck or patio for pests', category: 'Summer',
      description: 'Apply pest control around the perimeter and check for ant or wasp nests.',
      estimatedTime: '20 min', priority: 'medium',
      subtasks: ['Check for wasp nests under eaves', 'Check deck boards for ant colonies', 'Apply perimeter pest spray', 'Call exterminator if needed'],
    },
    {
      id: 'ms10', name: 'Flush and test outdoor faucets', category: 'Summer',
      description: 'Ensure outdoor hose bibs are working properly and not leaking.',
      estimatedTime: '10 min', priority: 'low',
      subtasks: [],
    },
    // Fall
    {
      id: 'ms11', name: 'Winterize outdoor spaces', category: 'Fall',
      description: 'Put away patio furniture, cover the grill, drain hoses, and shut off irrigation.',
      estimatedTime: '2–3 hrs', priority: 'high',
      subtasks: ['Store or cover patio furniture', 'Drain and store garden hoses', 'Shut off and blow out sprinkler system', 'Cover or store grill', 'Bring in outdoor planters and decorations'],
    },
    {
      id: 'ms12', name: 'Service heating system', category: 'Fall',
      description: 'Change furnace filter and schedule annual heating system tune-up.',
      estimatedTime: '30 min + service', priority: 'high',
      subtasks: ['Change furnace filter', 'Test thermostat in heating mode', 'Schedule HVAC service', 'Bleed radiators if you have a hot water system'],
    },
    {
      id: 'ms13', name: 'Clean and inspect chimney and fireplace', category: 'Fall',
      description: 'Have the chimney swept before fireplace season begins.',
      estimatedTime: 'Professional service', priority: 'high',
      subtasks: ['Schedule chimney sweep service', 'Test damper operation', 'Stock firewood', 'Check fire screen or glass doors'],
    },
    {
      id: 'ms14', name: 'Reverse ceiling fans', category: 'Fall',
      description: 'Switch ceiling fans to clockwise (winter mode) to push warm air down.',
      estimatedTime: '10 min', priority: 'low',
      subtasks: [],
    },
    {
      id: 'ms15', name: 'Check insulation and weatherstripping', category: 'Fall',
      description: 'Feel for drafts around doors and windows. Replace weatherstripping if worn.',
      estimatedTime: '30 min', priority: 'medium',
      subtasks: ['Check all exterior door weatherstripping', 'Feel for drafts at window sills', 'Apply draft stoppers where needed', 'Check attic insulation level'],
    },
    {
      id: 'ms16', name: 'Rake leaves and prep lawn', category: 'Fall',
      description: 'Rake and bag leaves, aerate the lawn, and apply fall fertilizer.',
      estimatedTime: '2–3 hrs', priority: 'medium',
      subtasks: ['Rake and bag leaves', 'Aerate lawn if needed', 'Apply fall fertilizer', 'Overseed thin areas'],
    },
    // Winter
    {
      id: 'ms17', name: 'Prepare for freeze / pipe insulation', category: 'Winter',
      description: 'Insulate exposed pipes, know how to shut off the main water valve.',
      estimatedTime: '30 min', priority: 'high',
      subtasks: ['Insulate exposed pipes in unheated spaces', 'Know main water shut-off location', 'Drip faucets during hard freeze', 'Disconnect and store outdoor hoses'],
    },
    {
      id: 'ms18', name: 'Check generator or emergency kit', category: 'Winter',
      description: 'Test generator (if you have one), restock emergency supplies.',
      estimatedTime: '30 min', priority: 'high',
      subtasks: ['Test run generator', 'Check fuel supply', 'Restock flashlights, batteries, water', 'Check first-aid kit'],
    },
    {
      id: 'ms19', name: 'Clean humidifier', category: 'Winter',
      description: 'Descale and disinfect humidifiers at the start of heating season.',
      estimatedTime: '30 min', priority: 'medium',
      subtasks: ['Disassemble and rinse components', 'Soak in vinegar solution', 'Scrub and rinse', 'Run with fresh water'],
    },
    {
      id: 'ms20', name: 'Touch up caulk and grout indoors', category: 'Winter',
      description: 'Inspect and repair cracked caulk in bathrooms and kitchens.',
      estimatedTime: '1–2 hrs', priority: 'medium',
      subtasks: ['Check bathroom tile grout for cracks', 'Check caulk around tub and sink', 'Remove and replace any failed caulk'],
    },
  ],
};

// All tasks as a flat array (useful for searches)
export const ALL_MAINTENANCE_TASKS = Object.values(MAINTENANCE_TASKS).flat();

// Frequency labels
export const FREQUENCY_LABELS = {
  weekly: 'Weekly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  seasonal: 'Seasonal',
};

// All categories
export const MAINTENANCE_CATEGORIES = {
  weekly: ['Kitchen', 'Bathroom', 'Laundry', 'Living Spaces'],
  monthly: ['Kitchen', 'Bathroom', 'Laundry', 'Living Spaces', 'Outdoor', 'Maintenance'],
  quarterly: ['Kitchen', 'Bathroom', 'Living Spaces', 'Outdoor', 'Maintenance'],
  seasonal: ['Spring', 'Summer', 'Fall', 'Winter'],
};

/**
 * Convert a library task into a task-list item (for Routines or This Week).
 */
export function libraryTaskToItem(task, frequency) {
  return {
    id: `lib_${task.id}_${Date.now()}`,
    text: task.name,
    completed: false,
    dueDate: '',
    notes: task.description + (task.subtasks.length > 0 ? '\n\nChecklist:\n' + task.subtasks.map(s => `• ${s}`).join('\n') : ''),
    links: [],
    priority: task.priority === 'high' ? 'high' : task.priority === 'medium' ? 'medium' : null,
    assignedTo: null,
  };
}

/**
 * Convert a library task into a calendar appointment.
 */
export function libraryTaskToAppointment(task, date) {
  return {
    id: `apt_lib_${task.id}_${Date.now()}`,
    title: task.name,
    date,
    startTime: '09:00',
    endTime: '10:00',
    personId: null,
    notes: task.description + (task.subtasks.length > 0 ? '\n\nChecklist:\n' + task.subtasks.map(s => `• ${s}`).join('\n') : ''),
    type: 'reminder',
  };
}

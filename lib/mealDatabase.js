/**
 * Curated meal database for rules-based meal plan generation.
 * Each meal has tags for filtering by family preferences.
 */
export const MEAL_DATABASE = [
  // ── Chicken ──────────────────────────────────────────────────────
  {
    name: 'Sheet pan chicken & veggies',
    tags: ['chicken', 'healthy', 'easy', 'one-pan'],
    ingredients: ['chicken breasts', 'broccoli', 'bell peppers', 'olive oil', 'garlic', 'Italian seasoning'],
  },
  {
    name: 'Chicken tacos',
    tags: ['chicken', 'mexican', 'quick', 'kids-friendly'],
    ingredients: ['chicken breasts', 'taco shells', 'shredded cheese', 'lettuce', 'tomatoes', 'sour cream', 'taco seasoning'],
  },
  {
    name: 'Chicken stir fry with rice',
    tags: ['chicken', 'asian', 'quick', 'healthy'],
    ingredients: ['chicken breasts', 'white rice', 'broccoli', 'snap peas', 'soy sauce', 'sesame oil', 'ginger', 'garlic'],
  },
  {
    name: 'Baked lemon chicken with roasted potatoes',
    tags: ['chicken', 'easy', 'healthy'],
    ingredients: ['chicken thighs', 'potatoes', 'lemon', 'garlic', 'olive oil', 'rosemary', 'thyme'],
  },
  {
    name: 'Chicken quesadillas',
    tags: ['chicken', 'mexican', 'quick', 'kids-friendly'],
    ingredients: ['chicken breasts', 'flour tortillas', 'shredded cheese', 'bell peppers', 'onion', 'salsa', 'sour cream'],
  },
  {
    name: 'Slow cooker chicken soup',
    tags: ['chicken', 'easy', 'comforting', 'slow-cooker'],
    ingredients: ['chicken breasts', 'chicken broth', 'carrots', 'celery', 'onion', 'egg noodles', 'garlic', 'parsley'],
  },

  // ── Beef ─────────────────────────────────────────────────────────
  {
    name: 'Spaghetti Bolognese',
    tags: ['beef', 'pasta', 'easy', 'kids-friendly'],
    ingredients: ['ground beef', 'spaghetti', 'marinara sauce', 'onion', 'garlic', 'parmesan', 'olive oil'],
  },
  {
    name: 'Beef tacos',
    tags: ['beef', 'mexican', 'quick', 'kids-friendly'],
    ingredients: ['ground beef', 'taco shells', 'shredded cheese', 'lettuce', 'tomatoes', 'sour cream', 'taco seasoning', 'salsa'],
  },
  {
    name: 'Slow cooker pot roast',
    tags: ['beef', 'easy', 'comforting', 'slow-cooker', 'sunday'],
    ingredients: ['chuck roast', 'potatoes', 'carrots', 'onion', 'beef broth', 'Worcestershire sauce', 'garlic'],
  },
  {
    name: 'Burgers on the grill',
    tags: ['beef', 'quick', 'kids-friendly', 'summer'],
    ingredients: ['ground beef', 'burger buns', 'cheese slices', 'lettuce', 'tomatoes', 'onion', 'condiments'],
  },
  {
    name: 'Beef stir fry with noodles',
    tags: ['beef', 'asian', 'quick'],
    ingredients: ['sirloin steak', 'lo mein noodles', 'broccoli', 'carrots', 'soy sauce', 'sesame oil', 'garlic', 'ginger'],
  },

  // ── Pasta ────────────────────────────────────────────────────────
  {
    name: 'Pasta night (kids choose toppings)',
    tags: ['pasta', 'vegetarian', 'easy', 'kids-friendly'],
    ingredients: ['pasta', 'marinara sauce', 'parmesan', 'garlic bread'],
  },
  {
    name: 'Baked ziti',
    tags: ['pasta', 'easy', 'comforting', 'make-ahead'],
    ingredients: ['ziti pasta', 'ricotta cheese', 'mozzarella', 'marinara sauce', 'ground beef', 'parmesan'],
  },
  {
    name: 'Mac & cheese (homemade)',
    tags: ['pasta', 'vegetarian', 'kids-friendly', 'comforting'],
    ingredients: ['macaroni', 'cheddar cheese', 'butter', 'flour', 'milk', 'breadcrumbs'],
  },

  // ── Fish / Seafood ────────────────────────────────────────────────
  {
    name: 'Baked salmon with asparagus',
    tags: ['fish', 'healthy', 'quick'],
    ingredients: ['salmon fillets', 'asparagus', 'lemon', 'butter', 'garlic', 'dill', 'olive oil'],
  },
  {
    name: 'Shrimp tacos with slaw',
    tags: ['fish', 'seafood', 'mexican', 'quick', 'healthy'],
    ingredients: ['shrimp', 'corn tortillas', 'coleslaw mix', 'avocado', 'lime', 'cilantro', 'hot sauce'],
  },

  // ── Vegetarian ───────────────────────────────────────────────────
  {
    name: 'Veggie stir fry with tofu',
    tags: ['vegetarian', 'vegan', 'healthy', 'asian'],
    ingredients: ['firm tofu', 'broccoli', 'snap peas', 'bell peppers', 'soy sauce', 'sesame oil', 'rice', 'garlic'],
  },
  {
    name: 'Black bean burrito bowls',
    tags: ['vegetarian', 'mexican', 'healthy', 'quick'],
    ingredients: ['black beans', 'rice', 'corn', 'bell peppers', 'avocado', 'salsa', 'shredded cheese', 'sour cream'],
  },
  {
    name: 'Margherita pizza',
    tags: ['vegetarian', 'pizza', 'kids-friendly', 'easy'],
    ingredients: ['pizza dough', 'tomato sauce', 'fresh mozzarella', 'fresh basil', 'olive oil'],
  },
  {
    name: 'Vegetable soup with crusty bread',
    tags: ['vegetarian', 'vegan', 'healthy', 'comforting'],
    ingredients: ['mixed vegetables', 'vegetable broth', 'canned tomatoes', 'garlic', 'onion', 'herbs', 'crusty bread'],
  },

  // ── Easy / Weeknight ─────────────────────────────────────────────
  {
    name: 'Homemade pizza night',
    tags: ['pizza', 'kids-friendly', 'fun', 'easy'],
    ingredients: ['pizza dough', 'tomato sauce', 'mozzarella', 'pepperoni', 'choice of toppings'],
  },
  {
    name: 'Breakfast for dinner (eggs & bacon)',
    tags: ['easy', 'quick', 'kids-friendly', 'budget'],
    ingredients: ['eggs', 'bacon', 'toast', 'butter', 'orange juice'],
  },
  {
    name: 'Grilled cheese & tomato soup',
    tags: ['vegetarian', 'easy', 'kids-friendly', 'quick', 'comforting'],
    ingredients: ['bread', 'cheddar cheese', 'butter', 'canned tomato soup', 'milk'],
  },
];

/**
 * Generate a meal plan based on preferences.
 * Returns 5 suggested meals (for Mon–Fri; weekends left open).
 */
export function generateMealPlan(preferences) {
  const { avoid = [], restrictions = [], favorites = [] } = preferences;

  // Filter out meals that contain avoided ingredients or tags
  const avoidLower = avoid.map(a => a.toLowerCase());
  const restrictionsLower = restrictions.map(r => r.toLowerCase());

  let available = MEAL_DATABASE.filter(meal => {
    // Check restrictions (e.g., vegetarian filters out beef/chicken/fish)
    if (restrictionsLower.includes('vegetarian') || restrictionsLower.includes('vegan')) {
      if (meal.tags.some(t => ['beef', 'chicken', 'fish', 'seafood'].includes(t))) return false;
    }
    if (restrictionsLower.includes('vegan')) {
      if (!meal.tags.includes('vegan')) return false;
    }
    if (restrictionsLower.includes('gluten-free')) {
      if (meal.tags.includes('pasta') || meal.tags.includes('pizza')) return false;
    }
    // Check user's avoid list
    if (avoidLower.some(a => meal.tags.includes(a) || meal.name.toLowerCase().includes(a))) {
      return false;
    }
    return true;
  });

  if (available.length === 0) available = MEAL_DATABASE;

  // Boost meals that match favorites
  const favoritesLower = favorites.map(f => f.toLowerCase());
  const boosted = available.filter(m =>
    favoritesLower.some(f => m.tags.includes(f) || m.name.toLowerCase().includes(f))
  );
  const rest = available.filter(m => !boosted.includes(m));

  // Shuffle and pick 5
  const shuffled = [...boosted, ...rest].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5).map(m => m.name);
}

/**
 * Build a grocery list from the current meal plan.
 * Finds matching meal in database and aggregates ingredients.
 */
export function buildGroceryList(meals) {
  const allIngredients = [];

  for (const { meal, ingredients } of meals) {
    if (!meal) continue;

    if (ingredients && ingredients.length > 0) {
      // Use the stored ingredients (may have been customized)
      allIngredients.push(...ingredients);
    } else {
      // Try to match against meal database
      const match = MEAL_DATABASE.find(m =>
        m.name.toLowerCase() === meal.toLowerCase()
      );
      if (match) allIngredients.push(...match.ingredients);
    }
  }

  // Deduplicate (case-insensitive)
  const seen = new Set();
  return allIngredients.filter(ing => {
    const key = ing.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).sort();
}

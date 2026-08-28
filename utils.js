// Utility functions for Lucky Phrase Generator
// These functions contain business logic and are designed to be testable

const FAVORITES_KEY = "luckyPhraseGenerator_favorites";

// Fallback phrases array
const fallbackPhrases = [
  "Good things are already on their way.",
  "You are capable of figuring this out.",
  "Your next chapter can be bigger than your last one.",
  "Stay steady. The work is working.",
  "Your body, breath, and mind are all part of the same natural strength.",
  "Confidence grows every time you keep going.",
  "You do not need perfect timing to make progress.",
  "The opportunity you are preparing for is preparing you too.",
  "A calm mind makes powerful moves.",
  "You are allowed to believe this can go well.",
  "Small steps still move the story forward.",
  "You are building proof, one day at a time.",
  "Luck loves preparation.",
  "Prosperity can start with one brave decision.",
  "What you focus on is what you draw closer.",
  "You have handled hard things before.",
  "The right doors know how to open.",
  "Your effort is not invisible.",
  "You can be nervous and ready at the same time.",
  "Momentum starts with one honest step.",
  "The version of you that wins is already forming.",
  "Trust the work you have been putting in.",
  "You bring value before you feel fully ready.",
  "Stay open. Something good may be closer than it looks.",
  "Your consistency is creating options.",
  "Grow through what you go through.",
  "You are stronger than you think.",
  "Take a break and try again later. Your future self will thank you.",
  "Today you honored your wellbeing, and tomorrow you return with fresh energy and purpose.",
  "All winners were once beginners.",
  "Today's effort is tomorrow's advantage.",
  "A better outcome is still possible.",
  "You are not behind. You are becoming.",
  "Let today be evidence that you keep showing up.",
  "Your courage is louder than your doubt.",
  "Success can arrive quietly, then all at once.",
  "You are learning your way into the next level.",
  "What is meant for you can meet you while you are still growing.",
  "A mirror can show the bruise and still miss the strength.",
  "You are not fake for meeting the edge of what you know.",
  "The questions you missed today can become the ground you stand on tomorrow.",
  "A shaky answer does not erase real effort, real learning, or real belonging.",
  "Let the hurt name the lesson, not your worth.",
  "You can be disappointed and still be becoming someone formidable.",
  "A stumble in the room is not proof you were never meant to enter it.",
  "The soul gets centered when the story gets honest: you struggled, you care, and you are still here.",
  "Basic questions can feel heavy on a hard day. Keep studying without making cruelty your teacher.",
  "You are...\n- a junior engineer\n- with real production experience\n- aggressively investing in growth\n- learning fast\n- contributing meaningfully\n- already trusted in enterprise systems\n\nThat is REAL.",
  "You are a learner who is investing in growth, and that is a powerful thing to be.",
  "Your career is DATA. And data is sexy.",
  "Don't stop when you get to the next level. Keep going. The next level is just the beginning of a new chapter.",
  "Don't stop when you're tired. Stop when you are done.",
  "When you feel like giving up, remember why you started.",
  "They saw the gaps and still saw the potential. That counts as evidence.",
  "You do not have to be flawless to be worth betting on.",
  "Needing notes does not make you fake. It makes you someone who knows how to find the answer.",
  "A hard interview can still become a doorway.",
  "Keep learning the simple answers too. They are part of the foundation you are already building.",
  "Every skill gets less mysterious when you keep meeting it with patience and practice.",
  "Waiting for the answer does not mean your momentum has stopped. Keep tending to the life you are building.",
  "May the right door open with less effort than you feared and more joy than you expected.",
  "If this door closes, grieve it honestly, then come back to the next small lesson. Your future is still asking you to show up.",
  "Your progress is not measured by how loud others applaud it. It is measured by how honest your effort has been."
];

// API source configuration
const apiSources = [
  {
    name: "Advice Slip",
    url: "https://api.adviceslip.com/advice",
    parse: (data) => data.slip.advice
  },
  {
    name: "Quotable",
    url: "https://api.quotable.io/random",
    parse: (data) => `${data.content} — ${data.author}`
  }
];

// ===== FAVORITES MANAGEMENT =====

/**
 * Load favorites from localStorage
 * @returns {string[]} Array of favorite phrases
 */
function loadFavorites() {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error loading favorites:", error);
    return [];
  }
}

/**
 * Save favorites array to localStorage
 * @param {string[]} favorites - Array of favorite phrases to save
 */
function saveFavorites(favorites) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites:", error);
  }
}

/**
 * Check if a specific phrase is favorited
 * @param {string} phrase - The phrase to check
 * @returns {boolean} True if phrase is in favorites
 */
function isFavorited(phrase) {
  const favorites = loadFavorites();
  return favorites.includes(phrase);
}

/**
 * Toggle favorite status for a phrase (add if not present, remove if present)
 * @param {string} phrase - The phrase to toggle
 */
function toggleFavorite(phrase) {
  const favorites = loadFavorites();
  const index = favorites.indexOf(phrase);

  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(phrase);
  }

  saveFavorites(favorites);
}

// ===== RANDOMIZATION =====

/**
 * Get a random phrase from the fallback phrases array
 * @returns {string} A random phrase
 */
function getRandomFallbackPhrase() {
  const randomIndex = Math.floor(Math.random() * fallbackPhrases.length);
  return fallbackPhrases[randomIndex];
}

/**
 * Get a random API source configuration
 * @returns {Object} API source object with name, url, and parse function
 */
function getRandomApiSource() {
  const randomIndex = Math.floor(Math.random() * apiSources.length);
  return apiSources[randomIndex];
}

// ===== API PARSERS =====

/**
 * Parse Advice Slip API response
 * @param {Object} data - Raw response from Advice Slip API
 * @returns {string} Extracted advice text
 */
function parseAdviceSlipResponse(data) {
  return data.slip.advice;
}

/**
 * Parse Quotable API response
 * @param {Object} data - Raw response from Quotable API
 * @returns {string} Formatted quote with attribution
 */
function parseQuotableResponse(data) {
  return `${data.content} — ${data.author}`;
}

// ===== DARK MODE THEME MANAGEMENT =====

const THEME_KEY = "luckyPhraseGenerator_theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";

/**
 * Get the current theme from localStorage or system preference
 * @returns {string} Either 'dark' or 'light'
 */
function getCurrentTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);

  // Validate that saved theme is one of the valid options
  if (savedTheme === DARK_THEME || savedTheme === LIGHT_THEME) {
    return savedTheme;
  }

  // Check system preference if no valid saved theme
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return DARK_THEME;
  }

  return LIGHT_THEME;
}

/**
 * Set the theme and save preference to localStorage
 * @param {string} theme - Either 'dark' or 'light'
 */
function setTheme(theme) {
  const validTheme = theme === DARK_THEME ? DARK_THEME : LIGHT_THEME;
  localStorage.setItem(THEME_KEY, validTheme);

  // Apply theme to DOM
  if (validTheme === DARK_THEME) {
    document.documentElement.setAttribute("data-theme", DARK_THEME);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

/**
 * Toggle between light and dark themes
 * @returns {string} The new theme that was applied
 */
function toggleTheme() {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  setTheme(newTheme);
  return newTheme;
}

// Export for Node.js testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    loadFavorites,
    saveFavorites,
    isFavorited,
    toggleFavorite,
    getRandomFallbackPhrase,
    getRandomApiSource,
    parseAdviceSlipResponse,
    parseQuotableResponse,
    fallbackPhrases,
    apiSources,
    FAVORITES_KEY,
    getCurrentTheme,
    setTheme,
    toggleTheme,
    THEME_KEY,
    DARK_THEME,
    LIGHT_THEME
  };
}

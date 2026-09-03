// Lucky Phrase Generator - Multiple API sources for variety
// Fetches random quotes from multiple APIs with fallback to local phrases
// Falls back to local phrases if all APIs are unavailable

// Array of API sources with their endpoints and custom parsers
// Each API has a different response structure, so we parse it differently
const apiSources = [
  {
    name: "Advice Slip",
    url: "https://api.adviceslip.com/advice",
    // Advice Slip returns: { slip: { advice: "..." } }
    parse: (data) => data.slip.advice
  },
  {
    name: "Quotable",
    url: "https://api.quotable.io/random",
    // Quotable returns: { content: "...", author: "..." }
    parse: (data) => `${data.content}\n— ${data.author}`
  }
];

const ALL_CATEGORIES = "All";
const PHRASE_CATEGORIES = [ALL_CATEGORIES, "Motivation", "Confidence", "Life", "Funny"];

// Local phrases array - used as fallback if APIs fail
// These are curated motivational phrases for resilience
const fallbackPhrases = [
  { text: "Good things are already on their way.", category: "Motivation" },
  { text: "You are capable of figuring this out.", category: "Confidence" },
  { text: "Your next chapter can be bigger than your last one.", category: "Life" },
  { text: "Stay steady. The work is working.", category: "Motivation" },
  { text: "Your body, breath, and mind are all part of the same natural strength.", category: "Life" },
  { text: "Confidence grows every time you keep going.", category: "Confidence" },
  { text: "You do not need perfect timing to make progress.", category: "Motivation" },
  { text: "The opportunity you are preparing for is preparing you too.", category: "Motivation" },
  { text: "A calm mind makes powerful moves.", category: "Confidence" },
  { text: "You are allowed to believe this can go well.", category: "Confidence" },
  { text: "Small steps still move the story forward.", category: "Motivation" },
  { text: "You are building proof, one day at a time.", category: "Motivation" },
  { text: "Luck loves preparation.", category: "Motivation" },
  { text: "Prosperity can start with one brave decision.", category: "Motivation" },
  { text: "What you focus on is what you draw closer.", category: "Life" },
  { text: "You have handled hard things before.", category: "Confidence" },
  { text: "The right doors know how to open.", category: "Life" },
  { text: "Your effort is not invisible.", category: "Motivation" },
  { text: "You can be nervous and ready at the same time.", category: "Confidence" },
  { text: "Momentum starts with one honest step.", category: "Motivation" },
  { text: "The version of you that wins is already forming.", category: "Confidence" },
  { text: "Trust the work you have been putting in.", category: "Confidence" },
  { text: "You bring value before you feel fully ready.", category: "Confidence" },
  { text: "Stay open. Something good may be closer than it looks.", category: "Life" },
  { text: "Your consistency is creating options.", category: "Motivation" },
  { text: "Grow through what you go through.", category: "Life" },
  { text: "You are stronger than you think.", category: "Confidence" },
  { text: "Take a break and try again later. Your future self will thank you.", category: "Life" },
  { text: "Today you honored your wellbeing, and tomorrow you return with fresh energy and purpose.", category: "Life" },
  { text: "All winners were once beginners.", category: "Motivation" },
  { text: "Today's effort is tomorrow's advantage.", category: "Motivation" },
  { text: "A better outcome is still possible.", category: "Life" },
  { text: "You are not behind. You are becoming.", category: "Life" },
  { text: "Let today be evidence that you keep showing up.", category: "Motivation" },
  { text: "Your courage is louder than your doubt.", category: "Confidence" },
  { text: "Success can arrive quietly, then all at once.", category: "Motivation" },
  { text: "You are learning your way into the next level.", category: "Motivation" },
  { text: "What is meant for you can meet you while you are still growing.", category: "Life" },
  { text: "A mirror can show the bruise and still miss the strength.", category: "Life" },
  { text: "You are not fake for meeting the edge of what you know.", category: "Confidence" },
  { text: "The questions you missed today can become the ground you stand on tomorrow.", category: "Life" },
  { text: "A shaky answer does not erase real effort, real learning, or real belonging.", category: "Confidence" },
  { text: "Let the hurt name the lesson, not your worth.", category: "Life" },
  { text: "You can be disappointed and still be becoming someone formidable.", category: "Confidence" },
  { text: "A stumble in the room is not proof you were never meant to enter it.", category: "Life" },
  { text: "The soul gets centered when the story gets honest: you struggled, you care, and you are still here.", category: "Life" },
  { text: "Basic questions can feel heavy on a hard day. Keep studying without making cruelty your teacher.", category: "Life" },
  { text: `You are...
- a junior engineer
- with real production experience
- aggressively investing in growth
- learning fast
- contributing meaningfully
- already trusted in enterprise systems

That is REAL.`, category: "Confidence" },
  { text: "You are a learner who is investing in growth, and that is a powerful thing to be.", category: "Confidence" },
  { text: "Your career is DATA. And data is sexy.", category: "Funny" },
  { text: "Don't stop when you get to the next level. Keep going. The next level is just the beginning of a new chapter.", category: "Motivation" },
  { text: "Don't stop when you're tired. Stop when you are done.", category: "Motivation" },
  { text: "When you feel like giving up, remember why you started.", category: "Motivation" },
  { text: "They saw the gaps and still saw the potential. That counts as evidence.", category: "Confidence" },
  { text: "You do not have to be flawless to be worth betting on.", category: "Confidence" },
  { text: "Needing notes does not make you fake. It makes you someone who knows how to find the answer.", category: "Confidence" },
  { text: "A hard interview can still become a doorway.", category: "Life" },
  { text: "Keep learning the simple answers too. They are part of the foundation you are already building.", category: "Motivation" },
  { text: "Every skill gets less mysterious when you keep meeting it with patience and practice.", category: "Motivation" },
  { text: "Waiting for the answer does not mean your momentum has stopped. Keep tending to the life you are building.", category: "Life" },
  { text: "May the right door open with less effort than you feared and more joy than you expected.", category: "Life" },
  { text: "If this door closes, grieve it honestly, then come back to the next small lesson. Your future is still asking you to show up.", category: "Life" },
  { text: "Your progress is not measured by how loud others applaud it. It is measured by how honest your effort has been.", category: "Life" }
];

const phraseElement = document.getElementById("phrase");
const button = document.getElementById("phraseButton");
const heartButton = document.getElementById("heartButton");
const copyButton = document.getElementById("copyButton");
const viewFavoritesButton = document.getElementById("viewFavoritesButton");
const favoritesModal = document.getElementById("favoritesModal");
const closeModal = document.getElementById("closeModal");
const favoritesList = document.getElementById("favoritesList");
const darkModeToggle = document.getElementById("darkModeToggle");
const categorySelect = document.getElementById("categorySelect");

// Track the currently displayed phrase so we can favorite it
let currentPhrase = "";

// localStorage key for storing favorites
const FAVORITES_KEY = "luckyPhraseGenerator_favorites";

// Theme management constants
const THEME_KEY = "luckyPhraseGenerator_theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";

// Initialize theme on page load
function initializeTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  let themeToApply = savedTheme;

  if (!themeToApply) {
    // Check system preference if no saved theme
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      themeToApply = DARK_THEME;
    } else {
      themeToApply = LIGHT_THEME;
    }
  }

  applyTheme(themeToApply);
}

// Apply theme to the DOM and localStorage
function applyTheme(theme) {
  const validTheme = theme === DARK_THEME ? DARK_THEME : LIGHT_THEME;
  localStorage.setItem(THEME_KEY, validTheme);

  if (validTheme === DARK_THEME) {
    document.documentElement.setAttribute("data-theme", DARK_THEME);
    darkModeToggle.textContent = "☀️";
  } else {
    document.documentElement.removeAttribute("data-theme");
    darkModeToggle.textContent = "🌙";
  }
}

// Toggle between light and dark themes
function toggleDarkMode() {
  const currentTheme = localStorage.getItem(THEME_KEY) || LIGHT_THEME;
  const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  applyTheme(newTheme);
}

// Copy text to clipboard using the Clipboard API
async function copyToClipboard(text) {
  if (!text) {
    return false;
  }

  try {
    // Use navigator.clipboard API for modern browsers
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (error) {
    console.error("Clipboard copy failed:", error);
    return false;
  }

  return false;
}

// Function to pick a random phrase from the fallback array
function getRandomFallbackPhrase(category = ALL_CATEGORIES) {
  const phrases = getFallbackPhrasesByCategory(category);
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex].text;
}

// Function to filter fallback phrases by category
function getFallbackPhrasesByCategory(category = ALL_CATEGORIES) {
  if (!PHRASE_CATEGORIES.includes(category) || category === ALL_CATEGORIES) {
    return fallbackPhrases;
  }

  return fallbackPhrases.filter((phrase) => phrase.category === category);
}

// Pick a random API source to vary the type of content
function getRandomApiSource() {
  const randomIndex = Math.floor(Math.random() * apiSources.length);
  return apiSources[randomIndex];
}

// Load favorites from localStorage - returns an array of favorite phrases
function loadFavorites() {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
}

// Save favorites to localStorage
function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// Check if a phrase is already in favorites
function isFavorited(phrase) {
  const favorites = loadFavorites();
  return favorites.includes(phrase);
}

// Add phrase to favorites or remove if already favorited (toggle)
function toggleFavorite(phrase) {
  const favorites = loadFavorites();
  const index = favorites.indexOf(phrase);
  
  if (index > -1) {
    // Remove from favorites
    favorites.splice(index, 1);
  } else {
    // Add to favorites
    favorites.push(phrase);
  }
  
  saveFavorites(favorites);
  updateHeartButton();
}

// Update heart button appearance based on current phrase favorite status
function updateHeartButton() {
  if (isFavorited(currentPhrase)) {
    heartButton.classList.add("liked");
    heartButton.textContent = "♥"; // Filled heart
  } else {
    heartButton.classList.remove("liked");
    heartButton.textContent = "♡"; // Empty heart
  }
}

// Display the favorites modal with all saved phrases
function displayFavorites() {
  const favorites = loadFavorites();
  
  if (favorites.length === 0) {
    // Show empty state message
    favoritesList.innerHTML = `
      <div class="empty-message">
        <p>No favorite phrases yet! Heart a phrase to add it here 💕</p>
      </div>
    `;
  } else {
    // Build HTML for each favorite phrase with a remove button
    favoritesList.innerHTML = favorites.map((phrase, index) => `
      <div class="favorite-item">
        <div class="favorite-item-text">${phrase}</div>
        <button class="favorite-item-remove" data-index="${index}" type="button">Remove</button>
      </div>
    `).join("");
    
    // Add event listeners to all remove buttons
    const removeButtons = favoritesList.querySelectorAll(".favorite-item-remove");
    removeButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"));
        const favorites = loadFavorites();
        favorites.splice(index, 1);
        saveFavorites(favorites);
        displayFavorites(); // Refresh the display
      });
    });
  }
  
  // Show the modal
  favoritesModal.classList.remove("hidden");
}

async function showRandomPhrase() {
  const selectedCategory = categorySelect.value;

  if (selectedCategory !== ALL_CATEGORIES && PHRASE_CATEGORIES.includes(selectedCategory)) {
    currentPhrase = getRandomFallbackPhrase(selectedCategory);
    phraseElement.textContent = currentPhrase;
    updateHeartButton();
    updateCopyButtonState();
    confetti();
    return;
  }

  try {
    phraseElement.textContent = "Loading...";
    
    // Pick a random API source to add variety
    const source = getRandomApiSource();
    const response = await fetch(source.url);
    const data = await response.json();
    
    // Use the appropriate parser for this API's response format
    currentPhrase = source.parse(data);
    phraseElement.textContent = currentPhrase;
    
    // Update heart button to show if this phrase is already favorited
    updateHeartButton();
    
    // Update copy button disabled state
    updateCopyButtonState();
    
    // Trigger confetti celebration when advice successfully loads
    // confetti() is provided by the canvas-confetti library
    confetti();
  } catch (error) {
    // If APIs fail, show a random phrase from the fallback array instead
    // This ensures users always get a motivational message
    currentPhrase = getRandomFallbackPhrase(selectedCategory);
    phraseElement.textContent = currentPhrase;
    
    // Update heart button for fallback phrase
    updateHeartButton();
    
    // Update copy button disabled state
    updateCopyButtonState();
    
    console.error("APIs unavailable, using fallback phrase:", error);
  }
}

// Event listener for button clicks
button.addEventListener("click", showRandomPhrase);

// Event listener for keyboard shortcuts
// This allows users to press Enter or Space to fetch a new phrase
document.addEventListener("keydown", (event) => {
  // Check if the key pressed is Enter (key code 'Enter') or Space (key code ' ')
  if (event.key === "Enter" || event.key === " ") {
    // Prevent default behavior (e.g., Space scrolling down the page)
    event.preventDefault();
    // Trigger the same function as the button click
    showRandomPhrase();
  }
});

// Heart button event listener - toggle favorite status for current phrase
heartButton.addEventListener("click", () => {
  if (currentPhrase) {
    toggleFavorite(currentPhrase);
  }
});

// Copy button event listener - copy current phrase to clipboard
copyButton.addEventListener("click", async () => {
  if (!currentPhrase) {
    return; // Button should be disabled, but safeguard anyway
  }

  const success = await copyToClipboard(currentPhrase);
  const originalText = "📋 Copy";
  const originalLabel = "Copy phrase to clipboard";

  if (success) {
    copyButton.textContent = "✓ Copied!";
    copyButton.setAttribute("aria-label", "Phrase copied to clipboard");
  } else {
    copyButton.textContent = "✗ Copy failed";
    copyButton.setAttribute("aria-label", "Copy failed");
  }

  // Reset button after 2 seconds
  setTimeout(() => {
    copyButton.textContent = originalText;
    copyButton.setAttribute("aria-label", originalLabel);
    updateCopyButtonState();
  }, 2000);
});

// Update copy button disabled state based on whether there's a phrase to copy
function updateCopyButtonState() {
  if (currentPhrase && currentPhrase !== "Loading..." && currentPhrase !== "Click the button for a little boost of optimism.") {
    copyButton.disabled = false;
  } else {
    copyButton.disabled = true;
  }
}

// View Favorites button event listener - open the favorites modal
viewFavoritesButton.addEventListener("click", displayFavorites);

// Close modal event listeners
closeModal.addEventListener("click", () => {
  favoritesModal.classList.add("hidden");
});

// Close modal when clicking outside the modal content
favoritesModal.addEventListener("click", (e) => {
  if (e.target === favoritesModal) {
    favoritesModal.classList.add("hidden");
  }
});

// Dark mode toggle button event listener
darkModeToggle.addEventListener("click", toggleDarkMode);

// Initialize theme and fetch first phrase when page loads
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  updateCopyButtonState(); // Disable copy button initially until a phrase loads
  showRandomPhrase();
});

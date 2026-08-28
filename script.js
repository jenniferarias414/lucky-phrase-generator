// Lucky Phrase Generator - Now using Advice Slip API
// Fetches random motivational advice from an external API
// Falls back to local phrases if the API is unavailable

// Local phrases array - used as fallback if API fails
// These are curated motivational phrases for resilience
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
  `You are...
- a junior engineer
- with real production experience
- aggressively investing in growth
- learning fast
- contributing meaningfully
- already trusted in enterprise systems

That is REAL.`,
  "You are a learner who is investing in growth, and that is a powerful thing to be.",
  "Your career is DATA. And data is sexy.",
  `Don't stop when you get to the next level. Keep going. The next level is just the beginning of a new chapter.`,
  `Don't stop when you're tired. Stop when you are done.`,
  `When you feel like giving up, remember why you started.`,
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

const phraseElement = document.getElementById("phrase");
const button = document.getElementById("phraseButton");

// Function to pick a random phrase from the fallback array
function getRandomFallbackPhrase() {
  const randomIndex = Math.floor(Math.random() * fallbackPhrases.length);
  return fallbackPhrases[randomIndex];
}

async function showRandomPhrase() {
  try {
    phraseElement.textContent = "Loading...";
    
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    
    phraseElement.textContent = data.slip.advice;
    // Trigger confetti celebration when advice successfully loads
    // confetti() is provided by the canvas-confetti library
    confetti();
  } catch (error) {
    // If API fails, show a random phrase from the fallback array instead
    // This ensures users always get a motivational message
    const fallbackPhrase = getRandomFallbackPhrase();
    phraseElement.textContent = fallbackPhrase;
    console.error("API unavailable, using fallback phrase:", error);
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

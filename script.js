// Lucky Phrase Generator - Now using Advice Slip API
// Fetches random motivational advice from an external API

const phraseElement = document.getElementById("phrase");
const button = document.getElementById("phraseButton");

async function showRandomPhrase() {
  try {
    phraseElement.textContent = "Loading...";
    
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    
    phraseElement.textContent = data.slip.advice;
  } catch (error) {
    phraseElement.textContent = "Oops! Couldn't fetch advice. Try again.";
    console.error("Error:", error);
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

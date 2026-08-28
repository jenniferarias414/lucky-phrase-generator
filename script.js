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

button.addEventListener("click", showRandomPhrase);

# Lucky Phrase Generator

## Overview

Lucky Phrase Generator is a tiny web app that fetches random motivational advice from an external API and displays it on the page.

This is a small beginner-friendly JavaScript project designed to practice:

- HTML structure
- CSS styling
- Async/await and fetch API
- API integration
- Error handling
- DOM updates
- Button click events

---

## How It Works

The app connects to the Advice Slip API to fetch random motivational advice.

When the user clicks the button, JavaScript:

1. Makes an async request to the Advice Slip API
2. Parses the JSON response
3. Extracts the advice text
4. Updates the page with the fetched advice
5. Handles any errors gracefully

---

## Project Structure

```text
lucky-phrase-generator/
│
├── screenshots
├── index.html
├── styles.css
├── script.js
├── README.md
└── .gitignore
```

---

## Screenshot

![Lucky Phrase Generator](screenshots/01_lucky_phrase_generator.png)

---

## How to Run

Open `index.html` in a browser.

No installation required.

---

## Concepts Practiced

### Fetch API

```js
const response = await fetch("https://api.adviceslip.com/advice");
const data = await response.json();
```

### Async/Await

```js
async function showRandomPhrase() {
  // Function waits for the API response
}
```

### Error Handling

```js
try {
  // Try to fetch the advice
} catch (error) {
  // Handle errors gracefully
}
```

### DOM Update

```js
phraseElement.textContent = data.slip.advice;
```

---

## Future Improvements

- Add phrase categories
- Add animations
- Add a copy-to-clipboard button
- Add a daily phrase feature
- Add local storage for favorite phrases
- Convert to a React app
- ✅ Connect to external API to fetch dynamically (Done!)

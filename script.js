// Lucky Phrase Generator
// This small app practices JavaScript arrays, random selection, and DOM updates.

const phrases = [
  "Good things are already on their way.",
  "You are capable of figuring this out.",
  "Your next chapter can be bigger than your last one.",
  "Stay steady. The work is working.",
  "Confidence grows every time you keep going.",
  "You do not need perfect timing to make progress.",
  "The opportunity you are preparing for is preparing you too.",
  "A calm mind makes powerful moves.",
  "You are allowed to believe this can go well.",
  "Small steps still move the story forward.",
  "You are building proof, one day at a time.",
  "Luck loves preparation.",
  "Prosperity can start with one brave decision.",
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
"Every skill gets less mysterious when you keep meeting it with patience and practice."
];

const phraseElement = document.getElementById("phrase");
const button = document.getElementById("phraseButton");

function getRandomPhrase() {
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

function showRandomPhrase() {
  const selectedPhrase = getRandomPhrase();
  phraseElement.textContent = selectedPhrase;
}

button.addEventListener("click", showRandomPhrase);

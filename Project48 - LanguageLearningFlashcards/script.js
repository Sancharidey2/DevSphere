
const wordElement = document.getElementById('word');
const definitionElement = document.getElementById('definition');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const markBtn = document.getElementById('mark-btn');
const reviewBtn = document.getElementById('review-btn');

const randomWordAPI = 'https://random-word-api.herokuapp.com/word?number=1';
const dictionaryAPI = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

let history = [];
let currentIndex = -1;
let markedWords = [];
let reviewIndex = -1;

// Fetch a random word and its definition
async function fetchValidWordAndDefinition(retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const wordResponse = await fetch(randomWordAPI);
      const wordData = await wordResponse.json();
      const word = wordData[0];
      const definitionResponse = await fetch(`${dictionaryAPI}${word}`);
      if (!definitionResponse.ok) throw new Error('Definition not found.');

      const definitionData = await definitionResponse.json();
      const definition =
        definitionData[0]?.meanings[0]?.definitions[0]?.definition;

      if (definition) {
        return { word, definition };
      }
    } catch (error) {
      console.warn(`Attempt ${attempt} failed: ${error.message}`);
    }
  }
  throw new Error('Failed to fetch a valid word and definition.');
}
function updateFlashcard(word, definition) {
  const flashcard = document.querySelector('.flashcard');
  flashcard.classList.add('hidden');

  setTimeout(() => {
    wordElement.textContent = word;
    definitionElement.textContent = definition;
    flashcard.classList.remove('hidden');
  }, 300); 
}

// Toggle loading indicator
function toggleLoading(show) {
  const loadingElement = document.getElementById('loading');
  if (show) {
    loadingElement.classList.remove('hidden');
  } else {
    loadingElement.classList.add('hidden');
  }
}

async function loadNextWord() {
  toggleLoading(true);
  if (currentIndex < history.length - 1) {
    currentIndex++;
    const { word, definition } = history[currentIndex];
    updateFlashcard(word, definition);
  } else {
    try {
      const { word, definition } = await fetchValidWordAndDefinition();
      history.push({ word, definition });
      currentIndex = history.length - 1;
      updateFlashcard(word, definition);
    } catch (error) {
      alert('Could not fetch a new word. Please try again later.');
    }
  }
  toggleLoading(false);
}

function loadPreviousWord() {
  if (currentIndex > 0) {
    currentIndex--;
    const { word, definition } = history[currentIndex];
    updateFlashcard(word, definition);
  }
}

function markWordForRevision() {
  if (currentIndex >= 0 && currentIndex < history.length) {
    const { word, definition } = history[currentIndex];
    if (!markedWords.some((item) => item.word === word)) {
      markedWords.push({ word, definition });
      alert(`${word} has been marked for revision.`);
    } else {
      alert(`${word} is already marked for revision.`);
    }
  }
}

function loadMarkedWord() {
  if (markedWords.length === 0) {
    alert('No words have been marked for revision.');
    return;
  }
  reviewIndex = reviewIndex >= markedWords.length - 1 ? 0 : reviewIndex + 1;
  const { word, definition } = markedWords[reviewIndex];
  updateFlashcard(word, definition);
}

prevBtn.addEventListener('click', loadPreviousWord);
nextBtn.addEventListener('click', loadNextWord);
markBtn.addEventListener('click', markWordForRevision);
reviewBtn.addEventListener('click', loadMarkedWord);

window.addEventListener('offline', () => {
  alert('You are offline. Some features may not work.');
});

loadNextWord();

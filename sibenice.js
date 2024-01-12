const words = ["kolo", "slon", "hory", "minecraft", "pes","okurka","jablko","anakonda","mys","telefon"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 8;
let guessedWord = Array(selectedWord.length).fill('_');

function updateDisplay() {
  document.getElementById('word-display').innerText = guessedWord.join(' ');
  document.getElementById('guess-indicator').innerText = `Špatná hádání: ${incorrectGuesses}/${maxIncorrectGuesses}`;
  document.getElementById('alphabet-buttons').innerHTML = generateAlphabetButtons();
}

function generateAlphabetButtons() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let buttonsHTML = '';

  for (let letter of alphabet) {
    buttonsHTML += `<div class="letter-button" onclick="handleGuess('${letter}')">${letter}</div>`;
  }

  return buttonsHTML;
}

function handleGuess(letter) {
  if (selectedWord.includes(letter)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter) {
        guessedWord[i] = letter;
      }
    }
  } else {
    incorrectGuesses++;
    if (incorrectGuesses === maxIncorrectGuesses) {
      alert('Prohrál jsi! Hledané slovo bylo: ' + selectedWord);
      resetGame();
    }
  }

  if (!guessedWord.includes('_')) {
    alert('Gratuluji, vyhrál jsi! Hledané slovo bylo: ' + selectedWord);
    resetGame();
  }

  updateDisplay();
}

function resetGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  incorrectGuesses = 0;
  guessedWord = Array(selectedWord.length).fill('_');
  updateDisplay();
}

updateDisplay();

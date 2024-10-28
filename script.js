'use strict';

const btnAgain = document.querySelector('.again');
const correctNumber = document.querySelector('.number');
const guess = document.querySelector('.guess');
const check = document.querySelector('.check');
const score = document.querySelector('.score');
const highscore = document.querySelector('.highscore');
const message = document.querySelector('.message');

const initialScore = 20;
let currentScore = initialScore;
let randomNumber = generateRandomNumber();

// Helper functions
const displayMessage = text => (message.textContent = text);
const updateScore = () => (score.textContent = currentScore);
const resetGame = () => {
  document.body.style.backgroundColor = '#222';
  displayMessage('Start guessing...');
  currentScore = initialScore;
  updateScore();
  correctNumber.textContent = '?';
  guess.value = '';
  check.disabled = false;
  check.style.cursor = 'pointer';
  randomNumber = generateRandomNumber();
};

const disableButton = btn => {
  btn.disabled = true;
  btn.style.cursor = 'not-allowed';
};

function generateRandomNumber() {
  return Math.trunc(Math.random() * 20 + 1);
}

// Event listeners
check.addEventListener('click', function () {
  const guessedNumber = Number(guess.value);

  if (!guessedNumber) {
    displayMessage('Enter a number first!');
    return;
  }

  if (guessedNumber === randomNumber) {
    document.body.style.backgroundColor = '#2fca00';
    displayMessage('Correct Number! 🥳🥳🥳');
    correctNumber.textContent = randomNumber;
    if (currentScore > Number(highscore.textContent)) {
      highscore.textContent = currentScore;
    }
    disableButton(this);
  } else {
    currentScore--;
    updateScore();
    displayMessage(guessedNumber > randomNumber ? 'Too High!' : 'Too Low!');
    if (currentScore === 0) {
      displayMessage('You lost the game! Try again');
      disableButton(this);
    }
  }
});

btnAgain.addEventListener('click', resetGame);

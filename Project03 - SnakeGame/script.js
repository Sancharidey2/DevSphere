const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const levelElement = document.querySelector(".level");
const newGameButton = document.querySelector(".new-game-button");
const restartGameButton = document.querySelector(".restart-game-button");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;
let level = 1;
let gameSpeed = 300;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const updateFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  clearInterval(setIntervalId);
  const gameOverModal = document.getElementById("gameOverModal");
  const finalScoreElement = document.getElementById("finalScore");
  gameOverModal.style.display = "block";
  finalScoreElement.innerText = score;
  document.getElementById("replayButton").addEventListener("click", () => {
    gameOverModal.style.display = "none";
    startNewGame();
  });
};

const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

const initGame = () => {
  if (gameOver) return handleGameOver();

  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  if (snakeX === foodX && snakeY === foodY) {
    updateFoodPosition();
    snakeBody.push([foodY, foodX]);
    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = `High Score: ${highScore}`;
  }

  snakeX += velocityX;
  snakeY += velocityY;

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [snakeX, snakeY];

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  snakeBody.forEach((segment, index) => {
    html += `<div class="head" style="grid-area: ${segment[1]} / ${segment[0]}"></div>`;
    if (index !== 0 && segment[0] === snakeX && segment[1] === snakeY) {
      gameOver = true;
    }
  });

  playBoard.innerHTML = html;
};

const startNewGame = () => {
  gameOver = false;
  score = 0;
  level = 1;
  snakeBody = [];
  velocityX = 0;
  velocityY = 0;
  snakeX = 5;
  snakeY = 5;
  scoreElement.innerText = `Score: ${score}`;
  levelElement.innerText = `Level: ${level}`;
  updateFoodPosition();
  clearInterval(setIntervalId);
  setIntervalId = setInterval(initGame, gameSpeed);
};

newGameButton.addEventListener("click", startNewGame);
restartGameButton.addEventListener("click", startNewGame);

updateFoodPosition();
setIntervalId = setInterval(initGame, gameSpeed);
document.addEventListener("keyup", changeDirection);

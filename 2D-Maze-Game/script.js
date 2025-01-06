const mazeElement = document.querySelector(".maze");
const timerElement = document.getElementById("timer");
const levelElement = document.getElementById("level");
const resetButton = document.getElementById("reset");

const moveSound = document.getElementById("move-sound");
const collisionSound = document.getElementById("collision-sound");
const winSound = document.getElementById("win-sound");

let currentLevel = 0;
let maze = [];
let playerPosition = { x: 1, y: 1 };
let goalPosition = { x: 0, y: 0 };
let startTime;
let timerInterval;

// Generate a random maze using Recursive Backtracking with added confusion paths
function generateRandomMaze(rows, cols) {
  const maze = Array.from({ length: rows }, () => Array(cols).fill(1));

  function carvePath(x, y) {
    let directions = [
      [0, -2], // Up
      [0, 2],  // Down
      [-2, 0], // Left
      [2, 0],  // Right
    ];

    directions.sort(() => Math.random() - 0.5); // Randomize directions

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1 && maze[ny][nx] === 1) {
        // Carve a path to the neighbor
        maze[y + dy / 2][x + dx / 2] = 0; // Remove wall
        maze[ny][nx] = 0; // Carve path
        carvePath(nx, ny); // Recurse

        // Add additional dead-end paths for confusion
        if (Math.random() < 0.3) {
          carveDeadEnd(nx, ny, directions);
        }
      }
    }
  }

  // Add confusing dead-end paths
  function carveDeadEnd(x, y, directions) {
    const deadEndDirections = directions.slice();
    deadEndDirections.sort(() => Math.random() - 0.5); // Shuffle

    for (const [dx, dy] of deadEndDirections) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1 && maze[ny][nx] === 1) {
        maze[y + dy / 2][x + dx / 2] = 0; // Remove wall
        maze[ny][nx] = 0; // Carve dead-end
        break; // Only create one dead-end per call
      }
    }
  }

  maze[1][1] = 0; // Start point
  carvePath(1, 1);

  return maze;
}

// Ensure the goal is reachable
function clearGoalArea() {
  const { x, y } = goalPosition;

  // Clear the goal position and its immediate surroundings
  const directions = [
    [0, 0],   // Goal itself
    [-1, 0],  // Top
    [1, 0],   // Bottom
    [0, -1],  // Left
    [0, 1],   // Right
  ];

  directions.forEach(([dx, dy]) => {
    const nx = x + dx;
    const ny = y + dy;
    if (maze[ny] && maze[ny][nx] !== undefined) {
      maze[ny][nx] = 0; // Clear wall
    }
  });
}

// Generate a new level
function generateLevel(level) {
  const size = 10 + level * 2; // Increase maze size with level
  maze = generateRandomMaze(size, size);
  playerPosition = { x: 1, y: 1 }; // Always start at (1,1)
  goalPosition = { x: size - 2, y: size - 2 }; // Goal at bottom-right
  clearGoalArea(); // Ensure goal is reachable
}

// Generate maze grid in DOM
function renderMaze() {
  mazeElement.innerHTML = "";
  mazeElement.style.gridTemplateColumns = `repeat(${maze[0].length}, 30px)`;

  maze.forEach((row, y) => {
    row.forEach((cell, x) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");

      if (cell === 1) {
        cellElement.classList.add("wall");
      } else if (x === playerPosition.x && y === playerPosition.y) {
        cellElement.classList.add("player");
      } else if (x === goalPosition.x && y === goalPosition.y) {
        cellElement.classList.add("goal");
      }

      mazeElement.appendChild(cellElement);
    });
  });
}

// Move player
function movePlayer(dx, dy) {
  const newX = playerPosition.x + dx;
  const newY = playerPosition.y + dy;

  if (maze[newY] && maze[newY][newX] === 0) {
    playerPosition.x = newX;
    playerPosition.y = newY;
    renderMaze();
    moveSound.play();

    if (newX === goalPosition.x && newY === goalPosition.y) {
      clearInterval(timerInterval);
      winSound.play();
      setTimeout(() => {
        if (currentLevel < 4) { // Total 5 levels (0 to 4)
          currentLevel++;
          alert(`Level ${currentLevel + 1}`);
          levelElement.textContent = currentLevel + 1;
          initializeLevel();
        } else {
          alert("🎉 Congratulations! You've completed all levels! 🎉");
        }
      }, 500);
    }
  } else {
    collisionSound.play();
  }
}

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") movePlayer(0, -1);
  if (e.key === "ArrowDown") movePlayer(0, 1);
  if (e.key === "ArrowLeft") movePlayer(-1, 0);
  if (e.key === "ArrowRight") movePlayer(1, 0);
});

// Start timer
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, "0");
    const seconds = (elapsedTime % 60).toString().padStart(2, "0");
    timerElement.textContent = `${minutes}:${seconds}`;
  }, 1000);
}

// Initialize level
function initializeLevel() {
  generateLevel(currentLevel);
  renderMaze();
  clearInterval(timerInterval);
  startTimer();
}

// Reset game
resetButton.addEventListener("click", () => {
  currentLevel = 0;
  levelElement.textContent = currentLevel + 1;
  initializeLevel();
});

// Initialize game
initializeLevel();

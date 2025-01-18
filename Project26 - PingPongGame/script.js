const canvas = document.querySelector("#ping-pong");
if (!canvas) throw new Error("Canvas element not found!");

const context = canvas.getContext("2d");

const startBtn = document.querySelector(".start-btn");
const pauseBtn = document.querySelector(".pause-btn");
const restartBtn = document.querySelector(".restart-btn");

if (!startBtn || !pauseBtn || !restartBtn) throw new Error("Control buttons not found!");

canvas.width = 800; // Set canvas dimensions explicitly
canvas.height = 400;

let gameRunning = false;
let animationId;

// CREATE USER PADDLE
const user = {
  x: 0,
  y: canvas.height / 2 - 100 / 2,
  width: 10,
  height: 100,
  color: "red",
  score: 0,
};

// CREATE COMPUTER PADDLE
const computer = {
  x: canvas.width - 10,
  y: canvas.height / 2 - 100 / 2,
  width: 10,
  height: 100,
  color: "black",
  score: 0,
};

// CREATE THE BALL
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 5,
  velocityX: 5,
  velocityY: 5,
  color: "white",
};

// DRAW RECTANGLE FUNCTION
function drawRectangle(x, y, w, h, color) {
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
}

// DRAW CIRCLE FUNCTION
function drawCircle(x, y, r, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
}

// DRAW TEXT FUNCTION
function drawText(text, x, y, color) {
  context.fillStyle = color;
  context.font = "45px fantasy";
  context.fillText(text, x, y);
}

// DRAW NET FUNCTION
function drawNet() {
  const netWidth = 4;
  const netSpacing = 15;

  for (let i = 0; i <= canvas.height; i += netSpacing) {
    drawRectangle(canvas.width / 2 - netWidth / 2, i, netWidth, 10, "white");
  }
}

// RESET BALL FUNCTION
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speed = 5;
  ball.velocityX = -ball.velocityX;
}

// RENDER GAME FUNCTION
function render() {
  drawRectangle(0, 0, canvas.width, canvas.height, "green");
  drawNet();
  drawText(user.score, canvas.width / 4, canvas.height / 5, "white");
  drawText(computer.score, (3 * canvas.width) / 4, canvas.height / 5, "white");
  drawRectangle(user.x, user.y, user.width, user.height, user.color);
  drawRectangle(computer.x, computer.y, computer.width, computer.height, computer.color);
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// CONTROL USER PADDLE
canvas.addEventListener("mousemove", (evt) => {
  const rect = canvas.getBoundingClientRect();
  user.y = evt.clientY - rect.top - user.height / 2;

  // Ensure the paddle stays within canvas bounds
  user.y = Math.max(Math.min(user.y, canvas.height - user.height), 0);
});

// BALL AND PADDLE COLLISION DETECTION
function collision(b, p) {
  return (
    b.x + b.radius > p.x &&
    b.x - b.radius < p.x + p.width &&
    b.y + b.radius > p.y &&
    b.y - b.radius < p.y + p.height
  );
}

// UPDATE FUNCTION
function update() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // Simple AI for computer paddle
  const computerLevel = 0.1;
  computer.y += (ball.y - (computer.y + computer.height / 2)) * computerLevel;

  // Ball collision with top and bottom walls
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.velocityY = -ball.velocityY;
  }

  // Ball collision with paddles
  const player = ball.x < canvas.width / 2 ? user : computer;
  if (collision(ball, player)) {
    const collidePoint = ball.y - (player.y + player.height / 2);
    const normalized = collidePoint / (player.height / 2);
    const angleRad = (Math.PI / 4) * normalized;

    const direction = ball.x < canvas.width / 2 ? 1 : -1;
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);
    ball.speed += 0.5;
  }

  // Update scores
  if (ball.x - ball.radius < 0) {
    computer.score++;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    user.score++;
    resetBall();
  }
}

// GAME LOOP
function animate() {
  if (!gameRunning) return;
  update();
  render();
  animationId = requestAnimationFrame(animate);
}

// EVENT LISTENERS FOR GAME CONTROL
startBtn.addEventListener("click", () => {
  if (!gameRunning) {
    gameRunning = true;
    animate();
  }
});

pauseBtn.addEventListener("click", () => {
  gameRunning = false;
  cancelAnimationFrame(animationId);
});

restartBtn.addEventListener("click", () => {
  document.location.reload();
});

// INITIAL RENDER
window.addEventListener("load", render);

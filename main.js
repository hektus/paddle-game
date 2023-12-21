const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//define up/down player move
let playerUpPressed = false;
let playerDownPressed = false;

//define player paddle
const playerPaddleSpeed = 5;
let playerPaddleY = canvas.height / 2;

//define AI paddle
const aiPaddleSpeed = 5;
const aiPaddleX = canvas.height / 2;

//variables to both paddle and net(color)
const paddleHeight = 150;
const paddleWidth = 15;
const paddleMarginOffset = 50;
const paddleColor = "gold";

//define ball
const ballWidth = 50;
const ballHeight = 50;

//define net
const netWidth = 5;
const netSegmentHeight = 10;
const netSegmentGap = 8;

//define playerScore
let playerScore = 0;

//define aiScore
let aiScore = 0;

function keyUpHandler(e) {
  if (e.key === 38 || e.key === "ArrowUp") {
    playerUpPressed = false;
  } else if (e.key === 40 || e.key === "ArrowDown") {
    playerDownPressed = false;
  }
}

function keyDownHandler(e) {
  if (e.key === 38 || e.key === "ArrowUp") {
    playerUpPressed = true;
  } else if (e.key === 40 || e.key === "ArrowDown") {
    playerDownPressed = true;
  }
}

function drawPlayerPaddle() {
  ctx.beginPath();
  ctx.rect(
    paddleMarginOffset,
    playerPaddleY - paddleHeight / 2,
    paddleWidth,
    paddleHeight
  );
  ctx.fillStyle = paddleColor;
  ctx.fill();
  ctx.closePath();
}

function drawAiPaddle() {
  ctx.beginPath();
  ctx.rect(
    canvas.width - paddleWidth - paddleMarginOffset,
    aiPaddleX - paddleHeight / 2,
    paddleWidth,
    paddleHeight
  );
  ctx.fillStyle = paddleColor;
  ctx.fill();
  ctx.closePath();
}

function drawMiddleNet() {
  ctx.beginPath();
  for (let y = 0; y < canvas.height; y += netSegmentHeight + netSegmentGap) {
    ctx.rect(canvas.width / 2 - netWidth / 2, y, netWidth, netSegmentHeight);
    ctx.fillStyle = paddleColor;
    ctx.fill();
  }
  ctx.closePath();
}

function drawPlayerScore() {
  ctx.font = "28px Arial";
  ctx.fillStyle = paddleColor;
  const textMetrics = ctx.measureText(`Player Score: ${playerScore}`);
  const textWidth = textMetrics.width;
  ctx.fillText(
    `Player Score: ${playerScore}`,
    canvas.width / 4 - textWidth / 2,
    30
  );
}

function drawAiScore() {
  ctx.font = "28px Arial";
  ctx.fillStyle = paddleColor;
  const textMetrics = ctx.measureText(`Ai Score: ${aiScore}`);
  const textWidth = textMetrics.width;
  ctx.fillText(`Ai Score: ${aiScore}`, canvas.width - 300 - textWidth / 2, 30);
}

//main function to draw all

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayerPaddle();
  drawAiPaddle();
  drawMiddleNet();
  drawPlayerScore();
  drawAiScore();

  if (playerUpPressed) {
    playerPaddleY -= playerPaddleSpeed;
    if (playerPaddleY - paddleHeight / 2 < 0) {
      playerPaddleY = paddleHeight / 2;
    }
  }

  if (playerDownPressed) {
    playerPaddleY += playerPaddleSpeed;
    if (playerPaddleY + paddleHeight / 2 > canvas.height) {
      playerPaddleY = canvas.height - paddleHeight / 2;
    }
  }

  requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

draw();

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//define player paddle
const playerPaddleSpeed = 5;
const playerPaddleX = canvas.height / 2;

//define AI paddle
const aiPaddleSpeed = 5;
const aiPaddleX = canvas.height / 2;

//variables to both paddle and net
const paddleHeight = 150;
const paddleWidth = 15;
const paddleMarginOffset = 50;
const paddleColor = "gold";

//define net
const netWidth = 5;
const netSegmentHeight = 10;
const netSegmentGap = 8;

//define playerScore
let playerScore = 0;

//define aiScore
let aiScore = 0;

function drawPlayerPaddle() {
  ctx.beginPath();
  ctx.rect(
    paddleMarginOffset,
    playerPaddleX - paddleHeight / 2,
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
  ctx.fillStyle = "yellow";
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
  ctx.fillStyle = "yellow";
  const textMetrics = ctx.measureText(`Ai Score: ${aiScore}`);
  const textWidth = textMetrics.width;
  ctx.fillText(`Ai Score: ${aiScore}`, canvas.width - 300 - textWidth / 2, 30);
}

//main function to draw all

function draw() {
  drawPlayerPaddle();
  drawAiPaddle();
  drawMiddleNet();
  drawPlayerScore();
  drawAiScore();
  requestAnimationFrame(draw);
}

draw();

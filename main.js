const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//define player paddle
const playerPaddleHeight = 150;
const playerPaddleWidth = 15;
const playerPaddleSpeed = 5;
const playerPaddleX = canvas.height / 2;

//define AI paddle
const aiPaddleHeight = 150;
const aiPaddleWidth = 15;
const aiPaddleSpeed = 5;
const aiPaddleX = canvas.height / 2;

//variables to both paddle
const paddleMarginOffset = 50;

function drawPlayerPaddle() {
  ctx.beginPath();
  ctx.rect(
    paddleMarginOffset,
    playerPaddleX - playerPaddleHeight / 2,
    playerPaddleWidth,
    playerPaddleHeight
  );
  ctx.fillStyle = "grey";
  ctx.fill();
  ctx.closePath();
}

function drawAiPaddle() {
  ctx.beginPath();
  ctx.rect(
    canvas.width - aiPaddleWidth - paddleMarginOffset,
    playerPaddleX - playerPaddleHeight / 2,
    playerPaddleWidth,
    playerPaddleHeight
  );
  ctx.fillStyle = "grey";
  ctx.fill();
  ctx.closePath();
}

//main function to draw all

function draw() {
  drawPlayerPaddle();
  drawAiPaddle();
  requestAnimationFrame(draw);
}

draw();

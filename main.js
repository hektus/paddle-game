const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let playerUpPressed = false;
let playerDownPressed = false;

//define player paddle
const playerPaddleSpeed = 5;
let playerPaddleY = canvas.height / 2;

//define AI paddle
const aiPaddleSpeed = 5;
let aiPaddleY = canvas.height / 2;

//variables to both paddle and net(color)
const paddleHeight = 150;
const paddleWidth = 15;
const paddleMarginOffset = 50;
const paddleColor = "gold";

//define ball
const ballRadius = 20;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = -2;
let ballDY = 2;

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
    aiPaddleY - paddleHeight / 2,
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

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = paddleColor;
  ctx.fill();
  ctx.closePath();
}

function detectCollision() {
  //detect top and bottom line
  if (ballY - ballRadius < 0) {
    ballDY = -ballDY;
  } else if (ballY + ballRadius > canvas.height) {
    ballDY = -ballDY;
  }

  //detect left line, ai score and player paddle
  if (ballX - ballRadius - paddleWidth - paddleMarginOffset < 0) {
    if (
      ballY > playerPaddleY - paddleHeight / 2 &&
      ballY < playerPaddleY + paddleHeight / 2
    ) {
      ballDX = -ballDX;
    } else if (ballX - ballRadius < 0) {
      aiScore++;
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
    }
  }
  //detect player score, right line and ai paddle
  if (ballX + ballRadius > canvas.width) {
    ballDX = -ballDX;
    console.log("Punkt dla gracza");
  }
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
  drawBall();
  detectCollision();
  ballX += ballDX;
  ballY += ballDY;
  // console.log(playerPaddleY);
  // player paddel control
  if (playerUpPressed) {
    playerPaddleY -= playerPaddleSpeed;
    aiPaddleY = playerPaddleY; // follow player paddle (to be removed)
    if (playerPaddleY - paddleHeight / 2 < 0) {
      playerPaddleY = paddleHeight / 2;
    }
  }
  if (playerDownPressed) {
    playerPaddleY += playerPaddleSpeed;
    aiPaddleY = playerPaddleY; // follow player paddle (to be removed)
    if (playerPaddleY + paddleHeight / 2 > canvas.height) {
      playerPaddleY = canvas.height - paddleHeight / 2;
    }
  }

  requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

draw();

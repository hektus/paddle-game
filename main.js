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
const ballSpeed = 4;
let ballAcceleration = 1;

//define random ball respawn direction
const randomBallRespawn = () => {
  const direction = Math.floor(Math.random() * 2);
  if (!direction) {
    return -ballSpeed;
  } else {
    return ballSpeed;
  }
};

let ballDX = randomBallRespawn();
let ballDY = randomBallRespawn();

//define net
const netWidth = 5;
const netSegmentHeight = 10;
const netSegmentGap = 8;

//define playerScore
let playerScore = 0;

//define aiScore
let aiScore = 0;

let scoreToWin = 5;

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
      ballAcceleration += 0.1;
    } else if (ballX - ballRadius < 0) {
      ballAcceleration = 1;
      aiScore++;
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      if (aiScore === scoreToWin) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballDX = 0;
        ballDY = 0;
        setTimeout(() => {
          alert("AI WINS");
          document.location.reload();
        }, 1000);
      }
    }
  }

  //detect player score, right line and ai paddle
  if (ballX + ballRadius + paddleMarginOffset + paddleWidth > canvas.width) {
    if (
      ballY > aiPaddleY - paddleHeight / 2 &&
      ballY < aiPaddleY + paddleHeight / 2
    ) {
      ballDX = -ballDX;
      ballAcceleration += 0.1;
    } else if (ballX + ballRadius > canvas.width) {
      ballAcceleration = 1;
      playerScore++;
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      if (playerScore === scoreToWin) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballDX = 0;
        ballDY = 0;
        setTimeout(() => {
          alert("YOU WIN");
          document.location.reload();
        }, 1000);
      }
    }
  }
}

function drawPlayerScore() {
  ctx.font = "28px Arial";
  ctx.fillStyle = paddleColor;
  const textMetrics = ctx.measureText(
    `Player Score: ${playerScore} / ${scoreToWin}`
  );
  const textWidth = textMetrics.width;
  ctx.fillText(
    `Player Score: ${playerScore} / ${scoreToWin}`,
    canvas.width / 4 - textWidth / 2,
    30
  );
}

function drawAiScore() {
  ctx.font = "28px Arial";
  ctx.fillStyle = paddleColor;
  const textMetrics = ctx.measureText(`Ai Score: ${aiScore} / ${scoreToWin}`);
  const textWidth = textMetrics.width;
  ctx.fillText(
    `Ai Score: ${aiScore} / ${scoreToWin}`,
    canvas.width - 300 - textWidth / 2,
    30
  );
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
  ballX += ballDX * ballAcceleration;
  ballY += ballDY * ballAcceleration;

  // player paddel control
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

  //AI paddle control

  const aiPaddleSmoothness = 0.04 + Math.random() * (0.15 - 0.04);
  const paddleToBallDelta = ballY - aiPaddleY;
  aiPaddleY += paddleToBallDelta * aiPaddleSmoothness;

  if (aiPaddleY - paddleHeight / 2 < 0) {
    aiPaddleY = paddleHeight / 2;
  } else if (aiPaddleY + paddleHeight / 2 > canvas.height) {
    aiPaddleY = canvas.height - paddleHeight / 2;
  }

  requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

draw();

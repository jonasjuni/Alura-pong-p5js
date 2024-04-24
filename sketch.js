let canvasWidth = 600;
let canvasHeight = 400;

let dBall = 15;
let radiusBall = dBall / 2;
let xBall = canvasWidth / 2;
let yBall = canvasHeight / 2;

let velocity = 6;
let xBallVelocity = velocity;
let yBallVelocity = velocity;
function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(0);
  drawBall();
  moveBall();
  ballBorderCollision();

  drawPlayerRacket();
  movePlayerRacket();
  racketCollision();

  debugLines();
}

function drawBall() {
  circle(xBall, yBall, dBall);
}
function moveBall() {
  xBall += xBallVelocity;
  yBall += yBallVelocity;
}
function ballBorderCollision() {
  if (xBall - radiusBall < 0) {
    xBallVelocity *= -1;
  }
  if (xBall + radiusBall > width) {
    xBallVelocity *= -1;
  }
  if (yBall + radiusBall > height || yBall - radiusBall < 0) {
    yBallVelocity *= -1;
  }
}

let racketWidth = 10;
let racketHeight = 90;
let xRacket = 5;
let yRacket = 400 / 2 - racketHeight / 2;

function drawPlayerRacket() {
  rect(xRacket, yRacket, racketWidth, racketHeight);
}

function movePlayerRacket() {
  //TODO: add border limit
  if (keyIsDown(UP_ARROW)) {
    yRacket -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRacket += 10;
  }
}
function racketCollision() {
  if (xBall - radiusBall < xRacket + racketWidth / 2 && (yBall <= yRacket + racketHeight && yBall >= yRacket)) {
    xBallVelocity *= -1;
  }

}

function debugLines() {
  rect(width / 2 - 1, 0, 2, height);
  rect(0, height / 2 - 1, width, 2);
}
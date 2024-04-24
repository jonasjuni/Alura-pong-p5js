// import { collideRectCircle } from "p5collide";
// Canvas
let canvasWidth = 600;
let canvasHeight = 400;

// Ball settings
let dBall = 15;
let radiusBall = dBall / 2;
let xBall = canvasWidth / 2;
let yBall = canvasHeight / 2;
let velocity = 6;
let xBallVelocity = velocity;
let yBallVelocity = velocity;

let hit = false;

//Racket settings
let racketWidth = 10;
let racketHeight = 90;
// Player Settings
let xPlayerRacket = 5;
let yPlayerRacket = 400 / 2 - racketHeight / 2;
let player_points = 0;
//Com Settings
let xComRacket = canvasWidth - racketWidth - 5;
let yComRacket = yPlayerRacket;
let com_points = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(0);
  drawBall();
  moveBall();
  ballBorderCollision();
  drawRacket(xPlayerRacket, yPlayerRacket);

  movePlayerRacket();
  racketCollisionLib();

  drawRacket(xComRacket, yComRacket);
  moveComRacket();

  // debugLines();
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
    com_points += 1;
    console.log(`Opponet Goal: ${com_points}`)
  }
  if (xBall + radiusBall > width) {
    xBallVelocity *= -1;
    player_points += 1;
  }
  if (yBall + radiusBall > height || yBall - radiusBall < 0) {
    yBallVelocity *= -1;
  }
}

function drawRacket(x, y) {
  rect(x, y, racketWidth, racketHeight);
}

function movePlayerRacket() {
  //TODO: add border limit
  if (keyIsDown(UP_ARROW)) {
    yPlayerRacket -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yPlayerRacket += 10;
  }
}
// function racketCollision() {
//   if (xBall - radiusBall < xPlayerRacket + racketWidth
//     && yBall - radiusBall <= yPlayerRacket + racketHeight
//     && yBall + radiusBall >= yPlayerRacket) {
//     xBallVelocity *= -1;
//   }
// }
function racketCollisionLib() {
  hit = collideRectCircle(xPlayerRacket, yPlayerRacket, racketWidth, racketHeight, xBall, yBall, dBall);
  if (hit) {
    xBallVelocity *= -1;
  }
}

let drift = 0;
function moveComRacket() {
  drift = yBall - yComRacket - racketHeight / 2 - 30; 
  yComRacket += drift;
}

function debugLines() {
  rect(width / 2 - 1, 0, 2, height);
  rect(0, height / 2 - 1, width, 2);
}
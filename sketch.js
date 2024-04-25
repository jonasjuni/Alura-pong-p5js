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

//Racket settings
let racketWidth = 10;
let racketHeight = 90;
// Player Settings
let xPlayerRacket = 5;
let yPlayerRacket = 400 / 2 - racketHeight / 2;
let playerPoints = 0;
//Com Settings
let xComRacket = canvasWidth - racketWidth - 5;
let yComRacket = yPlayerRacket;
let comPoints = 0;

let ponto;
let raquetada;
let trilha;

function preload() {
  ponto = loadSound('assets/sounds/ponto.mp3');
  raquetada = loadSound('assets/sounds/raquetada.mp3');
  trilha = loadSound('assets/sounds/trilha.mp3');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  trilha.loop();
}

function draw() {
  background(0);
  drawBall();
  moveBall();
  ballBorderCollision();
  drawRacket(xPlayerRacket, yPlayerRacket);

  movePlayerRacket();
  racketCollisionLib(xPlayerRacket, yPlayerRacket);

  drawRacket(xComRacket, yComRacket);
  moveComRacket();
  racketCollisionLib(xComRacket, yComRacket);
  drawScore();
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
    comPoints += 1;
    ponto.play();
  }
  if (xBall + radiusBall > width) {
    xBallVelocity *= -1;
    playerPoints += 1;
    ponto.play();
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
  if (keyIsDown(UP_ARROW) && yPlayerRacket > 5) {
    yPlayerRacket -= 10;
  }
  if (keyIsDown(DOWN_ARROW) && yPlayerRacket + racketHeight < height - 5) {
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

let hit = false;
function racketCollisionLib(x, y) {
  hit = collideRectCircle(x, y, racketWidth, racketHeight, xBall, yBall, dBall);
  if (hit) {
    xBallVelocity *= -1; 
    raquetada.play();
  }
}

let drift = 0;
function moveComRacket() {
  drift = yBall - yComRacket - racketHeight / 2 - 30;
  yComRacket += drift;

  yComRacket = constrain(yComRacket, 5, height - racketHeight - 5);
}

let spacing = 150;
function drawScore() {
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(255, 140, 0);
  rect(canvasWidth / 2 - spacing - 20, 50 - 17, 40, 20);
  fill(255);
  text(playerPoints, canvasWidth / 2 - spacing, 50);
  fill(255, 140, 0);;
  rect(canvasWidth / 2 + spacing - 20, 50 - 17, 40, 20);
  fill(255);
  text(comPoints, canvasWidth / 2 + spacing, 50);
}

function debugLines() {
  rect(width / 2 - 1, 0, 2, height);
  rect(0, height / 2 - 1, width, 2);
}
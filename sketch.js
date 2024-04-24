let xBall = 300;
let yBall= 200;
let dBall = 15;
let radiusBall = dBall / 2;

let xBallVelocity = 2;
let yBallVelocity = 2;
function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  circle(xBall, yBall, dBall);
  xBall += xBallVelocity;
  yBall += yBallVelocity;

  if (xBall + radiusBall > width || xBall - radiusBall  < 0) { 
    xBallVelocity *= -1;
  }
  if (yBall + radiusBall > height || yBall - radiusBall < 0) { 
    yBallVelocity *= -1;
  }
  // console.log(height);
}
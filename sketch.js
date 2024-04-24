let ballX = 300;
let ballY= 200;
let ballDiameter = 50;


function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  circle(ballX, ballY, ballDiameter);
}
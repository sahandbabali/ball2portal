//Basics of matter js physics based on this tutorial on youtube
// https://www.youtube.com/watch?v=urR596FsU68&list=PLRqwX-V7Uu6bLh3T_4wtrmVHOrOEM1ig_
var t;
var rotationn;
var engine;
var world;
var ball;
var ground = [];
let woodbackground;
var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies;
var ballposx ;
var ballposy;
var ballsin = 0;
var txt = " ";


window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
  var absolute = event.absolute;
  var alpha = event.alpha;
  var beta = event.beta;
  var gamma = event.gamma;
  var xg = map(beta, -180, 180, -1, 1);
  var yg = map(gamma, -90, 90, -1, 1);
  engine.world.gravity.x = yg;
  engine.world.gravity.y = xg;
}

function verticalText(input) {
  fill(255);
  textSize(30);
  push();
  translate(370,15);
  angleMode(DEGREES);
  rotate(90);
  text(input, 0,0);
  pop();


}

function Ball(x,y) {
  this.body = Bodies.circle(x, y, 50);
  // Friction between 0 and 1
  this.body.friction = 10;
  this.body.restitution = 0;
  World.add(world, this.body);
  
  this.show = function () {
    var pos = this.body.position;
    push();
    fill(200);
    ballposx = pos.x;
    ballposy = pos.y;
    translate(pos.x, pos.y);
   // circle(0, 0, 50);
   image(ballbg, 0, 0);
    pop();
  };
  this.remove = function (){
    console.log("remove fired");
    Matter.Composite.remove(world, this.body);

  }
}

function preload() {
  // woodbackground = loadImage('/wood.jpg');
  // ballbg = loadImage('/ball.png');

  woodbackground = loadImage('https://i.ibb.co/QQtMPgd/wood.jpg');
  ballbg = loadImage('https://i.ibb.co/2NcrGDL/ball.png');
}

function setup() {
  t = 0;
  createCanvas(400, 660);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  ground = [
    Bodies.rectangle(200, 0, 400, 10, { isStatic: true }),
    Bodies.rectangle(200, 660, 400, 10, { isStatic: true }),
    Bodies.rectangle(0, 350, 10, 660, { isStatic: true }),
    Bodies.rectangle(400, 350, 10, 660, { isStatic: true }),
  ];
  World.add(world, ground);
}

function mousePressed() {
  if(!ball){
    ball = new Ball(mouseX, mouseY);
  }
}



function draw() {
  background(woodbackground);
  if(ballsin == 1){
    txt = `${ballsin} Ball in the portal`;
  } else {
    txt = `${ballsin} Balls in the portal`;
  }
  verticalText(txt);
  if (ball) {
    ball.show();
  }
  var holex = width * noise(t);
  var holey = height * noise(t+5);
  strokeWeight(4);
  stroke(51);
  fill(0);
  circle(holex, holey, 50);
  t = t + 0.005;
if(ball){

  if (dist(holex, holey,ballposx, ballposy) < 50){
   
    ball.remove();
    ball = new Ball(random(0,width), random(0,height));
    ballsin = ballsin+1;
  }
}
}

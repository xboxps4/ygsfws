const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;

var engine, world;
var ground;
var particle;

var divisions = [];
var plinkos = [];

var divisionHeight=300;

var score = 0;
var turn = 0;

var gameState = "play";

function setup() {

  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);

  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 8, divisionHeight));
  }


  for (var j = 25; j <=width; j=j+50) 
  {
    plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,175));
  }

  for (var j = 25; j <=width; j=j+50) 
  {
    plinkos.push(new Plinko(j,275));
  }

  for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,375));
  }

  new Border(0, 400, 1, 800);
  new Border(800, 400, 1, 800);

  new Border(400, 0, 800, 1);
    
}

function draw() {

  background("red");

  Engine.update(engine);

  textSize(25)
  fill("white");
  text("Score: " + score, 25, 25);

  for(var i = 25; i < 800; i = i + 720){
    textSize(20);
    fill("white");
    text("100", i, 650);
  }

  for(var i = 95; i < 750; i = i + 560){
    textSize(20);
    fill("white");
    text("1000", i, 650);
  }

  for(var i = 195; i < 600; i = i + 400){
    textSize(20);
    fill("white");
    text("0", i, 650);
  }

  for(var i = 265; i < 550; i = i + 240){
    textSize(20);
    fill("white");
    text("500", i, 650);
  }
  for(var i = 355; i < 450; i = i + 80){
    textSize(20);
    fill("white");
    text("0", i, 650)
  }
  
   for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();
   }
   
   for (var k = 0; k < divisions.length; k++) {
     divisions[k].display();
   }

   
  if(particle != null){
    particle.display();
    if(particle.body.position.y > 760){
      if(
        particle.body.position.x > divisions[0].body.position.x && particle.body.position.x < divisions[1].body.position.x ||
        particle.body.position.x > divisions[9].body.position.x && particle.body.position.x < divisions[10].body.position.x){
        score = score + 100;
        particle = null;
      } else if(
        particle.body.position.x > divisions[1].body.position.x && particle.body.position.x < divisions[2].body.position.x||
        particle.body.position.x > divisions[8].body.position.x && particle.body.position.x < divisions[9].body.position.x){
        score = score + 1000;
        particle = null
      } else if(
        particle.body.position.x > divisions[2].body.position.x && particle.body.position.x < divisions[3].body.position.x||
        particle.body.position.x > divisions[7].body.position.x && particle.body.position.x < divisions[8].body.position.x){
        particle = null;
      } else if(
        particle.body.position.x > divisions[3].body.position.x && particle.body.position.x < divisions[4].body.position.x||
        particle.body.position.x > divisions[6].body.position.x && particle.body.position.x < divisions[7].body.position.x){
        score = score + 500;
        particle = null;
      } else if(
        particle.body.position.x > divisions[4].body.position.x && particle.body.position.x < divisions[6].body.position.x){
        particle = null;
      }
    }
  }

    if(turn === 5){
      gameState = "end";
      if(particle === null){
        textSize(30);
        fill("white");
        text("Game Over", 300, 225);
      }
    }

}

function mouseClicked(){

  if(gameState !== "end"){
    turn++;
    particle = new Particle(mouseX, 10, 10, 10);
  }

}
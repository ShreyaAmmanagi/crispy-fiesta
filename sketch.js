var bg, bgImage;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground;
var score;
var stop;
function preload(){
  
   bgImage = loadImage("jungle.jpg")
  monkey_running =loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
  stop = loadAnimation("Monkey_03.png")
 
  
}



function setup() {
  createCanvas(1000, 800)
  bg = createSprite(200, 170, 1000, 800);
  bg.addImage("adding", bgImage)
  bg.scale = 2;
  ground = createSprite(200, 538, 900, 5);
  ground.visible = false;
  monkey = createSprite(100, 516, 30, 30);
  monkey.addAnimation("adding", monkey_running);
  monkey.scale = 0.1;

  
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  
 // monkey.debug = true;
  monkey.setCollider("rectangle", -50, 0, 350, 350)
  score = 0;
}


function draw() {
  stroke("green")
  fill("blue")
  text("SCORE ~ "+score, 150, 50);
  
  bg.velocityX = -(5 + 5*score/5);
  if(bg.x<100){
    bg.x = 800;
  }
  if(keyDown("space")&&monkey.y>=450){
    monkey.velocityY = -10;
  }  
  monkey.velocityY = monkey.velocityY + 1;
  
  if(monkey.isTouching(FoodGroup)){
  score = score+1;
  FoodGroup.destroyEach();
    monkey.scale = monkey.scale+0.01;
  }
  console.log(monkey.scale)
  
  if(monkey.scale == 0.27000000000000013){
   monkey.velocityY = 0;
  ground.velocityX = 0;
  FoodGroup.setVelocityXEach(0);
  obstaclesGroup.setVelocityXEach(0);
  FoodGroup.setLifetimeEach(-1);
  obstaclesGroup.setLifetimeEach(-1);
  monkey.addAnimation("adding", stop);
    bg.velocityX = 0;

  }
  
  if(monkey.isTouching(obstaclesGroup)){
  monkey.velocityY = 0;
  ground.velocityX = 0;
  FoodGroup.setVelocityXEach(0);
  obstaclesGroup.setVelocityXEach(0);
  FoodGroup.setLifetimeEach(-1);
  obstaclesGroup.setLifetimeEach(-1);
  textSize(40)
  stroke("black")
  fill("white")
  text("Game Over", 700, 550);
  monkey.addAnimation("adding", stop);
  bg.velocityX = 0;

  }
  

    
  obstacles();
  bananas();

  drawSprites();
    monkey.collide(ground );
if(monkey.isTouching(obstaclesGroup)){
  stroke("black")
  strokeWeight(5)
  text("Game Over", 400, 550);

}
  if(monkey.scale == 0.27000000000000013){
    textSize(40)
    fill("white")
    stroke("black")
    strokeWeight(5)
    text("You won", 400, 550);

  }
  
  textSize(20)
  stroke("green")
  strokeWeight(5)
  fill("white")
  text("SCORE ~ "+score, 150, 50);
}
function obstacles(){
  if(frameCount%100 == 0){
    obstacle = createSprite(1000, 530, 30, 30);
    obstacle.addImage("adding", obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -(5 + 5*score/5);
    obstacle.lifetime = 200;
    obstaclesGroup.add(obstacle);
    
  }
}
function bananas(){
  if(frameCount%50 == 0){
    banana = createSprite(1000, 440, 30, 30);
    banana.addImage("adding", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(5 + 5*score/5);
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}

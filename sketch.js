var ground, groundImage, groundInvisible;
var gameState="play";
var score=0;

function preload(){
  groundImage = loadImage("bg1.jpg");
  boyimg = loadAnimation("b1.png","b2.png","b4.png","b4.png","b5.png",
  "b6.png","b7.png","b8.png");
  candyimg1 = loadImage("candy1.png");
  candyimg2 = loadImage("candy2.png");
  candyimg3 = loadImage("candy4.png");
  candyimg4 = loadImage("candy5.png");
  candyimg5 = loadImage("candy6.png");
  candyimg6 = loadImage("candy7.png");
  dgimg = loadImage("Untitled.png");
  endimg = loadImage("gameOver.png");
  cs = loadSound("checkPoint.mp3");
  ds = loadSound("die.mp3");
  js = loadSound("jump.mp3");
}
function setup() {
  
  createCanvas(1000,600);

  ground=createSprite(300,200,1500,20);
  ground.addImage(groundImage);
  ground.scale = 1.1;
  
  groundInvisible=createSprite(300,600,1500,20);
  groundInvisible.visible=0;
  
 boy = createSprite(50,500,20,20);
 boy.addAnimation("Running",boyimg);
 boy .scale= 1.1;
 //boy.debug = true;
 boy.setCollider("circle",10,10,100);

 end = createSprite(500,200);
 end.addImage(endimg);
 end.visible = false;
  
  
  dragonG = new Group();
  candyG = new Group();
}

function draw() {
  background(220);
  
  boy.collide(groundInvisible);
  
  if(gameState=="play"){
    
    CreateCandy();
    CreateDragon();

    ground.velocityX=-(5+5*(score/50));

    if(score>0 && score%100 === 0){
      cs.play();
   }

    if(ground.x<0){
      ground.x=ground.width/2;
    }
    
   
    if(keyDown("space") && boy.y>270){
      boy.velocityY=-10;
      js.play();
    }
    boy.velocityY = boy.velocityY+0.5;
    
    if(candyG.isTouching(boy)){
      candyG.destroyEach();
       score=score+5;
      
      }
    
    if(dragonG.isTouching(boy)){
     gameState="end";
     ds.play();
     
   }
    

  }
  
  drawSprites();
  textSize(25);
  fill("blue");
  strokeWeight(5);
  text("SCORE: "+score,850,50);
  noFill();
  
      if(gameState=="end"){
        boy.velocityY=0;
        ground.velocityX=0;

      dragonG.setVelocityXEach(0);
      candyG.setVelocityXEach(0);
       dragonG.setLifetimeEach(-1);
       candyG.setLifetimeEach(-1);

        textSize(50);
        fill("#00FFFD ");
        strokeWeight(5);
       // text("GAME OVER!!",200,180);
        end.visible = true;
        text("PRESS SPACE TO RESTART.",300,300);
        noFill();

    }
  if(keyDown("space") && gameState=="end"){
    score=0;
    gameState="play";
   dragonG.destroyEach();
   candyG.destroyEach();
   end.visible = false;

  
  }
  
}

function CreateDragon(){
  
  if(Math.round(random(frameCount)%100)==0){
  dragon =createSprite(500,500,20,20);
  dragon.addImage(dgimg);
  dragon.scale= 0.3;
  dragon.velocityX=-(8+5*(score/50));
  dragon.lifetime=110;
  dragonG.add(dragon);
  }
  
}

function CreateCandy(){
  
  if (frameCount % 60 === 0){
    var candy = createSprite(300,Math.round(random(200,400)),10,40);
     candy.velocityX = -(6 + score/100);
    
     //generate random candy
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: candy.addImage(candyimg1);
               break;
       case 2: candy.addImage(candyimg2);
               break;
       case 3: candy.addImage(candyimg3);
               break;
       case 4: candy.addImage(candyimg4);
               break;
       case 5: candy.addImage(candyimg5);
               break;
       case 6: candy.addImage(candyimg6);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the candy          
     candy.scale = 0.3;
     candy.lifetime = 300;
    
    //add each candy to the group
     candyG.add(candy);
  }
  
 }
    

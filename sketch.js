var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var redCyclistGroup,pinkCyclistGroup,yellowCyclistGroup,o1Group,
    o2Group,o3Group;

var END =0;
var PLAY =1;
var gameState = PLAY;
var obstacle4,obstacle5,obstacle6;
var distance = 0;
var gameoverImg,gameover;
var pinkCyclistImg,yellowCyclistImg,redCyclistImg,fall1,
    fall2,fall3, o1,o2,o3;
var beep;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  yellowCyclistImg = loadAnimation("opponent4.png","opponent5.png");
  fall1 = loadAnimation("opponent6.png");
  
  pinkCyclistImg = loadAnimation("opponent1.png","opponent2.png");
  fall2 = loadAnimation("opponent3.png");
  
  redCyclistImg = loadAnimation("opponent7.png","opponent8.png");
  fall3 = loadAnimation("opponent9.png");
  
  obstacle4 = loadImage("obstacle1.png");
  
  obstacle5 = loadImage("obstacle2.png");
  
  obstacle6 = loadImage("obstacle3.png");
  
  gameoverImg = loadImage("gameOver.png");
  
  beep = loadSound("sound/bell.mp3");
  
}

function setup(){
  
createCanvas(windowWidth,windowHeight);
  
// Moving background
path=createSprite(windowWidth/2,windowHeight/2);
path.addImage(pathImg)
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,windowWidth/2,windowHeight/2);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
  mainCyclist.setCollider("rectangle",0,0,mainCyclist.width,mainCyclist.height);
  
  redCyclistGroup = createGroup();
   pinkCyclistGroup = createGroup();
   yellowCyclistGroup = createGroup();
   o1Group = createGroup();
   o2Group = createGroup();
   o3Group = createGroup();
  
    gameover = createSprite(250,130,windowWidth/2,windowHeight/2);
    gameover.scale = 0.5;
    gameover.addAnimation("gameover",gameoverImg);
    gameover.visible = false;
  }

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
 
  
  if(gameState===PLAY){
    
    //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    
    if(keyDown("space")){
      beep.play();
    }
    
    var select_Opponent = Math.round(random(1,6));

      if (World.frameCount % 150 == 0) {
    if (select_Opponent == 1) {
      redOpponent();
    } else if (select_Opponent == 2) {
      pinkOpponent();
    } else if (select_Opponent == 3) {
      yellowOpponent();
    } else if (select_Opponent== 4) {
      obstacle1();
    } else if (select_Opponent==5){
      obstacle2();
    } else {
      obstacle3();
    }
      }
   mainCyclist.y = World.mouseY;
    
   distance = distance + Math.round(getFrameRate()/60);
   path.velocityX = -(4 + 3* distance/100);
    
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
    
    if(mainCyclist.isTouching(o1Group)){
        o1.velocityX = 0;
     gameState= END; 
     mainCyclist.addAnimation("SahilRunning",mainRacerImg2)
      
    }
     if(mainCyclist.isTouching(o2Group)){
        o2.velocityX = 0;
     gameState= END; 
     mainCyclist.addAnimation("SahilRunning",mainRacerImg2)
      
    }
     if(mainCyclist.isTouching(o3Group)){
        o3.velocityX = 0;
     gameState= END; 
     mainCyclist.addAnimation("SahilRunning",mainRacerImg2)
      
    }
    
   
    
     
    if(mainCyclist.isTouching(redCyclistGroup)){
     
      rCyclist.velocityY = 0;
      rCyclist.addAnimation("red",fall3);
      gameState= END;
    }
 
    if(mainCyclist.isTouching(pinkCyclistGroup)){
     pCyclist.velocityY = 0;
      pCyclist.addAnimation("pink",fall2)
      gameState= END;
    }
 
    if(mainCyclist.isTouching(yellowCyclistGroup)){
     yCyclist.velocityY = 0;
      yCyclist.addAnimation("yellow",fall1)
      gameState= END;
    }



 }
  
else  if(gameState===END){
  gameover.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 140,190);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
     pinkCyclistGroup.setVelocityXEach(0);
     pinkCyclistGroup.setLifetimeEach(-1);
  
     yellowCyclistGroup.setVelocityXEach(0);
    yellowCyclistGroup.setLifetimeEach(-1);
  
    redCyclistGroup.setVelocityXEach(0);
    redCyclistGroup.setLifetimeEach(-1);
    
      if(keyDown("UP_ARROW")){
        reset();
      }
  }
}
  function redOpponent(){
    rCyclist = createSprite(200,100,10,10);
    rCyclist.addAnimation("red",redCyclistImg);
    rCyclist.scale = 0.06;
    rCyclist.velocityX = -6;
    rCyclist.setLifetime = 170;
    redCyclistGroup.add(rCyclist);
  }

  
  function yellowOpponent(){
    yCyclist = createSprite(200,100,10,10);
    yCyclist.addAnimation("yellow",yellowCyclistImg);
    yCyclist.scale = 0.06;
    yCyclist.velocityX = -6;
    yCyclist.setLifetime = 170;
    yellowCyclistGroup.add(yCyclist);
  }
    
   
  function pinkOpponent(){
    pCyclist = createSprite(200,100,10,10);
    pCyclist.addAnimation("pink",pinkCyclistImg);
    pCyclist.scale = 0.06;
    pCyclist.velocityX = -6;
    pCyclist.setLifetime = 170;
    pinkCyclistGroup.add(pCyclist);
  }

   
  function obstacle1(){
    o1 = createSprite(200,100,10,10);
    o1.addAnimation("ob1",obstacle4);
    o1.scale = 0.07;
    o1.velocityX = -6;
    o1.setLifetime = 170;
    o1Group.add(o1);
  }

   
  function obstacle2(){
     o2 = createSprite(200,100,10,10);
     o2.addAnimation("ob2",obstacle5);
     o2.scale = 0.07;
     o2.setLifetime = 170;
     o2.velocityX = -6;
     o2Group.add( o2);
  }

   
  function obstacle3(){
    o3 = createSprite(200,100,10,10);
    o3.addAnimation("ob3",obstacle6);
    o3.scale = 0.07;
    o3.velocityX = -6;
    o3.setLifetime = 170;
    o3Group.add(o3);
  }

  function reset(){
    gameState = PLAY;
   mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
    gameover.visible = false;
    distance = 0;
    
    redCyclistGroup.destroyEach();
    pinkCyclistGroup.destroyEach();
    yellowCyclistGroup.destroyEach();
    
    o1Group.destroyEach();
     o2Group.destroyEach();
     o3Group.destroyEach();
  }
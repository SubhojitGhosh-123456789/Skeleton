var gameState = "start";
var status = "Not Shot Yet.";
var start, startImg;
var story, storyImg, storyB, storyBImg;
var disclaimer, disclaimerImg, disclaimerB, disclaimerBImg;
var htp, htpImg, htpB, htpBImg;
var identify, identifyImg, identifyB, identifyBImg;
var timer = 5; 
var index = 0;
var bg;
var glass, glassImg;
var gun, gunImg;
var skeletonImg, skeletonGroup;
var skeletonQImg, skeletonQGroup;
var bullets = 5;
var n,l;

function preload(){

    startImg = loadImage("start.jpg");
    storyImg = loadImage("story.jpg");
    storyBImg = loadImage("storyB.jpg");
    disclaimerImg = loadImage("disclaimer.jpg");
    disclaimerBImg = loadImage("disclaimerB.jpg");
    htpImg = loadImage("howToPlay.jpg");
    htpBImg = loadImage("howToPlayB.jpg");
    identifyImg = loadImage("identify.jpg");
    identifyBImg = loadImage("identifyB.jpg");
    bg = loadImage("bg.jpg");
    gunImg = loadImage("gun.png");
    glassImg = loadImage("glass.png");
    shot = loadSound("shot.mp3");
    skeletonImg = loadImage("skeleton.png");
    skeletonQImg = loadImage("skeletonP.png");
}

function setup(){

    createCanvas(1300,600);

    start = createSprite(650,300,1300,600);
    start.addImage(startImg);
    start.scale = 1.08;
    start.visible = true;

    story = createSprite(650,300,1300,600);
    story.addImage(storyImg);
    story.scale = 0.9;
    story.visible = false;

    storyB = createSprite(250,530,1300,600);
    storyB.addImage(storyBImg);
    storyB.visible = false;

    disclaimer = createSprite(650,300,1300,600);
    disclaimer.addImage(disclaimerImg);
    disclaimer.scale = 1.08;
    disclaimer.visible = false;

    disclaimerB = createSprite(1000,530,1300,600);
    disclaimerB.addImage(disclaimerBImg);
    disclaimerB.visible = false;

    htp = createSprite(650,300,1300,600);
    htp.addImage(htpImg);
    htp.scale = 1.08;
    htp.visible = false;

    htpB = createSprite(650,530,1300,600);
    htpB.addImage(htpBImg);
    htpB.visible = false;

    identify = createSprite(650,300,1300,600);
    identify.addImage(identifyImg);
    identify.scale = 1.08;
    identify.visible = false;

    identifyB = createSprite(650,430,1300,600);
    identifyB.addImage(identifyBImg);
    identifyB.visible = false;

    glass = createSprite(650,200,1300,600);
    glass.addImage(glassImg);
    glass.visible = false;

    gun = createSprite(650,470,1300,600);
    gun.addImage(gunImg);
    gun.scale = 0.5;
    gun.visible = false;

    n = createSprite(950,300,1300,600);
    n.addImage(skeletonImg);
    n.scale = 1.1;
    n.visible = false;

    l = createSprite(350,300,1300,600);
    l.addImage(skeletonQImg);
    l.scale = 1.1;
    l.visible = false;

    bullet = createSprite(650,300,10,500);
    bullet.visible = false;
   
    skeletonGroup = new Group();
    skeletonQGroup = new Group();
}

function draw(){                              

    background(bg);

    if(gameState === "story"){
      start.visible = false;
      story.visible = true;
      storyB.visible = true;

      if(mousePressedOver(storyB)){
        gameState = "disclaimer";
      }
    }

    if(gameState === "disclaimer"){
      story.visible = false;
      storyB.visible = false;

      disclaimer.visible = true;
      disclaimerB.visible = true;

      if(mousePressedOver(disclaimerB)){
        gameState = "how";
      }

    }

    if(gameState === "how"){
      disclaimer.visible = false;
      disclaimerB.visible = false;

      htp.visible = true;
      htpB.visible = true;

      if(mousePressedOver(htpB)){
        gameState = "identify";
      }

    }

    if(gameState === "identify"){
      htp.visible = false;
      htpB.visible = false;

      identify.visible = true;
      identifyB.visible = true;
      n.visible = true;
      l.visible = true;

      if(mousePressedOver(identifyB)){
        gameState = "play";
      }

    }

    drawSprites();

      if(gameState === "play"){

        n.visible = false;
        l.visible = false;
        identify.visible = false;
        identifyB.visible = false;

        gun.visible = true;
        glass.visible = true;

        skeletonB();
        skeletonP();
        bullet.x = gun.x;

        if(keyWentDown(UP_ARROW)){   
          bullets--;
          shot.play();
          if(skeletonQGroup.isTouching(bullet)){
            status = "Yaa!! You Did It.";
            gameState = "end";
            bg = loadImage("g2.jpg");
            gun.visible = false;
            glass.visible = false;
          }else{
            status = "Oops!! You Missed It";
          }
      }

      if(keyWentDown(LEFT_ARROW)){
        gun.velocityX = -15;                          
      }
      if(keyWentDown(RIGHT_ARROW)){
        gun.velocityX = 15;                                  
      }
      if(keyWentUp(LEFT_ARROW)){
        gun.velocityX = 0;                          
      }
      if(keyWentUp(RIGHT_ARROW)){
        gun.velocityX = 0;                                  
      }

      if(bullets <=0 && status === "Oops!! You Missed It"){
        gameState = "end";
        bg = loadImage("g1.jpg");
        gun.visible = false;
        glass.visible = false;
      }

      drawSprites();

        fill(255);
        textSize(30);
        text("Shot Status: " + status,500, 50);

        fill(255);
        textSize(30);
        text("Bullets Left: " + bullets,50, 450);
    

    }


    if(gameState === "start"){

      index = index + 1;


    if(index === 1){
      setInterval(timeIt, 1000);
    }

    if(timer <=1){
      gameState = "story";
    }
    
    }

 }

 function timeIt(){
   timer--;
 }

 function skeletonB(){
  if (frameCount % 30 === 0) {
    skeleton = createSprite(100, 200, 100, 100);
    skeleton.velocityX = 25;
    skeleton.addImage(skeletonImg);
    skeleton.scale = 1.1;
    skeleton.lifetime = 40;
    skeletonGroup.add(skeleton);
    
}
}

function skeletonP(){
  if (frameCount % 120 === 0) {
    skeletonQ = createSprite(100, 200, 100, 100);
    skeletonQ.velocityX = 25;
    skeletonQ.addImage(skeletonQImg);
    skeletonQ.scale = 1.1;
    skeletonQ.lifetime = 40;
    skeletonQGroup.add(skeletonQ);
    
}
}
      
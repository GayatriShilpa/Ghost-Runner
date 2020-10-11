var ghost, ghostImage;
var doorimage;
var climberimage;
var tower, towerimage;
var invisibleline;
var DoorGroup, climberGroup,invisiblelineGroup;
var gamestate;
var PLAY = 1;
var END = 0;

function preload() {
  towerimage = loadImage("tower.png");

  ghostImage = loadImage("ghost-jumping.png");

  doorimage = loadImage("door.png");
  
  climberimage=loadImage("climber.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300, 600, 600);
  tower.addImage("tower", towerimage);
  tower.velocityY = 1;

  ghost = createSprite(200, 200, 2, 2);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.4;
  ghost.debug=true;
  
  ghost.setCollider("circle",0,10,80);
  
  DoorGroup=new Group();
  climberGroup=new Group();
  invisiblelineGroup=new Group();
  
  gamestate=PLAY;
}

function draw() {

  
  if(gamestate==PLAY){
    
    if (tower.y > 400) {
    //tower reset
    tower.y = 300;
  }

  //ghost move up
  if (keyDown("space")) {
    ghost.velocityY = -5;
  }

  //ghost gravity
  ghost.velocityY = ghost.velocityY + 0.4;

  //ghost move left or right
  if (keyDown("right")) {
    ghost.velocityX = 5;
  }

  if (keyDown("left")) {
    ghost.velocityX = -5;
  }

  Spawn_Doors();
    
    if(ghost.isTouching(climberGroup)){
      ghost.velocityX=0;
      ghost.velocityY=0;
    }
    
    if(ghost.isTouching(invisiblelineGroup) || ghost.y>550){
      gamestate=END;
    }
  
    drawSprites();
}
  //end of Play gamestate
  
  if(gamestate==END){
    background("black");
    fill("white");
    textSize(20);
    text("Game Over",300,300);
  }
  
  }

  

function Spawn_Doors() {
  if (frameCount % 150 === 0) {
    var a=Math.round(random(100, 270));
    var door = createSprite(a, 0, 10, 10);
    door.velocityY = 3;
    door.addImage("door", doorimage);
    DoorGroup.add(door);
    door.depth=ghost.depth;
    ghost.depth=ghost.depth+1;
    
    var climber=createSprite(a,70,10,10);
    climber.velocityY=3;
    climber.addImage("climberimage",climberimage);
    climberGroup.add(climber);
    
    invisibleline=createSprite(a,70,climber.width,5);
    invisibleline.velocityY=3;
    invisibleline.visible=false;
    invisiblelineGroup.add(invisibleline);
  }
}

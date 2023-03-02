var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var PLAY=2
var END=0
var gamestate= PLAY
var score=0
function preload() {
  bgImg = loadImage("assets/Fundo.png")
  pipeImg = loadImage("assets/Pipe.png")
  restartImg = loadImage("assets/restart.png")
  birdImg = loadImage("assets/Bird.png")
  startImg = loadImage("assets/start.png")
  logoImg = loadImage("assets/Logo.png")
  fimdejogoImg = loadImage("assets/fimdejogo.png")


}

function setup() {
  createCanvas(800, 400)
  pipetopgroup = new Group()
  pipedowngroup = new Group()
  bargroup= new Group()

  //imagem de plano de fundo


  //criando canto superior e inferior
  bottomGround = createSprite(200, 390, 800, 20);
  bottomGround.visible = false;
  topGround = createSprite(200, 10, 800, 20);
  topGround.visible = false;

  //criando o balão     
  bird = createSprite(100, 200, 20, 50);
  bird.addAnimation("bird", birdImg);
  bird.scale = 0.1;
  gameover=createSprite(width/2,height/2-150)
  gameover.addImage(fimdejogoImg)
  gameover.visible=false
  restart=createSprite(width/2,height/2)
  restart.addImage(restartImg)
  restart.visible=false


}

function draw() {

  background("black");
  image(bgImg, 0, 0, width, height)
  if (gamestate == PLAY) {
    if (keyDown("space")) {
      bird.velocityY = -6;

    }
    bird.velocityY = bird.velocityY + 2;
    if(pipetopgroup.isTouching(bird)||pipedowngroup.isTouching(bird)||bird.isTouching(bottomGround)||bird.isTouching(topGround)){
      gamestate= END
    }
  }
  if (gamestate == END) {
    bird.velocityX = 0
    bird.velocityY = 0
    bird.y =200
    pipetopgroup.setVelocityXEach(0)
    pipedowngroup.setVelocityXEach(0)
    pipetopgroup.setLifetimeEach(-1)
    pipedowngroup.setLifetimeEach(-1)
    restart.visible=true
    gameover.visible=true
    if(mousePressedOver(restart)){
      reset()
    }
    bargroup.setVelocityXEach(0)
  }





  SCORE()
  bar()
  obstacletop();
  obstacledown();
  drawSprites();
}
function reset(){
gamestate= PLAY
gameover.visible=false
restart.visible=false
pipetopgroup.destroyEach()
pipedowngroup.destroyEach()
score=0
}
function obstacletop() {
  if (frameCount % 60 === 0) {
    pipetop = createSprite(850, 100, 100, 70)
    pipetop.velocityX = -10
    pipetop.addImage(pipeImg)
    pipetop.rotation += 180
    pipetop.debug= true
    pipetop.setCollider("rectangle",0,0,20,159)
    pipetop.lifetime = 200
    pipetop.y = Math.round(random(5, 80))
    pipetopgroup.add(pipetop)
  }

}
function obstacledown() {
  if (frameCount % 60 === 0) {
    pipedown = createSprite(850, 340, 100, 70)
    pipedown.velocityX = -10
    pipedown.addImage(pipeImg)
    pipedown.debug= true
    pipedown.setCollider("rectangle",0,0,20,159)
    pipedown.lifetime = 200
    pipedown.y = Math.round(random(300, 400))
    pipedowngroup.add(pipedown)
  }

}
function bar(){
  if(frameCount%60==0){
     var bar=createSprite(700,200,10,900)
     bar.velocityX=-6
     bargroup.add(bar)
     bar.visible=false
  }
}
function SCORE(){
  if(bird.isTouching(bargroup)){
    score=score+1
  }
  textSize(30)
  fill ("Purple")
  text("score: "+score,250,50)
}

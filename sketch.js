const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,bg;
var canvas, angle, tower, ground, cannon, cannonBall, boat;
var balls = [];
var boats = [];
var boatAnimation = [];
var boatJSON, boatSpritesheet;
var brokenBoatAnimation = [];
var brokenBoatJSON, brokenBoatSpritesheet;
var isGameOver = false;
var bgMusic, waterSound, pirateLaugh, cannonExplosion; 
var isLaughing = false;
var score = 0;

function preload() {
  towerImage = loadImage("./assets/tower.png");
  bg = loadImage("./assets/background.gif");
  boatJSON = loadJSON("./assets/boat/boat.json");
  boatSpritesheet = loadImage("./assets/boat/boat.png")
  brokenBoatJSON = loadJSON("./assets/boat/broken_boat.json");
  brokenBoatSpritesheet = loadImage("./assets/boat/broken_boat.png")
  waterSound = loadSound("./assets/cannon_water.mp3");
  bgMusic = loadSound("./assets/background_music.mp3");
  pirateLaugh = loadSound("./assets/pirate_laugh.mp3");
  cannonExplosion = loadSound("./assets/cannon_explosion.mp3");
}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;

  var boatFrames = boatJSON.frames;

  for(var i = 0; i < boatFrames.length; i++){
    var pos = boatFrames [i].position
    var img = boatSpritesheet.get(pos.x,pos.y,pos.w,pos.h)
    boatAnimation.push(img);
  }

  var brokenBoatFrames = brokenBoatJSON.frames;

  for(var i = 0; i < brokenBoatFrames.length; i++){
    var pos = brokenBoatFrames [i].position
    var img = brokenBoatSpritesheet.get(pos.x,pos.y,pos.w,pos.h)
    brokenBoatAnimation.push(img);
  }

  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(185,115,100,40,-PI/4);
}

function draw() {
  background(189);
  image(bg,0,0,width,height);
  Engine.update(engine);

  textSize(40);
  fill("black");
  text("SCORE:" + score,width - 200, 50);

  if (!bgMusic.isPlaying()){
    bgMusic.play();
    bgMusic.setVolume(0.1);
  }

  ground.display();
  cannon.display();
  tower.display();

  showBoats();

  for(var i = 0; i < balls.length; i++){
    showCannonBalls(balls[i],i);
    collisionBoats(i);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW){
    balls[balls.length - 1].shoot();
    cannonExplosion.play();
    cannonExplosion.setVolume(0.1)
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW){
    var cannonBall = new CannonBall(cannon.x,cannon.y)
    balls.push(cannonBall)
  }
}

function showCannonBalls(ball,index) {
  if (ball){
    ball.display();
    if (ball.body.position.x >= width||ball.body.position.y >= height-50){
      if (!ball.isSink && !waterSound.isPlaying()){
        waterSound.play(loop = false);
        waterSound.setVolume(0.1);
        ball.remove(index)
      }
    }
  }
}

function showBoats() {
  if (boats.length > 0){
    if ((boats[boats.length-1].body.position.x < (width - 300))||boats[i] !== undefined){
      var positions = [-20,-40,-60,-70]
      var pos = random (positions);
      var boat = new Boat(width-80, height-60,100,100,pos, boatAnimation);
      boats.push(boat);
    }
      for(var i = 0; i < boats.length; i++){
        if (boats[i]){
          Matter.Body.setVelocity(boats[i].body,{x:-1,y:0})
          boats[i].display();
          boats[i].animate();
          var collision = Matter.SAT.collides(this.tower.body,boats[i].body);
          if (collision.collided && !boats[i].isBroken){
            if(!isLaughing && pirateLaugh.isPlaying()){
              pirateLaugh.play()
              isLaughing = true;
            } 
              isGameOver = true;
              gameOver();
          }
        }
        else{
          boats[i];
        }
    }
  }
  else{
    var boat = new Boat(width-80, height-60,100,100,-80, boatAnimation);
    boats.push(boat);
  }
}

function collisionBoats(index){
  for(var i = 0; i < boats.length; i++){
    if (boats[i] !== undefined && balls[index] !== undefined){
      var collision = Matter.SAT.collides(balls[index].body,boats[i].body)
        if (collision.collided){
          score += 5;
          boats[i].remove(i)
          Matter.World.remove(world,balls[index].body)
          delete balls[index];
        }
      }
    }
  }

  function gameOver(){
    swal(
      {
        title: "!GAME OVER!",
        text: "Thanks for playing",
        imageurl: "assets/boat.png",
        imageSize: "150x150",
        confirmButtonText: "RESTART"
      },
      function (isConfirm){
        if (isConfirm){
          location.reload()
        }
      }
    )
  }
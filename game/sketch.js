var paddle;

var phones = [];
var bg;

var playerScore = 0;
var playTime = 900;
var myFont;
var game = false;

var timer;

var moveDir;

var lastScore = 0;

function preload() {
  myFont = loadFont('../Mf Sippin On Sunshine.ttf');
  bg = loadImage("../tp2b_1920x1080px1_jpg.jpg");
}


function setup() {
	// createCanvas must be the first statement
  //createCanvas(1080, 720);
  createCanvas(windowWidth -200, windowHeight - 200);  
  
  bg = loadImage("../tp2b_1920x1080px1_jpg.jpg");
  stroke(255);     // Set line drawing color to white
  frameRate(30);
  paddle = new Paddle();
  phones.push(new Phone());

  button = createButton('START');
  button.style("min-width", "100px");
  button.style("min-height", "50px");
  button.position(width/2 - 150, 490);
  button.mousePressed(startGame);

}

function draw() {
  
  fill(255);
  noStroke();

  if(game){
    button.style("display", "none");
    background(bg);
    paddle.move();
    paddle.display();
    
    phones.forEach(function(element) {
      element.move();
      element.display();
      element.collide(paddle);
    }, this);
  
    textFont(myFont);
    textSize(42);
    text("Bollar: " + playerScore, width -320, 60);
    text("Tid: " + playTime, width -320, 100);
  
    
    if(playTime < 1){
      lastScore = playerScore;
      game = false;
      resetMenu();
    }
  }
  else {
    background(147,147,147);
    textFont(myFont);
    textSize(50);
    text("#GameOfPhones", width/2 - 300, 100);
    textSize(42);
    text("Samla bollar under 30 sekunder.", width/2 - 500, 150);
    textSize(32);
    text("Senast antal bollar: " + lastScore, width/2 - 340, 250); 
     

  }


}

/* fullscreen() must be called in a touch or
 * mouse event to work!
 */


function startGame(){
  var fs = fullscreen();
  initGame();
  if (!fs) {
    fullscreen(true);
  }
}

function touchStarted () {
  if(game){
    if(mouseX < 300){
      moveDir = "LEFT"
    }
    if(mouseX > width - 300){
      moveDir = "RIGHT"
    } 
  }
}

function touchEnded(){
  moveDir = "None";
}

/* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth -20, windowHeight -20);
  paddle.y = windowHeight - 50;
}

/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling
 * the page.
 */
function touchMoved(){
    if(mouseX < 300){
      paddle.x-= 10;
    }
    if(mouseX > width - 300){
      paddle.x+=10;
    }  
    return false;
}

function score(){
  playerScore+= 1;
  if(phones.length < 15){
    phones.push(new Phone());
  }
}

function initGame(){
  game = true;
  playTime = 30;
  playerScore = 0;
  phones = [];
  phones.push(new Phone());
  phones.push(new Phone());
  timer = setInterval(()=>{
    playTime-=1;
  }, 1000);
}

function resetMenu(){
  button.style("display", "inline");
  button.position(width/2 - 150, 490);
  // Dispatch the event.
  $(document).trigger('gameDone');
  $("#numPhones").text(lastScore);
  clearInterval(timer);
}

// paddle class
function Paddle() {
  this.x = 100;
  this.y = windowHeight - 50;
  this.width = 100;
  this.height = 25;
  this.speed = 15;

  this.move = function() {
    if(moveDir == "LEFT"){
      if(this.x > 10){
        this.x-=this.speed;
      }
      else {
        this.x = 11;
      }
    }
    if(moveDir == "RIGHT"){
      if(this.x < width - 110){
        this.x+=this.speed;
      }
      else {
        this.x = width - 111;
      }
    }

    if (keyIsDown(LEFT_ARROW)){
      if(this.x > 10){
        this.x-=this.speed;
      }
      else {
        this.x = 11;
      }
      
    }
    
  
    if (keyIsDown(RIGHT_ARROW)){
      if(this.x < width - 110){
        this.x+=this.speed;
      }
      else {
        this.x = width - 111;
      }
      
    }
  };

  this.display = function() {
    rect(this.x, this.y, this.width, this.height);
  }
};

// phone class
function Phone() {
  this.size = 60;
  this.x = random(this.size, width - this.size);
  this.y = random(-120, - this.size);
  this.speed = random(10, 18);

  this.respawn = function(){
    this.y = random(-320, - this.size);
    this.x = random(this.size, width - this.size);
    this.speed = random(10, 18);
    
  }

  this.move = function() {
    if(this.y < height + this.size){
      this.y+=this.speed;
    }
    else {
      this.respawn();
    }
  };

  this.collide = function(paddle){
      this.hit = collideRectCircle(paddle.x, paddle.y, paddle.width, paddle.height, this.x, this.y, this.size); //collide the cir object into this rectangle object.
      if(this.hit){
          score();
          this.respawn();
      }
  }

  this.display = function() {
    ellipse(this.x, this.y, this.size);
  }
};

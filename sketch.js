var balloon2;
var database;
var height;

function preload(){
backgroundImage= loadImage("Hot Air Ballon-01.png");
balloonImage= loadAnimation("Hot Air Ballon-02.png");
balloonImage2= loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-02.png","Hot Air Ballon-02.png",
"Hot Air Ballon-03.png","Hot Air Ballon-03.png","Hot Air Ballon-03.png",
"Hot Air Ballon-04.png","Hot Air Ballon-04.png","Hot Air Ballon-04.png");
}
function setup() {
  createCanvas(1500,700);
  database= firebase.database();

 
  balloon2= createSprite(100,200,40,40);
  balloon2.addAnimation("balloon",balloonImage);
  balloon2.scale=0.4;
  var balloonHeight= database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
}

function draw() {
  background(backgroundImage); 
 
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon2.addAnimation("balloon",balloonImage);
  } 
  if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon2.addAnimation("balloon",balloonImage);
  }
  if(keyDown(UP_ARROW)){
   updateHeight(0,-10);
   balloon2.addAnimation("balloon",balloonImage);
   balloon2.scale=balloon2.scale-0.005;
  }
  if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon2.addAnimation("balloon",balloonImage);
    balloon2.scale=balloon2.scale+0.005;
  }
  console.log(balloon2.x);
  console.log(balloon2.y);
  drawSprites();

  textSize(25);
  stroke("white");
  fill(0);
  text("**Use arrow keys to move Hot Air Balloon!",25,25);

}
function updateHeight(x,y){
database.ref('balloon/height').set({
  'x': height.x + x,
  'y': height.y + y,
})
}
function readHeight(data){
  height=data.val();
  balloon2.x = height.x;
  balloon2.y= height.y;
}
function showError(){
  console.log("An error in writing the database");
}
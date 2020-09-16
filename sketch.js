//Create variables here
var dog,happyDog,database,foodS,foodStock;
var Dog;
function preload()
{
  //load images here
  dog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  Dog = createSprite(250,250,0,0);
  Dog.addImage(dog);
  Dog.scale = 0.3;

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

 
}


function draw() {  
background(46,139,87);
  drawSprites();
  //add styles here
  textSize(20);
  fill(255);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    Dog.addImage(happyDog);
  }

 text( "Food left:"+ foodStock ,20,100);
 textSize(20);
 fill(255);
stroke(0,255,0);
 text("Note: Press UP_ARROW Key To Feed Doggo MILK",20,400);
}
//Function to read values from DB
function readStock(data){
  foodS = data.val();
}
//Function to write values in DB
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}




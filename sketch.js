//Create variables here
var dog,happydog,database,foodS,foodstock;
var dogimg,happydogimg;
var foodObj,fedTime,lastFed;
function preload()
{
  //load images here
  dogimg=loadImage("images/dogImg.png");
  happydogimg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,250,20,20);
  dog.addImage("dog",dogimg);
  dog.scale = 0.5;
  dog.addImage("happydog",happydogimg);
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(700,125);
  addFood.mousePressed(addFoods);
}

function draw() {  
background(46,139,87);
drawSprites();

  //add styles here
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFeed%12 + "PM",350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed : "+ lastFed + "AM",350,30);
}
}
function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function feedDog(){
  dog.addImage("happydog",happydogimg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
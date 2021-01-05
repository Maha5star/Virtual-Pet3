var database;
var dog, happyDog, foodS, foodStock;
var dogImg1, dogImg2;
var foodStock, lastFed, feed, fedTime, addFood,
foodObj;
var bedroom, washroom, garden, currentTime;

function preload(){
dogImg = loadImage("Dog.png");
dogImg1 = loadImage("happydog.png");
bedroom = loadImage("Bed Room.png");
washroom = loadImage("Wash Room.png");
garden = loadImage("Garden.png");

}

function setup(){
database = firebase.database();
canvas = createCanvas(1000,400);

foodObj= new Food();

foodStock = database.ref('Food')
foodStock.on("value", readStock)
textSize(20);

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
lastFed=data.val();
});

readState = database.ref('gameState');
readState.on("value",function(data){
gameState = data.val();
});

dog = createSprite(800,200,150,150);
dog.addImage(dogImg);
dog.scale = 0.15;

feed=createButton("Feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood=createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);

}

function draw(){
background(46, 139, 187);

currentTime = hour();
if(currentTime == (lastFed+1)){
   update("Playing");
   foodObj.garden();
}else if(currentTime == (lastFed+2)){
   update("Sleeping");
   foodObj.bedroom();
}else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
   update("Bathing");
   foodObj.washroom();
}else{
update("Hungry")
foodObj.display();

}
if(gameState!= "Hungry"){
   feed.hide();
   addFood.hide();
   dog.remove();
}else{
 feed.show();
 addFood.show();
 dog.addImage(dogImg);
}

drawSprites();
}

function readStock(data){
foodS = data.val();
foodObj.updateFoodStock(foodS);
}

function feedDog(){
dog.addImage(dogImg1);

foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime:hour(),
gameState : "Hungry"

});
}

function addFoods(){
foodS++;
database.ref('/').update({
   Food:foodS
})
}

function update(state){
database.ref('/').update({
   gameState:state
});
}

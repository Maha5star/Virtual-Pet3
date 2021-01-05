class Food {
constructor(){
  this.foodStock = 0;
  this.lastFed;
  this.image = loadImage("Food Stock.png")
};

updateFoodStock (foodStock){

this.foodStock=foodStock;
}

getFedtime(lastFed){

this.lastFed=lastFed;
}

deductFood(){
if(this.foodStock>0){

this.foodStock=this.foodStock-1;
}
}

getFoodStock(){
  return this.foodStock;
}

display(){
  background(250, 100, 400);

     fill(255,255,255);
      textSize(15);
      if(lastFed>=12){
          text("Last Feed : "+ lastFed%12 + " PM", 50,30);
      }else if(lastFed==0){
          text("Last Feed : 12 AM",50,30);
      }else{
          text("Last Feed : "+ lastFed + " AM", 50,30);
      }

var x=70,y=100;

if(this.foodStock!=0){
  imageMode(CENTER);
for(var i=0;i<this.foodStock;i++){
if(i%10==0){
   x=70;
   y=y+50;
}
   image(this.image,x,y,50,50);
   x=x+50;
   
   image(this.image,720,220,70,70);
   
}
}
}

bedroom(){
  background(bedroom, 550, 550)
}

garden(){
  background(garden, 550, 550)
}

washroom(){
  background(washroom, 550, 550)
}
}
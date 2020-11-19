var dog, happyDog, database, foodS, foodStock, dog_img, dog_img1;

function preload()
{
  dog_img = loadImage("dogImg.png");
  dog_img1 = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();
  console.log(database);
  
  dog = createSprite(250, 300, 50, 50);
  dog.addImage(dog_img);
  dog.scale = 0.150;

  foodStock = database.ref('Food :D');
  foodStock.on("value", readStock);

}


function draw() {  
  background(46, 139, 87);

  fill("white");
  stroke(5);
  textSize(20);
  text("Milk Bottles left = " + foodS, 170, 50);
  text("Note: Press Up Arrow Key to feed Bruno milk bottles", 20, 100);

  drawSprites();
  
  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dog_img1);
    foodS = foodS - 1;

    if(foodS<=0){
      foodS=0;
      text("oops! You ran out of milk bottles!", 20, 20);
    }
    else{
      foodS = foodS-1;
    }

}

}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  });
}

function readStock(data){
  foodS = data.val(); 
}
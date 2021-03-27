var dog, sadDog, happyDog;
var foodObj;
var fedTime, lastFed;
var feedBottle, feedbot;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  feedBot = loadImage("Images/Milk.png");
}

function setup() {
  createCanvas(1000,400);

  database = firebase.database();

  foodObj = new Food();
  // foodObj.getFoodStock();
  // foodObj.getfedTime();
  // foodObj.deductFood();
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedBottle = createSprite(720, 210, 70, 80);
  feedBottle.addImage(feedBot);
  feedBottle.scale=0.1;
  feedBottle.visible=false

  var feed = createButton("Feed Him");
  feed.position(600, 100);
  feed.mousePressed(feedDog);

  var addFood = createButton("Add Food For Him");
  addFood.position(680, 100);
  // addFood.style('font-size', );
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  // feedDog();
  // getFoodStock();
  // updateFoodStock();
  // addFoods();
  // getLastFed();

  foodObj.display();

  var fedTime = database.ref('FeedTime');
    fedTime.on("value",function(data){
    lastFed=data.val();
  });
  
  if(lastFed>=12){
    textSize(16);
    text("Last Fed: " + lastFed + "AM", 200, 30);
  }else if(lastFed == 0){
    textSize(16);
    text("Last Fed: 12AM", 200, 30);
  }else{
    textSize(16);
    text("Last Fed: " + lastFed + "PM", 200, 30);
  }

  drawSprites();
}


function readStock(data){
  foodstock=data.val();
  foodObj.updateFoodStock(foodstock);
}

function feedDog(){
  dog.addImage(happyDog)

  feedBottle.visible = true;

  // if(feedDog.mousePressed || foodObj.foodStock != 0){
  // image(foodObj.image, 600, 100, 70, 80);
  // }

  if(foodObj.getFoodStock() <= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

// //function to read food Stock
// function getFoodStock(){
//   var foodStockRef = database.ref('addFood');
//   foodStockRef.on("value", function (data){
//       foodStock = data.val();
//   })
// }

// //function to update food stock and last fed time
// function updateFoodStock(){
//   database.ref('/').update({
//     foodStock: foodStock
// });
// }

//function to add food in stock
function addFoods(){   
  foods++;
  database.ref('/').update({
    Food : foods
  })
  feedBottle.visible = false;
}

  // function getLastFed(){
  //   var lastFedRef = database.ref('lastFed');
  //           LastFedRef.on("value", function (data){
  //           lastFed = data.val();
  //     });
  //   }

  // function updateLastFed(){
  //   database.ref('/').update({
  //     lastFed: lastFed
  // });
  // }
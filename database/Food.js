class Food {
    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("Images/Milk.png")
    }

    //function to update food stock and last fed time
    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    getfedTime(lastFed){
        this.lastFed = lastFed;
    }

    //   function getLastFed(){
// }

//   function updateLastFed(){
//     database.ref('/').update({
//       lastFed: lastFed
//   });
//   }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock-1;
        }
    }

    // function to read food Stock
    getFoodStock(){
        // var foodStockRef = database.ref('addFood');
        //     foodStockRef.on("value", function (data){
        //     this.foodStock = data.val();
        // })
            return this.foodStock;
        }

    display(){
        var x = 80, y = 100;
        // if(feed.mousePressed){
        // }

        if(this.foodStock != 0){
            for(var i=0; i<this.foodStock; i++){
                if(i % 10 == 0){
                    x = 10;
                    y = y+50;
                }
                image(this.image, x, y, 50, 50);
                x = x+30;
            }
        }
    }

}
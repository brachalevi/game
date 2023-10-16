const timerDisplay = document.getElementById('timer');
const order_call = [document.getElementById("order1-text"),
document.getElementById("order2-text"),document.getElementById("order3-text")];
let timeLeft = 90;
let timer;

/*this function will start the timer and call to fill 3 orders-still not finish*/
function startGame(){
    timer = (function () {
        timeLeft--;
        timeDisplay.textContent = timeLeft + ' seconds';
    
        if (timeLeft === 0) {
          stopTimer();
          // Call a function to end the game
        }
        }, 1000);
        setTimeout(function () {
         (order_bank[0]);
        }, 0);
    
        setTimeout(function () {
          fillOrder(order_bank[1]);
        }, 5000);
    
        setTimeout(function () {
          fillOrder(order_bank[2]);
        }, 8000);

}

/*it will stop runing the timer and elso nedd to print "end game" result 
or what ever we whent thet happen in the end-still not finish*/
function stopTimer() {
    clearInterval(timer);
}

/*put a new random order in orderAvailable after a given dilay-still not finish*/
function fillOrder(orderAvailable){
    orderAvailable=0;

}

/*shold check if the hmburgwer good-if so call to fillOrder-still not finish*/
function checkOrder(order){
    for (let i = 0; i < order_call.length; i++) {
        if(order==order_call[i]){
            /*add money*/
            orders.splice(i, 1);
            fillOrder();
            return 0;
        }
    }

}

//to make an array of current orders
currentOrders=[];
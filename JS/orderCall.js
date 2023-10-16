const timerDisplay = document.getElementById('timer');
const order_call = [document.getElementById("order1-text"),
document.getElementById("order2-text"),document.getElementById("order3-text")];
let timeLeft = 90;
let timer;

/*this function will start the timer and call to fill 3 orders-still not finish*/
function startGame(){
    console.log("start");
    timer = setInterval(function () {
        console.log(timeLeft);

        timeLeft--;
        timerDisplay.textContent = timeLeft + ' seconds';
    
        if (timeLeft === 0) {
          stopTimer();
          // Call a function to end the game
        }
        }, 1000);
        setTimeout(function () {
            fillOrder(order_call[0]);
        }, 1000);
    
        setTimeout(function () {
          fillOrder(order_call[1]);
        }, 5000);
    
        setTimeout(function () {
          fillOrder(order_call[2]);
        }, 8000);
}

/*it will stop runing the timer and elso nedd to print "end game" result 
or what ever we whent thet happen in the end-still not finish*/
function stopTimer() {
    clearInterval(timer);
}

/*put a new random order in orderAvailable after a given delay-still not finish*/
function fillOrder(orderAvailable){
    console.log("fill order")
    orderAvailable.textContent = raundomOrder().burger;
}

function raundomOrder(){
    return order_bank[Math.floor(order_bank.length*Math.random())];
}

function stringOrder(order){
    let strOrder ="";
    for (let i = 0; i < order.length; i++) {
        strOrder += order[i]
        if(i < order.length-1){
            strOrder += "\n + ";
        }
    }
    return strOrder;
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
    //let raundomOrder = 

}
startGame();

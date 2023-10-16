const timerDisplay = document.getElementById('timer');
const currentOrders = [
    document.getElementById("order1-text"),
    document.getElementById("order2-text"),
    document.getElementById("order3-text")
]; //the paragraph element to put the order detailes into

let timeLeft = 90; //timer starts at 90 seconds
//need to add an option of choosing the game length
let timer;

//! Pay attention to indentation and ctrl + shift + i

/*this function will start the timer and call to fill 3 orders*/
//! Explain in more details, ex 
//! This function start the game: start the timer, and fill order every 5 sec
function startGame() {
    //will happen every 1 second
    
    timer = setInterval(function () {
        timeLeft--;
        timerDisplay.textContent = timeLeft + ' seconds';
        
        //! Put comment before doing the action    
        if (timeLeft === 0) {
            stopTimer();
            // Call a function to end the game
        }
    }, 1000);

    //filling the first 3 orders one by one
    setTimeout(function () {
        document.getElementById('order1-div').classList.remove('not-visable'); //showing the order div
        fillOrder(currentOrders[0]); //showing the order text
    }, 1000); //after 1 second

    setTimeout(function () {
        document.getElementById('order2-div').classList.remove('not-visable');
        fillOrder(currentOrders[1]);
    }, 5000); //after 5 seconds

    setTimeout(function () {
        document.getElementById('order3-div').classList.remove('not-visable');
        fillOrder(currentOrders[2]);
    }, 8000); //after 8 seconds
}

/*will stop running the timer and also need to print "game over" result 
or what ever we want thet happen in the end-still not finish*/
function stopTimer() {
    clearInterval(timer);
    location.href = '../html/gameOver.html';
    //show game-over message based on money (100+ - you can do better and such as)
}


//! If each of those functions conation just one line do just one function

/*put a new random order in orderAvailable after a given delay-still not finish*/
function fillOrder(orderAvailable) {
    const rndBurger = randomOrder();
    const strForOrder = stringOrder(rndBurger);
    orderAvailable.textContent += strForOrder; //the text in the available order
}

function randomOrder() {
    return order_bank[Math.floor(order_bank.length * Math.random())];
}

//! You didn't use it and also didn't explain what it's doing (also the function name)
function stringOrder(order) {
    let strOrder = ""; //empty string
    const burgerInfo = order.burger;
    const burgerPrice = order.price;
    for (let i = burgerInfo.length - 1; i >= 0; i--) { //starting from the end to the start
        let current = ''; //the current ingredient
        for (let j = 0; j < burgerInfo[i].length; j++) { //going through each char
            if (burgerInfo[i][j] === '-') {
                current += ' '; //replacing '-' with a space
            }
            else {
                current += burgerInfo[i][j];
            }
        }
        strOrder += `-${current}` + '\r\n';
    }
    strOrder += `Price: $${burgerPrice}`; //the price of the burger
    return strOrder;
}

startGame();

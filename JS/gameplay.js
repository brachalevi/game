/**
 * Game over
 */

let timeLeft = 90; //timer starts at 90 seconds

const isGameOver = () => {
    if (moneyEarned === 0) {
        for (let i = 0; i < stock.length; i++) {
            if (stock[i].amount !== 0) {
                return false;
            }
        }
        return true;
    }
    else if (timeLeft === 0) {
        return true;
    }
    return false;
}



/**
 * Game start
 */


/* timer & orders */

//need to add an option of choosing the game length

const timerDisplay = document.getElementById('timer');
let timer;

//starts the timer and fills 3 random orders one by one 
//will happen every 1 second
function startTimerAndGetOrders() {
    //starting the timer
    timer = setInterval(function () {
        timeLeft--;
        timerDisplay.textContent = timeLeft + ' seconds';

        if (isGameOver()) {
            stopTimer();
            location.href = '../html/gameOver.html';
        }
    }, 1000);

    //filling the first 3 orders one by one
    setTimeout(function () {
        document.getElementById('order1-div').classList.remove('not-visable'); //showing the order div
        fillOrder(placesForOrders[0]); //showing the order text
    }, 1000); //after 1 second

    setTimeout(function () {
        document.getElementById('order2-div').classList.remove('not-visable');
        fillOrder(placesForOrders[1]);
    }, 5000); //after 5 seconds

    setTimeout(function () {
        document.getElementById('order3-div').classList.remove('not-visable');
        fillOrder(placesForOrders[2]);
    }, 8000); //after 8 seconds
}

//stops the timer
function stopTimer() {
    clearInterval(timer);
}


/* money */

const resetMoney = () => {
    moneyDisplay.textContent = `$${moneyEarned}`;
}


/* stock */

const resetStock = () => {
    stock.forEach(ingredient => {
        ingredient.amount = ingredient.maxAmount;
    });
}


/* plating */

const resetPlating = () => {
    const ingredients = document.getElementsByClassName('ingredient'); //getting the ingredients on the plate
    for (let i = 0; i < ingredients.length; i++) {
        ingredients[i].classList.add('hidden'); //putting 'display: none' on them
        const ingredientId = ingredients[i].id;
        for (let j = 0; j < stock.length; j++) {
            if (stock[j].ingredient === ingredientId) {
                const trayId = ingredientId + "-tray";
                const tray = document.getElementById(trayId);
                if (stock[j].amount > 0) {
                    tray.addEventListener('click', function clicked(event) {
                        addIngredient(event.target);
                    }, { once: true });
                }
                else {
                    const amountId = ingredientId + "-amount-label";
                    const currentAmount = document.getElementById(amountId);
                    buyIngredient(ingredientId, currentAmount);
                }
            }
        }
    }

    const trays = document.getElementsByClassName('tray-img'); //getting the trays
    for (let i = 0; i < trays.length; i++) {
        trays[i].classList.add('unpressed'); //putting a pointer when hovering over them
    }

    //reset variables
    resetPlatingVariables();

    //hidding the buttons
    hidingBtns();

    //adding click events to the unvisable buttons
    servebtn.addEventListener('click', serveClicked);
    restartbtn.addEventListener('click', restartClicked);
}


/* amounts */

const resetAmounts = () => {
    const amounts = document.getElementsByClassName('amount-label');
    for (let i = 0; i < amounts.length; i++) {
        const labelId = amounts[i].id;
        const ingredientId = labelId.substring(0, labelId.length - 13); //the id without '-label-amount'
        for (let j = 0; j < stock.length; j++) {
            if (stock[j].ingredient === ingredientId) {
                amounts[i].textContent = String(stock[j].maxAmount);
            }
        }
    }
}


/* starting the game */

const startGame = () => {
    startTimerAndGetOrders();
    resetPlating();
    resetMoney();
    resetStock();
    resetAmounts();
}

startGame(); //calling the function
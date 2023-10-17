var ingredientsOrder = 5, platingArray = []; //reseting variables

// picking an ingredient

const lettuceTray = document.getElementById("lettuce-tray");
const tomatoTray = document.getElementById("tomato-tray");
const onionTray = document.getElementById("onion-tray");
const pattyTray = document.getElementById("patty-tray");
const topBunTray = document.getElementById("top-bun-tray");
const bottomBunTray = document.getElementById("bottom-bun-tray");

const lettuceAmount = document.getElementById("lettuce-amount-label");
const tomatoAmount = document.getElementById("tomato-amount-label");
const onionAmount = document.getElementById("onion-amount-label");
const pattyAmount = document.getElementById("patty-amount-label");
const topBunAmount = document.getElementById("top-bun-amount-label");
const bottomBunAmount = document.getElementById("bottom-bun-amount-label");

const servebtn = document.getElementById("serve-btn");
const restartbtn = document.getElementById("restart-btn");


const noPointer = (target) => {
    target.classList.remove('unpressed'); //no pointer when hovering above the target
}

const pointer = (target) => {
    target.classList.add('unpressed'); //no pointer when hovering above the target
}

const resetPlatingVariables = () => {
    ingredientsOrder = 5; //resets the order of ingredients
    platingArray = []; //resets the ingredients array
}

const hidingBtns = () => {
    servebtn.classList.add('not-visable');
    restartbtn.classList.add('not-visable');
}

const checkPlating = () => {
    for (let j = 0; j < currentOrders.length; j++) { //checking for each one of the current orders
        const burger = currentOrders[j].burger;
        let countCorrectIngredients = 0;

        if (burger.length === platingArray.length) { //if the length of the plating array and the array of the current order are a match
            for (let i = 0; i < platingArray.length; i++) {
                if (platingArray[i] === burger[i]) { // if in the same place there is the same ingredient
                    countCorrectIngredients++;
                }
            }
            if (countCorrectIngredients === platingArray.length) {
                return j;
            }
        }
    }
    return -1;
}

const serveClicked = () => {
    const avaliablePlace = checkPlating();
    if (avaliablePlace !== -1) {
        const placeElement = placesForOrders[avaliablePlace];
        sendFeedback(`+$${currentOrders[avaliablePlace].price}`);
        addMoney(currentOrders[avaliablePlace].price);
        fillOrder(placeElement);
    }
    else {
        sendFeedback('Wrong order');
    }
    hidingBtns();
    resetPlating();
}

const restartClicked = () => {
    hidingBtns();
    resetPlating();
}


/*adding the ingredient to the plate in the correct order
reducing onr from the amount of the ingredient*/
const addIngredient = (target) => {
    const targetId = target.id.toString(); //getting the tray id
    const ingredientId = targetId.substring(0, targetId.length - 5); //the id without '-tray'
    if (platingArray.includes(ingredientId)) {
        return;
    }
    platingArray.push(ingredientId);
    const currentIngredient = document.getElementById(ingredientId);
    const amountId = ingredientId + "-amount-label";
    const currentAmount = document.getElementById(amountId);
    for (let i = 0; i < stock.length; i++) {
        if (stock[i].ingredient === ingredientId) { //finding the ingredient in stock
            if (stock[i].amount > 0) {
                stock[i].amount--; //reducing one from the ingredient's amount
                currentAmount.textContent = stock[i].amount;
                if (stock[i].amount === 0) {
                    buyIngredient(stock[i].ingredient, currentAmount);
                }
            }
        }
    }

    currentIngredient.classList.remove('hidden'); //the ingredient is visable
    currentIngredient.style.order = ingredientsOrder;  //the rder of the ingredient in the flex box
    ingredientsOrder--; //the next ingredient's order
    noPointer(target); //no pointer when hovering over the tray
    //showing the buttons
    servebtn.classList.remove('not-visable');
    restartbtn.classList.remove('not-visable');
}

// /buy Ingredient- full the stok of Ingredient thet was clisk and remove the black style/
const fillIngredient = (target) => {
    pointer(target);
    const targetId = target.id.toString(); //getting the tray id
    const ingredientId = targetId.substring(0, targetId.length - 5); //the id without '-tray'
    for (let i = 0; i < stock.length; i++) {
        if (stock[i].ingredient === ingredientId) {
            const amountId = ingredientId + "-amount-label";
            const currentAmount = document.getElementById(amountId);
            if (stock[i].price <= moneyEarned) {
                reduceMoney(stock[i].price);
                stock[i].amount = stock[i].maxAmount;
                document.getElementById(targetId).addEventListener('click', function clicked(event) {
                    addIngredient(event.target);
                }, { once: true });
                currentAmount.textContent = stock[i].amount;
                document.getElementById(targetId).classList.remove("black");
                sendFeedback(`-$${stock[i].price}`);
            }
            else {
                sendFeedback("You don't have enough money");
                buyIngredient(ingredientId, currentAmount);
            }
            return;
        }
    }
}

// /change the event to buy and put a fill masseg/
function buyIngredient(ingredient, place) {
    let trayId = ingredient + "-tray";
    place.textContent = 'Buy';
    const tray = document.getElementById(trayId);
    tray.classList.add("black");
    tray.addEventListener('click', function click(event) {
        fillIngredient(event.target)
    }, { once: true });
}
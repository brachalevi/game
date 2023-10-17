var ingredientsOrder=5, platingArray=[]; //reseting variables

// picking an ingredient

const lettuceTray=document.getElementById("lettuce-tray");
const tomatoTray=document.getElementById("tomato-tray");
const onionTray=document.getElementById("onion-tray");
const pattyTray=document.getElementById("patty-tray");
const topBunTray=document.getElementById("top-bun-tray");
const bottomBunTray=document.getElementById("bottom-bun-tray");

const lettuceAmount=document.getElementById("lettuce-amount-label");
const tomatoAmount=document.getElementById("tomato-amount-label");
const onionAmount=document.getElementById("onion-amount-label");
const pattyAmount=document.getElementById("patty-amount-label");
const topBunAmount=document.getElementById("top-bun-amount-label");
const bottomBunAmount=document.getElementById("bottom-bun-amount-label");

const servebtn=document.getElementById("serve-btn");
const restartbtn=document.getElementById("restart-btn");

const hidingBtns=()=>{
    servebtn.classList.add('not-visable');
    restartbtn.classList.add('not-visable');
}

const serveClicked=()=>{ 
    const avaliablePlace=checkPlating();
    console.log(avaliablePlace);
    if (avaliablePlace!==-1){
        sendFeedback(`+$${currentOrders[avaliablePlace].price}`);
        addMoney(currentOrders[avaliablePlace].price);
        fillOrder(avaliablePlace);
    }
    else{
        sendFeedback('Wrong order');
        fillOrder(avaliablePlace);
    }
    hidingBtns();
    resetPlating();
}

const restartClicked=()=>{
    hidingBtns();
    resetPlating();
}

const checkPlating=()=>{
    for (let j=0; j<currentOrders.length; j++){ //checking for each one of the current orders
        if (currentOrders[j].length===platingArray.length){ //if the length of the plating array and the array of the current order are a match
            console.log(currentOrders[j]);
            console.log(platingArray);
            let countCorrectIngredients=0;
            for (let i=0; i<platingArray.length; i++){
                if (platingArray[i]===currentOrders[j][i]){ // if in the same place there is the same ingredient
                    countCorrectIngredients++;
                } //! Why you need this?
                else{
                    break;
                }
            }
            if (countCorrectIngredients===platingArray.length){
                return j;
            }
        }
    }
    return -1;
}

/*adding the ingredient to the plate in the correct order
reducing onr from the amount of the ingredient*/
const addIngredient=(target)=>{
    const targetId=target.id.toString(); //getting the tray id
    const ingredientId=targetId.substring(0, targetId.length-5); //the id without '-tray'
    platingArray.push(ingredientId); 
    const currentIngredient=document.getElementById(ingredientId);
    const amountId=ingredientId+"-amount-label";
    const currentAmount=document.getElementById(amountId);
    for (let i=0; i<stock.length; i++){
        if (stock[i].ingredient===ingredientId){ //finding the ingredient in stock
            //! In general it better to do first the option that cut the function, in this case if amount === 0
            if (stock[i].amount>0){
                stock[i].amount--; //reducing one from the ingredient's amount
                currentAmount.textContent=stock[i].amount;
                if (stock[i].amount===0){
                    buyIngredient(stock[i].ingredient, currentAmount);
                }
                break;
            }
        }
    }
    currentIngredient.classList.remove('hidden'); //the ingredient is visable
    currentIngredient.style.order=ingredientsOrder;  //the rder of the ingredient in the flex box
    ingredientsOrder--; //the next ingredient's order
    noPointer(target); //no pointer when hovering over the tray
    //showing the buttons
    servebtn.classList.remove('not-visable');
    restartbtn.classList.remove('not-visable');
}

const noPointer=(target)=>{
    target.classList.remove('unpressed'); //no pointer when hovering above the target
}

const pointer=(target)=>{
    target.classList.add('unpressed'); //no pointer when hovering above the target
}

// /buy Ingredient- full the stok of Ingredient thet was clisk and remove the black style/
const fillIngredient=(target)=>{
    pointer(target);
    const targetId=target.id.toString(); //getting the tray id
    const ingredientId=targetId.substring(0, targetId.length-5); //the id without '-tray'
    for (let i = 0; i < stock.length; i++) {
        if(stock[i].ingredient === ingredientId){
            const amountId=ingredientId+"-amount-label";
            const currentAmount=document.getElementById(amountId);
            if(stock[i].price <= moneyEarned){
                reduceMoney(stock[i].price);
                stock[i].amount = stock[i].maxAmount;
                document.getElementById(targetId).addEventListener('click', function clicked(event){
                    addIngredient(event.target);
                }, { once: true });
                currentAmount.textContent=stock[i].amount;
                document.getElementById(targetId).classList.remove("black");
                sendFeedback("Your purchese has been completed");
                // /remove or try not/
                // /nedd to add func thet chak and add the addIngr/
            }
            else{
                sendFeedback("You don't have enough money");
                buyIngredient(ingredientId, currentAmount);
            }
            return;
        }
    }
}

// /change the event to buy and put a fill masseg/
function buyIngredient(ingredient, place){
    let trayId = ingredient + "-tray";
    console.log(place);
    // place.textContent='Buy';
    const tray=document.getElementById(trayId);
    tray.classList.add("black");
    tray.addEventListener('click', function click(event){
        fillIngredient(event.target)
    }, {once:true});
}
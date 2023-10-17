//game start

const resetStock=()=>{
    stock.forEach(ingredient => {
        ingredient.amount=ingredient.maxAmount;
    });
}

//3 random orders and full stock

const resetPlating=()=>{
    const ingredients=document.getElementsByClassName('ingredient'); //getting the ingredients on the plate
    for (let i=0; i<ingredients.length; i++){
        ingredients[i].classList.add('hidden'); //putting 'display: none' on them
    }

    const trays=document.getElementsByClassName('tray-img'); //getting the trays
    for (let i=0; i<trays.length; i++){
        trays[i].classList.add('unpressed'); //putting a pointer when hovering over them
    }

    ingredientsOrder=5; //resets the order of ingredients
    platingArray=[]; //resets the ingredients array

    //adding 'click' event to the ingredients that will remove itself after one click
    lettuceTray.addEventListener('click', function clicked(event){
        addIngredient(event.target);
    }, { once: true });
    
    tomatoTray.addEventListener('click', function clicked(event){
        addIngredient(event.target);
    }, { once: true });
    
    onionTray.addEventListener('click', function clicked(event){
        addIngredient(event.target);
    }, { once: true });
    
    pattyTray.addEventListener('click', function clicked(event){
        addIngredient(event.target);
    }, { once: true });
    
    topBunTray.addEventListener('click', function clicked(event){
        addIngredient(event.target);
    }, { once: true });
    
    bottomBunTray.addEventListener('click', function clicked(event){
        addIngredient(event.target);
    }, { once: true });

    //hidding the buttons
    servebtn.classList.add('not-visable');
    restartbtn.classList.add('not-visable');

    //adding click events to the unvisable buttons
    servebtn.addEventListener('click', serveClicked);
    restartbtn.addEventListener('click', restartClicked);
}

function resetEvent(){

}

resetPlating(); //calling the function initally



//game over
//if timer is over or no money and no ingredients 

/*feedback*/
const feedbackText=document.getElementById('feedback-text');
const feedbackBox=document.getElementById('feedback');

//hiding the feedback box after 5 seconds
const hideFeedback=()=>{
    setTimeout(function(){
        feedbackBox.classList.add('not-visable');
    }
    ,5000);
}

//getting a massage and showing it in the feedback box
const sendFeedback=(message)=>{
    feedbackText.textContent=message;
    feedbackBox.classList.remove('not-visable'); //making it visable
    hideFeedback(); //hiding it
}

const isGameOver=()=>{
    if (moneyEarned===0){
        for (let i=0; i<stock.length; i++){
            if (stock[i].amount!==0){
                return false;
            }
        }
        return true;
    }
    else if (timeLeft===0){
        return true;
    }
    return false;
}

var ingredientsOrder=5, platingArray=[]; //reseting variables

// picking an ingredient

const lettuceTray=document.getElementById("lettuce-tray");
const tomatoTray=document.getElementById("tomato-tray");
const onionTray=document.getElementById("onion-tray");
const pattyTray=document.getElementById("patty-tray");
const topBunTray=document.getElementById("top-bun-tray");
const bottomBunTray=document.getElementById("bottom-bun-tray");

const servebtn=document.getElementById("serve-btn");
const restartbtn=document.getElementById("restart-btn");

const serveClicked=()=>{ 
    const isRight=checkPlating();
    //do things
    resetPlating();
}

const restartClicked=()=>{
    //do things
    resetPlating();
}

const checkPlating=()=>{
    for (let j=0; j<currentOrders.length; j++){ //checking for each one of the current orders
        if (currentOrders[j].length===platingArray.length){ //if the length of the plating array and the array of the current order are a match
            var countCorrectIngredients=0;
            for (let i=0; i<platingArray.length; i++){
                if (platingArray[i]===currentOrders[j][i]){ // if in the same place there is the same ingredient
                    countCorrectIngredients++;
                }
                else{
                    break;
                }
            }
            if (countCorrectIngredients===platingArray.length){
                return true;
            }
        }
    }
    return false;
}

const addIngredient=(target)=>{
    const targetId=target.id.toString(); //getting the tray id
    const ingredientId=targetId.substring(0, targetId.length-5); //the id without '-tray'
    platingArray.push(ingredientId); 
    const currentIngredient=document.getElementById(ingredientId);
    for (let i=0; i<stock.length; i++){
        if (stock[i].ingredient===ingredientId){ //finding the ingredient in stock
            if (stock[i].amount!==0){
                stock[i].amount--; //reducing one from the ingredient's amount
                if (stock[i].amount===0){
                    buyIngredient(stock[i].ingredient);
                }
                break;
            }
            else{
                //amount===0
                //show an option to buy more and disable clicking

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
    const targetId=target.id.toString(); //getting the tray id
    target.classList.remove('unpressed'); //no pointer when hovering above the target
}

// /buy Ingredient- full the stok of Ingredient thet was clisk and remove the black style/
const fillIngredient=(target)=>{
    const targetId=target.id.toString(); //getting the tray id
    const ingredientId=targetId.substring(0, targetId.length-5); //the id without '-tray'
    for (let i = 0; i < stock.length; i++) {
        if(stock[i].ingredient === ingredientId){
            console.log("hy");
            if(stock[i].price <= moneyEarned){
                reduceMoney(stock[i].price);
                stock[i].amount = stock[i].maxAmount;
                // /remove or try not/
                target.addEventListener('click', function clicked(event){
                    addIngredient(event.target);
                }, { once: true });
                document.getElementById(ingredientId).classList.remove("black");
                // /nedd to add func thet chak and add the addIngr/
            }
            else{
                document.getElementById("fitbek-test").textContent = "you dont have anaf mony";
            }
            return;
        }
    }
}

function resetEvent(item, itemStok){
    if(itemStok.amount === 0){
        return;
    }
    item.addEventListener('click', function clicked(event){
        addIngredient(event.target);
    }, { once: true });
}

// /change the event to buy and put a fill masseg/
function buyIngredient(ingredient){
    let ingredientId = ingredient + "-tray";
    document.getElementById(ingredientId).classList.add("black");
    document.getElementById(ingredientId).addEventListener('click', function click(event){
        fillIngredient(event.target)
    });
}
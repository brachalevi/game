//game start

//3 random orders and full stock
var ingredientsOrder=5, platingArray=[]; //reseting variables

// picking an ingredient

const lettuceTray=document.getElementById("lettuce-tray");
const tomatoTray=document.getElementById("tomato-tray");
const onionTray=document.getElementById("onion-tray");
const pattyTray=document.getElementById("patty-tray");
const topBunTray=document.getElementById("top-bun-tray");
const bottomBunTray=document.getElementById("bottom-bun-tray");
//! More common to use Btn 
const serveBt=document.getElementById("serve-bt");
const restartBt=document.getElementById("restart-bt");
//! Add explanation before each function
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
    //! You didn't create currentOrders
    for (let j=0; j<currentOrders.length; j++){ //checking for each one of the current orders
        if (currentOrders[j].length===platingArray.length){ //if the length of the plating array and the array of the current order are a match
            //! It is better to not use var, use let instead    
            var countCorrectIngredients=0;
            for (let i=0; i<platingArray.length; i++){
                if (platingArray[i]===currentOrders[j][i]){ // if in the same place there is the same ingredient
                    countCorrectIngredients++;
                } //! Why you need this?
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

/*buy Ingredient- full the stok of Ingredient thet was clisk and remove the black style*/
const fillIngredient=(target)=>{
    console.log("fill");
    const targetId=target.id.toString(); //getting the tray id
    const ingredientId=targetId.substring(0, targetId.length-5); //the id without '-tray'
    for (let i = 0; i < stock.length; i++) {
        if(stock[i].ingredient === ingredientId){
            if(stock[i].price <= moneyEarned){
                reduceMoney(tock[i].price);
                stock[i].amount = stock[i].maxAmount;
                target.addEventListener('click', function clicked(event){
                    addIngredient(event.target);
                }, { once: true });
                document.getElementById(ingredientId).classList.remove("black");
            }
            else{
                document.getElementById("fitbek-test").textContent = "you dont have anaf mony";
            }
            break;
        }
    }
}
/*change the event to buy and put a fill masseg*/
function buyIngredient(ingredient){
    let ingredientId = ingredient + "-tray";
    document.getElementById(ingredientId).classList.add("black");
    document.getElementById(ingredientId).addEventListener('click', function click(event){
        fillIngredient(event.target)
    }, { once: true });
}

const addIngredient=(target)=>{
    const targetId=target.id.toString(); //getting the tray id
    const ingredientId=targetId.substring(0, targetId.length-5); //the id without '-tray'
    platingArray.push(ingredientId); 
    const currentIngredient=document.getElementById(ingredientId);
    for (let i=0; i<stock.length; i++){
        if (stock[i].ingredient===ingredientId){ //finding the ingredient in stock
            //! In general it better to do first the option that cut the function, in this case if amount === 0
            //! Better check if > 0
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
    serveBt.classList.remove('not-visable');
    restartBt.classList.remove('not-visable');
}

const noPointer=(target)=>{
    //! If you don't use targetId remove it
    const targetId=target.id.toString(); //getting the tray id 
    target.classList.remove('unpressed'); //no pointer when hovering above the target
}

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

    //! In each function you repeat the same code, try to avoid this
    //! Are you sure you want it just once?
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
    serveBt.classList.add('not-visable');
    restartBt.classList.add('not-visable');

    //adding click events to the unvisable buttons
    serveBt.addEventListener('click', serveClicked);
    restartBt.addEventListener('click', restartClicked);
}

function resetEvent(){

}

resetPlating(); //calling the function initally



//game over
//if timer is over or no money and no ingredients 
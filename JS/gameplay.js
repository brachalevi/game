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

//call resetPlating after every serve/cancel click

const addIngredient=(target)=>{
    const targetId=target.id.toString(); //getting the tray id
    const ingredientId=targetId.substring(0, targetId.length-5); //the id without '-tray'
    platingArray.push(ingredientId); 
    const currentIngredient=document.getElementById(ingredientId);
    for (let i=0; i<stock.length; i++){
        if (stock[i].ingredient===ingredientId){ //finding the ingredient in stock
            if (stock[i].amount!==0){
                stock[i].amount--; //reducing one from the ingredient's amount
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
}

const noPointer=(target)=>{
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
}

resetPlating(); //calling the function initally



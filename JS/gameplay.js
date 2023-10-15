// orders
const orders=[
    {
        order:['bottom-bun', 'tomato']
    }
]

var orderCounter=0;

// picking an ingredient
const lettuceTray=document.getElementById("lettuce-tray");
const tomatoTray=document.getElementById("tomato-tray");
const onionTray=document.getElementById("onion-tray");
const pattyTray=document.getElementById("patty-tray");
const topBunTray=document.getElementById("top-bun-tray");
const bottomBunTray=document.getElementById("bottom-bun-tray");

const resetPlating=()=>{
    const ingredients=document.getElementsByClassName('ingredient');
    for (let i=0; i<ingredients.length; i++){
        ingredients[i].classList.add('hidden');
    }
    orderCounter=0;
}

const addIngredient=(target)=>{
    const targetId=target.id.toString();
    const ingredientId=targetId.substring(0, targetId.length-5);
    const currentIngredient=document.getElementById(ingredientId);
    currentIngredient.classList.remove('hidden');
    // reduce one from amount
    //curser=no pointer
}

lettuceTray.addEventListener('click', function(event){
    addIngredient(event.target);
});
tomatoTray.addEventListener('click', function(event){
    addIngredient(event.target);
});
onionTray.addEventListener('click', function(event){
    addIngredient(event.target);
});
pattyTray.addEventListener('click', function(event){
    addIngredient(event.target);
});
topBunTray.addEventListener('click', function(event){
    addIngredient(event.target);
});
bottomBunTray.addEventListener('click', function(event){
    addIngredient(event.target);
});

// orders
const orders=[
    {
        order:['bottom-bun', 'tomato']
    }
]

let order_bank = [['bottom-bun','tomato','onion','patty','lettuce','top-bun'],['bottom-bun','patty','top-bun'],['bottom-bun','patty','tomato','onion','top-bun']];
const order_call = []

/*still not finish*/
function fillOrder(){
    if 

}
/*still not finish*/
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

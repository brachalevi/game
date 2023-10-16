

// orders also in consts
const order_bank = [
    {
        burger: ['bottom-bun','tomato','onion','patty','lettuce','top-bun'],
        price:65
    },
    {
        burger: ['bottom-bun','patty','top-bun'],
        price:20
    },
    {
        burger: ['bottom-bun','patty','tomato','top-bun'],
        price:35
    },
    {
        burger:['bottom-bun','patty','tomato','onion','top-bun'],
        price:40
    },
    {
        burger:['bottom-bun','patty','tomato','lettuce','top-bun'],
        price:40
    },
    {        
        burger:['bottom-bun','tomato','patty','onion','lettuce','top-bun'],
        price:20
    } //add more
];




var ingredientsOrder=5;

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
    ingredientsOrder=5;
}

// resetPlating();

//call resetPlating after every serve click


const addIngredient=(target)=>{
    const targetId=target.id.toString();
    const ingredientId=targetId.substring(0, targetId.length-5);
    const currentIngredient=document.getElementById(ingredientId);
    currentIngredient.classList.remove('hidden');
    // targetId.classList.remove('unpressed'); //to fix
    currentIngredient.style.order=ingredientsOrder;
    // targetId.removeEventListener('click');
    ingredientsOrder--;
    // for (let i=0; i<stock.length; i++){
    //     if (stock[i].ingredient===ingredientId){
    //         stock[i].amount--;
    //         break;
    //     }
    // }

    //to do that when an item is clicked it will not be clicked again until reset
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

//ingredients also in consts
const stock = [
    {
        ingredient: 'tomato',
        amount:7,
        price:10
    },
    {
        ingredient: 'lettuce',
        amount:6,
        price:20
    },
    {
        ingredient: 'onion',
        amount:10,
        price:15
    },
    {
        ingredient: 'patty',
        amount:10,
        price:40
    },
    {
        ingredient: 'top-bun',
        amount:9,
        price:25
    },
    {        
        ingredient: 'bottom-bun',
        amount:9,
        price:25
    }
];

//game over
//if timer is over or no money and no ingredients 
const lastEnteredStr=localStorage.getItem('lastEntered');
const lastEntered=JSON.parse(lastEnteredStr);

let restaurant=lastEntered.userId%2;
let otherRestaurant;

switch (restaurant) {
    case 0:
        otherRestaurant = 1;
        break;
    case 1:
        otherRestaurant = 0;
        break;
}

const hiName=document.getElementById('hi-name');
hiName.textContent=`Hi ${lastEntered.username}!`

const infoList=document.getElementById('info-list');

const infoArr=[
    `You belong to restaurant ${(1+lastEntered.userId%2)}`,
    `Your restaurant has ${getRestaurantsById(restaurant).score} points in total`,
    `In the restaurant there are ${getRestaurantsById(restaurant).playersNum} players`,
    'empty',
    `You currently have ${lastEntered.points} points`,
    `The email connected to your account is ${lastEntered.email}`
];

const createList=(list, arr)=>{
    for (let i=0; i<arr.length; i++){
        const newItem=document.createElement('li');
        if (arr[i]==='empty'){
            newItem.classList.add('not-visable');
        }
        newItem.textContent=arr[i];
        list.appendChild(newItem);
    }
}

createList(infoList, infoArr);

const allUsers=getUsersFromLocalStorage();
const sameRestaurant=getUsersInTheSameRestaurant(lastEntered.userId%2);

const topPlayers=players=>{
    if (players.length===0){
        return 0;
    }
    players.sort((a,b)=>b.points-a.points);
    const currentRank=players.findIndex(player=>player.points>=lastEntered.points)-1;
    const rank=((1+currentRank)/players.length)*100;
    return rank;
}

const statsList=document.getElementById('stats-list');

const statsArr=[
    `You are in the top ${topPlayers(allUsers)}% players`,
    `You are in the top ${topPlayers(sameRestaurant)}% players from your restaurant`
];

const difference = getRestaurantsById(restaurant).score - getRestaurantsById(otherRestaurant).score;
if (difference > 0) {
    statsArr.push(`Your restaurant is leading by ${difference} points`);
}
else {
    statsArr.push(`Other restaurant is leading by ${Math.abs(difference)} points`);
}

createList(statsList, statsArr);


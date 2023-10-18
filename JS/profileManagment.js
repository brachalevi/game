if(localStorage.getItem('lastEntered')===null||localStorage.getItem('lastEntered').active === false){
    location.href = '../html/homePage.html';
}  

//getting the current user
const lastEnteredStr = localStorage.getItem('lastEntered');
const lastEntered = JSON.parse(lastEnteredStr);

//getting the current user's restaurant id and the other one's
let restaurant = lastEntered.userId % 2;
let otherRestaurant;

switch (restaurant) {
    case 0:
        otherRestaurant = 1;
        break;
    case 1:
        otherRestaurant = 0;
        break;
}

//writing a hello message to the current user
const hiName = document.getElementById('hi-name');
hiName.textContent = `Hi ${lastEntered.username}!`

//a function that gets an ul object and an array and fills the ul with
//li-s that are items from the array
const createList = (list, arr) => {
    for (let i = 0; i < arr.length; i++) {
        const newItem = document.createElement('li');
        if (arr[i] === 'empty') {
            newItem.classList.add('not-visable');
        }
        newItem.textContent = arr[i];
        list.appendChild(newItem);
    }
}



/* info div */
const infoList = document.getElementById('info-list');

const infoArr = [
    `You belong to restaurant ${(1 + lastEntered.userId % 2)}`,
    `Your restaurant has ${getRestaurantsById(restaurant).score} points in total`,
    `In the restaurant there are ${getRestaurantsById(restaurant).playersNum} players`,
    'empty',
    `You currently have ${lastEntered.points} points`,
    `The email connected to your account is ${lastEntered.email}`
];

createList(infoList, infoArr);



/* stats div */
const allUsers = getUsersFromLocalStorage();
const sameRestaurant = getUsersInTheSameRestaurant(lastEntered.userId % 2);

//a function that gets the current player's rank out of an array of players
const topPlayers = players => {
    if (players.length === 0) {
        return 0;
    }
    players.sort((a, b) => b.points - a.points);
    const currentRank = players.findIndex(player => player.points >= lastEntered.points) - 1;
    const rank = ((1 + currentRank) / players.length) * 100;
    return rank;
}

const statsList = document.getElementById('stats-list');

const statsArr = [
    `You are in the top ${topPlayers(allUsers)}% players`,
    `You are in the top ${topPlayers(sameRestaurant)}% players from your restaurant`
];

const difference = getRestaurantsById(restaurant).score - getRestaurantsById(otherRestaurant).score;

if (difference > 0) {
    statsArr.push(`Your restaurant is leading by ${difference} points`);
}
else if (difference < 0) {
    statsArr.push(`Other restaurant is leading by ${Math.abs(difference)} points`);
}
else {
    statsArr.push(`There is a tie between the restaurants`);
}

createList(statsList, statsArr);

/* change password div */




/* send gift div */

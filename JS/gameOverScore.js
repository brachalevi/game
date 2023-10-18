if(localStorage.getItem('lastEntered')===null||localStorage.getItem('lastEntered').active === false){
    alert("good");
    location.href = '../html/homePage.html';
} 
else
    startGame(); 
const currentGame = getGameFromLocalStorage();


const money = currentGame.money || 0;
const moneyText = document.getElementById("money-score");
moneyText.textContent = `You earned $${money}`;

const points = Math.floor(100 * Math.random() * ((money / 3) - (money / 4)) + 1) || 0;
const pointsText = document.getElementById('points');
pointsText.textContent += points;

const gameFeedback = document.getElementById('game-feedback');
//! try to avid else if, mabey do return or switch case
if (money < 100) {
    gameFeedback.textContent = 'You really need to improve!';
}
else if (money < 200) {
    gameFeedback.textContent = 'You can do better';
}
else if (money < 300) {
    gameFeedback.textContent = 'You played well';
}
else {
    gameFeedback.textContent = 'YOU ARE A LEGEND';
}

const again = document.getElementById("try-again-games-btn");


/** TO DO */
// again.addEventListener('click', function(){
//     localStorage.setItem('lastTime', currentGame.time);
//     createGame();
//     const newGame=getGameFromLocalStorage();
//     // updateValueOnGame('time',)
//     location.href='../html/main.html';
// })


const restaurant = currentGame.restaurant;
addToScore(restaurant, points);

let otherRestaurant;

switch (restaurant) {
    case 0:
        otherRestaurant = 1;
        break;
    case 1:
        otherRestaurant = 0;
        break;
}

const yourScore = document.getElementById("td-your-score");
const otherScore = document.getElementById("td-other-score");
yourScore.textContent = getRestaurantsById(restaurant).score + " points";
otherScore.textContent = getRestaurantsById(otherRestaurant).score + " points";


const yourPlayers = document.getElementById("td-your-players");
const otherPlayers = document.getElementById("td-other-players");
yourPlayers.textContent = getRestaurantsById(restaurant).playersNum + " players";
otherPlayers.textContent = getRestaurantsById(otherRestaurant).playersNum + " players";

const inLead = document.getElementById("in-lead");
const difference = getRestaurantsById(restaurant).score - getRestaurantsById(otherRestaurant).score;
if (difference > 0) {
    inLead.textContent = `Your restaurant is leading by ${difference} points`;
}
else if (difference < 0) {
    inLead.textContent = `Other restaurant is leading by ${Math.abs(difference)} points`;
}
else {
    inLead.textContent = `There is a tie between the restaurants`;
}

localStorage.removeItem('game');

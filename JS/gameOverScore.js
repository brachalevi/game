const game = getGameFromLocalStorage();

const money = game.money || 0;
const moneyText = document.getElementById("money-score");
moneyText.textContent = `You earned $${money}`;

let points = Math.floor(100 * Math.random() * (money / 4)) || 0;
const pointsText = document.getElementById('points');
pointsText.textContent += points;

const restaurant = game.restaurant;
addToScore(restaurant, points);

const gameFeedback = document.getElementById('game-feedback');

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
const other = document.getElementById("other-games-btn");
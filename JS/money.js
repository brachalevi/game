let moneyEarned = 0; //in the start of the game
const moneyDisplay = document.getElementById('money');
const game = getGameFromLocalStorage();

const addMoney = (amount) => {
    moneyEarned += amount;
    moneyDisplay.textContent = '$' + moneyEarned;
    updateValueOnGame('money', moneyEarned, game);
}

const reduceMoney = (amount) => {
    if (moneyEarned >= amount) {
        moneyEarned -= amount;
    }
    else {
        moneyEarned = 0;
    }
    moneyDisplay.textContent = '$' + moneyEarned;
    updateValueOnGame('money', moneyEarned, game);
}
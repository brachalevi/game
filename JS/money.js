const lastEntered = JSON.parse(localStorage.getItem("lastEntered"));

let moneyEarned = 0;

if (lastEntered.money>0){
    moneyEarned = lastEntered.money;
}
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
const money=moneyEarned;
const moneyText=document.getElementById("money-score");
moneyText.textContent=`You earned $${money}`;

const gameFeedback=document.getElementById('game-feedback');

if (money<100){
    gameFeedback.textContent='You really need to improve!';
}
else if (money<200){
    gameFeedback.textContent='You can do better';
}
else if (money<300){
    gameFeedback.textContent='You played well';
}
else{
    gameFeedback.textContent='YOU ARE A LEGEND';
}

console.log(money);
// you get score based on your money and that is in your account
const money=moneyEarned;
const moneyText=document.getElementById('money-score');
moneyText.textContent+=`$${money}`;

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
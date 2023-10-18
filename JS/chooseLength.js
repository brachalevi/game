let restaurantId=0;
const lastEntered=localStorage.getItem('lastEntered');

if (lastEntered.userId) {
    switch (lastEntered.userId % 2) {
        case 1:
            restaurantId = 1;
            break;

        case 0:
            restaurantId = 0;
            break;

        default:
            break;
    }
}


const restaurantIdText = document.getElementById("restaurant-id");
restaurantIdText.textContent += restaurantId;

let seconds = 90;
const buttons = document.getElementsByClassName('buttons');
for (let i = 1; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener('click', function (event) {
        const lengthText = event.target.id;
        const length = lengthText.substring(0, 2);
        seconds = parseInt(length);
        createGame();
        const game = getGameFromLocalStorage();
        const gameDetails = getGameFromLocalStorage();
        updateValueOnGame('user', lastEntered.userId, gameDetails);
        updateValueOnGame('restaurant', restaurantId, gameDetails);
        updateValueOnGame('time', seconds, gameDetails);
        location.href = '../html/main.html'
    });
}

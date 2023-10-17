let restaurantId;

if (findActiveUser()) {
    console.log('hi');
    switch (findActiveUser().userId % 2) {
        case 1:
            restaurantId = 1;
            break;

        case 0:
            restaurantId = 2;
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
        const game = getGameFromLocalStorage();
        updateValueOnGame('time', seconds, game);
        console.log(game);
        location.href = '../html/main.html'
    });
}

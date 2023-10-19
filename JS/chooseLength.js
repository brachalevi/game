if (localStorage.getItem('lastEntered') === null || localStorage.getItem('lastEntered').active === false) {
    location.href = '../html/homePage.html';
} 
const gift = JSON.parse(localStorage.getItem('lastEntered')).money;
const alerted=localStorage.getItem('alerted') || '';

if (gift > 0) {
    if (alerted!='yes'){
        alert("Congratulations on receiving $" + gift + " from a friend");
    }
    localStorage.setItem('alerted', 'yes');
}

let restaurantId = 0; //initial value

//getting the current user
const lastEnteredStr = localStorage.getItem('lastEntered');
const lastEntered = JSON.parse(lastEnteredStr);

if (lastEntered.userId) { //if there is a current user
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

//check if there is game
localStorage.removeItem('game');

//writing the restaurant number
const restaurantIdText = document.getElementById("restaurant-id");
restaurantIdText.textContent = (getRestaurantsById(restaurantId).name);

let seconds = 90; //initial value

//getting the buttons of game-length selecting
const buttons = document.getElementsByClassName('select-buttons');

for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    //adding a click event to each button
    button.addEventListener('click', function (event) {
        const lengthText = event.target.id;
        const length = lengthText.substring(0, 2); //getting the number of seconds from the button's id
        seconds = parseInt(length);

        //creating a new game with defult values
        createGame();

        const gameDetails = getGameFromLocalStorage();
        //inserting values to the game object
        updateValueOnGame('user', lastEntered.userId, gameDetails);
        updateValueOnGame('restaurant', restaurantId, gameDetails);
        updateValueOnGame('time', seconds, gameDetails);
        //loading the game
        location.href = '../html/main.html'
    });
}
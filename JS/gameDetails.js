/**
 * JSON
 */

const createGame = () => {
    const game = {
        restaurant: 1,
        time: 90,
        money: 0,
        user: 1
    };
    saveGameToLocalStorage(game);
}


//save game a string to local storage
const saveGameToLocalStorage = game => {
    localStorage.setItem('game', JSON.stringify(game));
}

//get game object
const getGameFromLocalStorage = () => {
    const game = JSON.parse(localStorage.getItem('game'));
    return game;
}

//updating a value to a key
const updateValueOnGame = (key, value, game) => {
    for (let property in game) {
        if (game.hasOwnProperty(property) && property === key) {
            game[property] = value;
        }
    }
    saveGameToLocalStorage(game);
}
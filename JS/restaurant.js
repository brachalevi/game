//array of restaurant objects
const restaurantsArr = [
    {
        id: 1,
        playersNum: 0,
        score: 0,
        moneyThisRound:0
    },
    {
        id: 2,
        playersNum: 0,
        score: 0,
        moneyThisRound:0
    }
];


//save restaurants as a string to local storage
const saveRestaurantsToLocalStorage = restaurants => {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
}

//get restaurants as an array
const getRestaurantsFromLocalStorage = () => {
    const restaurants = JSON.parse(localStorage.getItem('restaurants'));
    return restaurants;
}

//updating a value to a key on one of the restaurants
const updateValue = (id, key, value) => {
    const restaurants = getRestaurantsFromLocalStorage();
    const restaurant = restaurants[id - 1];
    for (let property in restaurant) {
        if (restaurant.hasOwnProperty(property) && property === key) {
            restaurant[property] = value;
        }
    }
    saveRestaurantsToLocalStorage(restaurants);
}

//adding an amount to a restaurant's score
const addToScore = (id, amount) => {
    const restaurants = getRestaurantsFromLocalStorage();
    const restaurant = restaurants[id - 1];
    for (let property in restaurant) {
        if (restaurant.hasOwnProperty(property) && property === 'score') {
            restaurant[property] += amount;
        }
    }
    saveRestaurantsToLocalStorage(restaurants);
}

//adding one to a restaurant's player count
const addPlayer = (id) => {
    const restaurants = getRestaurantsFromLocalStorage();
    const restaurant = restaurants[id - 1];
    for (let property in restaurant) {
        if (restaurant.hasOwnProperty(property) && property === 'playerNum') {
            restaurant[property]++;
        }
    }
    saveRestaurantsToLocalStorage(restaurants);
}
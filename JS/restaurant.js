//get restaurants as an array
const getRestaurantsFromLocalStorage = () => {
    const restaurants = JSON.parse(localStorage.getItem('restaurants'));
    return restaurants;
}

//updating a value to a key on one of the restaurants
const updateValue = (id, key, value) => {    
    const restaurants = getRestaurantsFromLocalStorage();
    const restaurant = restaurants[id];
    for (let property in restaurant) {
        if (restaurant.hasOwnProperty(property) && property === key) {
            restaurant[property] = value;
        }
    }
    saveRestaurantsToLocalStorage(restaurants);
}

//adding an amount to a restaurant's score
const addToScore = (id, amount) => {
    console.log(localStorage);
    const restaurants = getRestaurantsFromLocalStorage();
    console.log(restaurants);
    const restaurant = restaurants[id];
    for (let property in restaurant) {
        if (restaurant.hasOwnProperty(property) && property === 'score') {
            console.log(true);
            restaurant[property] += amount;
            console.log(restaurant);
        }
    }
    saveRestaurantsToLocalStorage(restaurants);
}

//adding one to a restaurant's player count
const addPlayer = (id) => {
    const restaurants = getRestaurantsFromLocalStorage();
    const restaurant = restaurants[id];
    for (let property in restaurant) {
        if (restaurant.hasOwnProperty(property) && property === 'playersNum') {
            restaurant[property]++;
        }
    }
    saveRestaurantsToLocalStorage(restaurants);
}

const getRestaurantsById=(id)=>{
    const restaurants=getRestaurantsFromLocalStorage();
    return restaurants[id];
}
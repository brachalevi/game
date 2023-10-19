//save restaurants as a string to local storage
const saveRestaurantsToLocalStorage = restaurants => {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
}

if (!localStorage.getItem('restaurants')) {
    //array of restaurant objects
    const restaurantsArr = [
        {
            id: 0,
            playersNum: 0,
            score: 0,
            name: 'Big Bite Burgers'
        },
        {
            id: 1,
            playersNum: 0,
            score: 0,
            name: 'Grill & Chill Burgers'
        }
    ];
    saveRestaurantsToLocalStorage(restaurantsArr);
}
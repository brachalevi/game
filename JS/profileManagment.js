if (localStorage.getItem('lastEntered') === null || localStorage.getItem('lastEntered').active === false) {
    location.href = '../html/homePage.html';
}

//getting the current user
const lastEnteredStr = localStorage.getItem('lastEntered');
const lastEntered = JSON.parse(lastEnteredStr);

//getting the current user's restaurant id and the other one's
let restaurant = lastEntered.userId % 2;
let otherRestaurant;

switch (restaurant) {
    case 0:
        otherRestaurant = 1;
        break;
    case 1:
        otherRestaurant = 0;
        break;
}

//writing a hello message to the current user
const hiName = document.getElementById('hi-name');
hiName.textContent = `Hi ${lastEntered.username}!`

//a function that gets an ul object and an array and fills the ul with
//li-s that are items from the array
const createList = (list, arr) => {
    for (let i = 0; i < arr.length; i++) {
        const newItem = document.createElement('li');
        if (arr[i] === 'empty') {
            newItem.classList.add('not-visable');
        }
        newItem.textContent = arr[i];
        list.appendChild(newItem);
    }
}



/* info div */
const infoList = document.getElementById('info-list');

const infoArr = [
    `You belong to ${(getRestaurantsById(restaurant).name)}`,
    `Your restaurant has ${getRestaurantsById(restaurant).score} points in total`,
    `In the restaurant there are ${getRestaurantsById(restaurant).playersNum} players`,
    'empty',
    `You currently have ${lastEntered.points} points`,
    `The email connected to your account is ${lastEntered.email}`
];

createList(infoList, infoArr);



/* stats div */
const allUsers = getUsersFromLocalStorage();
const sameRestaurant = getUsersInTheSameRestaurant(lastEntered.userId % 2);

//a function that gets the current player's rank out of an array of players
const topPlayers = players => {
    if (players.length === 0) {
        return 0;
    }
    players.sort((a, b) => b.points - a.points);
    const currentRank = players.findIndex(player => player.points >= lastEntered.points) - 1;
    const rank = ((1 + currentRank) / players.length) * 100;
    return rank;
}

const statsList = document.getElementById('stats-list');

const statsArr = [
    `You are in the top ${topPlayers(allUsers)}% players`,
    `You are in the top ${topPlayers(sameRestaurant)}% players from your restaurant`,
    'empty'
];

const difference = getRestaurantsById(restaurant).score - getRestaurantsById(otherRestaurant).score;

if (difference > 0) {
    statsArr.push(`Your restaurant is leading by ${difference} points`);
}
else if (difference < 0) {
    statsArr.push(`Other restaurant is leading by ${Math.abs(difference)} points`);
}
else {
    statsArr.push(`There is a tie between the restaurants`);
}

createList(statsList, statsArr);

/* change password div */

const changePasswordBtn = document.getElementById("change-password-btn");

const oldPassword = document.getElementById("old-password");
const confirmOldPassword = document.getElementById("confirm-old-password");
const newPassword = document.getElementById("new-password");
const confirmNewPassword = document.getElementById("confirm-new-password");

let saveOldPassword = '';
let saveConfirmOldPassword = '';
let saveNewPassword = '';
let saveConfirmNewPassword = '';

const arrOfInputs = [
    {
        value: oldPassword,
        save: saveOldPassword
    },
    {
        value: confirmOldPassword,
        save: saveConfirmOldPassword
    },
    {
        value: newPassword,
        save: saveNewPassword
    },
    {
        value: confirmNewPassword,
        save: saveConfirmNewPassword
    }
];


for (let i = 0; i < arrOfInputs.length; i++) {
    const current = arrOfInputs[i];
    (current.value).addEventListener('input', function () {
        current.save = (current.value).value;
        console.log(current.save);
    });
}


const changePassword = () => {
    console.log(isValidPassword(newPassword.value));
    if (oldPassword.value !== confirmOldPassword.value) {
        alert('You need to confirm your old password');
        return false;
    }
    if (newPassword.value !== confirmNewPassword.value) {
        alert('You need to confirm your new password');
        return false;
    }
    if (!isValidPassword(newPassword.value)) {
        alert('Your new password is not valid');
        return false;
    }
    updateValueOnUser(lastEntered.userId, 'password', newPassword.value);
    const username = lastEntered.username;
    localStorage.removeItem('lastEntered');
    const user = getUserByUsername(username);
    localStorage.setItem('lastEntered', user);
    location.reload();
    return true;
}

changePasswordBtn.addEventListener('click', function (event) {
    event.preventDefault();
    changePassword();
});

/* send gift div */

const sendMoney = (amount, userToSendId) => {
    if (lastEntered.points < amount) {
        return false;
    }
    updateValueOnUser(lastEntered.userId, 'points', -amount);
    const last = JSON.parse(localStorage.getItem("lastEntered"));
    last.points -=amount;
    localStorage.setItem("lastEntered",JSON.stringify(last));

    updateValueOnUser(userToSendId, 'money', amount / 10);
    return true;
}
const giftOption = () => {
    const user = JSON.parse(localStorage.getItem("lastEntered"));
    const restaurant = getRestaurantsById(user.userId % 2);
    if (restaurant.playersNum <= 1) {
        document.getElementById("gift-div").classList.add("hidden");
        return;
    }
    const friendSelector = document.getElementById("friend-selector");
    // Loop through the array and create options
    getUsersFromLocalStorage().forEach(curentUser => {
        if (user.userId % 2 === curentUser.userId % 2 && user.username !== curentUser.username) {
            const option = document.createElement("option");
            option.value = curentUser.userId;
            option.textContent = curentUser.username;
            friendSelector.appendChild(option);
        }
    });
    const giftBtn = document.getElementById("gift-btn");
    giftBtn.addEventListener('click', function (event) {
        event.preventDefault();
        const amount = document.getElementById("amount-point");
        const select = document.getElementById("friend-selector");
        if(sendMoney(amount.value, select.value)){
            alert("Teh gift sent");
            amount.value="";
            select.value="";
        }

    })

}
giftOption();

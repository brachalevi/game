// Regular expression to validate email
// in the format hilma345@somthing.something
const regexEmail = /[a-zA-Z]+[0-9]*@[a-zA-Z]+\.[a-z]+[a-z]+/;

// Regular expression to validate passwords
// - Length of 8
// - Contains at least one uppercase letter, one lowercase letter, and one digit
const regexPassword = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])^([A-Za-z0-9]{8})$/;

// Function to check if a password is valid
const isValidPassword = password => regexPassword.test(password);

// Function to check if an email is valid
const isValidEmail = email => regexEmail.test(email);

// Function to retrieve user data from local storage
const getUsersFromLocalStorage = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
}

// Function to save the users to local storage
const saveUsersToLocalStorage = users => {
    localStorage.setItem('users', JSON.stringify(users));
}

let userId;

//adding a new user to users array in local storage
const addUserToLocalStorage = (username, password, email) => {
    let userId;
    if (getUsersFromLocalStorage().length === 0) { //no users yet
        userId = 1; //the first user
    }
    else {
        userId = getUsersFromLocalStorage().pop().userId + 1; //the last user id +1
    }

    //building a new user object
    const user = {
        username: username,
        password: password,
        email: email,
        points: 0,
        active: true,
        userId: userId,
        money: 0
    };

    const users = getUsersFromLocalStorage(); //the array of all users in local storage
    users.push(user); //add new user to the array
    saveUsersToLocalStorage(users); //save to local storage
}

//getting the user object by his username
const getUserByUsername = username => {
    let users = getUsersFromLocalStorage();
    if (users == []) {
        return -1;
    }
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return users[i];
        }
    }
    //the user is not found
    return -1;
}

const getUsersInTheSameRestaurant = (id) => {
    const sameRestaurant = [];
    const allUsers = getUsersFromLocalStorage();
    for (let i = (id % 2-1); i < allUsers.length; i += 2) {
        sameRestaurant.push(allUsers[i]);
    }
    return sameRestaurant;
}

const logout = () => {
    let users = getUsersFromLocalStorage();
    let user = JSON.parse(localStorage.getItem("lastEntered"));
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === user.username) {
            users[i].active = false;
            saveUsersToLocalStorage(users);
            localStorage.removeItem("lastEntered");
            location.href = '../html/homePage.html';
        }
    }
}

//updating a value to a key on user with user id of id
const updateValueOnUser = (id, key, value) => {
    const users = getUsersFromLocalStorage();
    if (id < 1 || id > users.length) { //not a valid id
        return;
    }
    const user = users[id - 1]; //get the user object from the users array
    for (let property in user) {
        if (user.hasOwnProperty(property) && property === key) { //find key property
            user[property] = value; //change its value
        }
    }
    users[id - 1] = user; //update user
    saveUsersToLocalStorage(users); //save to local storage
}

//adding an amount to an user's score
const addToUserPoints = (id, amount) => {
    const users = getUsersFromLocalStorage();
    if (id < 1 || id > users.length) { //not a valid id
        return;
    }
    const user = users[id - 1]; //get the user object from the users array
    for (let property in user) {
        if (user.hasOwnProperty(property) && property === 'points') { //find 'points' key
            user[property] += amount; //add to the previous amount
        }
    }
    users[id - 1] = user; //update in the array
    saveUsersToLocalStorage(users); //save to local storage
}
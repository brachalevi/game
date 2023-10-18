// email with letters/numbers that ends with .com/.org/.net
// in the format hilma345@somthing.com
const regexEmail = /[a-zA-Z]+[0-9]*@[a-zA-Z]+\.[a-z]+[a-z]+/;

// Regular expression to validate passwords:
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

const saveUsersToLocalStorage = users => {
    localStorage.setItem('users', JSON.stringify(users));
}

let userId;
const addUserToLocalStorage = (username, password, email) => {
    let userId;
    if (getUsersFromLocalStorage().length === 0) {
        userId = 1; //! Where const/let and why you declere it again without use it inside the else 
    }
    else {
        userId = getUsersFromLocalStorage().pop().userId + 1;
    }

    //updateValue(userId%2, playersNum, Math.ceil(userId/2));
    //! Do a declaration here, read about it, its really cool (;
    const user = {
        username: username,
        password: password,
        email: email,
        points: 0,
        active: false,
        userId: userId,
        money: 0
    };
    const users = getUsersFromLocalStorage();
    users.push(user);
    saveUsersToLocalStorage(users);
}

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
    /*the user not found*/
    /*the user not found*/
    //! Change it to false
    return -1;
}

const getUsersInTheSameRestaurant = (id) => {
    const sameRestaurant = [];
    const allUsers = getUsersFromLocalStorage();
    for (let i = id; i < allUsers.length; i++) {
        sameRestaurant.push(allUsers[i]);
    }
    return sameRestaurant;
}

const logout=()=>{
    let users = getUsersFromLocalStorage();
    let user = JSON.parse(localStorage.getItem("lastEntered"));
    for (let i = 0; i < users.length; i++) {
        if(users[i].username === user.username){
            users[i].active = false;
            saveUsersToLocalStorage(users);
            localStorage.removeItem("lastEntered");
            location.href='../html/homePage.html';
        }
    }
}

//updating a value to a key on user with user id of id
const updateValueOnUser = (id, key, value) => {  
    const users=getUsersFromLocalStorage();  
    if (id<1 || id>users.length){
        return;
    }
    const user=users[id-1];
    for (let property in user) {
        if (user.hasOwnProperty(property) && property === key) {
            user[property] = value;
        }
    }
    users[id-1]=user;
    saveUsersToLocalStorage(users);
}
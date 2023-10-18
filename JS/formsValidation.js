// email with letters/numbers that ends with .com/.org/.net
// in the format hilma345@somthing.com
const regexEmail = /[a-zA-Z]+[0-9]*@[a-zA-Z]+\.(com|org|net)/;

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
    if (getUsersFromLocalStorage().length === 0) {
        userId = 1; 
    }
    else {
        userId = getUsersFromLocalStorage().pop().userId + 1;
    }
    //! Do a declaration here, read about it, its really cool (;
    const user = {
        username: username,
        password: password,
        email: email,
        points: 0,
        active: true,
        userId: userId
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
    //! Change it to false
    return -1;
}
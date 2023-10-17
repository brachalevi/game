
const regexEmail = /[a-zA-Z]+[0-9]*@[a-zA-Z]+\.(com|org|net)/;
// email with letters/numbers that ends with .com/.org/.net
// in the format hilma345@somthing.com

const regexPassword = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])^([A-Za-z0-9]{8})$/;
// length of 8, contains at least one digit, one lowercase letter
// and one uppercase letter
let failedLoginAttempts = 1;

const isValidPassword = password => regexPassword.test(password); //checks if password is valid
const isValidEmail = email => regexEmail.test(email); //checks if email is valid
const getUsersFromLocalStorage = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
}
const saveUsersToLocalStorage = users => {
    localStorage.setItem('users', JSON.stringify(users));
}
const addUserToLocalStorage = (username, password, email) => {
    const user = {
        username: username,
        password: password,
        email: email,
        points: 0
    };
    const users = getUsersFromLocalStorage();
    users.push(user);
    saveUsersToLocalStorage(users);
    //console.log(JSON.parse(getUsersFromLocalStorage("users")));
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
    return -1;
}
const viledRegister = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const repeatePassword = document.getElementById('repeate-password').value;
    const email = document.getElementById('email').value;


    if (username === "" || password === "" || repeatePassword === "" || email === "") {
        alert("Please fill in all fields");
        return;
    }
    /*if the user found*/
    if (getUserByUsername(username) !== -1) {
        alert("The username already exists in the system");
        return;
    }
    /*if isnt legal userName*/
    if (false) {
        /*chack the error*/
        alert("The username ilegel");
        return;
    }
    if (!isValidPassword(password)) {
        /*chack the error*/
        alert("error-ilegel pasword");
        return;
    }
    /*the pasword and the repet not the same*/
    if (password !== repeatePassword) {
        alert("error-The password and the repeat password isn't the same");
        return;
    }
    if (!isValidEmail(email)) {
        alert("error-ilegal email");
        return;
    }
    addUserToLocalStorage(username, password, email);
    alert("User registered successfully");
    window.location.href = "../html/login.html";

}


const viledLogin = () => {
    const username = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;
    /*if the user is not found*/
    const user = getUserByUsername(username);
    if (user === -1) {
        alert("The username is not exists in the system");
        return;
    }
    if (password !== user.password) {
        failedLoginAttempts++;
        if (failedLoginAttempts >= 3) {
            alert("You have exceeded the maximum login attempts. Please try again in 5 seconds.");
            setTimeout(() => {
                failedLoginAttempts = 0; // Reset the login attempts counter after the delay
            }, 5000); // 5000 milliseconds = 5 seconds
        } else {
            alert("Error: Wrong password");
        }
        return;
    }
    window.location.href = "../html/startGame.html";
}







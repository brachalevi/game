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
const addUserToLocalStorage = (username, password, email) => {
    if(getUsersFromLocalStorage().length === 0){
        userId = 1; //! Where const/let and why you declere it again without use it inside the else 
    }
    else{
        let userId = getUsersFromLocalStorage().pop().userId+1;
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
    const user=getUserByUsername(username);
    localStorage.removeItem('lastEntered');
    localStorage.setItem('lastEntered', JSON.stringify(user));
    location.href = "../html/login.html";

}


const viledLogin = () => {
    const username = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;
    /*if the user is not found*/
    const user = getUserByUsername(username);
    if (user === -1) {
        alert("The username is not exists in the system"); //! Pay attention to not give the user specific errors like those. This can be useful for hackers  
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
    localStorage.removeItem('lastEntered');
    localStorage.setItem('lastEntered', JSON.stringify(user));

    setTimeout(function(){
        location.href = "../html/startGame.html";
    }, 2000);
}


const findActiveUser = () => {
    const users = getUsersFromLocalStorage();
    for (let i = 0; i < users.length; i++) {
        if (users[i].active) {
            return users[i];
        }
    }
}

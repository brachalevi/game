let inputUsername = document.getElementById("login-username");
let saveInputUsername = '';
inputUsername.addEventListener('input', function () {
    inputUsername = document.getElementById("login-username");
    saveInputUsername = inputUsername.value;
});

let inputPassword = document.getElementById("login-password");
let saveInputPassword = '';
inputPassword.addEventListener('input', function () {
    inputPassword = document.getElementById("login-password");
    saveInputPassword = inputPassword.value;
});

const validLogin = (username, password) => {
    /*if the user is not found*/
    const user = getUserByUsername(username);
    if (user === -1) {
        alert("User does not exist"); //! Pay attention to not give the user specific errors like those. This can be useful for hackers  
        return false;
    }
    if (password !== user.password) {
        alert("Wrong password");
        return false;
    }
    /*add change to users*/
    updateValueOnUser(user, 'active', true);
    localStorage.removeItem('lastEntered');
    localStorage.setItem('lastEntered', JSON.stringify(user));
    return true;
}

const loginBtn = document.getElementById("send-login-btn");

loginBtn.addEventListener('click', function (event) {
    event.preventDefault();
    if (validLogin(saveInputUsername, saveInputPassword)) {
        location.href = './startGame.html';
    }
});
const validRegister = () => {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const repeatePassword = document.getElementById("register-confirm-password").value;
    const email = document.getElementById("register-email").value;


    if (username === "" || password === "" || repeatePassword === "" || email === "") {
        alert("Please fill in all fields");
        return false;
    }
    /*if the user found*/
    if (getUserByUsername(username) !== -1) {
        alert("Username is taken, please choose another one");
        return false;
    }
    if (!isValidPassword(password)) {
        /*chack the error*/
        alert("Password is not valid");
        return false;
    }
    /*the pasword and the repet not the same*/
    if (password !== repeatePassword) {
        alert("Please confirm your password");
        return false;
    }
    if (!isValidEmail(email)) {
        alert("Email is not valid");
        return false;
    }
    addUserToLocalStorage(username, password, email);
    const user = getUserByUsername(username);
    const userId = user.userId;
    addPlayer(userId % 2);
    localStorage.removeItem('lastEntered');
    localStorage.setItem('lastEntered', JSON.stringify(user));
    alert("User has successfullyregistered ");
    return true;
}

const registerBtn = document.getElementById("send-register-btn");

registerBtn.addEventListener('click', function (event) {
    event.preventDefault();
    if (validRegister()) {
        location.href = "../html/startGame.html";
    }
});
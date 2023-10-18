const validRegister = () => {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const repeatePassword = document.getElementById("register-confirm-password").value;
    const email = document.getElementById("register-email").value;


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
    const user = getUserByUsername(username);
    const userId = user.userId;
    addPlayer(userId % 2);
    localStorage.removeItem('lastEntered');
    localStorage.setItem('lastEntered', JSON.stringify(user));
    // alert("User registered successfully");
}

const registerBtn = document.getElementById("send-register-btn");

registerBtn.addEventListener('click', validRegister);
registerBtn.addEventListener('click', function(){
    location.href = "../html/startGame.html";
});
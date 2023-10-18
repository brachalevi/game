let inputUsername=document.getElementById("login-username");
let saveInputUsername='';
inputUsername.addEventListener('input', function(){
    inputUsername=document.getElementById("login-username");
    saveInputUsername=inputUsername.value;
    console.log(saveInputUsername);
});

let inputPassword=document.getElementById("login-password");
let saveInputPassword='';
inputPassword.addEventListener('input', function(){
    inputPassword=document.getElementById("login-password");
    saveInputPassword=inputPassword.value;
    console.log(saveInputPassword);
});

const validLogin = (username, password) => {
    /*if the user is not found*/
    const user = getUserByUsername(username);
    if (user === -1) {
        alert("The username is not exists in the system"); //! Pay attention to not give the user specific errors like those. This can be useful for hackers  
        return false;
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
        return false;
    }
    localStorage.removeItem('lastEntered');
    localStorage.setItem('lastEntered', JSON.stringify(user));
    return true;
}

const loginBtn=document.getElementById("send-login-btn");

loginBtn.addEventListener('click', function(){
    if (validLogin(saveInputUsername, saveInputPassword)){
        location.href = './startGame.html';
    }
});
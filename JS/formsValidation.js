const regexEmail = /[a-zA-Z]+[0-9]*@[a-zA-Z]+\.(com|org|net)/;
// email with letters/numbers that ends with .com/.org/.net
// in the format hilma345@somthing.com

const regexPassword = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])^([A-Za-z0-9]{8})$/;
// length of 8, contains at least one digit, one lowercase letter
// and one uppercase letter

const isValidPassword=password=>regexPassword.test(password); //checks if password is valid
const isValidEmail=email=>regexEmail.test(email); //checks if email is valid
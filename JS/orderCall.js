const timerDisplay = document.getElementById('timer');
const currentOrders = [
    document.getElementById("order1-text"),
    document.getElementById("order2-text"),
    document.getElementById("order3-text")
]; //the paragraph element to put the order detailes into

let timeLeft = 90; //timer starts at 90 seconds
//need to add an option of choosing the game length
let timer;

//! Pay attention to indentation and ctrl + shift + i

/*this function will start the timer and call to fill 3 orders*/
function startGame(){
  //will happen every 1 second
  timer = setInterval(function () {
      timeLeft--;
      timerDisplay.textContent = timeLeft + ' seconds';
  
      if (timeLeft === 0) {
        stopTimer();
        location.href='../html/gameOver.html';
      }
    }, 1000); 

    //filling the first 3 orders one by one
    setTimeout(function () {
        document.getElementById('order1-div').classList.remove('not-visable'); //showing the order div
        fillOrder(currentOrders[0]); //showing the order text
    }, 1000); //after 1 second

    setTimeout(function () {
        document.getElementById('order2-div').classList.remove('not-visable');
        fillOrder(currentOrders[1]);
    }, 5000); //after 5 seconds

    setTimeout(function () {
        document.getElementById('order3-div').classList.remove('not-visable');
        fillOrder(currentOrders[2]);
    }, 8000); //after 8 seconds
}

//stop the timer
function stopTimer() {
    clearInterval(timer);
}


//! If each of those functions conation just one line do just one function

/*put a new random order in placeAvaliable after a given delay-still not finish*/
function fillOrder(placeAvaliable){
  const rndBurger=order_bank[Math.floor(order_bank.length*Math.random())];
  // const strForOrder=stringOrder(rndBurger);
  listOfItems(rndBurger, placeAvaliable);
  // placeAvaliable.textContent = strForOrder; //the text in the available order
}

const listOfItems=(order, place)=>{
  const burgerInfo=order.burger;
  const burgerPrice=order.price;

  let list=document.createElement('ul');
  list.style.listStyleType='none';

  for (let i = burgerInfo.length-1; i>=0; i--) { //starting from the end to the start
    let current=''; //the current ingredient
    for (let j=0; j<burgerInfo[i].length; j++){ //going through each char
      if (burgerInfo[i][j]==='-'){ 
        current+=' '; //replacing '-' with a space
      }
      else{
        current+=burgerInfo[i][j]; //adding the char
      }
    }
    const item=document.createElement('li'); //creating new list-item
    item.textContent = `- ${current}`; //with the value of current ingredient
    list.appendChild(item); //adding to the list
  }

  //empty line in-between
  const empty = document.createElement('li');
  empty.textContent='empty line';
  empty.style.visibility='hidden';
  empty.style.fontSize='8px';
  list.appendChild(empty);

  //the money that will be earned from this order
  const price = document.createElement('li');
  price.style.textDecoration='underline';
  price.textContent=`$${burgerPrice}`; //the price of the burger
  list.appendChild(price);

  place.appendChild(list); //appending the list to the avaliable order
}

startGame();

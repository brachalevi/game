const placesForOrders = [
  document.getElementById("order1-text"),
  document.getElementById("order2-text"),
  document.getElementById("order3-text")
]; //the paragraph element to put the order detailes into

const currentOrders = [];

/*put a new random order in placeAvaliable*/
function fillOrder(placeAvaliable) {
  const rndBurger = order_bank[Math.floor(order_bank.length * Math.random())];
  const placeIndex = (placeAvaliable.id).substring(5, 6);
  currentOrders[placeIndex - 1] = rndBurger;
  const listId = 'list-of-items' + placeIndex;
  const last = document.getElementById(listId);
  if (last !== null) {
    last.remove();
  }
  listOfItems(rndBurger, placeAvaliable);
}

const listOfItems = (order, place) => {

  const burgerInfo = order.burger;
  const burgerPrice = order.price;

  const placeIndex = (place.id).substring(5, 6);

  let list = document.createElement('ul');
  list.id = 'list-of-items' + placeIndex;
  list.style.listStyleType = 'none';

  for (let i = burgerInfo.length - 1; i >= 0; i--) { //starting from the end to the start
    let current = ''; //the current ingredient
    for (let j = 0; j < burgerInfo[i].length; j++) { //going through each char
      if (burgerInfo[i][j] === '-') {
        current += ' '; //replacing '-' with a space
      }
      else {
        current += burgerInfo[i][j]; //adding the char
      }
    }
    const item = document.createElement('li'); //creating new list-item
    item.textContent = `- ${current}`; //with the value of current ingredient
    list.appendChild(item); //adding to the list
  }

  //empty line in-between
  const empty = document.createElement('li');
  empty.textContent = 'empty line';
  empty.style.visibility = 'hidden';
  empty.style.fontSize = '8px';
  list.appendChild(empty);

  //the money that will be earned from this order
  const price = document.createElement('li');
  price.style.textDecoration = 'underline';
  price.textContent = `$${burgerPrice}`; //the price of the burger
  list.appendChild(price);

  place.appendChild(list); //appending the list to the avaliable order
}
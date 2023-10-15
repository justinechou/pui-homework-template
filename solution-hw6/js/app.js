//setting Roll constructor class to update and print
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}
//creating object to show price for glazing
let glazingObj= {
    "Keep Original": {glazePrice: 0},
    "Sugar Milk": {glazePrice: 0}, 
    "Vanilla Milk": {glazePrice: 0.5},
    "Double Chocolate": {glazePrice: 1.5}
}

//creating object to show price for pack size
let packObj= {
    1: {packPrice: 1},
    3: {packPrice: 3}, 
    6: {packPrice: 5},
    12: {packPrice: 10}
}

//creating set for the cart
// const cart = new Set();

let shoppingCart = [];
let totalPrice = 0;

if (sessionStorage.getItem('storedItems') != null) {
    retrieveFromLocalStorage(); 
}

for(let product of shoppingCart){
    createElement(product);
}
displayTotalPrice();

function createElement(newItem) {
    // make a clone of the cart template
    const template = document.querySelector('#cart-template');
    const clone = template.content.cloneNode(true);
    
    // connect this clone to our newItem.element to refer it to it as newItem.element
    newItem.element = clone.querySelector('.cart-item');
  
    const btnRemove = newItem.element.querySelector('#remove'); //references remove button
    //console.log(btnDelete);
    btnRemove.addEventListener('click', () => {
        remove(newItem);
    });
    
    // add the newItem clone to the DOM
    // find the newItem parent ('.cart-body') and add our notecard as its child
    const cartListElement = document.querySelector('.cart-body');
    cartListElement.prepend(newItem.element);
    
    // populate the newItem clone with the actual newItem content
    updateElement(newItem);
  }

function updateElement(newItem) {
// get the HTML elements that need updating
const cartImageElement = newItem.element.querySelector('.cart-img');
const cartTypeElement = newItem.element.querySelector('.item-type');
const cartGlazingElement = newItem.element.querySelector('.item-glazing');
const cartPackElement = newItem.element.querySelector('.item-pack');
const cartPriceElement = newItem.element.querySelector('#cart-item-price');

// copy our newItem content over to the corresponding HTML elements
let itemLower = newItem.type.toLowerCase();
cartImageElement.src = '../assets/products/' + newItem.type.toLowerCase() +"-cinnamon-roll.jpg";
cartTypeElement.innerText = newItem.type + " Cinnamon Roll";
cartGlazingElement.innerText = newItem.glazing;
cartPackElement.innerText = "Pack Size: " + newItem.size;
console.log(newItem.basePrice);
console.log(glazingObj[newItem.glazing].glazePrice);
console.log(packObj[newItem.size].packPrice);
let tempPrice = (newItem.basePrice + glazingObj[newItem.glazing].glazePrice) * packObj[newItem.size].packPrice;
totalPrice += tempPrice;
cartPriceElement.innerText = "$ " + String((tempPrice).toFixed(2)); //calculates price based off selected roll, glazing, and pack
displayTotalPrice(); //gets total value
}



function remove(newItem) {
// remove the newItem DOM object from the UI
newItem.element.remove();
// remove the actual newItem object from cart set
shoppingCart.splice(shoppingCart.indexOf(newItem),1);
saveToLocalStorage();//updates cart when removing
let tempPrice = (newItem.basePrice + glazingObj[newItem.glazing].glazePrice) * packObj[newItem.size].packPrice;
totalPrice -= tempPrice; // recalculates total cart price after removing element 
displayTotalPrice(); //displays current price
}

//calculates total price of all cart items 
function displayTotalPrice(){
    let total = document.querySelector('#total-price'); 
    total.innerText = "$ " + (Math.abs(totalPrice).toFixed(2));

}
//saves current cart
function saveToLocalStorage() {
    const cartArrayString = JSON.stringify(shoppingCart);
    console.log(cartArrayString);
  
    sessionStorage.setItem('storedItems', cartArrayString);
  }

//saves retreives cart
function retrieveFromLocalStorage() {
    const cartArrayString = sessionStorage.getItem('storedItems');
    const cartArray = JSON.parse(cartArrayString);
    for(let item of  cartArray){
        shoppingCart.push(item);
    }
    console.log(cartArrayString);
}

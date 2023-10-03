import { rolls } from "./rollData.js"; //importing rolls dataset from rollData.js

//setting Roll constructor class to update and print
class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.rollPrice = rollPrice;

        this.element = null;
    }
}
//creating object to show price for glazing
let glazingObj= {
    "Keep original": {glazePrice: 0},
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
const cart = new Set();

function addCartItem(rollType, rollGlazing, packSize, rollPrice) {
    const newItem =  new Roll(rollType, rollGlazing, packSize, rollPrice); //creates new roll item 
    cart.add(newItem); // adds new item to the cart set
    createElement(newItem); // creates element to display on html 
    calculateTotal(); //gets total value
    //return newItem;
}

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
const cartPriceElement = newItem.element.querySelector('.item-price');

// copy our newItem content over to the corresponding HTML elements
let itemLower = newItem.type.toLowerCase();
cartImageElement.src = '../assets/products/' + newItem.type.toLowerCase() +"-cinnamon-roll.jpg";
cartTypeElement.innerText = newItem.type + " Cinnamon Roll";
cartGlazingElement.innerText = newItem.glazing;
cartPackElement.innerText = "Pack Size: " + newItem.size;
cartPriceElement.innerText = "$ " + String(((newItem.rollPrice + glazingObj[newItem.glazing].glazePrice) * packObj[newItem.size].packPrice).toFixed(2)); //calculates price based off selected roll, glazing, and pack
}

function remove(newItem) {
// remove the newItem DOM object from the UI
newItem.element.remove();
// remove the actual newItem object from cart set
cart.delete(newItem);
//console.log(cart);
calculateTotal(); // recalculates total cart price after removing element 
}
  
//defining content for cart items
const itemOne = addCartItem(
    "Apple",
    "Keep original",
    3, 
    rolls["Apple"].basePrice
  );

const itemTwo = addCartItem(
    "Raisin",
    "Sugar Milk",
    3, 
    rolls["Raisin"].basePrice
);

const itemThree = addCartItem(
    "Walnut",
    "Vanilla Milk",
    12, 
    rolls["Walnut"].basePrice
);

const itemFour = addCartItem(
    "Original",
    "Sugar Milk",
    1, 
    rolls["Original"].basePrice
);

//calculates total price of all cart items 
function calculateTotal(){
    let totalPrice = 0;

    // Iterate through the cart items and add their prices to the total
    for (const newItem of cart) {
        const cartPriceElement = newItem.element.querySelector('.item-price');
        const priceText = cartPriceElement.innerText;
        
        // concert price from string to float and remove $ for calcualtion 
        const itemPrice = parseFloat(priceText.replace('$', ''));
        
        // Add the item price to the total
        totalPrice += itemPrice;
    }
    //updates total price html element
    let total = document.querySelector('#total-price'); 
    total.innerText = "$ " + String(totalPrice.toFixed(2));

}

//updating URL based on what type of roll is selected
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");

//updating header for each page based on what type of roll is selected
const headerElement = document.querySelector('#header-subtitle');
headerElement.innerHTML = rollType + " Cinnamon Roll";

//updating image for each page based on what type of roll is selected
const rollImg = document.querySelector('#image-detail');
rollImg.src = '../assets/products/' + rolls[rollType].imageFile;

let shoppingCart = [];

//setting product object
let Product = {name: "Keep Original", baseprice: rolls[rollType].basePrice, glazingPrice: 0, packingPrice: 1, packingSize: 1};

//setting Roll constructor class to update and print
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
};
//adds all cart items into the cart and print cart to the console
function addingToCart(){
    const cartItem = new Roll(rollType, Product.name, Product.packingSize, rolls[rollType].basePrice); 
    shoppingCart.push(cartItem);
    saveToLocalStorage(); 
    //console.log(shoppingCart);
}

//setting options 
let glazingOptions = ["Keep Original", "Sugar Milk", "Vanilla Milk", "Double Chocolate"];
let glazingPrices = [0,0,0.50,1.50];
let packOptions = ["1","3","6","12"];
let packPrices = [1,3,5,10];

//getting the selectors
let glazingSelect = document.querySelector("#glazingSelection");
let pricingSelect = document.querySelector("#packSelection");
let addToCart = document.querySelector(".add-button");
let updatedPrice = document.querySelector("#price");

updatedPrice.innerHTML = "$" + String(rolls[rollType].basePrice); //Updating default price to default price

//looping through glazing arrays create options in the selector, displaying its name and price adjustment
for (var i = 0; i < glazingOptions.length; i++) {
    const glazeOption = document.createElement("option");
    glazeOption.innerHTML = glazingOptions[i];
    glazeOption.value = glazingPrices[i];
    glazingSelect.add(glazeOption);
}

//looping through packing arrays create options in the selector, displaying its pack size and price adjustment
for (var i = 0; i < packOptions.length; i++) {
    const packOption = document.createElement("option");
    packOption.innerHTML = packOptions[i];
    packOption.value = packPrices[i];
    pricingSelect.add(packOption);
}

//getting what user selected on glazing dropdown, updating product object with selected information
function selectionGlazingChange(){
    const glazingname = glazingSelect.options[glazingSelect.selectedIndex].text;
    const glazingprice = parseFloat(this.value);
    Product.glazingPrice = glazingprice; 
    Product.name = glazingname;
    displayPrice();
}

//getting what user selected on price dropdown, updating product object with selected information
function selectionPricingChange(){
    const packSize = pricingSelect.options[pricingSelect.selectedIndex].text;
    const packPrice = parseInt(this.value);
    Product.packingPrice = packPrice;
    Product.packingSize = packSize;
    displayPrice();
}

//calculating price 
function calculatePrice(Product){
    let total = ((Product.baseprice + Product.glazingPrice) * Product.packingPrice).toFixed(2);
    return total;
}
//displaying price 
function displayPrice(){
    updatedPrice.innerHTML = "$"+calculatePrice(Product);
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
if (sessionStorage.getItem('storedItems') != null) {
    retrieveFromLocalStorage(); 
}
 

//listening to when dropdown changes
glazingSelect.addEventListener('change',selectionGlazingChange);
pricingSelect.addEventListener('change',selectionPricingChange);
//calls function to add to cart when button is clicked
addToCart.addEventListener('click',addingToCart);
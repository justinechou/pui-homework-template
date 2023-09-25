//setting product object
let Product = {name: "Original cinnamon roll", baseprice: 2.49, glazingPrice: 0, packSize: 1};

let glazingOptions = ["Keep Original", "Sugar milk", "Vanilla milk", "Double Chocolate"];
let glazingPrices = [0,0,0.50,1.50];
let packOptions = [1,3,6,12];
let packPrices = [1,3,5,10];

//getting the selectors
let glazingSelect = document.querySelector("#glazingSelection");
let pricingSelect = document.querySelector("#packSelection");

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
    const glazingprice = parseFloat(this.value);
    Product.glazingPrice = glazingprice; 
    displayPrice();
}

//getting what user selected on price dropdown, updating product object with selected information
function selectionPricingChange(){
    const packingSize = parseInt(this.value);
    Product.packSize = packingSize;
    displayPrice();
}

//calculating price 
function calculatePrice(Product){
    let total = ((Product.baseprice + Product.glazingPrice) * Product.packSize).toFixed(2);
    return total;
}
//displaying price 
function displayPrice(){
    let updatedPrice = document.querySelector("#price");
    updatedPrice.innerHTML = "$ "+calculatePrice(Product);
}
//listening to when dropdown changes
glazingSelect.addEventListener('change',selectionGlazingChange);
pricingSelect.addEventListener('change',selectionPricingChange);
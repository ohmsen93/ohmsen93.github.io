// Require and instantiate the classes
import Bank from './Bank.js';
const bankInstance = new Bank(100, 0, 0);

import Work from './Work.js';
const workInstance = new Work(0, 100, bankInstance);

import Laptops from './Laptops.js';
const laptopsInstance = new Laptops('https://hickory-quilled-actress.glitch.me/', bankInstance);

// Load DOM objects

const loadBalance = document.getElementById("balance");
const loadLoanBalance = document.getElementById("loanBalance");
const loadWorkBalance = document.getElementById("workBalance");
const repayLoanBtn = document.getElementById("repayLoanBtn");
const loanBtn = document.getElementById("loanBtn");
const workBtn = document.getElementById("workBtn");
const bankBtn = document.getElementById("bankBtn");
const laptopSelect = document.getElementById("laptopSelect");
const laptopFeatures = document.getElementById("laptopFeatures");
const productImg = document.getElementById("productImg");
const productTitle = document.getElementById("productTitle");
const productDesc = document.getElementById("productDesc");
const productPrice = document.getElementById("productPrice");
const productBtn = document.getElementById("productBtn");


// Here we write the function to populate our html objects with the values from our javascript
function loadPageValues() {

    // we access the banking values through the id on the different div's that we set in our dom section
    loadBalance.innerText = new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(bankInstance.getBalance());
    loadLoanBalance.innerText = new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(bankInstance.getLoanBalance());
    loadWorkBalance.innerText = new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(workInstance.getWorkBalance());
    repayLoanBtn.style.display = 'none';


    if (bankInstance.loanBalance < 0) {
        repayLoanBtn.style.display = 'block';

    }

}

function loadFeatures(id) {
    // Loads the first Laptop data to features
    let features = `<ul>`;

    const laptop = laptopsInstance.data[id];

    laptop.specs.forEach(element => {
        features += `<li><p>${element}</p></li>`;
    });

    productImg.src = laptopsInstance.apiUrl + laptop.image;
    productTitle.innerHTML = laptop.title;
    productDesc.innerHTML = laptop.description;
    productPrice.innerHTML = new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(laptop.price);

    features += `</ul>`;

    console.log(features);

    laptopFeatures.innerHTML = features;
}


function loanPrompt() {
    const value = prompt();

    if (isNaN(value)) {
        alert("A loan may only contain numbers.");
    } else {
        bankInstance.getLoan(bankInstance.getBalance(), parseInt(value));
    }
}


loadPageValues();


// Button Click events.
loanBtn.addEventListener("click", () => {
    loanPrompt();
    loadPageValues();
});
workBtn.addEventListener("click", () => {
    workInstance.work(100);
    loadPageValues();
});
bankBtn.addEventListener("click", () => {
    workInstance.bankTransfer();
    loadPageValues();
});
repayLoanBtn.addEventListener("click", () => {
    workInstance.loanTransfer();
    loadPageValues();
});


// laptop Api load
await laptopsInstance.laptopApi();

let laptopOptions = ``;

laptopsInstance.data.forEach(element => {
    laptopOptions += `<option value='${element.id - 1}'>${element.title}</option>`;
});

laptopSelect.innerHTML = laptopOptions;

//loads the features of the first laptop
loadFeatures(0);

// Loads the changed Laptop data to features based of selected options

laptopSelect.addEventListener("change", (event) => {
    loadFeatures(event.target.value);

}, false);


// purchase btn trigger
productBtn.addEventListener("click", (event) => {
    const id = laptopSelect.value;

    console.log("purchase start");
    laptopsInstance.laptopPurchase(id, bankInstance);
    loadPageValues();
});
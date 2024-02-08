const $ = document.querySelector.bind(document);
const buttonMenuOpen = $(".icon-mobile-menu");
const buttonCartOpen = $(".header-cart");

const buttonCartClose = $(".cart-header span");
const buttonShoppingCart = $(".header-userbag");
const allFoxes = $(".fox-items");

const productCards = $(".shopping-cards");
const cartEmpty = $(".shopping-cart-empty");

// SHOPPING CART-------------------------------------------------------------
// Working with the cart and adding items to the cart------------------------
let goods = [];

if (localStorage.getItem('goods')) {
    goods = JSON.parse(localStorage.getItem("goods"));
    goods.forEach((foxInfo) => renderProductCard(foxInfo));

    showEmptyStatus();
}

productCards.addEventListener("click", function (event) {
    event.preventDefault();

    const targetItem = event.target;
    let counter;

    // Check the clicks strictly on the buttons Plus/Minus
    if (targetItem.dataset.action === "plus" || targetItem.dataset.action === "minus") {
        const counterControl = targetItem.closest(".counter-control");
        counter = counterControl.querySelector("[data-counter]");
    }

    // Tracking button clicks Plus
    if (targetItem.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText;

        showGoodsNumber(event);
        showNumberItemsInTheCart();
    }

    // Tracking button clicks Minus
    if (targetItem.dataset.action === "minus") {
        // Checking that the counter is greater than 1
        if (parseInt(counter.innerText) > 1) {
            counter.innerText = --counter.innerText;

            showGoodsNumber(event);
            showNumberItemsInTheCart();
        } 
    }

    // Checking clicks on + or - in the cart
    if (targetItem.hasAttribute("data-action") && targetItem.closest('.shopping-cards')) {
        calcCartTotal();
    }

    localStorage.setItem("goods", JSON.stringify(goods));
});

// Show the quantity of goods using the Plus/Minus button in the cart
function showGoodsNumber(event) {
    const targetItem = event.target;

    const counterControl = targetItem.closest(".counter-control");
    let counter = counterControl.querySelector("[data-counter]");

    const productCard = targetItem.closest("[data-id]");
    const prodId = productCard.dataset.id;

    goods.filter(function (foxInfo) {
        if (foxInfo.id === prodId) {
            foxInfo.counter = counter.innerText;
        }
    });

}

export function addProductCard(event, productId) {
    event.preventDefault();

    const targetItem = event.target;
    const card = targetItem.closest(".fox-item");

    // Collecting data for this product
    const productInfo = {
        id: card.dataset.id,
        name: card.querySelector('.name').innerText,
        price: card.querySelector('.price span').innerText,
        photo: card.querySelector('.fox-media img').getAttribute('src'),
        counter: '1',
    }

    // Animation of the "Add" button on the product card
    allFoxes.onclick = function (event) {
        const buttonAdd = event.target.closest(".fox-item button");
        buttonAdd.classList.add("selected");
    }

    // Check if the same item is already in the cart
    const productCard = productCards.querySelector(`[data-id="${productInfo.id}"]`);

    // If the item is in the cart
    if (productCard) {
        const counterElement = productCard.querySelector("[data-counter]");
        counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
        productInfo.counter = counterElement.innerText;
        goods.push(productInfo);
    } else {
        // If the item is not in the cart
        renderProductCard(productInfo);
    }

    // Checking the product card for repeating by ID
    goods = goods.filter((foxInfo) => foxInfo.id !== productId.toString());

    goods.push(productInfo);

    localStorage.setItem("goods", JSON.stringify(goods));

    showEmptyStatus();

    calcCartTotal();

    showNumberItemsInTheCart();
}

function deleteProductCard(event, productId) {
    const parentNode = document.querySelector(`[data-id = '${productId}']`);

    // Delete a product card through array filtering
    goods = goods.filter((foxInfo) => foxInfo.id !== productId.toString());

    localStorage.setItem("goods", JSON.stringify(goods));

    // Remove a product card from the markup
    parentNode.remove();

    showEmptyStatus();

    calcCartTotal();

    showNumberItemsInTheCart();

    event.stopPropagation();
}

// Show cart status - Empty / Full
function showEmptyStatus() {
    cartEmpty.classList.remove("invisible");
    if (goods.length) cartEmpty.classList.add("invisible");
}

showBadge();

function showBadge() {
    const headerCart = document.querySelector(".header-cart");
    const cartQuantity = `<span class="cart-quantity"></span>`;
    headerCart.insertAdjacentHTML("beforeend", cartQuantity);
}

showNumberItemsInTheCart(); 

function showNumberItemsInTheCart() {
    const quantity = document.querySelector(".cart-quantity");
    const productList = document.querySelectorAll(".product-card");
    
    let counterAll = 0;

    productList.forEach( function (element) {
        const counters = element.querySelector("[data-counter]");
        counterAll += parseInt(counters.innerText);
    })
    quantity.innerText = counterAll;

    if (counterAll === 0) quantity.classList.add("invisible");
    if (counterAll > 0) quantity.classList.remove("invisible");
}

calcCartTotal();

// Calculate the total value of the cart
function calcCartTotal() {
    const productCards = document.querySelectorAll(".product-card");
    const totalPriceElementHTML = document.querySelector(".cart-footer p span");

    let totalPrice = 0;

    let currentPrice = 0;

    productCards.forEach(function (element) {
        const amountElement = element.querySelector("[data-counter]");
        const priceElement = element.querySelector("[data-price]");
        currentPrice = parseInt(amountElement.innerText) * parseInt(priceElement.innerText);
        totalPrice += currentPrice;
    });
    totalPriceElementHTML.innerText = totalPrice; 

    localStorage.setItem("goods", JSON.stringify(goods));
}

function renderProductCard(product) {
    const productCardInCartHTML = `
        <div class="product-card" data-id="${product.id}">
            <div class="product-cart-content">
                <img src="${product.photo}" alt="Image of a fox for sale">
                <div class="cart-info">
                    <p>${product.name}</p>
                    <p>$<span data-price>${product.price}</span></p>
                </div>
            </div>
            <div class="product-cart-control">
                <div class="counter-control">
                    <div data-action="minus">-</div>
                    <div data-counter>${product.counter}</div>
                    <div data-action="plus">+</div>
                </div>
                <button id="${product.id}" type="button">Remove<span></span></button>
            </div>
        </div> 
    `;
    productCards.insertAdjacentHTML("afterbegin", productCardInCartHTML);

    const buttons = productCards.querySelectorAll(".product-cart-control button");
    buttons.forEach((button) => {
        const id = button.id;
        button.addEventListener('click', (event) => deleteProductCard(event, id));
    })
}

// Hidden shopping cart----------------------------------------------------
buttonCartOpen.addEventListener("click", toggleShoppingCart);
buttonCartClose.addEventListener("click", toggleShoppingCart);

function toggleShoppingCart(e) {
    const targetElement = e.target;
    if (targetElement.closest(".header-cart,.cart-header span")) {
        document.documentElement.classList.toggle("cart-open");
        buttonShoppingCart.classList.toggle("visible");
    }
}

// HEADER--------------------------------------------------------------------
// Hidden navigation menu----------------------------------------------------
document.addEventListener("click", openMenu);

function openMenu(e) {
    const targetItem = e.target;
    if (targetItem.closest(".icon-mobile-menu,.menu-list li,.menu-list li span")) {
        document.documentElement.classList.toggle("menu-open");
        buttonMenuOpen.classList.toggle("invisible");
    }
}

// Active item in the navigation menu----------------------------------------
let ulList = document.querySelector(".menu-list");
let selectedLi;

ulList.onclick = function (event) {
    let li = event.target.closest(".menu-list li");
    if (!li) return;
    if (!ulList.contains(li)) return;
    active(li);
};

function active(li) {
    if (selectedLi) {
        selectedLi.classList.remove("active");
    }
    selectedLi = li;
    selectedLi.classList.add("active");
}
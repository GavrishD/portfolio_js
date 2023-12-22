const shoppingCards = $(".shopping-cards");
const cardCartEmpty = $(".shopping-cart-empty");


// Working with the cart and adding items to the cart------------------------
let foxes = [];
let price = [];

if (localStorage.getItem('foxes') && localStorage.getItem('price')) {
    foxes = JSON.parse(localStorage.getItem('foxes'));
    foxes.forEach( (foxInfo) => renderProductCard(foxInfo));

    price = JSON.parse(localStorage.getItem("price"));

    // Show cart status - Empty / Full
    toggleCartStatus();
}

// Add a wiretap to the list of goods that are in the cart "shoppingCards" - .shopping-cards
shoppingCards.addEventListener("click", function (event) {
    event.preventDefault();

    const targetItem = event.target;
    let counter;

    // We check the clicks strictly on the buttons Plus/Minus
    if (targetItem.dataset.action === "plus" || targetItem.dataset.action === "minus") {
        const counterControl = targetItem.closest(".counter-control");
        counter = counterControl.querySelector("[data-counter]");
    }

    // Tracking button clicks Plus
    if (targetItem.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText;

        // Show the quantity of goods using the Plus/Minus button in the cart (for LocalStorage)
        showQuantityOfGoods(event);
    }

    // Tracking button clicks Minus
    if (targetItem.dataset.action === "minus") {
        // Checking that the counter is greater than 1
        if (parseInt(counter.innerText) > 1) {
            counter.innerText = --counter.innerText;

            // Show the quantity of goods using the Plus/Minus button in the cart (for LocalStorage)
            showQuantityOfGoods(event);

            // Show cart status - Empty / Full
            toggleCartStatus();
        } 
    }

    // Checking clicks on + or - in the cart
    if (targetItem.hasAttribute("data-action") && targetItem.closest('.shopping-cards')) {
        // Calculate the total value of the cart
        calcCartPrice();
    }

    saveToLocalStorage();
});

// Show the quantity of goods using the Plus/Minus button in the cart (for LocalStorage)
function showQuantityOfGoods(event) {
    const targetItem = event.target;

    const counterControl = targetItem.closest(".counter-control");
    let counter = counterControl.querySelector("[data-counter]");

    const productCard = targetItem.closest("[data-id]");
    const prodId = productCard.dataset.id;
    const productData = Object.assign(foxes);

    productData.filter(function (foxInfo) {
        if (foxInfo.id === prodId) {
            foxInfo.counter = counter.innerText;
        }
    });

    foxes = productData;
}

function addProductCard(event, productId) {
    event.preventDefault();

    const targetItem = event.target;
    const card = targetItem.closest(".fox-items a");

    // Collecting data for this product
    const productInfoSave = {
        id: card.dataset.id,
        name: card.querySelector('.name').innerText,
        price: card.querySelector('.price span').innerText,
        photo: card.querySelector('.fox-media img').getAttribute('src'),
        counter: '1',
    }

    // Check if the same item is already in the cart
    const itemInCart = shoppingCards.querySelector(`[data-id="${productInfoSave.id}"]`);

    // If the item is in the cart
    if (itemInCart) {
        const counterElement = itemInCart.querySelector('[data-counter]');
        counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfoSave.counter);
        productInfoSave.counter = counterElement.innerText;
        foxes.push(productInfoSave);
    } else {
        // If the item is not in the cart
        renderProductCard(productInfoSave);
    }

    // Checking the product card for repeating by ID - LocalStorage
    foxes = foxes.filter((foxInfo) => foxInfo.id !== productId.toString());

    foxes.push(productInfoSave);

    // Save the list of foxes in LocalStorage
    saveToLocalStorage();

    // Show cart status - Empty / Full
    toggleCartStatus();

    // Calculate the total value of the cart
    calcCartPrice();
}

function deleteProductCard(event, productId) {
    const parentNode = document.querySelector(`[data-id = '${productId}']`);

    // Delete a product card through array filtering
    foxes = foxes.filter((foxInfo) => foxInfo.id !== productId.toString());

    // Save the list of foxes in LocalStorage
    saveToLocalStorage();

    // Remove a product card from the markup
    parentNode.remove();

    // Show cart status - Empty / Full
    toggleCartStatus();

    // Calculate the total value of the cart
    calcCartPrice();

    event.stopPropagation();
}

// Show cart status - Empty / Full
function toggleCartStatus() {
    if (shoppingCards.children.length > 0) {
        cardCartEmpty.classList.add("invisible");
    } else {
        cardCartEmpty.classList.remove("invisible");
    }
}

// Calling a function => Add a block with the total cost in HTML
addBlockWithTheTotalPrice();

// Calculate the total value of the cart
function calcCartPrice() {
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
    price = totalPrice;
    totalPriceElementHTML.innerText = price;

    saveToLocalStorage();
}

// Add a block with the total cost in HTML
function addBlockWithTheTotalPrice() {
    const adjacentSumElement = document.querySelector(".cart-footer");
    const totalPriceHTML = `
        <div class="cart-title small">Total:</div>
        <p>$<span>${price}</span>.00</p>
    `;
    adjacentSumElement.insertAdjacentHTML("afterbegin", totalPriceHTML);
}

function saveToLocalStorage() {
    localStorage.setItem('foxes', JSON.stringify(foxes));
    localStorage.setItem("price", JSON.stringify(price));
}

function renderProductCard(product) {
    const productCardInCartHTML = `
        <div class="product-card" data-id="${product.id}">
            <div class="product-cart-content">
                <img src="${product.photo}" alt="Image of a fox for sale">
                <div class="cart-info">
                    <p>${product.name}</p>
                    <p>$<span data-price>${product.price}</span>.00</p>
                </div>
            </div>
            <div class="product-cart-control">
                <div class="counter-control">
                    <div data-action="minus">-</div>
                    <div data-counter>${product.counter}</div>
                    <div data-action="plus">+</div>
                </div>
                <button type="button" onclick="deleteProductCard(event, '${product.id}')">Remove<span></span></button>
            </div>
        </div> 
    `;
    shoppingCards.insertAdjacentHTML("afterbegin", productCardInCartHTML);
}
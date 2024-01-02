const $ = document.querySelector.bind(document);

const buttonMenuOpen = $(".icon-mobile-menu");

const buttonCartOpen = $(".icon-shopping-basket");
const buttonCartClose = $(".cart-header span");
const buttonShoppingCart = $(".header-userbag");

// Hidden navigation menu----------------------------------------------------
document.addEventListener("click", openMenu);

function openMenu(e) {
    const targetItem = e.target;
    if (targetItem.closest(".icon-mobile-menu,.menu-list li,.menu-list li span")) {
        document.documentElement.classList.toggle("menu-open");
        buttonMenuOpen.classList.toggle("invisible");
    }
}

// Hidden shopping basket----------------------------------------------------
buttonCartOpen.addEventListener("click", toggleShoppingCart);
buttonCartClose.addEventListener("click", toggleShoppingCart);

function toggleShoppingCart(e) {
    const targetElement = e.target;
    if (targetElement.closest(".icon-shopping-basket,.cart-header span")) {
        document.documentElement.classList.toggle("basket-open");
        buttonShoppingCart.classList.toggle("visible");
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

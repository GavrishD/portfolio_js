const inputSearch = $(".search");
const searchFox = $("#foxSearch");
const allFoxes = $(".fox-items");
const buttonAllFoxes = $(".fox-catalog-container .shop-button");
const rangeInput = document.querySelectorAll('input[type="range"]');

const allCategoriesOfFoxes = document.querySelectorAll(".fox-categories li");
const listOfAllFoxCategories = document.querySelector(".fox-categories ul");

document.addEventListener("DOMContentLoaded", (e) => {
    loadFoxes();
});

// Animation of the "Add" button on the product card
let selectedButton;

allFoxes.onclick = function (event) {
    const buttonAdd = event.target.closest(".fox-items button");
    buttonAdd.classList.add("selected");
}

// List of foxes
async function loadFoxes() {
    try {
        const response = await fetch("files/data/foxes.json", {
            method: "GET",
        });
        const infoFoxes = await response.json();
        renderCards(infoFoxes);
        searchFoxes(infoFoxes);
        selectCategory(infoFoxes);
        openListUsingButton(infoFoxes);
        filterFoxesByCost(infoFoxes);
        // console.log(infoFoxes);
    } catch (error) {
        console.log(error);
    }
}

// Render card with foxes HTML
function renderCards(foxInfo) {
    let foxCardHTML = "";
    allFoxes.innerHTML = foxInfo.map(fox => {
        foxCardHTML += `
            <a href="" data-id="${fox.id}">
                <div class="fox-media">
                    <img src="${fox.photo}" alt="Image of a fox for sale">
                    <button data-cart type="button" onclick="addProductCard(event, '${fox.id}')">Add</button>
                </div>
                <div class="fox-content">
                    <div class="name">${fox.name}</div>
                    <div class="price">$<span>${fox.price}</span>.00</div>
                    <div class="category">${fox.category}</div>
                </div>
            </a>
        `;
    });

    allFoxes.innerHTML = foxCardHTML;
}

// Search fox - input
function searchFoxes(searchString) {
    inputSearch.addEventListener('keypress', event => {
        if (event.key === "Enter") {
            event.preventDefault();
            const userInput = searchFox.value.toLowerCase();
            const filteredArrayFoxes = searchString.filter((nameFox) => {
                const letters = nameFox.name.toLowerCase();
                if (letters.indexOf(userInput) !== -1) {
                    return nameFox;
                }
            });
            renderCards(filteredArrayFoxes);
            searchFox.value = '';
        }
    });
}

// When you click on a product category, we display the products on the page 
// that correspond to the selected category
function selectCategory(foxCollection) {
    listOfAllFoxCategories.addEventListener('click', function(event) {
        // event.stopPropagation();
        const targetElement = event.target;

        if (targetElement.dataset.value === "All") {
            renderCards(foxCollection);
            buttonAllFoxes.classList.remove("visible");
        } else {
            const foxFiltered = foxCollection.filter((element) => element.category === targetElement.dataset.value);
            renderCards(foxFiltered);
            buttonAllFoxes.classList.add("visible");
        }
    });
}

// Open the full list of foxes by clicking on the button - All foxes
function openListUsingButton(foxInfo) {
    buttonAllFoxes.addEventListener("click", function (e) {
        e.stopPropagation();
        renderCards(foxInfo);
        buttonAllFoxes.classList.remove("visible");

        for (let i = 0; i < allCategoriesOfFoxes.length; i++) {
            allCategoriesOfFoxes[i].classList.remove("active");
        }
    });
}

// Active item in the category 
for (let i = 0; i < allCategoriesOfFoxes.length; i++) {
    allCategoriesOfFoxes[i].addEventListener("click", function (event) {
        const activeClass = document.querySelectorAll('.active');

        if (activeClass.length) {
            activeClass[0].classList.remove('active');
        }
        this.classList += "active";
    });
}

// Filter foxes by cost when moving input[type="range"] 
function filterFoxesByCost(cardFox) {
    for (let e of rangeInput) {
        e.style.setProperty("--value", e.value);
        e.style.setProperty("--min", e.min == "" ? "0" : e.min);
        e.style.setProperty("--max", e.max == "" ? "100" : e.max);
        e.addEventListener("input", function() { 
            e.style.setProperty("--value", e.value);
            if (e.value >= 80) {
                const arrFilter = cardFox.filter((element) => element.price.toString() === e.value);
                renderCards(arrFilter);
            } else {
                renderCards(cardFox);
            }
        });
        $("#outputId").value = "Value: $" + e.value;
    }
}

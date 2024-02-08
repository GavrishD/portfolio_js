import { addProductCard } from './commonComponents';

const $ = document.querySelector.bind(document);
const inputSearch = $(".search");
const searchFox = $("#foxSearch");
const allFoxes = $(".fox-items");
const buttonAllFoxes = $(".fox-catalog-container .shop-button");
const rangeInput = document.querySelectorAll('input[type="range"]');

const foxCategories = document.querySelectorAll(".fox-categories li");
const foxCategoriesEl = document.querySelector(".fox-categories ul");

// List of foxes - promise
const listPromise = fetch("https://gavrishd.github.io/foxminded_edu/data/foxes.json");
listPromise
    .then(data => data.json())
    .then(foxesData => {
        renderCards(foxesData);
        searchFoxes(foxesData);
        selectCategory(foxesData);
        filterFoxesByCost(foxesData);
        resetСategories(foxesData);
    })
    .catch(err => {
        console.log('Error', err);
    })

// Render card with foxes HTML
function renderCards(foxInfo) {
    const foxCardHTML = foxInfo.map((fox) => {
        return `
        <div class="fox-item" data-id="${fox.id}">
            <a href="">
                <div class="fox-media">
                    <img src="./src/${fox.photo}" alt="Image of a fox for sale">
                </div>
                <div class="fox-content">
                    <div class="name">${fox.name}</div>
                    <div class="price">$<span>${fox.price}</span></div>
                    <div class="category">${fox.category}</div>
                </div>
            </a>
            <button id="${fox.id}" data-cart type="button" >Add</button>
        </div>
        `;
    }).join("");

    allFoxes.innerHTML = foxCardHTML;

    const buttons = allFoxes.querySelectorAll('.fox-item button');
    buttons.forEach((button) => {
        const id = button.id;
        button.addEventListener('click', (event) => addProductCard(event, id));
    })
}

// Search fox - input
function searchFoxes(infoFoxes) {
    inputSearch.addEventListener('keypress', event => {
        if (event.key === "Enter") {
            event.preventDefault();
            const userInput = searchFox.value.toLowerCase();

            function getInfoAboutTheFox(infoFox) {
                const letters = infoFox.name.toLowerCase();
                if (letters.indexOf(userInput) !== -1) return infoFox;
            }
            const filteredArrayFoxes = infoFoxes.filter(getInfoAboutTheFox);

            // const filteredArrayFoxes = infoFoxes.filter((infoFox) => {
            //     const letters = infoFox.name.toLowerCase();
            //     if (letters.indexOf(userInput) !== -1) return infoFox;
            // });

            renderCards(filteredArrayFoxes);
            searchFox.value = '';
        }
    });
}

// When you click on a product category, we display the products on the page 
// that correspond to the selected category
function selectCategory(foxCollection) {
    foxCategoriesEl.addEventListener('click', function(event) {
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

    // Active item in the category 
    for (let i = 0; i < foxCategories.length; i++) {
        foxCategories[i].addEventListener("click", function (event) {
            const activeClass = document.querySelectorAll('.active');

            if (activeClass.length) {
                activeClass[0].classList.remove('active');
            }
            this.classList += "active";
        });
    }
}

// Filter foxes by cost when moving input[type="range"] 
function filterFoxesByCost(cardFox) {
    for (let e of rangeInput) {
        e.style.setProperty("--value", e.value);
        e.style.setProperty("--min", e.min == "" ? "0" : e.min);
        e.style.setProperty("--max", e.max == "" ? "120" : e.max);
        e.addEventListener("input", function() { 
            e.style.setProperty("--value", e.value);
            if (parseInt(e.value) <= 120) {
                const arrFilter = cardFox.filter((element) => element.price === parseInt(e.value));
                renderCards(arrFilter);
            } else {
                renderCards(cardFox);
            }
        });
        $("#outputId").value = "Value: $" + e.value;
    }
}

// Reset categories - clicking on the button - All foxes
function resetСategories(foxInfo) {
    buttonAllFoxes.addEventListener("click", function (e) {
        e.stopPropagation();
        renderCards(foxInfo);
        buttonAllFoxes.classList.remove("visible");

        for (let i = 0; i < foxCategories.length; i++) {
            foxCategories[i].classList.remove("active");
        }
    });
}
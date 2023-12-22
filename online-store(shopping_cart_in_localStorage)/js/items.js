const inputSearch = $(".search");
const searchFox = $("#foxSearch");
const allTheFoxes = $(".fox-items");
const buttonAllFoxes = $(".fox-catalog-container .shop-button");
const rangeInput = document.querySelectorAll('input[type="range"]');

const listOfAllCategories = document.querySelectorAll(".fox-categories li");

document.addEventListener("DOMContentLoaded", (e) => {
    loadFoxes();
});

// Animation of the "Add" button on the product card
let selectedButton;

allTheFoxes.onclick = function (event) {
    let buttonAdd = event.target.closest(".fox-items button");
    selected(buttonAdd);
}

function selected(button) {
    selectedButton = button;
    selectedButton.classList.add("selected");
}

// List of foxes
async function loadFoxes() {
    try {
        const response = await fetch("files/data/foxes.json", {
            method: "GET",
        });
        const responseResult = await response.json();
        renderCards(responseResult);
        searchFoxes(responseResult);
        selectCategory(responseResult);
        openListUsingButton(responseResult);
        filterFoxesByCost(responseResult);
        // console.log(responseResult);
    } catch (error) {
        console.log(error);
    }
}

// Render card with foxes HTML
function renderCards(foxInfo) {
    let foxesCardHTML = "";
    allTheFoxes.innerHTML = foxInfo.map(fox => {
        foxesCardHTML += `
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

    allTheFoxes.innerHTML = foxesCardHTML;
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

            clearActiveCategory();
        }
    });
}

// Selecting an element from the list - category
function selectCategory(fox) {
    listOfAllCategories.forEach(function (element) {
        element.addEventListener("click", function (event) {
            event.stopPropagation();
            listOfAllCategories.innerText = this.innerText;
            listOfAllCategories.value = this.dataset.value;
            // listOfAllCategories.classList.toggle('active');

            if (this.dataset.value === "All") {
                renderCards(fox);
                buttonAllFoxes.classList.remove("visible");
            } else {
                const arrayFilter = fox.filter((element) => element.category === this.dataset.value);
                // console.log(arrayFilter);
                renderCards(arrayFilter);
                buttonAllFoxes.classList.add("visible");
            }
        })
    })
}

// Clear active fox category 
function clearActiveCategory() {
    for (let i = 0; i < listOfAllCategories.length; i++) {
        listOfAllCategories[i].classList.remove("active");
    }
}

// Open the full list of foxes by clicking on the button - All foxes
function openListUsingButton(foxInfo) {
    buttonAllFoxes.addEventListener("click", function (e) {
        renderCards(foxInfo);
        buttonAllFoxes.classList.remove("visible");

        clearActiveCategory();
    })
}

// Active item in the category 
for (let i = 0; i < listOfAllCategories.length; i++) {
    listOfAllCategories[i].addEventListener("click", function (event) {
        const activeClass = document.querySelectorAll('.active');

        if (activeClass.length) {
            activeClass[0].className = activeClass[0].className.replace('active', '');
        }
        this.className += "active";
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

            clearActiveCategory();
        });
        $("#outputId").value = "Value: $" + e.value;
        
    }
}
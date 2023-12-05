const $ = document.querySelector.bind(document);

const siteThemeSwitcher = $(".switch-slider");

const dropDownBtn = $(".dropdown-button");
const dropDownList = $(".dropdown-list");
const dropDownListItems = dropDownList.querySelectorAll("li");
const dropDownInput = $(".dropdown-input-hidden");

const inputSearch = $(".search");
const searchCountry = $("#countrySearch");

const allCards = $(".countries-cards-container");

// Light/Dark Mood
siteThemeSwitcher.addEventListener("click", function () {
    document.body.classList.toggle("dark-mood");
});

document.addEventListener("DOMContentLoaded", (e) => {
    getCountries();
});

// REST Countries API 
async function getCountries() {
    try {
        const url = `https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags`;
        const response = await fetch(url);
        const data = await response.json();
        renderCards(data);
        searchCountries(data);
        filterRegion(data);
        selectItemByKey(data);
        // console.log(data);
    } catch (error) {
        console.log(error); 
    }
}

// Render card with contries HTML
function renderCards(countryInfo) {
    let contriesCardHTML = '';
    allCards.innerHTML = countryInfo.map((item) => {
        contriesCardHTML += `
            <div class="countries-item">
                <img src="${item.flags.png}" alt="Country flag">
                <div class="country-info">
                    <h2>${item.name.official}</h2>
                    <div><span>Population:</span> ${item.population.toLocaleString()}</div>
                    <div><span>Region:</span> ${item.region}</div>
                    <div><span>Capital:</span> ${item.capital}</div>
                </div>
            </div>
        `;
    }).join("");

    allCards.innerHTML = contriesCardHTML;
}

// Search country - input
function searchCountries(searchString) {
    inputSearch.addEventListener('keypress', event => {
        if (event.key === "Enter") {
            event.preventDefault();
            const userInput = searchCountry.value.toLowerCase();
            console.log(userInput);
            const filteredArrayCountries = searchString.filter((nameCountry) => {
                const letters = nameCountry.name.official.toLowerCase();
                if (letters.indexOf(userInput) !== -1) {
                    return nameCountry;
                }
            });
            renderCards(filteredArrayCountries);
            searchCountry.value = '';
            dropDownBtn.innerText = 'Region';
        }
    });
}

// Select - Region
// Click on the button, open/close select
dropDownBtn.addEventListener("click", function () {
    this.classList.toggle("dropdown-button--active");
});

// Selecting an element from the list. Remember the selected value + filter button "Region". Close dropdown
function filterRegion(data) {
    dropDownListItems.forEach(function (item) {
        item.addEventListener("click", function (event) {
            event.stopPropagation();
            
            dropDownBtn.innerText = this.innerText;
            dropDownBtn.focus();
            dropDownInput.value = this.dataset.value;
            dropDownBtn.classList.remove("dropdown-button--active");

            if (this.dataset.value === "" || this.dataset.value === "All") {
                renderCards(data);
            } else {
                const arrayFilter = data.filter((item) => item.region === this.dataset.value);
                renderCards(arrayFilter);
            }
        });
    });
}

// Active item in the Region
for (let i = 0; i < dropDownListItems.length; i++) {
    dropDownListItems[i].addEventListener("click", function(event) {
        const activeClass = document.querySelectorAll('.active');

        if (activeClass.length) {
            activeClass[0].className = activeClass[0].className.replace('active', '');
        }
        this.className += "active";
    });
}

// Click outside dropdown - close dropdown
document.addEventListener("click", function (event) {
    if (event.target !== dropDownBtn) {
        dropDownBtn.classList.remove("dropdown-button--active");
    }
});

// Pressing Tab or Escape - close dropdown
document.addEventListener("keydown", function (event) {
    if (event.key === "Tab" || event.key === "Escape") {
        dropDownBtn.classList.remove("dropdown-button--active");
    }
});

// Pressing Enter when the list of regions is open - select a region, arrows navigate through the list
function selectItemByKey(regionName) {
    document.addEventListener("keydown", function (event) {
        const selectedListItem = dropDownList.querySelector("li.active");

        if (dropDownList.classList.contains("dropdown-list") && dropDownBtn.classList.contains('dropdown-button--active')) {
            switch (event.key) {
                case "Enter":
                    dropDownBtn.innerText = selectedListItem.innerHTML;
                    if (selectedListItem.innerHTML === "" || selectedListItem.innerHTML === "All") {
                        renderCards(regionName);
                    } else {
                        const arrayFilterClickEnter = regionName.filter((item) => item.region === selectedListItem.innerHTML);
                        renderCards(arrayFilterClickEnter);
                    }
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    for (let i = 0; i < dropDownListItems.length; i++) {
                        if (dropDownListItems[i].classList.contains('active') && i !== dropDownListItems.length - 1) {
                            dropDownListItems[i + 1].classList.add("active");
                            dropDownListItems[i].classList.remove("active");
                            break;
                        }
                    }
                    break;
                case "ArrowUp":
                    event.preventDefault();
                    for (let i = 0; i < dropDownListItems.length; i++) {
                        if (dropDownListItems[i].classList.contains('active') && i !== 0) {
                            dropDownListItems[i - 1].classList.add('active');
                            dropDownListItems[i].classList.remove('active');
                            break;
                        }
                    }
                    break;
            }
        }
    });
}

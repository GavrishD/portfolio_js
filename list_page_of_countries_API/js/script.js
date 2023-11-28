const body = document.querySelector('body');
const siteThemeSwitcher = document.querySelector(".switch-slider");

const dropDownBtn = document.querySelector(".dropdown-button");
const dropDownList = document.querySelector(".dropdown-list");
const dropDownListItems = dropDownList.querySelectorAll(".dropdown-item");
const dropDownInput = document.querySelector(".dropdown-input-hidden");

const inputSearch = document.querySelector(".search");
const searchContry = document.querySelector("#countrySearch");

const allCards = document.querySelector(".contries-cards-container");

// Light/Dark Mood
siteThemeSwitcher.addEventListener("click", function () {
    body.classList.toggle("dark-mood");
});

document.addEventListener("DOMContentLoaded", (e) => {
    fetchData();
});

// REST Countries API 
async function fetchData() {
    try {
        const url = `https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags`;
        const response = await fetch(url);
        const data = await response.json();
        getContries(data);
        getUserSearchingContry(data);
        filterRegion(data);
        getSelectedItemKeyDownUp(data);
        // console.log(data);
    } catch (error) {
        console.log(error); 
    }
}

// Render card with contries HTML
function getContries(data) {
    let contriesCardHTML = '';
    data.forEach((item) => {
        contriesCardHTML += `
            <div class="contries-item">
                <img src="${item.flags.png}" alt="Country flag">
                <div class="contrie-info">
                    <div class="contrie-name">${item.name.official}</div>
                    <div class="contrie-population"><span>Population:</span> ${item.population.toLocaleString()}</div>
                    <div class="contrie-region"><span>Region:</span> ${item.region}</div>
                    <div class="contrie-capital"><span>Capital:</span> ${item.capital}</div>
                </div>
            </div>
        `;
    });
    allCards.innerHTML = contriesCardHTML;
}

// Search country - input
function getUserSearchingContry(data) {
    inputSearch.addEventListener('keyup', event => {
        event.preventDefault();
        const customerLetters = searchContry.value.toLowerCase();
        console.log(customerLetters);
        const filteringArrayCountries = data.filter((item) => {
            const lettersApi = item.name.official.toLowerCase();
            if (lettersApi.indexOf(customerLetters) !== -1) {
                return item;
            }
        })
        getContries(filteringArrayCountries);
    })
}

// Select - Region
// Click on the button, open/close select
dropDownBtn.addEventListener("click", function () {
    dropDownList.classList.toggle("dropdown-list--visible");
    this.classList.add("dropdown-button--active");
    this.classList.toggle("dropdown-button--clicked");
});

// Selecting an element from the list. Remember the selected value + filter button "Region". Close dropdown
function filterRegion(data) {
    dropDownListItems.forEach(function (item) {
        item.addEventListener("click", function (event) {
            event.stopPropagation();
            
            dropDownBtn.innerText = this.innerText;
            dropDownBtn.focus();
            dropDownInput.value = this.dataset.value;
            dropDownList.classList.remove("dropdown-list--visible");
            dropDownBtn.classList.remove("dropdown-button--clicked");

            if (this.dataset.value === "" || this.dataset.value === "All") {
                getContries(data);
            } else {
                const arrayFilter = data.filter((item) => item.region === this.dataset.value);
                getContries(arrayFilter);
            }
        });
    });
}

// Active item in the Region
for (let i = 0; i < dropDownListItems.length; i++) {
    dropDownListItems[i].addEventListener("click", function(event) {
        const activeClass = document.querySelectorAll('.active');

        if (activeClass.length > 0) {
            activeClass[0].className = activeClass[0].className.replace(' active', '');
        }
        this.className += " active";
    });
}

// Click outside dropdown - close dropdown
document.addEventListener("click", function (event) {
    if (event.target !== dropDownBtn) {
        dropDownList.classList.remove("dropdown-list--visible");
        dropDownBtn.classList.remove("dropdown-button--active");
        dropDownBtn.classList.remove("dropdown-button--clicked");
    }
});

// Pressing Tab or Escape - close dropdown
document.addEventListener("keydown", function (event) {
    if (event.key === "Tab" || event.key === "Escape") {
        dropDownList.classList.remove("dropdown-list--visible");
        dropDownBtn.classList.remove("dropdown-button--active");
        dropDownBtn.classList.remove("dropdown-button--clicked");
    }
});

// Pressing Enter when the list of regions is open - select a region, arrows navigate through the list
function getSelectedItemKeyDownUp(data) {
    document.addEventListener("keydown", function (event) {
        const dropDownListItemSelected = dropDownList.querySelector('.dropdown-item.active');

        if (dropDownList.classList.contains("dropdown-list--visible") && dropDownBtn.classList.contains('dropdown-button--active')) {
            if (event.key === "Enter") {
                dropDownBtn.innerText = dropDownListItemSelected.innerHTML;

                if (dropDownListItemSelected.innerHTML === "" || dropDownListItemSelected.innerHTML === "All") {
                    getContries(data);
                } else {
                    const arrayFilterClickEnter = data.filter((item) => item.region === dropDownListItemSelected.innerHTML);
                    getContries(arrayFilterClickEnter);
                }
                console.log(dropDownListItemSelected.innerHTML);
            } else if (event.key === "ArrowDown") {
                event.preventDefault();
                for (let i = 0; i < dropDownListItems.length; i++) {
                    if (dropDownListItems[i].classList.contains('active') && i !== dropDownListItems.length - 1) {
                        dropDownListItems[i + 1].classList.add("active");
                        dropDownListItems[i].classList.remove("active");

                        break;
                    }
                }
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                for (let i = 0; i < dropDownListItems.length; i++) {
                    if (dropDownListItems[i].classList.contains('active') && i !== 0) {
                        dropDownListItems[i - 1].classList.add('active');
                        dropDownListItems[i].classList.remove('active');

                        break;
                    }
                }
            }
        }
    });
}
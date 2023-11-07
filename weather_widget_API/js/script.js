const apiKey = "8ab0f2a38551922cec2a0f9e7b2f02ac";

const form = document.querySelector("#formCity");
const inputCity = document.querySelector("#geolocation");
const mainCard = document.querySelector(".main-card");

function clear(elem) {
    elem.innerHTML = "";
}

function showError(errorMessage) {
    const errorCard = `<div class="error">${errorMessage}</div>`;
    form.insertAdjacentHTML("afterend", errorCard);
}

function removeError() {
    const errorCard = document.querySelector(".error");
    if (errorCard) errorCard.remove();
}

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}

function getWeekDay(date) {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return days[date.getDay()];
}

// Listening to the form being submitted
form.onsubmit = async function (event) {
    event.preventDefault();
    let city = inputCity.value.trim();

    // const dataWeatherCity = await getWeather(city);
    const weatherInTheCity = await getWeather(city);

    if (weatherInTheCity.message) {
        clear(mainCard);
        showError(weatherInTheCity.message);
    } else {
        clear(mainCard);
        removeError();

        const weatherList = [];
        weatherInTheCity.list.forEach((item) => {
            const weekDay = getWeekDay(new Date(item.dt_txt));
            const isWeekDayExist = weatherList.some(weatherListItem => weatherListItem.weekDay === weekDay);

            if (isWeekDayExist) {
                return; // if such a day already exists, then we do nothing
            }

            weatherList.push({ weekDay, ...item });
        });

        const card = `
            <div class="card">
                <div class="selected">Selected: ${city}, ${weatherInTheCity.city.name}, ${weatherInTheCity.city.country}</div>
                <div class="card-weather">
                    <div>
                        <div class="temperature-day">${weatherInTheCity.list[0].main.temp.toFixed()}°C</div>
                        <div class="temperature-night">
                            <div class="temperature-status">${weatherInTheCity.list[0].weather[0].description}</div>
                            <div class="temperature-weather">${weatherInTheCity.list[0].main.temp_min.toFixed()}°C</div>
                        </div>
                    </div>
                    <div class="status">
                        <div>${weatherInTheCity.list[0].weather[0].main}</div>
                        <div>${weatherInTheCity.city.name}, ${weatherInTheCity.city.country}</div>
                    </div>
                    <img src=${"./img/" + weatherInTheCity.list[0].weather[0].icon + ".png"} alt="weather fox">
                </div>
            </div>
        `;
        mainCard.insertAdjacentHTML("afterbegin", card);
            
        for (let day of weatherList) {
            const imgPath = "./img/" + day.weather[0].icon + ".png";
            const weatherItem = `
                <div class="weather-item">
                    <div class="day-week">${day.weekDay}</div>
                    <img src=${imgPath} alt="weather fox">
                    <div class="weather-status">${day.weather[0].main}</div>
                    <div class="weather-info">
                        <div class="time-off-day">Day</div>
                        <div class="temp-day temp">${day.main.temp_max.toFixed()}°C</div>
                        <div class="temp-night temp">${day.main.temp_min.toFixed()}°C</div>
                        <div class="time-off-day">Night</div>
                    </div>
                </div>
            `;
            mainCard.insertAdjacentHTML("beforeend", weatherItem);
        }
    };
};
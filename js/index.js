let now = new Date();
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

let dateBox = document.querySelector(".dateBox");
if (hours < 10) {
    dateBox.innerHTML = day + " 0" + hours + ":" + minutes;
}
if (minutes < 10) {
    dateBox.innerHTML = day + " " + hours + ":0" + minutes;
} else {
    dateBox.innerHTML = day + " " + hours + ":" + minutes;
}

let searchInput = document.querySelector(".search_input");
let cityName = document.querySelector(".cityName");
let weatherStatus = document.querySelector(".weather_status");
let cityTemp = document.querySelector(".temperature strong");
let cityHumidity = document.querySelector(".humidity_info span");
let cityWind = document.querySelector(".wind_info span");
let apiKey = "d57ba12fe2c36fb7d6e4a542d490147c";

function submitForm(event) {
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showInfo);
}
let searchForm = document.querySelector(".search_form");
searchForm.addEventListener("submit", submitForm);

function showInfo(response) {
    let temperature = Math.round(response.data.main.temp);
    cityTemp.innerHTML = temperature;
    weatherStatus.innerHTML = response.data.weather[0].description;
    cityHumidity.innerHTML = response.data.main.humidity;
    cityWind.innerHTML = Math.round(response.data.wind.speed);
    cityName.innerHTML = response.data.name;
}


function searchCurrent() {
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        console.log(lat);
        console.log(long);
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;

        axios.get(apiUrl).then(showInfo);
    });
}

let currentCity = document.querySelector(".current_city");
currentCity.addEventListener("click", searchCurrent);
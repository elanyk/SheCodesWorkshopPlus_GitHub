let now = new Date();
let date = now.getDate();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hour = document.querySelector(".hour");
hour.innerHTML = `${hours}:${minutes}`;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let currentDay = document.querySelector(".currentDay");
currentDay.innerHTML = `${day}`;

let month = now.getMonth() + 1;
let currentMonth = document.querySelector(".currentMonth");
currentMonth.innerHTML = `${month}/${date}`;

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let replaceCity = document.querySelector("#current-city");

  replaceCity.innerHTML = city.value;
  let apiKey = "87decab18fdbadc303073ab774f7f5df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperatureElement = document.querySelector(".currentTemp");
  let description = document.querySelector(".description");
  let mainIconElement = document.querySelector("#main-icon");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let mediumIconElement = document.querySelector("#medium-icon");

  celsiusTemp = Math.round(response.data.main.temp);

  temperatureElement.innerHTML = `${celsiusTemp}°C`;
  description.innerHTML = `${response.data.weather[0].description}`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  mainIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainIconElement.setAttribute("alt", response.data.weather[0].description);

  mediumIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mediumIconElement.setAttribute("alt", response.data.weather[0].description);
}

function showCity(response) {
  let replaceCity = document.querySelector("#current-city");
  replaceCity.innerHTML = response.data.name;
}

function currentPosition(position) {
  let apiKey = "87decab18fdbadc303073ab774f7f5df";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(showCity);
}

function localization(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

function clickFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector(".currentTemp");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  currentTemperature.innerHTML = `${Math.round(fahrenheitTemp)}°F`;
}
function clickCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector(".currentTemp");
  currentTemperature.innerHTML = `${Math.round(celsiusTemp)}°C`;
}

let fahrenheitLink = document.querySelector("#temperature-f");
fahrenheitLink.addEventListener("click", clickFahrenheit);

let celsiusLink = document.querySelector("#temperature-c");
celsiusLink.addEventListener("click", clickCelsius);

let celsiusTemp = null;

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", searchCity);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", localization);

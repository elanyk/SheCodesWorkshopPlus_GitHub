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

// function clickCelsius() {
//   let currentTemperature = document.querySelector(".currentTemp");
//   currentTemperature.innerHTML = "28°C";
// }
// let celsiusLink = document.querySelector("#temperature-c");
// celsiusLink.addEventListener("click", clickCelsius);

// function clickFahrenheit() {
//   let currentTemperature = document.querySelector(".currentTemp");
//   currentTemperature.innerHTML = "82°F";
// }
// let fahrenheitLink = document.querySelector("#temperature-f");
// fahrenheitLink.addEventListener("click", clickFahrenheit);

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
  let temperature = Math.round(response.data.main.temp);
  let cityTemperature = document.querySelector(".currentTemp");
  cityTemperature.innerHTML = `${temperature}°C`;
  let description = document.querySelector(".description");
  description.innerHTML = `${response.data.weather[0].description}`;
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

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", searchCity);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", localization);

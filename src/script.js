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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  forecastTemp = forecast;
}

function getForecast(coordinates) {
  let apiKey = "87decab18fdbadc303073ab774f7f5df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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
  getForecast(response.data.coord);
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
  let forecastTemperatureMax = document.getElementsByClassName(
    "weather-forecast-temperature-max"
  );
  for (i = 0; i < 5; i++) {
    forecastTemperatureMax[i].innerHTML = `${Math.round(
      (forecastTemp[i].temp.max * 9) / 5 + 32
    )}º`;
  }
  let forecastTemperatureMin = document.getElementsByClassName(
    "weather-forecast-temperature-min"
  );
  for (i = 0; i < 5; i++) {
    forecastTemperatureMin[i].innerHTML = `${Math.round(
      (forecastTemp[i].temp.min * 9) / 5 + 32
    )}º`;
  }
}
function clickCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector(".currentTemp");
  currentTemperature.innerHTML = `${Math.round(celsiusTemp)}°C`;
  let forecastTemperatureMax = document.getElementsByClassName(
    "weather-forecast-temperature-max"
  );
  for (i = 0; i < 5; i++) {
    forecastTemperatureMax[i].innerHTML = `${Math.round(
      forecastTemp[i].temp.max
    )}º`;
  }
  let forecastTemperatureMin = document.getElementsByClassName(
    "weather-forecast-temperature-min"
  );
  for (i = 0; i < 5; i++) {
    forecastTemperatureMin[i].innerHTML = `${Math.round(
      forecastTemp[i].temp.min
    )}º`;
  }
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

function search(city) {
  let apiKey = "87decab18fdbadc303073ab774f7f5df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Kyiv");

/** @format */

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city-input");
  let cityElement = document.querySelector("#new-city");

  let city = searchInputElement.value;
  let apiKey = "653b20fa74f7210c7a56act3bo5fbf89";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function displayWeather(response) {
  let temp = Math.round(response.data.temperature.current);
  let displayTemp = document.querySelector("#weather-value");
  displayTemp.innerHTML = `${temp}`;

  let humidity = response.data.temperature.humidity;
  let displayHum = document.querySelector("#hum");
  displayHum.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let displayWind = document.querySelector("#wind-speed");
  displayWind.innerHTML = `${wind}km/h`;

  let theCity = response.data.city;
  let displayCity = document.querySelector("#new-city");
  displayCity.innerHTML = `${theCity}`;

  // let icon = response.data.condition.icon_url;
  // let displayIcon = document.querySelector("#weather-icon");
  // displayIcon.innerHTML = `${icon}`;

  let desc = response.data.condition.description;
  let displayDesc = document.querySelector("#weather-description");
  displayDesc.innerHTML = `${desc}`;
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#latest-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

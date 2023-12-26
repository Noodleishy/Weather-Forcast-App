function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let newTemperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
  cityElement.innerHTML = response.data.city;

  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/hr`;
  temperatureElement.innerHTML = Math.round(newTemperature);

  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "6f96419t05793ebo1ab9eb5033f5f00f";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiURL).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "6f96419t05793ebo1ab9eb5033f5f00f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForcast);
}

function displayForcast(response) {
  console.log(response.data);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forcast-day">
        <div class="weather-forecast
        -date">${day}</div>
        <div class="weather-forecast-icon"></div>
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18ºF </span>
          <span class="weather-forecast-temperature-min">12ºF</span>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("West Lafayette");

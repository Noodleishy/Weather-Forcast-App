function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let newTemperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(newTemperature);
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("West Lafayette");

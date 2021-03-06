function forecastApiSearch(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "b90f000267947bf1f6e5a78a0ca5e027";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let keyTemperature = document.querySelector("#key-temperature");
  let city = document.querySelector("h3");
  let weatherDescription = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");

  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = days[day];
  let time = document.querySelector(".time");
  let icon = document.querySelector("#icon");

  celciusTemperature = response.data.main.temp;

  keyTemperature.innerHTML = Math.round(celciusTemperature);
  city.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  time.innerHTML = `${weekday}, ${hours}:${minutes}`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  forecastApiSearch(response.data.coord);
}

function formatDay(timestamp) {
  let formattedDay = new Date(timestamp * 1000);
  let day = formattedDay.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let wholeForecast = response.data.daily;
  let forecastSection = document.querySelector("#forecast");

  let days = [, "Sun"];
  let forecastHTML = `<div class="row forecast">`;

  wholeForecast.forEach(function forecastDay(forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
          <div class="forecast-img">
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="48px"
              />
          </div>
          <div class="forecast-temps">
              <span class="forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}??</span>
              <span class="forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}??</span>
          </div>
      </div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastSection.innerHTML = forecastHTML;
}

function apiSearch(city) {
  let apiKey = "b90f000267947bf1f6e5a78a0ca5e027";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#input-text");
  apiSearch(cityElement.value);
}

let form = document.querySelector("#form-input");
form.addEventListener("submit", handleSubmit);

apiSearch("Winterthur");

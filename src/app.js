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

function showFahrenheit(event) {
  event.preventDefault();
  let calculateFahrenheit = (celciusTemperature * 9) / 5 + 32;
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  let keyTemperature = document.querySelector("#key-temperature");
  keyTemperature.innerHTML = Math.round(calculateFahrenheit);
}

function showCelcius(event) {
  event.preventDefault();
  let keyTemperature = document.querySelector("#key-temperature");
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
  keyTemperature.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let form = document.querySelector("#form-input");
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);

let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", showCelcius);

apiSearch("Winterthur");

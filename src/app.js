function showTemperature(response) {
  let keyTemperature = document.querySelector("#key-temperature");
  let city = document.querySelector("h3");
  let weatherDescription = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let precipitation = document.querySelector("#precipitation");
  let wind = document.querySelector("#wind");

  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = date.getDate();
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  console.log(`${day[days]}`);
  let time = document.querySelector(".time");

  keyTemperature.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  precipitation.innerHTML = `Precipitation: #%`;
  wind.innerHTML = `Wind: ${response.data.main.humidity} km/h`;
}

let cityElement = "Zurich";
let apiKey = "b90f000267947bf1f6e5a78a0ca5e027";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);

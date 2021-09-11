function showTemperature(response) {
  let keyTemperature = document.querySelector("#key-temperature");
  let city = document.querySelector("h3");
  let weatherDescription = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");

  let date = new Date(response.data.dt * 1000);
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

  keyTemperature.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.main.humidity} km/h`;
  time.innerHTML = `${weekday}, ${hours}:${minutes}`;
}

let cityElement = "Zurich";
let apiKey = "b90f000267947bf1f6e5a78a0ca5e027";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(showTemperature);

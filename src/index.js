function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}


function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let dateElement = document.querySelector("#date");

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#sunrise").innerHTML = response.data.sys.sunrise;
  document.querySelector("#sunset").innerHTML = response.data.sys.sunset;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}


function search(event) {
  event.preventDefault();

  let apiKey = "4b11a1c1ee80c24e876c726259f16ded";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function showPosition(position) {
  let button = document.querySelector("button");
  button.innerHTML = `${position.coords.latitude} and ${position.coords.longitude}`;
}

function getCurrentPosition(position) {}
navigator.geolocation.getCurrentPosition(showPosition);

let button = document.querySelector("button");
button = addEventListener("click", getCurrentPosition);



let row = document.querySelector("#search-row");
row.addEventListener("submit", search);

//Bonus

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

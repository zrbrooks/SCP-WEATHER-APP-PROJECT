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

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function changeIcon(code) {
  let icon = "";

  if (code === "clear sky") {
    icon = `<i class="fa-solid fa-sun sunsolid"></i>`;
  } else if (code === "few clouds") {
    icon = `<i class="fa-solid fa-cloud cloudsolid"></i>`;
  } else if (code === "scattered clouds") {
    icon = `<i class="fa-solid fa-cloud-sun cloudsun"></i>`;
  } else if (code === "overcast clouds") {
    icon = `<i class="fa-solid fa-cloud cloudsolid"></i>`;
  } else if (code === "broken clouds") {
    icon = `<i class="fa-solid fa-cloud cloudsolid"></i>`;
  } else if (code === "shower rain") {
    icon = `<i class="fa-solid fa-cloud-sun-rain cloudsunrain"></i>`;
  } else if (code === "light intensity drizzle") {
    icon = `<i class="fa-solid fa-cloud-rain cloudrain"></i>`;
  } else if (code === "heavy intensity rain") {
    icon = `<i class="fa-solid fa-cloud-showers-heavy cloudshowersheavy"></i>`;
  } else if (code === "rain") {
    icon = `<i class="fa-solid fa-cloud-rain cloudrain"></i>`;
  } else if (code === "haze") {
    icon = `<i class="fa-solid fa-smog"></i>`;
  } else if (code === "thunderstorm") {
    icon = `<i class="fa-solid fa-cloud-showers-heavy cloudshowersheavy"></i>`;
  } else if (code === "thunderstorm with rain") {
    icon = `<i class="fa-solid fa-cloud-showers-heavy cloudshowersheavy"></i>`;
  } else if (code === "thunderstorm with light rain") {
    icon = `<i class="fa-solid fa-cloud-bolt"></i>`;
  } else if (code === "snow") {
    icon = `<i class="fa-solid fa-snow"></i>`;
  } else if (code === "mist") {
    icon = `<i class="fa-solid fa-wind windsolid"></i>`;
  } else if (code === "moderate rain") {
    icon = `<i class="fa-solid fa-cloud-rain cloudrain"></i>`;
  } else if (code === "light rain") {
    icon = `<i class="fa-solid fa-cloud-rain cloudrain"></i>`;
  } else if (code === "squalls") {
    icon = `<i class="fa-solid fa-wind windsolid"></i>`;
  }

  return icon;
}
function displayForecast(response) {
  let forecastDays = response.data.daily;
  // console.log(response.data.daily.length)

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  let days = [
   
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
 "Saturday",
    "Sunday",

  ];
  forecastDays.forEach(function (forecastDay, index) {
    if (index < 6) {
    forecastHTML =
      forecastHTML +
      `     <div class="row">
       
           <div class="col-4 day">${
             days[new Date(forecastDay.dt * 1000).getDay()]
           }</div>
        <div class="col-4">${changeIcon(
          forecastDay.weather[0].description
        )}</div>
         <div class="col-4"><span class="max">H${Math.round(
           forecastDay.temp.max
         )}º</span><span class="min"> L${Math.round(
        forecastDay.temp.min
      )}°</span></div>
      </div>`;
         }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}



function getForecast(coordinates) {
 
   let apiKey = "4b11a1c1ee80c24e876c726259f16ded";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayForecast);
}


function displayWeatherCondition(response) {

  document.querySelector("#city").innerHTML = response.data.name;
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#sunrise").innerHTML = formatTime(
    response.data.sys.sunrise * 1000
  );

  document.querySelector("#sunset").innerHTML = formatTime(
    response.data.sys.sunset * 1000
  );

  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.innerHTML = changeIcon(response.data.weather[0].description);


 
getForecast(response.data.coord);
  celsiusTemperature = response.data.main.temp;
}

function searchCity(city){
let apiKey = "4b11a1c1ee80c24e876c726259f16ded";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
axios.get(apiUrl).then(displayWeatherCondition);
}


function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);

}


function showPosition(position) {
  let apiKey = "4b11a1c1ee80c24e876c726259f16ded";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);

let row = document.querySelector("#search-row");
row.addEventListener("submit", handleSubmit);

// Celsius Fahrenheit

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

//  displayForecast();

function convertToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
// outside the function so this is a global variable
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("Athens");
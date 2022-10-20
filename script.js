// display current day and time
let dayToday = new Date();

let today = document.querySelector("#day-today");

let date = dayToday.getDate();
let hours = dayToday.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = dayToday.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wensday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[dayToday.getDay()];
today.innerHTML = `${day} ${hours}:${minutes}`;

// h1 display the name of the city from searching form when "click" the button "search"
function displayWeatherCondition(response) {
  document.querySelector(".putCityName").innerHTML = response.data.name;
  document.querySelector("#choosingDegrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".descriptesWeather").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "6db09e02ab36d020dda52839a3960ba8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#search-cities").value;
  searchCity(city);
}

let cityForm = document.querySelector(".all");
cityForm.addEventListener("submit", handleSubmit);

function chooseDegrees(event) {
  event.preventDefault();
  let numberDegrees = document.querySelector("#choosingDegrees");
  numberDegrees.innerHTML = "11";
}

// when click on "F" near the temperature, the main temperature will change to fareinheit

let degreesLink = document.querySelector("#degrees");
degreesLink.addEventListener("click", chooseDegrees);

function chooseFahrenheit(event) {
  event.preventDefault();
  let numberFahrenheit = document.querySelector("#choosingDegrees");
  numberFahrenheit.innerHTML = Math.round((11 * 9) / 5 + 32);
}

searchCity("Paris");

function searchLocation(position) {
  let apiKey = "6db09e02ab36d020dda52839a3960ba8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#nearby-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// let fahrenheitLink = document.querySelector("#fahrenheit");
// fahrenheitLink.addEventListener("click", chooseFahrenheit);

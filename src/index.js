const btnCelsius = document.querySelector("#btn_celsius");
const btnFahrenheit = document.querySelector("#btn_fahrenheit");
const tempMain = document.querySelector("#temp_main");

const form = document.querySelector("form");

const status = document.querySelector("#status");
const countryIndicator = document.querySelector("#countryIndicator");
const city = document.querySelector("#city");
const cityTempMain = document.querySelector("#temp_main");
const cityWeatherMain = document.querySelector("#weather_main");
const cityFeelsLike = document.querySelector("#feels_like");
const cityHumidity = document.querySelector("#humidity");
const cityWindSpeed = document.querySelector("#wind_speed");
const cityAtmPressure = document.querySelector("#pressure");

const cityWeatherDetailsRight = document.querySelector("#details_main_right");
const cityWeatherDetails = document.querySelector("#details");
const cityDetailedForecast = document.querySelector("#detailed_forecast");

//--- CITY FONT-SIZE ----------------------
function normalizeCityFont(city) {
  let length = city.innerHTML.length;
  //console.log(length);
  if (length < 10) {
    city.style.fontSize = "calc(3.5rem + 1.5vw)";
  } else if (length >= 10 && length <= 13) {
    city.style.fontSize = "calc(2.5rem + 1.5vw)";
  } else if (length > 13 && length <= 15) {
    city.style.fontSize = "calc(2rem + 1.5vw)";
  } else if (length > 15) {
    city.style.fontSize = "calc(1.5rem + 1.5vw)";
  }
}
normalizeCityFont(city);

//--- TIME/DAY ----------------------
const currentTime = document.querySelector("#current_time");
const currentDay = document.querySelector("#current_day");

function showFormattedDateTime() {
  let now = new Date();
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  return hours + ":" + minutes;
}

currentDay.innerHTML = new Date().toLocaleDateString("en-us", {
  weekday: "long",
});
currentTime.innerHTML = showFormattedDateTime();

setInterval(function () {
  currentTime.innerHTML = showFormattedDateTime();
}, 1000);

//--- Fahrenheit/Celsius BTN ----------------------
function changeToFahrenheit(e) {
  btnCelsius.disabled = false;
  e.preventDefault();
  let temperature = Number(tempMain.innerHTML);
  let temperatureFahrenheit = Math.round(temperature * 1.8 + 32);
  tempMain.innerHTML = temperatureFahrenheit;
  btnFahrenheit.disabled = true;
}
function changeToCelsius(e) {
  e.preventDefault();
  btnFahrenheit.disabled = false;
  let temperature = Number(tempMain.innerHTML);
  let temperatureCelsius = Math.round((5 / 9) * (temperature - 32));
  tempMain.innerHTML = temperatureCelsius;
  btnCelsius.disabled = true;
}

btnFahrenheit.addEventListener("click", changeToFahrenheit);
btnCelsius.addEventListener("click", changeToCelsius);

//-------------------------
function submitFunction(e) {
  e.preventDefault();
  const inputValue = e.target.elements[0].value;
  if (!inputValue) return;

  const formattedInput = inputValue.trim().toLowerCase().split(/\s+/).join(" ");
  const normalizeCityToUpper = formattedInput
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");

  //normalizeCityFont(city);
  //city.innerHTML = normalizeCityToUpper;
  //getWeatherByCityName(formattedInput);

  const getWeatherByCity = async (formattedInput) => {
    try {
      const data = await getWeatherByCityName(formattedInput);
      cityWeatherDetails.style.display = "block";
      cityWeatherDetailsRight.style.display = "block";
      cityDetailedForecast.style.display = "block";
      console.log(data);
      innerHTML(data);
      //city.innerHTML = normalizeCityToUpper;
      city.innerHTML = data.name;
      e.target.reset();
    } catch (error) {
      console.log(error.message);
      countryIndicator.innerHTML = "UA";
      city.innerHTML =
        "Please help stop war in Ukraine!!! <br><br> P.S.: The search for the weather forecast did not yield any results. Enter the correct city name and try again...";
      cityWeatherDetails.style.display = "none";
      cityWeatherDetailsRight.style.display = "none";
      cityDetailedForecast.style.display = "none";
    }
    normalizeCityFont(city);
  };
  getWeatherByCity(formattedInput);
}
form.addEventListener("submit", submitFunction);

//-------------------------
const geolocationBtn = document.querySelector("#find_me");

function geoFind() {
  geolocationBtn.style.display = "none";
  const status = document.querySelector("#status");

  function success(position) {
    const lat = position.coords.latitude.toFixed(2);
    const lon = position.coords.longitude.toFixed(2);

    getWeatherByCoordinates(lat, lon);
  }

  function error() {
    status.textContent = "Unable to retrieve your location.";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser.";
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}
geolocationBtn.addEventListener("click", geoFind);

//-------------------------
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "577284645f0445deb5e0ccb0a1e8966a";
const tempCelsius = "metric";
const lang = "en";
//const lang = "en,ua,uk,ru";
const FULL_API_URL = `${API_URL}?appid=${API_KEY}&lang=${lang}&units=${tempCelsius}`;

function innerHTML(data) {
  countryIndicator.innerHTML = data.sys.country;
  cityTempMain.innerHTML = Math.round(data.main.temp);
  cityWeatherMain.innerHTML = data.weather[0].description;
  cityFeelsLike.innerHTML = Math.round(data.main.feels_like);
  cityHumidity.innerHTML = data.main.humidity;
  cityWindSpeed.innerHTML = data.wind.speed;
  cityAtmPressure.innerHTML = data.main.pressure;
}

const getWeatherByCoordinates = async (lat = 50.4, lon = 30.5) => {
  const status = document.querySelector("#status");

  try {
    const { data } = await axios(`${FULL_API_URL}&lat=${lat}&lon=${lon}`);
    console.log(data);
    innerHTML(data);
    status.textContent = data.name;
    status.classList.add("link");
    const statusLink = document.querySelector("#status.link");
    statusLink.addEventListener("click", getWeatherByCurrentLocation);

    city.innerHTML = data.name;
    normalizeCityFont(city);
  } catch (error) {
    console.log(error.message);
  }
};

// const getWeatherByCityName = async (city = "Paris") => {
//    try {
//      const { data } = await axios(`${FULL_API_URL}&q=${city}`);
//      console.log(data);
//      innerHTML(data);
//    } catch (error) {
//      city.innerHTML = 'Stop war in Ukraine';
//      console.log(error.message);
//    }
// };
const getWeatherByCityName = async (city) => {
  const { data } = await axios(`${FULL_API_URL}&q=${city}`);
  return data;
};

//-------------------------

const getWeatherByCurrentLocation = async () => {
  const status = document.querySelector("#status");
  try {
    const data = await getWeatherByCityName(status.innerHTML);

    console.log(data);
    innerHTML(data);
    city.innerHTML = data.name;
  } catch (error) {
    console.log(error.message);
  }
  normalizeCityFont(city);
};

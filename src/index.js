const status = document.querySelector("#status");
const form = document.querySelector("form");
const notification = document.getElementById("notification");

const cityWeatherForecast = document.getElementById("forecast");
const cityWeatherDetailsMain = document.getElementById("details_main");

const countryIndicator = document.getElementById("countryIndicator");
const city = document.getElementById("city");
const tempMain = document.getElementById("temp_main");

const cityIconMain = document.getElementById("icon_main");

const cityWeatherDetails = document.getElementById("details");
const cityWeatherMain = document.getElementById("weather_main");
const cityFeelsLike = document.getElementById("feels_like");
const cityHumidity = document.getElementById("humidity");
const cityWindSpeed = document.getElementById("wind_speed");
const cityAtmPressure = document.getElementById("pressure");

const btnForecastHourly = document.getElementById("forecastHourly");
const btnForecastDaily = document.getElementById("forecastDaily");
const btnForecastHide = document.getElementById("forecastHide");

const cityDetailedForecast = document.getElementById("detailed_forecast");
const weatherDataUpdate = document.getElementById("weather_data_updated");

let cityTimeInterval;
//--- CITY FONT-SIZE ----------------------
function normalizeCityFont(city) {
  let length = city.innerHTML.length;
  if (window.screen.width >= 640) {
    if (length < 12) {
      city.style.fontSize = "calc(3.5rem + 1.5vw)";
    } else if (length >= 12 && length < 17) {
      city.style.fontSize = "calc(2.5rem + 1.5vw)";
    } else if (length >= 17 && length <= 19) {
      city.style.fontSize = "calc(2rem + 1.5vw)";
    } else if (length > 19) {
      city.style.fontSize = "calc(1.5rem + 1.5vw)";
    }
  } else {
    if (length < 8) {
      city.style.fontSize = "calc(2rem + 1.5vw)";
    } else if (length >= 8 && length <= 10) {
      city.style.fontSize = "calc(1.5rem + 1.5vw)";
    } else if (length >= 10 && length <= 19) {
      city.style.fontSize = "calc(1rem + 1.5vw)";
    } else if (length > 19) {
      city.style.fontSize = "calc(0.5rem + 1.5vw)";
    }
  }
}

//normalizeCityFont(city);

//--- Current day and time ----------------------
// const currentTime = document.querySelector("#current_time");
// const currentDay = document.querySelector("#current_day");

// function showFormattedDateTime() {
//   let now = new Date();

//   let hours = now.getHours().toString().padStart(2, "0");
//   let minutes = now.getMinutes().toString().padStart(2, "0");
//   currentDay.innerHTML = new Date().toLocaleDateString("en-us", {
//     weekday: "long",
//   });
//   return hours + ":" + minutes;
// }

// currentTime.innerHTML = showFormattedDateTime();

// let currentTimeInterval = setInterval(function () {
//   currentTime.innerHTML = showFormattedDateTime();
// }, 1000);

//--- City time/day ----------------------
const cityCurrentTime = document.getElementById("city_current_time");
const cityCurrentDay = document.getElementById("city_current_day");
const timeDifference = document.getElementById("time_difference");

function showFormattedCityDateTime(timestamp) {
  if (!timestamp) return;

  const currentTime = new Date().getTime();
  const currentCityTime = new Date(timestamp).getTime();

  const difference = Math.floor(
    ((currentCityTime - currentTime) / (1000 * 60 * 60)).toFixed(0)
  );

  if (difference !== 0) {
    timeDifference.innerHTML = `Time difference: ${difference}`;
  } else {
    timeDifference.innerHTML = "";
  }

  // With Interval (real-time date of city)
  if (cityTimeInterval) {
    clearInterval(cityTimeInterval);
    cityTimeInterval = null;
  }
  let cityDateNow = new Date(timestamp).getTime();

  function formattedCityDateTime(timestamp) {
    const date = new Date(timestamp);
    const cityHours = date.getHours().toString().padStart(2, "0");
    const cityMinutes = date.getMinutes().toString().padStart(2, "0");
    const cityDay = date.toLocaleDateString("en-us", {
      weekday: "long",
    });
    cityCurrentDay.innerHTML = cityDay;
    cityCurrentTime.innerHTML = cityHours + ":" + cityMinutes;
  }

  formattedCityDateTime(cityDateNow);

  cityTimeInterval = setInterval(function () {
    formattedCityDateTime(cityDateNow);
    cityDateNow += 1000;
  }, 1000);

  // Without Interval
  // const cityDateNow = new Date(timestamp);
  // const cityHours = cityDateNow.getHours().toString().padStart(2, "0");
  // const cityMinutes = cityDateNow.getMinutes().toString().padStart(2, "0");
  // const cityDay = cityDateNow.toLocaleDateString("en-us", {
  //   weekday: "long",
  // });
  // cityCurrentDay.innerHTML = cityDay;
  // cityCurrentTime.innerHTML = cityHours + ":" + cityMinutes;
}

//--- Fahrenheit/Celsius BTN ----------------------
const btnCelsius = document.querySelector("#btn_celsius");
const btnFahrenheit = document.querySelector("#btn_fahrenheit");

let cardTemperature;

function changeToFahrenheit(e) {
  btnCelsius.disabled = false;
  e.preventDefault();
  let temperature = Number(tempMain.innerHTML);
  let temperatureFahrenheit = Math.round(temperature * 1.8 + 32);
  tempMain.innerHTML = temperatureFahrenheit;
  btnFahrenheit.disabled = true;

  cardTemperature?.forEach((el) => {
    let cardTemperature = +el.innerHTML;
    el.innerHTML = Math.round(cardTemperature * 1.8 + 32);
  });
}
function changeToCelsius(e) {
  e.preventDefault();
  btnFahrenheit.disabled = false;
  let temperature = Number(tempMain.innerHTML);
  let temperatureCelsius = Math.round((5 / 9) * (temperature - 32));
  tempMain.innerHTML = temperatureCelsius;
  btnCelsius.disabled = true;

  cardTemperature?.forEach((el) => {
    let cardTemperature = +el.innerHTML;
    el.innerHTML = Math.round((5 / 9) * (cardTemperature - 32));
  });
}

btnFahrenheit.addEventListener("click", changeToFahrenheit);
btnCelsius.addEventListener("click", changeToCelsius);

//-------------------------

function submitFunction(e) {
  e.preventDefault();
  const inputValue = e.target.elements[0].value;
  if (!inputValue) return;
  const formattedInput = inputValue.trim().toLowerCase().split(/\s+/).join(" ");
  getWeatherByCity(formattedInput);
  e.target.reset();
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

//--- Current weather data ----------------------
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "577284645f0445deb5e0ccb0a1e8966a";
const units = "metric";
const lang = "en,ua,uk,ru";
const FULL_API_URL = `${API_URL}?appid=${API_KEY}&lang=${lang}&units=${units}`;

async function fetchWeatherByCityName(city) {
  const { data } = await axios(`${FULL_API_URL}&q=${city}`);
  return data;
}

async function fetchWeatherByCoordinates(lat, lon) {
  const { data } = await axios(`${FULL_API_URL}&lat=${lat}&lon=${lon}`);
  return data;
}

async function getWeatherByCoordinates(lat, lon) {
  const status = document.querySelector("#status");
  try {
    const data = await fetchWeatherByCoordinates(lat, lon);
    fillInnerHTML(data);
    dataForecast = await getWeatherForecast(data);
    createForecastMarkup(dataForecast);

    timeDifference.innerHTML = "";
    cityCurrentDay.innerHTML = "";
    cityCurrentTime.innerHTML = "";
    status.innerHTML = `<a class="m-0 object-fit-sm-scale link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" role="button" tabindex="0">${data.name}</a>`;
    const statusLink = document.querySelector("#status a");
    statusLink.addEventListener("click", getWeatherByCurrentLocation);
  } catch (error) {
    console.log(error.message);
    errorHTML();
    notification.innerHTML = `${error.message} <br>Your location could not be determined...`;
  }
}

const getWeatherByCurrentLocation = async () => {
  const status = document.querySelector("#status a");
  try {
    const data = await fetchWeatherByCityName(status.innerHTML);
    fillInnerHTML(data);

    dataForecast = await getWeatherForecast(data);
    createForecastMarkup(dataForecast);

    clearInterval(cityTimeInterval);
    cityTimeInterval = null;
    cityCurrentDay.innerHTML = "";
    cityCurrentTime.innerHTML = "";

    timeDifference.innerHTML = "";
  } catch (error) {
    console.log(error.message);
    errorHTML();
    notification.innerHTML = `${error.message} <br>Something went wrong, please try again...`;
  }
};

async function getWeatherByCity(formattedInput) {
  try {
    const data = await fetchWeatherByCityName(formattedInput);
    fillInnerHTML(data);

    dataForecast = await getWeatherForecast(data);
    createForecastMarkup(dataForecast);
    const cityCurrentDate = new Date().toLocaleString("en-US", {
      timeZone: dataForecast.timezone,
    });

    const statusLink = document.querySelector("#status a");
    if (statusLink?.innerHTML === city.innerHTML) {
      clearInterval(cityTimeInterval);
      cityTimeInterval = null;
      cityCurrentDay.innerHTML = "";
      cityCurrentTime.innerHTML = "";
    } else {
      showFormattedCityDateTime(cityCurrentDate);
    }
  } catch (error) {
    console.log(error.message);
    errorHTML();
    notification.innerHTML = `The search for the weather forecast did not yield any results.<br>Enter the correct city name and try again.`;
  }
}

function errorHTML() {
  cityWeatherForecast.classList.add("visually-hidden");
  weatherDataUpdate.innerHTML = "";
  notification.removeAttribute("hidden");
}

function fillInnerHTML(data) {
  countryIndicator.innerHTML = data.sys.country;
  city.innerHTML = data.name;
  tempMain.innerHTML = Math.round(data.main.temp);
  cityWeatherMain.innerHTML = data.weather[0].description;
  cityFeelsLike.innerHTML = Math.round(data.main.feels_like);
  cityHumidity.innerHTML = data.main.humidity;
  cityWindSpeed.innerHTML = Math.round(data.wind.speed);
  cityAtmPressure.innerHTML = Math.round(data.main.pressure * 0.75006375541921);
  weatherIcon = data.weather[0].icon;
  formatDataUpdate(data.dt);
  cityIconMain.setAttribute("src", `/image/icon-big-${weatherIcon}.png`);
  cityIconMain.setAttribute("alt", data.weather[0].description);
  cityDetailedForecast.setAttribute("hidden", "");
  btnForecastHourly.disabled = false;
  btnForecastDaily.disabled = false;
  btnForecastHide.classList.add("visually-hidden");
  normalizeCityFont(city);
  notification.innerHTML = "";
  cityWeatherForecast.classList.remove("visually-hidden");
}

function formatDataUpdate(timestamp) {
  function formattedDataUpdate() {
    let dt = new Date(timestamp * 1000);
    let day = dt.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    let time = dt.toLocaleTimeString().slice(0, 5);
    return `Weather data last updated on: <br> ${day}, ${time}`;
  }
  weatherDataUpdate.innerHTML = formattedDataUpdate();
}

//--- Forecast weather data ----------------------
const API_FORECAST_URL = "https://api.openweathermap.org/data/2.5/onecall";
const API_FORECAST_KEY = "8c78e9e7e9928cd1a2a6f923072c3dec";

const FULL_API_FORECAST_URL = `${API_FORECAST_URL}?appid=${API_FORECAST_KEY}&lang=${lang}&units=${units}`;

async function fetchWeatherForecast(lat, lon) {
  const { data } = await axios(
    `${FULL_API_FORECAST_URL}&lat=${lat}&lon=${lon}`
  );
  return data;
}

async function getWeatherForecast(data) {
  const lat = data.coord.lat;
  const lon = data.coord.lon;

  try {
    const data = await fetchWeatherForecast(lat, lon);
    //city.innerHTML = data.timezone.split("/").slice(1);
    return data;
  } catch (error) {
    console.log(error.message);
    notification.innerHTML = `<p>Something went wrong with forecast, please try again...</p>`;
  }
}

const forecastWrap = document.getElementById("forecast_daily_hourly");
function scrollToForecastCards() {
  forecastWrap.scrollIntoView({
    block: "start",
    inline: "nearest",
    behavior: "smooth",
  });
}

//--- ForecastDaily Markup----------------------
function createForecastDailyMarkup(arr) {
  const cardBg = themeSwitch.checked ? "bg-secondary" : "bg-light-subtle";
  const cardTempMin = themeSwitch.checked ? "text-dark" : "text-secondary";

  const dates = arr.slice(0, 7);
  return dates
    .map(
      ({
        dt,
        humidity,
        temp,
        weather,
        wind_speed,
      }) => `   <!-- day/hour card -->
      <div class="rounded ${cardBg} pt-3 pb-3 ps-2 pe-2 w-auto weather_card">
        <p class="text-uppercase fw-bold m-0 mb-1">${new Date(
          dt * 1000
        ).toLocaleDateString("en-us", {
          weekday: "short",
        })}</p>
        <p class="cardData m-0 mb-2">${new Date(dt * 1000)
          .getDate()
          .toString()
          .padStart(2, "0")}.${(new Date(dt * 1000).getMonth() + 1)
        .toString()
        .padStart(2, "0")}</p>
        <p class="fw-bold m-0 mb-1"><span class="card_temp">${Math.round(
          temp.max
        )}</span>°</p>
        <hr class="m-0 mb-1" />
        <p class="fw-bold ${cardTempMin} m-0 mb-2 card_temp_min"><span class="card_temp">${Math.round(
        temp.min
      )}</span>°</p>
        <img src="/image/icon-small-${
          weather[0].icon
        }.png" width="35" class="w-100 m-0" />

        <div class="mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-droplet"
            viewBox="0 0 16 16"
            aria-label="humidity"
          >
            <path
              fill-rule="evenodd"
              d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"
            />
            <path
              fill-rule="evenodd"
              d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z"
            />
          </svg>
          <p class="cardText m-0">${humidity}%</p>
        </div>

        <div class="mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-wind"
            viewBox="0 0 16 16"
            aria-label="wind speed"
          >
            <path
              d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"
            />
          </svg>
          <p class="cardText m-0">${Math.round(wind_speed)} m/s</p>
        </div>
      </div>`
    )
    .join("");
}

//--- ForecastHourly ----------------------
function createForecastHourlyMarkup(arr) {
  const cardBg = themeSwitch.checked ? "bg-secondary" : "bg-light-subtle";
  return arr
    .map(
      ({
        dt,
        humidity,
        temp,
        weather,
        wind_speed,
      }) => `   <!-- day/hour card -->
      <div class="rounded ${cardBg} pt-3 pb-3 ps-2 pe-2 weather_card">
        <p class="fw-bold m-0 mb-1">${new Date(dt * 1000)
          .getHours()
          .toString()
          .padStart(2, "0")}:${new Date(dt * 1000)
        .getMinutes()
        .toString()
        .padStart(2, "0")}</p>
        <p class="cardData m-0 mb-2">${new Date(dt * 1000)
          .getDate()
          .toString()
          .padStart(2, "0")}.${(new Date(dt * 1000).getMonth() + 1)
        .toString()
        .padStart(2, "0")}</p>
        <p class="fw-bold m-0 mb-2"><span class="card_temp">${Math.round(
          temp
        )}</span>°</p>
        
        <img src="/image/icon-small-${
          weather[0].icon
        }.png" width="35" class="w-100 m-0"/>

        <div class="mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-droplet"
            viewBox="0 0 16 16"
            aria-label="humidity"
          >
            <path
              fill-rule="evenodd"
              d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"
            />
            <path
              fill-rule="evenodd"
              d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z"
            />
          </svg>
          <p class="cardText m-0">${humidity}%</p>
        </div>

        <div class="mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-wind"
            viewBox="0 0 16 16"
            aria-label="wind speed"
          >
            <path
              d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"
            />
          </svg>
          
          <p class="cardText m-0">${Math.round(wind_speed)} m/s</p>
        </div>
      </div>`
    )
    .join("");
}

//--- Forecast Markup----------------------
const forecastWrapperDaily = document.getElementById("detailed_forecast_daily");
const forecastWrapperHourly = document.getElementById(
  "detailed_forecast_hourly"
);

function createForecastMarkup(dataForecast) {
  const forecastDaily = dataForecast.daily;
  const markupDaily = createForecastDailyMarkup(forecastDaily);
  forecastWrapperDaily.innerHTML = markupDaily;

  const forecastHourly = dataForecast.hourly;
  const markupHourly = createForecastHourlyMarkup(forecastHourly);
  forecastWrapperHourly.innerHTML = markupHourly;

  cityDetailedForecast.removeAttribute("hidden");
  forecastWrapperDaily.classList.add("visually-hidden");
  forecastWrapperHourly.classList.add("visually-hidden");

  cardTemperature = document.querySelectorAll(".card_temp");
  forecastWrapperHourly.scrollTo(0, 0);
  forecastWrapperDaily.scrollTo(0, 0);
}

//--- Forecast Buttons ----------------------
function showForecastDaily() {
  cityDetailedForecast.removeAttribute("hidden");
  forecastWrapperDaily.classList.remove("visually-hidden");
  forecastWrapperHourly.classList.add("visually-hidden");
  btnForecastDaily.disabled = true;
  btnForecastHourly.disabled = false;
  btnForecastHide.classList.remove("visually-hidden");
  scrollToForecastCards();
}

btnForecastDaily.addEventListener("click", showForecastDaily);

function showForecastHourly() {
  cityDetailedForecast.removeAttribute("hidden");
  forecastWrapperDaily.classList.add("visually-hidden");
  forecastWrapperHourly.classList.remove("visually-hidden");
  btnForecastHourly.disabled = true;
  btnForecastDaily.disabled = false;
  btnForecastHide.classList.remove("visually-hidden");
  scrollToForecastCards();
}

btnForecastHourly.addEventListener("click", showForecastHourly);

btnForecastHide.addEventListener("click", () => {
  cityDetailedForecast.setAttribute("hidden", "");
  forecastWrapperHourly.classList.add("visually-hidden");
  forecastWrapperDaily.classList.add("visually-hidden");
  btnForecastHide.classList.add("visually-hidden");
  btnForecastHourly.disabled = false;
  btnForecastDaily.disabled = false;
});

//-------------------------
const GEO_API_URL = "https://geolocation-db.com/json/";
const GEO_API_KEY = "975d73a0-5723-11ee-abeb-bbf96f1cb178";

const fetchCityFromApi = async () => {
  try {
    const response = await fetch(
      "https://geolocation-db.com/json/975d73a0-5723-11ee-abeb-bbf96f1cb178"
    );
    const data = await response.json();
    return data.city;
  } catch (error) {
    console.log(error.message);
    errorHTML();
  }
};

//-------------------------
const themeSwitch = document.getElementById("themeSwitch");

themeSwitch.addEventListener("click", changeTheme);

function changeTheme() {
  if (themeSwitch.checked) {
    document.body.classList.replace("bg-white", "bg-black");
    document.body.classList.replace("text-dark", "text-light");

    document
      .querySelector(".bg-info-subtle")
      .classList.replace("bg-info-subtle", "bg-dark");

    document.querySelectorAll(".weather_card").forEach((el) => {
      el.classList.replace("bg-light-subtle", "bg-secondary");
    });

    document.querySelectorAll(".card_temp_min").forEach((el) => {
      el.classList.replace("text-secondary", "text-dark");
    });
  } else {
    document.body.classList.replace("bg-black", "bg-white");
    document.body.classList.replace("text-light", "text-dark");
    document
      .querySelector(".bg-dark")
      .classList.replace("bg-dark", "bg-info-subtle");

    document.querySelectorAll(".weather_card").forEach((el) => {
      el.classList.replace("bg-secondary", "bg-light-subtle");
    });

    document.querySelectorAll(".card_temp_min").forEach((el) => {
      el.classList.replace("text-dark", "text-secondary");
    });
  }
}

// -------------------------
(async () => {
  const city = await fetchCityFromApi();
  if (city) {
    await getWeatherByCity(city);
    cityWeatherForecast.classList.remove("visually-hidden");

    clearInterval(cityTimeInterval);
    cityTimeInterval = null;
    cityCurrentDay.innerHTML = "";
    cityCurrentTime.innerHTML = "";
  } else {
    await getWeatherByCity("fortune");
    cityWeatherForecast.classList.remove("visually-hidden");
  }
})();

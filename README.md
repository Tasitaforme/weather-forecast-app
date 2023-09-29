![preview](/preview.jpg)

![preview-hw](/preview-process.jpg)

# WEATHER FORECAST (App)

**Individual project.**

**Title:** Weather forecast.

**Description:** weather forecast application.

**Target:** development of a weather forecast application with the minimum necessary functionality, made in pure JavaScript using Bootstrap..

**Basic functionality:** 
- Weather forecast (current, hourly and weekly).
- Search for the weather forecast by city name.
- Automatic display of the weather forecast based on IP geolocation data.
- The ability to determine geolocation and display the weather forecast according to the received data.
- Dynamic date display.
- Displaying the time difference with the selected city.
- Ability to change display of temperature measurement units on the - Fahrenheit or Celsius scale.
- HTTP requests (axios).
- Dark/light theme.
- Favicon.
- Adaptive layout.
- Custom own-designed weather display icons.


**Skills:** HTML5, CSS, JavaScript, Bootstrap, Axios, Figma, Git, GitHub, Codesandbox.

---

**Індивідуальний проект.**

**Назва:** Weather forecast.

**Опис:** додаток прогнозу погоди.

**Ціль:** розробка додатка прогнозу погоди з мінімальним необхідним функціоналом, виконана на чистому JavaScript з використанням Bootstrap.

**Навички:** HTML5, CSS, JavaScript, Bootstrap, Axios, Figma, Git, GitHub, Codesandbox.

**Базовий функціонал:**
- Відображення прогнозу погоди (на даний момент, погодинний і тижневий).
- Пошук прогнозу погоди за назвою міста.
- Автоматичне відображення прогнозу погоди за даними геолокації по IP.
- Можливість визначити геолокацію та відобразити прогноз погоди згідно отриманих даних.
- Відображення динамічної дати.
- Відображення різниці у часі з обраним містом.
- Можливість зміни відображення одиниць вимірювання температури за шкалою Фаренгейта або Цельсія.
- HTTP-запити (axios).
- Темна/світла тема.
- Відображення фавікону сторінки.
- Верстка адаптивна.
- Іконки відображення погоди створені за індивідуальним дизайном.

# USEFUL LINKS
## [Bootstrap](https://getbootstrap.com/)

### Download

[Download Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/download/#cdn-via-jsdelivr)

```html
<head>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
    crossorigin="anonymous"
  />
</head>

<body>
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
    crossorigin="anonymous"
  ></script>
</body>
```

### Icons

[Guidance and suggestions for using external icon libraries with Bootstrap](https://getbootstrap.com/docs/5.3/extend/icons/)  
[Bootstrap Icons](https://icons.getbootstrap.com/)

## [Axios](https://axios-http.com/)

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
```

## API

### Weather API

[Current weather data](https://openweathermap.org/current)
[One Call API 3.0](https://openweathermap.org/api)
[Weather icons](https://openweathermap.org/weather-conditions)

### Geolocation API

[Geolocation by IP address](https://geolocation-db.com/)

## Date

### Get Date from Time Zone

```js
new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
```

### Date formatting

```js
const date = new Date("March 16, 2030 14:25:00");

date.toString();
// "Sat Mar 16 2030 14:25:00 GMT+0200 (Eastern European Standard Time)"

date.toTimeString();
// "14:25:00 GMT+0200 (Eastern European Standard Time)"

date.toLocaleTimeString();
// "2:25:00 PM"

date.toUTCString();
// "Sat, 16 Mar 2030 12:25:00 GMT"

date.toDateString();
// "Sat Mar 16 2030"

date.toISOString();
// "2030-03-16T12:25:00.000Z"

date.toLocaleString();
// "3/16/2030, 2:25:00 PM"

date.getTime();
// 1899894300000
```

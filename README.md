![preview](/preview.jpg)

![preview-hw](/preview-process.jpg)

# [Bootstrap](https://getbootstrap.com/)

## Download

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

## Icons

[Guidance and suggestions for using external icon libraries with Bootstrap](https://getbootstrap.com/docs/5.3/extend/icons/)  
[Bootstrap Icons](https://icons.getbootstrap.com/)

# [Axios](https://axios-http.com/)

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
```

# API

## Weather API

[Current weather data](https://openweathermap.org/current)
[One Call API 3.0](https://openweathermap.org/api)
[Weather icons](https://openweathermap.org/weather-conditions)

## Geolocation API

[Geolocation by IP address](https://geolocation-db.com/)

# Date

## Get Date from Time Zone

```js
new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
```

## Date formatting

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

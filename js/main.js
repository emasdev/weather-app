import { Weather } from "./weather.js";

let weather1 = new Weather({
  container: document.getElementById("weather-mexico")
});

fetch('http://api.openweathermap.org/data/2.5/weather?q=Mexico&appid=8ca3d179747703e653793ebb8935cbbf')
  .then(response => response.json())
  .then(data => {
    weather1.data = data;
    weather1.render();
  });
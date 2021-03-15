import { Weather } from "./weather.js";

let weather1 = new Weather({
  container: document.getElementById("weather-mexico")
});

let weather2 = new Weather({
  container: document.getElementById("weather-location")
});

const appId = "8ca3d179747703e653793ebb8935cbbf";
const location = {
  latitude: 19.363661, 
  longitude: -99.173382
}

fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${appId}`)
  .then(response => response.json())
  .then(data => {
    weather1.data = data;
    weather1.render();
  });

window.onload = () => {
  initEvents();
}

let isMenuVisible = true;
const sections = {
  menu: document.getElementById("section-menu"),
  location: document.getElementById("section-location"),
}

function initEvents(){

  const checkboxes = document.getElementsByClassName("radio");
  for(const checkbox of checkboxes){
    checkbox.addEventListener("click", (e) => {
      weather1.grades = e.target.value;
      weather1.render();
      weather2.grades = e.target.value;
      weather2.render();
    });
  }

  document.getElementById("get-current-location")
  .addEventListener("click", () => {
    getLocation().then(location => {
      console.log(location);
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${appId}`)
      .then(response => response.json())
      .then(data => {
        weather2.data = data;
        weather2.render();
      });
    })
    toogleMenu();
  });

  document.getElementById("get-city-location")
  .addEventListener("click", () => {

      const city = document.getElementById("city-input").value;
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`)
      .then(response => response.json())
      .then(data => {
        weather2.data = data;
        weather2.render();
      });
    toogleMenu();
  });

  document.getElementById("menu-btn")
  .addEventListener("click", () => {
    toogleMenu();
  });
}

function toogleMenu(){
  if(isMenuVisible){
    sections.menu.classList.add('hidden');
    sections.location.classList.remove('hidden');
    isMenuVisible = false;
  } else {
    sections.menu.classList.remove('hidden');
    sections.location.classList.add('hidden');
    isMenuVisible = true;
  }
}

function getLocation() {
  return new Promise(resolve => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => { 
          resolve(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          );
        })
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  });
}

import './css/style.css';
import Weather from './weather';

const weather1 = new Weather({
  container: document.getElementById('weather-mexico'),
});

const weather2 = new Weather({
  container: document.getElementById('weather-location'),
});

const appId = '8ca3d179747703e653793ebb8935cbbf';
const location = {
  latitude: 19.363661,
  longitude: -99.173382,
};

fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${appId}`)
  .then(response => response.json())
  .then(data => {
    weather1.data = data;
    weather1.render();
  });

let isMenuVisible = true;
const sections = {
  menu: document.getElementById('section-menu'),
  location: document.getElementById('section-location'),
};

function toogleMenu() {
  if (isMenuVisible) {
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
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        );
      });
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
}

function initEvents() {
  const checkboxes = document.getElementsByClassName('radio');
  for (let i = 0; i < checkboxes.length; i += 1) {
    const checkbox = checkboxes[i];
    checkbox.addEventListener('click', (e) => {
      weather1.grades = e.target.value;
      weather1.render();
      if (weather2.data) {
        weather2.grades = e.target.value;
        weather2.render();
      }
    });
  }

  document.getElementById('get-current-location')
    .addEventListener('click', () => {
      getLocation().then(location => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${appId}`)
          .then(response => response.json())
          .then(data => {
            weather2.data = data;
            weather2.render();
          });
      });
      toogleMenu();
    });

  document.getElementById('get-city-location')
    .addEventListener('click', () => {
      const city = document.getElementById('city-input').value;
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`)
        .then(response => response.json())
        .then(data => {
          weather2.data = data;
          weather2.render();
        });
      toogleMenu();
    });

  document.getElementById('menu-btn')
    .addEventListener('click', () => {
      toogleMenu();
    });
}


window.onload = () => {
  initEvents();
};
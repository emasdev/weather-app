class Weather {
  constructor(data) {
    this.container = data.container;
    this.data = data.data;
    this.grades = 'celsius';
  }

  render() {
    let { temp } = this.data.main;
    let feelsLike = this.data.main.feels_like;
    const windSpeed = `Wind: ${this.data.wind.speed} K/m`;
    const humidity = `Humidity levels: ${this.data.main.humidity}%`;
    const icon = "<img src='http://openweathermap.org/img/w/" + this.data.weather[0].icon + ".png'>";

    if (this.grades === 'celsius') {
      temp = `${this.getCelsius(temp)}°C`;
      feelsLike = `Feels like: ${this.getCelsius(feelsLike)}°C`;
    } else if (this.grades === 'fahrenheit') {
      temp = `${this.getFahrenheit(temp)}°F`;
      feelsLike = `Feels like: ${this.getFahrenheit(feelsLike)}°F`;
    } else {
      temp = `${temp}°K`;
      feelsLike = `Feels like: ${feelsLike}°K`;
    }

    this.container.querySelector('.name').innerHTML = this.data.name;
    this.container.querySelector('.country').innerHTML = this.data.sys.country;
    this.container.querySelector('.main-temp').innerHTML = temp;
    this.container.querySelector('.weather-main').innerHTML = this.data.weather[0].main;
    this.container.querySelector('.icon').innerHTML = icon;
    this.container.querySelector('.wind-speed').innerHTML = windSpeed;
    this.container.querySelector('.main-feels_like').innerHTML = feelsLike;
    this.container.querySelector('.main-humidity').innerHTML = humidity;
  }

  /* eslint-disable class-methods-use-this */
  getCelsius(temp) {
    return (temp - 273.15).toFixed(2);
  }

  getFahrenheit(temp) {
    return (this.getCelsius(temp) * (9 / 5 + 32)).toFixed(2);
  }
}

export default Weather;
class Weather {
  constructor(data) {
    this.container = data.container;
    this.data = data.data;
    //this.grades = "Kevin";
    this.grades = "Fahrenheit";
  }

  render(){
    console.log(this.data);
    let temp = this.data.main.temp;
    let feelsLike = this.data.main.feels_like;
    if(this.grades === "Kevin"){
      temp = `${this.getCelsius(temp)}°C`;
      feelsLike = `Feels like: ${this.getCelsius(feelsLike)}°C`;
    } else if(this.grades === "Fahrenheit"){
      temp = `${this.getFahrenheit(temp)}°F`;
      feelsLike = `Feels like: ${this.getFahrenheit(feelsLike)}°F`;
    }
    let windSpeed = `Wind: ${this.data.wind.speed} K/m`; 
    let humidity = `Humidity levels: ${this.data.main.humidity}%`; 
    this.container.querySelector(".name").innerHTML = this.data.name;
    this.container.querySelector(".main-temp").innerHTML = temp;
    this.container.querySelector(".weather-main").innerHTML = this.data.weather[0].main;
    this.container.querySelector(".wind-speed").innerHTML = windSpeed;
    this.container.querySelector(".main-feels_like").innerHTML = feelsLike;
    this.container.querySelector(".main-humidity").innerHTML = humidity;
  }

  getCelsius(temp){
    return temp - 273.15;
  }

  getFahrenheit(temp){
    return (this.getCelsius(temp) * (9/5 + 32)).toFixed(2);
  }
}

export { Weather }
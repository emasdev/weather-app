class Weather {
  constructor(data) {
    this.container = data.container;
    this.data = data.data;
  }

  render() {
    console.log("render");
    this.container.querySelector('.name');
  } 
}

export { Weather }
import React from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import Weather from "./app_component/weather.component";
import Form from "./app_component/form.component"

// const API_key = "2ca910b2b61cc7f138572705bab1cb2f";
const API_key = "5e80a10989314afca9801137201102";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-select",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  calCelcius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeId >= 700 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }

  getWeather = async (e) => {

    e.preventDefault()

    const city = e.target.elements.city.value
    const country = e.target.elements.country.value

    if (city && country) {
      const api_call = await fetch(
        // `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}$cnt=5`
        // `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city},${country}&cnt=5&appid=${API_key}`
        `http://api.weatherapi.com/v1/forecast.json?key=5e80a10989314afca9801137201102&q=${city}, ${country}&days=10`
      );
  
      const response = await api_call.json();
  
      console.log(response);
  
      this.setState({
        city: `${response.name},${response.sys.country}`,
        celsius: this.calCelcius(response.main.temp),
        temp_min: this.calCelcius(response.main.temp_max),
        temp_max: this.calCelcius(response.main.temp_min),
        description: response.weather[0].description.toUpperCase(),
        error: false
      });
  
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id)
      
    }else {
      this.setState({error:true})
    }
  };

  state = {};
  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error}/>
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;

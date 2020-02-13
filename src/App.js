import React from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import Weather from "./app_component/weather.component";
import Form from "./app_component/form.component"
import Forecast from "./app_component/forecast.component"

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
      fahrenheit: undefined,
      temp_max: undefined,
      temp_min: undefined,
      f_temp_max: undefined,
      f_temp_min: undefined,
      description: "",
      date: undefined,
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

  getWeather = async (e) => {

    e.preventDefault()

    const city = e.target.elements.city.value
    const country = e.target.elements.country.value

    if (city && country) {
      const api_call = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_key}&q=${city}, ${country}&days=10`
      );
  
      const response = await api_call.json();
  
      console.log(response);
  
      this.setState({
        city: `${response.location.name},${response.location.region}`,
        celsius: response.current.temp_c,
        fahrenheit: response.current.temp_f,
        temp_min: response.forecast.forecastday[0].day.mintemp_c,
        temp_max: response.forecast.forecastday[0].day.maxtemp_c,
        f_temp_min: response.forecast.forecastday[0].day.maxtemp_f,
        f_temp_max: response.forecast.forecastday[0].day.maxtemp_f,
        description: response.forecast.forecastday[0].day.condition.text,
        icon: response.forecast.forecastday[0].day.condition.icon,
        // date: response.forecast.forecastday[1].date,
        date: response.forecast.forecastday.map(day => {
          return (
            <h1>{day}</h1>
          )
        }),
        error: false
      });      
      
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
          f_temp_max={this.state.f_temp_max}
          f_temp_min={this.state.f_temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
        <div>
          <Forecast 
            date={this.state.date}/>
        </div>        
      </div>
    );
  }
}

export default App;

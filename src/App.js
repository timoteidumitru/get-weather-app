import React, { Component } from "react";
import "./App.css";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import Footer from "./components/Footer";

const API_KEY = "02e8d71b0387ff5174b1913ab68d9663";

class App extends Component {
  state = {
    city: undefined,
    country: undefined,
    temperature: undefined,
    humidity: undefined,
    description: undefined,
    icon: undefined,
    error: undefined
  };

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
    );
    const data = await api_call.json();
    if (city && country) {
      this.setState({
        city: data.name,
        country: data.sys.country,
        temperature: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        description: data.weather[0].main,
        icon:
          "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter City and Country!"
      });
    }
    console.log(data);
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="title-container">
                  <Titles />
                </div>
                <div className="form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    icon={this.state.icon}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;

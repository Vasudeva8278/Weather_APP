import React, { Component } from "react";
import Clock from "react-live-clock";
// Assuming the correct filename is Forcast.js
import loader from "./images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";
import Forcast from "./forcast";

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

class Weather extends Component {
  state = {
    lat: 28.67, // Latitude for demo purpose
    lon: 77.22, // Longitude for demo purpose
    city: "Demo City", // Demo city name
    country: "DE", // Demo country code
    temperatureC: 25, // Demo temperature in Celsius
    temperatureF: 77, // Demo temperature in Fahrenheit
    humidity: 60, // Demo humidity percentage
    main: "Clear", // Demo weather condition
    icon: "CLEAR_DAY", // Default icon for demo
  };

  componentDidMount() {
    // Simulate fetching weather data after component mounts
    this.timerID = setInterval(() => {
      this.setState({
        temperatureC: this.generateRandomNumber(10, 30), // Generate random temperature in Celsius
        temperatureF: Math.round(this.state.temperatureC * 1.8 + 32), // Convert Celsius to Fahrenheit
        humidity: this.generateRandomNumber(30, 80), // Generate random humidity percentage
        main: this.getRandomWeatherCondition(), // Randomly select a weather condition
        icon: this.getWeatherIcon(this.state.main), // Get corresponding icon based on weather condition
      });
    }, 600000); // Update every 10 minutes (600,000 milliseconds)
  }

  componentWillUnmount() {
    clearInterval(this.timerID); // Clear interval to prevent memory leaks
  }

  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  getRandomWeatherCondition = () => {
    const weatherConditions = ["Clear", "Clouds", "Rain", "Snow", "Thunderstorm", "Mist"];
    const randomIndex = this.generateRandomNumber(0, weatherConditions.length - 1);
    return weatherConditions[randomIndex];
  };

  getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case "Clear":
        return "CLEAR_DAY";
      case "Clouds":
        return "CLOUDY";
      case "Rain":
      case "Drizzle":
        return "RAIN";
      case "Snow":
        return "SNOW";
      case "Mist":
      case "Fog":
        return "FOG";
      case "Thunderstorm":
        return "WIND";
      default:
        return "CLEAR_DAY";
    }
  };

  render() {
    const { temperatureC, city, country, main, icon } = this.state;

    return (
      <div className="weather-container">
        <div className="city">
          <div className="title">
            <h2>{city}</h2>
            <h3>{country}</h3>
          </div>
          <div className="mb-icon">
            <ReactAnimatedWeather
              icon={icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
            <p>{main}</p>
          </div>
          <div className="date-time">
            <div className="dmy">
              <div id="txt"></div>
              <div className="current-time">
                <Clock format="HH:mm:ss" interval={1000} ticking={true} />
              </div>
              <div className="current-date">{dateBuilder(new Date())}</div>
            </div>
            <div className="temperature">
              <p>
                {temperatureC}°<span>C</span>
              </p>
              {/* Uncomment to display Fahrenheit temperature */}
              {/* <span className="slash">/</span>
              {temperatureF} &deg;F */}
            </div>
          </div>
        </div>
        <Forcast icon={icon} weather={main} />
      </div>
    );
  }
}

export default Weather;

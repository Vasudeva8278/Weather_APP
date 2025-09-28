
import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";
import apiKeys from "./apikeys";



function Forcast(props) {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [weather, setWeather] = useState({});
    const [searchWeather, setSearchWeather] = useState({});
  
    const search = (city) => {
      if (!city || city.trim() === "") return;
      
      axios
        .get(
          `${apiKeys.base}weather?q=${
            city != "[object Object]" ? city : query
          }&units=metric&APPID=${apiKeys.key}`
        )
        .then((response) => {
          setSearchWeather(response.data);
          setQuery("");
          setError("");
        })
        .catch(function (error) {
          console.log(error);
          setSearchWeather({});
          setQuery("");
          setError({ message: "Not Found", query: query });
        });
    };
    function checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      } // add zero in front of numbers < 10
      return i;
    }
  
    const defaults = {
      color: "white",
      size: 112,
      animate: true,
    };
  
    useEffect(() => {
      // Set the weather data from props if available
      if (props.weatherData) {
        setWeather(props.weatherData);
      }
    }, [props.weatherData]);

  
    return (
        
      <div className="forecast">
        <div className="forecast-icon">
          <ReactAnimatedWeather
            icon={props.icon}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
        </div>
        <div className="today-weather">
          <h3>{props.weather}</h3>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search any city"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <div className="img-box">
              {" "}
              <img
                src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
                onClick={search}
              />
            </div>
          </div>
          <ul>
            {typeof weather.main != "undefined" ? (
              <div>
                {" "}
                <li className="cityHead">
                  <p>
                    {weather.name}, {weather.sys.country}
                  </p>
                  <img
                    className="temp"
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  />
                </li>
                <li>
                  Temperature{" "}
                  <span className="temp">
                    {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                  </span>
                </li>
                <li>
                  Humidity{" "}
                  <span className="temp">
                    {Math.round(weather.main.humidity)}%
                  </span>
                </li>
                <li>
                  Visibility{" "}
                  <span className="temp">
                    {Math.round(weather.visibility / 1000)} km
                  </span>
                </li>
                <li>
                  Wind Speed{" "}
                  <span className="temp">
                    {Math.round(weather.wind.speed)} m/s
                  </span>
                </li>
                <li>
                  Pressure{" "}
                  <span className="temp">
                    {Math.round(weather.main.pressure)} hPa
                  </span>
                </li>
              </div>
            ) : typeof searchWeather.main != "undefined" ? (
              <div>
                {" "}
                <li className="cityHead">
                  <p>
                    {searchWeather.name}, {searchWeather.sys.country}
                  </p>
                  <img
                    className="temp"
                    src={`https://openweathermap.org/img/wn/${searchWeather.weather[0].icon}.png`}
                  />
                </li>
                <li>
                  Temperature{" "}
                  <span className="temp">
                    {Math.round(searchWeather.main.temp)}°c ({searchWeather.weather[0].main})
                  </span>
                </li>
                <li>
                  Humidity{" "}
                  <span className="temp">
                    {Math.round(searchWeather.main.humidity)}%
                  </span>
                </li>
                <li>
                  Visibility{" "}
                  <span className="temp">
                    {Math.round(searchWeather.visibility / 1000)} km
                  </span>
                </li>
                <li>
                  Wind Speed{" "}
                  <span className="temp">
                    {Math.round(searchWeather.wind.speed)} m/s
                  </span>
                </li>
                <li>
                  Pressure{" "}
                  <span className="temp">
                    {Math.round(searchWeather.main.pressure)} hPa
                  </span>
                </li>
              </div>
            ) : (
              <li>
                {error.query} {error.message}
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
  export default Forcast;
  
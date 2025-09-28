import React, { Component } from "react";
import axios from "axios";
import apiConfig from "./apikeys";
import Forcast from "./forcast";
import loader from "./images/WeatherIcons.gif";

// List of major cities
const CITIES = [
  { name: "Mumbai", country: "IN" },
  { name: "Delhi", country: "IN" },
  { name: "Bangalore", country: "IN" },
  { name: "Hyderabad", country: "IN" },
  { name: "Chennai", country: "IN" },
  { name: "Kolkata", country: "IN" },
  { name: "Pune", country: "IN" },
  { name: "New York", country: "US" },
  { name: "London", country: "GB" },
  { name: "Tokyo", country: "JP" },
  { name: "Sydney", country: "AU" },
  { name: "Dubai", country: "AE" }
];

class Weather extends Component {
  state = {
    city: "",
    region: "",
    country: "",
    lat: 0,
    lon: 0,
    localtime: "",
    temperatureC: 0,
    temperatureF: 0,
    humidity: 0,
    condition: "",
    conditionIcon: "",
    loading: true,
    weatherData: null,
    feelsLike: 0,
    windSpeed: 0,
    windDir: "",
    windDegree: 0,
    pressure: 0,
    pressureIn: 0,
    precipMm: 0,
    cloud: 0,
    visibility: 0,
    uvIndex: 0,
    gustKph: 0,
    isDay: false,
    lastUpdated: "",
    airQuality: {},
    selectedCity: "Mumbai,IN",
    showMap: false,
    searchQuery: ""
  };

  componentDidMount() {
    this.fetchWeatherData("Mumbai,IN");
  }

  fetchWeatherData = async (query) => {
    this.setState({ loading: true });

    try {
      const response = await axios.get(
        apiConfig.weather.getCurrentWeather(query)
      );

      const { current, location } = response.data;
      
      this.setState({
        city: location.name,
        region: location.region,
        country: location.country,
        lat: location.lat,
        lon: location.lon,
        localtime: location.localtime,
        temperatureC: current.temp_c,
        temperatureF: current.temp_f,
        humidity: current.humidity,
        condition: current.condition.text,
        conditionIcon: current.condition.icon,
        loading: false,
        weatherData: response.data,
        feelsLike: current.feelslike_c,
        windSpeed: current.wind_kph,
        windDir: current.wind_dir,
        windDegree: current.wind_degree,
        pressure: current.pressure_mb,
        pressureIn: current.pressure_in,
        precipMm: current.precip_mm,
        cloud: current.cloud,
        visibility: current.vis_km,
        uvIndex: current.uv,
        gustKph: current.gust_kph,
        isDay: current.is_day === 1,
        lastUpdated: current.last_updated,
        airQuality: current.air_quality || {},
        selectedCity: `${location.name},${location.country}`
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      this.setState({
        loading: false,
        condition: "Error loading weather data"
      });
    }
  };

  handleCityChange = (e) => {
    const [city, country] = e.target.value.split(',');
    this.fetchWeatherData(`${city},${country}`);
  };

  handleSearch = (e) => {
    e.preventDefault();
    if (this.state.searchQuery.trim()) {
      this.fetchWeatherData(this.state.searchQuery.trim());
    }
  };

  handleInputChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    const { 
      city,
      region,
      country,
      temperatureC,
      condition,
      loading,
      feelsLike,
      windSpeed,
      windDir,
      windDegree,
      pressure,
      humidity,
      visibility,
      uvIndex,
      lastUpdated,
      localtime,
      conditionIcon,
      cloud,
      gustKph,
      airQuality,
      selectedCity
    } = this.state;

    if (loading) {
      return (
        <div className="loading-container">
          <img src={loader} alt="Loading..." style={{ width: '100px', height: '100px' }} />
          <p>Loading weather data...</p>
        </div>
      );
    }

    // Format the local time
    const localTime = new Date(localtime);
    const formattedTime = localTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    const formattedDate = localTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div>
        <div className="search-container">
          <select 
            className="city-select"
            value={selectedCity}
            onChange={this.handleCityChange}
          >
            {CITIES.map((city, index) => (
              <option 
                key={index} 
                value={`${city.name},${city.country}`}
              >
                {city.name}, {city.country}
              </option>
            ))}
          </select>
        </div>

        <div className="weather-header">
          <div className="location-info">
            <h1>{city}, {region}, {country}</h1>
            <p className="local-time">{formattedTime} • {formattedDate}</p>
          </div>
          <div className="current-temp">
            <div className="temp-value">{Math.round(temperatureC)}°</div>
            <div className="temp-unit">C</div>
          </div>
        </div>

        <div className="weather-condition">
          <div className="condition-icon">
            {conditionIcon && (
              <img src={`https:${conditionIcon}`} alt={condition} />
            )}
          </div>
          <div className="condition-text">{condition}</div>
          <div className="feels-like">
            Feels like: {Math.round(feelsLike)}°C
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-card">
            <div className="detail-icon">💨</div>
            <div className="detail-content">
              <div className="detail-value">{windSpeed} km/h</div>
              <div className="detail-label">Wind</div>
              <div className="detail-subtext">{windDir} ({windDegree}°)</div>
            </div>
          </div>
          
          <div className="detail-card">
            <div className="detail-icon">💧</div>
            <div className="detail-content">
              <div className="detail-value">{humidity}%</div>
              <div className="detail-label">Humidity</div>
            </div>
          </div>
          
          <div className="detail-card">
            <div className="detail-icon">📊</div>
            <div className="detail-content">
              <div className="detail-value">{pressure} mb</div>
              <div className="detail-label">Pressure</div>
            </div>
          </div>
          
          <div className="detail-card">
            <div className="detail-icon">👁️</div>
            <div className="detail-content">
              <div className="detail-value">{visibility} km</div>
              <div className="detail-label">Visibility</div>
            </div>
          </div>
          
          <div className="detail-card">
            <div className="detail-icon">☀️</div>
            <div className="detail-content">
              <div className="detail-value">{uvIndex}</div>
              <div className="detail-label">UV Index</div>
            </div>
          </div>
          
          <div className="detail-card">
            <div className="detail-icon">🌡️</div>
            <div className="detail-content">
              <div className="detail-value">{Math.round(feelsLike)}°C</div>
              <div className="detail-label">Feels Like</div>
            </div>
          </div>
        </div>

        <div className="air-quality">
          <h3>Air Quality</h3>
          <div className="air-quality-details">
            <div className="air-quality-item">
              <div className="air-quality-value">
                {airQuality['pm2_5'] || '--'}
                <span className="air-quality-unit">µg/m³</span>
              </div>
              <div className="air-quality-label">PM2.5</div>
            </div>
            <div className="air-quality-item">
              <div className="air-quality-value">
                {airQuality['pm10'] || '--'}
                <span className="air-quality-unit">µg/m³</span>
              </div>
              <div className="air-quality-label">PM10</div>
            </div>
            <div className="air-quality-item">
              <div className="air-quality-value">
                {airQuality['us-epa-index'] ? this.getAirQualityText(airQuality['us-epa-index']) : '--'}
              </div>
              <div className="air-quality-label">US AQI</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getAirQualityText = (aqi) => {
    const aqiMap = {
      1: 'Good',
      2: 'Moderate',
      3: 'Unhealthy for Sensitive Groups',
      4: 'Unhealthy',
      5: 'Very Unhealthy',
      6: 'Hazardous'
    };
    return aqiMap[aqi] || 'N/A';
  };
}

export default Weather;

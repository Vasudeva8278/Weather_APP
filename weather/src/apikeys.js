// apikeys.js - API configuration

const API_KEY = 'c4f0c5352aa5437a9fc110901252809';

const apiConfig = {
  weather: {
    baseUrl: 'https://api.weatherapi.com/v1',
    getCurrentWeather: (city) => {
      return `${apiConfig.weather.baseUrl}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`;
    }
  }
};

export default apiConfig;

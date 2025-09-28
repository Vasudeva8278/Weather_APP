# Weather App with Location Selection

A modern React weather application that provides real-time weather information for any location worldwide. The app features location-based weather reporting with an intuitive location picker.

## Features

- 🌍 **Real-time Weather Data**: Get current weather conditions using OpenWeatherMap API
- 📍 **Location Selection**: Choose from popular cities worldwide or use your current location
- 🗺️ **Interactive Location Picker**: Select any city from a predefined list or use GPS
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⏰ **Live Clock**: Real-time clock display with current date
- 🌡️ **Detailed Weather Info**: Temperature, humidity, visibility, wind speed, and pressure
- 🔄 **Auto-refresh**: Weather data updates every 10 minutes

## Technologies Used

- **React 18**: Modern React with hooks and functional components
- **OpenWeatherMap API**: Real-time weather data
- **Axios**: HTTP client for API requests
- **React Animated Weather**: Beautiful weather icons
- **React Live Clock**: Real-time clock component
- **CSS3**: Modern styling with gradients and animations

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## API Configuration

The app uses OpenWeatherMap API for weather data. The API key is configured in `src/apikeys.js`:

```javascript
const apiKeys = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "your_api_key_here",
};
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── apikeys.js          # API configuration
├── App.js              # Main app component
├── App.css             # Main styles
├── currentLocation.js  # Weather display component
├── forcast.js          # Weather details component
├── GoogleMapComponent.js # Location picker component
├── images/             # Weather icons and backgrounds
└── index.js            # App entry point
```

## Features in Detail

### Location Selection
- **Current Location**: Automatically detects your location using browser geolocation
- **City Selection**: Choose from 15+ popular cities worldwide
- **Manual Coordinates**: View exact latitude and longitude coordinates

### Weather Information
- **Current Temperature**: Displayed in Celsius
- **Weather Conditions**: Clear, cloudy, rainy, etc.
- **Additional Details**: Humidity, visibility, wind speed, atmospheric pressure
- **Weather Icons**: Animated weather icons that match current conditions

### User Experience
- **Loading States**: Smooth loading animations while fetching data
- **Error Handling**: Graceful error handling for API failures
- **Responsive Design**: Optimized for all screen sizes
- **Auto-refresh**: Weather data updates automatically every 10 minutes

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- OpenWeatherMap for providing the weather API
- React community for excellent documentation and tools
- All contributors who helped improve this project
import React, { useState } from 'react';

const GoogleMapComponent = ({ onLocationSelect, isVisible, onClose }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [cityName, setCityName] = useState('');

  const predefinedLocations = [
    { name: "Delhi, India", lat: 28.6139, lng: 77.2090 },
    { name: "Mumbai, India", lat: 19.0760, lng: 72.8777 },
    { name: "Bangalore, India", lat: 12.9716, lng: 77.5946 },
    { name: "Kolkata, India", lat: 22.5726, lng: 88.3639 },
    { name: "Chennai, India", lat: 13.0827, lng: 80.2707 },
    { name: "Hyderabad, India", lat: 17.3850, lng: 78.4867 },
    { name: "Pune, India", lat: 18.5204, lng: 73.8567 },
    { name: "Ahmedabad, India", lat: 23.0225, lng: 72.5714 },
    { name: "New York, USA", lat: 40.7128, lng: -74.0060 },
    { name: "London, UK", lat: 51.5074, lng: -0.1278 },
    { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503 },
    { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093 },
    { name: "Paris, France", lat: 48.8566, lng: 2.3522 },
    { name: "Dubai, UAE", lat: 25.2048, lng: 55.2708 },
    { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  ];

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setCityName(location.name);
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
      onClose();
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const location = { lat, lng, name: "Current Location" };
          setSelectedLocation(location);
          setCityName("Current Location");
        },
        (error) => {
          console.error("Error getting current location:", error);
          alert("Unable to get your current location. Please select from the list below.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="map-modal">
      <div className="map-modal-content">
        <div className="map-header">
          <h3>Select Location</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="map-controls">
          <button className="current-location-btn" onClick={getCurrentLocation}>
            📍 Use Current Location
          </button>
          <p className="map-instructions">Select a city from the list below or use your current location</p>
        </div>
        
        <div className="location-list">
          <h4>Popular Cities:</h4>
          <div className="city-grid">
            {predefinedLocations.map((location, index) => (
              <button
                key={index}
                className={`city-btn ${selectedLocation && selectedLocation.name === location.name ? 'selected' : ''}`}
                onClick={() => handleLocationSelect(location)}
              >
                {location.name}
              </button>
            ))}
          </div>
        </div>
        
        {selectedLocation && (
          <div className="selected-location">
            <p><strong>Selected:</strong> {cityName}</p>
            <p><strong>Coordinates:</strong> {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}</p>
          </div>
        )}
        
        <div className="map-footer">
          <button 
            className="confirm-btn" 
            onClick={handleConfirmLocation}
            disabled={!selectedLocation}
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapComponent;

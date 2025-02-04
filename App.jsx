import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS
import stormClouds from './assets/Nature.jpg'; // Import the background image

const App = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('New Delhi');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // Your OpenWeatherMap API key
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    setShowDetails(false);
    try {
      const response = await axios.get(BASE_URL);
      setWeather(response.data);
      setShowDetails(true);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSearch = () => {
    fetchWeather();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="weather-app" style={{ backgroundImage: `url(${stormClouds})` }}>
      <h1>Weather Report</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter location"
      />
      <button onClick={handleSearch}>Search</button>

      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : showDetails && weather && (
        <div className="weather-box">
          <div className="weather-details">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            <p>Humidity: {weather.main.humidity}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

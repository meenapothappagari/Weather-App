

import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import FloodIcon from '@mui/icons-material/Flood';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

const API_KEY = 'edbb32933912451599c150403240807';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
  const [currentDate, setCurrentDate] = useState('');
  const [forecast, setForecast] = useState([]);
  const [historical, setHistorical] = useState([]);

  useEffect(() => {
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[date.getDay()];
    const formattedDate = `${dayName}, ${date.getDate()}, ${date.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);

  const fetchWeatherData = () => {
    if (!city.trim()) {
      setError(new Error('Please enter a valid city name.'));
      return;
    }

    setLoading(true);
    setError(null);
    Promise.all([
      axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`),
      axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5`),
      ...getPreviousDates(3).map(date =>
        axios.get(`http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${date}`)
      )
    ])
      .then(responses => {
        setWeather(responses[0].data);
        setForecast(responses[1].data.forecast.forecastday);
        setHistorical(responses.slice(2).map(response => response.data.forecast.forecastday[0]));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the weather data:', error);
        setError(error);
        setLoading(false);
      });
  };

  const getPreviousDates = days => {
    const dates = [];
    for (let i = 1; i <= days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const formattedDate = date.toISOString().split('T')[0];
      dates.push(formattedDate);
    }
    return dates;
  };

  const toggleUnit = () => setUnit(prevUnit => (prevUnit === 'C' ? 'F' : 'C'));

  const isCloudyOrSunnyCondition = condition => {
    const cloudyConditions = ['Partly cloudy', 'Cloudy', 'Light rain', 'Patchy rain possible'];
    const sunnyConditions = ['Clear', 'Sunny'];
    return cloudyConditions.includes(condition) || sunnyConditions.includes(condition);
  };

  const isRainyCondition = condition => condition === 'Moderate or heavy rain shower';
  const isOvercastCondition = condition => condition === 'Overcast';

  return (
    <div className="App">
      <div className="date-display">{currentDate}</div>

      {/* Search bar */}
      <div className="search-bar">
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter city name" 
        />
        <button onClick={fetchWeatherData}>
          <SearchTwoToneIcon />
        </button>
      </div>

      {/* Toggle unit */}
      <div className="toggle-unit">
        <label>
          <input 
            type="checkbox" 
            checked={unit === 'F'} 
            onChange={toggleUnit} 
          />
          {unit === 'C' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
        </label>
      </div>

      {/* Loading and error handling */}
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {/* Weather info */}
      {weather && (
        <div className="weather-info" style={{ marginRight: '10px' }}>
          <h1>Weather in {weather.location.name}</h1>
          <p>
            Temperature: {unit === 'C' ? weather.current.temp_c : weather.current.temp_f}°{unit}
          </p>
          <p>Condition: {weather.current.condition.text}</p>
          <p>Wind: {weather.current.wind_kph} kph</p>
          <p>Humidity: {weather.current.humidity}%</p>
          {isRainyCondition(weather.current.condition.text) && <FloodIcon />}
          {isOvercastCondition(weather.current.condition.text) && <ThunderstormIcon />}
          {isCloudyOrSunnyCondition(weather.current.condition.text) &&
            (weather.current.condition.text === 'Clear' || weather.current.condition.text === 'Sunny') ? (
              <WbSunnyIcon />
            ) : (
              <CloudIcon />
            )}
        </div>
      )}

      {/* Historical weather */}
      {historical.length > 0 && (
        <div className="historical-weather">
          <div className='head'>
            <h2>Previous 3 Days Weather</h2>
          </div>
          {historical.map((day, index) => (
            <div key={index} className="weather-info">
              <h3>{day.date}</h3>
              <p>Temperature: {unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f}°{unit}</p>
              <p>Condition: {day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Forecast weather */}
      {forecast.length > 0 && (
        <div className="forecast-weather">
          <h2>Next 5 Days Weather</h2>
          {forecast.map((day, index) => (
            <div key={index} className="weather-info">
              <h3>{day.date}</h3>
              <p>Temperature: {unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f}°{unit}</p>
              <p>Condition: {day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

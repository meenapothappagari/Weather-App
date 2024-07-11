import React from 'react';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import FloodIcon from '@mui/icons-material/Flood';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

const WeatherInfo = ({ weather, unit }) => {
  const isCloudyOrSunnyCondition = condition => {
    const cloudyConditions = ['Partly cloudy', 'Cloudy', 'Light rain', 'Patchy rain possible'];
    const sunnyConditions = ['Clear', 'Sunny'];
    return cloudyConditions.includes(condition) || sunnyConditions.includes(condition);
  };

  const isRainyCondition = condition => condition === 'Moderate or heavy rain shower';
  const isOvercastCondition = condition => condition === 'Overcast';

  return (
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
  );
};

export default WeatherInfo;

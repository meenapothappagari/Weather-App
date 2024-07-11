import React from 'react';

const ForecastWeather = ({ forecast, unit }) => {
  return (
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
  );
};

export default ForecastWeather;

import React from 'react';

const HistoricalWeather = ({ historical, unit }) => {
  return (
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
  );
};

export default HistoricalWeather;

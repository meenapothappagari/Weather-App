import React from 'react';

const ToggleButtons = ({ showHistorical, setShowHistorical, showForecast, setShowForecast }) => {
  return (
    <div className="toggle-buttons">
      <button onClick={() => setShowHistorical(!showHistorical)}>
        {showHistorical ? 'Hide Historical Data' : 'Show Historical Data'}
      </button>
      <button onClick={() => setShowForecast(!showForecast)}>
        {showForecast ? 'Hide Forecast Data' : 'Show Forecast Data'}
      </button>
    </div>
  );
};

export default ToggleButtons;

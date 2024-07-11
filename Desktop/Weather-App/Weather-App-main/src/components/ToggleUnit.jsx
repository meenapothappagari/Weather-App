import React from 'react';

const ToggleUnit = ({ unit, toggleUnit }) => {
  return (
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
  );
};

export default ToggleUnit;

// import React from 'react';

// const DateAndSearchBar = ({ currentDate, city, setCity, fetchWeatherData }) => {
//   return (
//     <div className="date-and-search-bar">
//       <div className="date-display">{currentDate}</div>
//       <div className="search-bar">
//         <input
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           placeholder="Enter city name"
//         />
//         <button onClick={fetchWeatherData}>
//           Search
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DateAndSearchBar;

import React from 'react';

const DateAndSearchBar = ({ currentDate }) => {
  return (
    <div className="date-and-search-bar">
      <div className="date-display">{currentDate}</div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default DateAndSearchBar;

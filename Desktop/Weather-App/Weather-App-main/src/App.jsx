
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto';
// import './App.css';
// import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
// import CloudIcon from '@mui/icons-material/Cloud';
// import WbSunnyIcon from '@mui/icons-material/WbSunny';
// import FloodIcon from '@mui/icons-material/Flood';
// import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
// import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// // import Login from './components/Login';

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAG_lZT69CpuqiHIIpPvPJkL908lxSK9Mw",
//   authDomain: "weather-app-dd921.firebaseapp.com",
//   projectId: "weather-app-dd921",
//   storageBucket: "weather-app-dd921.appspot.com",
//   messagingSenderId: "130540674111",
//   appId: "1:130540674111:web:1e828742f3b992c020ec8a",
//   measurementId: "G-6EZ83P1W7J"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// const API_KEY = 'edbb32933912451599c150403240807';

// function App() {
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [city, setCity] = useState('');
//   const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
//   const [currentDate, setCurrentDate] = useState('');
//   const [forecast, setForecast] = useState([]);
//   const [historical, setHistorical] = useState([]);
//   const [monthlyData, setMonthlyData] = useState([]);
//   const [showHistorical, setShowHistorical] = useState(false);
//   const [showForecast, setShowForecast] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const date = new Date();
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const dayName = days[date.getDay()];
//     const formattedDate = `${dayName}, ${date.getDate()}, ${date.getFullYear()}`;
//     setCurrentDate(formattedDate);
//   }, []);

//   const fetchWeatherData = () => {
//     if (!city.trim()) {
//       setError(new Error('Please enter a valid city name.'));
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     Promise.all([
//       axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`),
//       axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5`),
//       ...getPreviousDates(365).map(date =>
//         axios.get(`http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${date}`)
//       )
//     ])
//       .then(responses => {
//         setWeather(responses[0].data);
//         setForecast(responses[1].data.forecast.forecastday);
//         const historicalData = responses.slice(2).map(response => response.data.forecast.forecastday[0]);
//         setHistorical(historicalData);
//         setMonthlyData(calculateMonthlyAverages(historicalData));
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching the weather data:', error);
//         setError(error);
//         setLoading(false);
//       });
//   };

//   const getPreviousDates = days => {
//     const dates = [];
//     for (let i = 1; i <= days; i++) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       const formattedDate = date.toISOString().split('T')[0];
//       dates.push(formattedDate);
//     }
//     return dates;
//   };

//   const toggleUnit = () => setUnit(prevUnit => (prevUnit === 'C' ? 'F' : 'C'));

//   const isCloudyOrSunnyCondition = condition => {
//     const cloudyConditions = ['Partly cloudy', 'Cloudy', 'Light rain', 'Patchy rain possible'];
//     const sunnyConditions = ['Clear', 'Sunny'];
//     return cloudyConditions.includes(condition) || sunnyConditions.includes(condition);
//   };

//   const isRainyCondition = condition => condition === 'Moderate or heavy rain shower';
//   const isOvercastCondition = condition => condition === 'Overcast';

//   const calculateMonthlyAverages = (historicalData) => {
//     const monthlyData = {};

//     historicalData.forEach(day => {
//       const date = new Date(day.date);
//       const month = date.getMonth();
//       const year = date.getFullYear();
//       const key = `${year}-${month}`;

//       if (!monthlyData[key]) {
//         monthlyData[key] = { sumTemp: 0, count: 0 };
//       }

//       const temp = unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f;
//       monthlyData[key].sumTemp += temp;
//       monthlyData[key].count += 1;
//     });

//     const averages = [];
//     for (const key in monthlyData) {
//       const [year, month] = key.split('-');
//       averages.push({
//         month: new Date(year, month, 1).toLocaleString('default', { month: 'long' }),
//         avgTemp: monthlyData[key].sumTemp / monthlyData[key].count,
//       });
//     }

//     return averages;
//   };

//   const getTemperatureData = () => {
//     const labels = monthlyData.map(data => data.month);
//     const data = monthlyData.map(data => data.avgTemp);
//     return {
//       labels,
//       datasets: [
//         {
//           label: `Average Temperature (${unit})`,
//           data,
//           fill: false,
//           backgroundColor: 'black', // Black dots
//           borderColor: 'black', // Black dots
//           pointBackgroundColor: 'red', // Black dots
//           pointBorderColor: 'white', // Black dots
//           pointHoverBackgroundColor: 'blue', // Black dots on hover
//           pointHoverBorderColor: 'pink', // Black dots on hover
//           pointRadius: 5, // Dot size
//           pointHoverRadius: 15, // Dot size on hover
//           pointHitRadius: 7, // Dot hit radius
//           color:'white',
          
//         },
//       ],
//       options: {
//         scales: {
//           x: {
//             grid: {
//               color: 'red', // Red grid lines
//             },
//           },
//           y: {
//             grid: {
//               color: 'red', // Red grid lines
//             },
//           },
//         },
//       },
//     };
//   };

//   const handleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       setUser(result.user);
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         setUser(null);
//       })
//       .catch(error => {
//         console.error('Error during logout:', error);
//       });
//   };

//   return (
//     <div className="App">
//       <div className="date-display">{currentDate}</div>

//       {/* Search bar */}
//       <div className="search-bar">
//         <input
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           placeholder="Enter city name"
//         />
//         <button onClick={fetchWeatherData}>
//           <SearchTwoToneIcon />
//         </button>
//       </div>

//       {/* Toggle unit */}
//       <div className="toggle-unit">
//         <label>
//           <input
//             type="checkbox"
//             checked={unit === 'F'}
//             onChange={toggleUnit}
//           />
//           {unit === 'C' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
//         </label>
//       </div>

//       {/* Loading and error handling */}
//       {loading && <div>Loading...</div>}
//       {error && <div>Error: {error.message}</div>}

//       {/* Weather info */}
//       {weather && (
//         <div className="weather-info" style={{ marginRight: '10px' }}>
//           <h1>Weather in {weather.location.name}</h1>
//           <p>
//             Temperature: {unit === 'C' ? weather.current.temp_c : weather.current.temp_f}°{unit}
//           </p>
//           <p>Condition: {weather.current.condition.text}</p>
//           <p>Wind: {weather.current.wind_kph} kph</p>
//           <p>Humidity: {weather.current.humidity}%</p>
//           {isRainyCondition(weather.current.condition.text) && <FloodIcon />}
//           {isOvercastCondition(weather.current.condition.text) && <ThunderstormIcon />}
//           {isCloudyOrSunnyCondition(weather.current.condition.text) &&
//             (weather.current.condition.text === 'Clear' || weather.current.condition.text === 'Sunny') ? (
//             <WbSunnyIcon />
//           ) : (
//             <CloudIcon />
//           )}
//         </div>
//       )}

//       {/* Toggle buttons for historical and forecast data */}
//       <div className="toggle-buttons">
//         <button onClick={() => setShowHistorical(!showHistorical)}>
//           {showHistorical ? 'Hide Historical Data' : 'Show Historical Data'}
//         </button>
//         <button onClick={() => setShowForecast(!showForecast)}>
//           {showForecast ? 'Hide Forecast Data' : 'Show Forecast Data'}
//         </button>
//       </div>

//       {/* Historical weather */}
//       {showHistorical && historical.length > 0 && (
//         <div className="historical-weather">
//           <div className='head'>
//             <h2>Previous 3 Days Weather</h2>
//           </div>
//           {historical.map((day, index) => (
//             <div key={index} className="weather-info">
//               <h3>{day.date}</h3>
//               <p>Temperature: {unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f}°{unit}</p>
//               <p>Condition: {day.day.condition.text}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Forecast weather */}
//       {showForecast && forecast.length > 0 && (
//         <div className="forecast-weather">
//           <h2>Next 5 Days Weather</h2>
//           {forecast.map((day, index) => (
//             <div key={index} className="weather-info">
//               <h3>{day.date}</h3>
//               <p>Temperature: {unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f}°{unit}</p>
//               <p>Condition: {day.day.condition.text}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Monthly Temperature Line Graph */}
//       {monthlyData.length > 0 && (
//         <div className="monthly-temperature-graph">
//           <h2>Monthly Temperature Data</h2>
//           <Line data={getTemperatureData()} />
//         </div>
//       )}

//       {/* Login/Logout button */}
//       <div className="auth-buttons">
//         {user ? (
//           <button onClick={handleLogout}>Logout</button>
//         ) : (
//           <button onClick={handleLogin}>Login with Google</button>
//         )}
//         {user && <p>Welcome, {user.displayName}</p>}
//       </div>
//     </div>
//   );
// }

// export default App;

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto';
// import './App.css';
// import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
// import CloudIcon from '@mui/icons-material/Cloud';
// import WbSunnyIcon from '@mui/icons-material/WbSunny';
// import FloodIcon from '@mui/icons-material/Flood';
// import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
// import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
// import { initializeApp } from "firebase/app";

// // Firebase configuration

// const firebaseConfig = {
//   apiKey: "AIzaSyAG_lZT69CpuqiHIIpPvPJkL908lxSK9Mw",
//   authDomain: "weather-app-dd921.firebaseapp.com",
//   projectId: "weather-app-dd921",
//   storageBucket: "weather-app-dd921.appspot.com",
//   messagingSenderId: "130540674111",
//   appId: "1:130540674111:web:1e828742f3b992c020ec8a",
//   measurementId: "G-6EZ83P1W7J"
// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// const API_KEY = 'edbb32933912451599c150403240807';

// function App() {
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [city, setCity] = useState('');
//   const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
//   const [currentDate, setCurrentDate] = useState('');
//   const [forecast, setForecast] = useState([]);
//   const [historical, setHistorical] = useState([]);
//   const [monthlyData, setMonthlyData] = useState([]);
//   const [showHistorical, setShowHistorical] = useState(false);
//   const [showForecast, setShowForecast] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const date = new Date();
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const dayName = days[date.getDay()];
//     const formattedDate = `${dayName}, ${date.getDate()}, ${date.getFullYear()}`;
//     setCurrentDate(formattedDate);
//   }, []);

//   const fetchWeatherData = () => {
//     if (!city.trim()) {
//       setError(new Error('Please enter a valid city name.'));
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     Promise.all([
//       axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`),
//       axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5`),
//       ...getPreviousDates(365).map(date =>
//         axios.get(`http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${date}`)
//       )
//     ])
//       .then(responses => {
//         setWeather(responses[0].data);
//         setForecast(responses[1].data.forecast.forecastday);
//         const historicalData = responses.slice(2).map(response => response.data.forecast.forecastday[0]);
//         setHistorical(historicalData);
//         setMonthlyData(calculateMonthlyAverages(historicalData));
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching the weather data:', error);
//         setError(error);
//         setLoading(false);
//       });
//   };

//   const getPreviousDates = days => {
//     const dates = [];
//     for (let i = 1; i <= days; i++) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       const formattedDate = date.toISOString().split('T')[0];
//       dates.push(formattedDate);
//     }
//     return dates;
//   };

//   const toggleUnit = () => setUnit(prevUnit => (prevUnit === 'C' ? 'F' : 'C'));

//   const isCloudyOrSunnyCondition = condition => {
//     const cloudyConditions = ['Partly cloudy', 'Cloudy', 'Light rain', 'Patchy rain possible'];
//     const sunnyConditions = ['Clear', 'Sunny'];
//     return cloudyConditions.includes(condition) || sunnyConditions.includes(condition);
//   };

//   const isRainyCondition = condition => condition === 'Moderate or heavy rain shower';
//   const isOvercastCondition = condition => condition === 'Overcast';

//   const calculateMonthlyAverages = (historicalData) => {
//     const monthlyData = {};

//     historicalData.forEach(day => {
//       const date = new Date(day.date);
//       const month = date.getMonth();
//       const year = date.getFullYear();
//       const key = `${year}-${month}`;

//       if (!monthlyData[key]) {
//         monthlyData[key] = { sumTemp: 0, count: 0 };
//       }

//       const temp = unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f;
//       monthlyData[key].sumTemp += temp;
//       monthlyData[key].count += 1;
//     });

//     const averages = [];
//     for (const key in monthlyData) {
//       const [year, month] = key.split('-');
//       averages.push({
//         month: new Date(year, month, 1).toLocaleString('default', { month: 'long' }),
//         avgTemp: monthlyData[key].sumTemp / monthlyData[key].count,
//       });
//     }

//     return averages;
//   };

//   const getTemperatureData = () => {
//     const labels = monthlyData.map(data => data.month);
//     const data = monthlyData.map(data => data.avgTemp);
//     return {
//       labels,
//       datasets: [
//         {
//           label: `Average Temperature (${unit})`,
//           data,
//           fill: false,
//           backgroundColor: 'black', // Black dots
//           borderColor: 'black', // Black dots
//           pointBackgroundColor: 'red', // Black dots
//           pointBorderColor: 'white', // Black dots
//           pointHoverBackgroundColor: 'blue', // Black dots on hover
//           pointHoverBorderColor: 'pink', // Black dots on hover
//           pointRadius: 5, // Dot size
//           pointHoverRadius: 15, // Dot size on hover
//           pointHitRadius: 7, // Dot hit radius
//           color:'white',
          
//         },
//       ],
//       options: {
//         scales: {
//           x: {
//             grid: {
//               color: 'red', // Red grid lines
//             },
//           },
//           y: {
//             grid: {
//               color: 'red', // Red grid lines
//             },
//           },
//         },
//       },
//     };
//   };


//   const handleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       setUser(result.user);
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         setUser(null);
//       })
//       .catch(error => {
//         console.error('Error during logout:', error);
//       });
//   };

//   return (
//     <div className="App">
//       <div className="date-display">{currentDate}</div>

//       {/* Search bar */}
//       <div className="search-bar">
//         <input
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           placeholder="Enter city name"
//         />
//         <button onClick={fetchWeatherData}>
//           <SearchTwoToneIcon />
//         </button>
//       </div>

//       {/* Toggle unit */}
//       <div className="toggle-unit">
//         <label>
//           <input
//             type="checkbox"
//             checked={unit === 'F'}
//             onChange={toggleUnit}
//           />
//           {unit === 'C' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
//         </label>
//       </div>

//       {/* Loading and error handling */}
//       {loading && <div>Loading...</div>}
//       {error && <div>Error: {error.message}</div>}

//       {/* Weather info */}
//       {weather && (
//         <div className="weather-info" style={{ marginRight: '10px' }}>
//           <h1>Weather in {weather.location.name}</h1>
//           <p>
//             Temperature: {unit === 'C' ? weather.current.temp_c : weather.current.temp_f}°{unit}
//           </p>
//           <p>Condition: {weather.current.condition.text}</p>
//           <p>Wind: {weather.current.wind_kph} kph</p>
//           <p>Humidity: {weather.current.humidity}%</p>
//           {isRainyCondition(weather.current.condition.text) && <FloodIcon />}
//           {isOvercastCondition(weather.current.condition.text) && <ThunderstormIcon />}
//           {isCloudyOrSunnyCondition(weather.current.condition.text) &&
//             (weather.current.condition.text === 'Clear' || weather.current.condition.text === 'Sunny') ? (
//             <WbSunnyIcon />
//           ) : (
//             <CloudIcon />
//           )}
//         </div>
//       )}

//       {/* Toggle buttons for historical and forecast data */}
//       <div className="toggle-buttons">
//         <button onClick={() => setShowHistorical(!showHistorical)}>
//           {showHistorical ? 'Hide Historical Data' : 'Show Historical Data'}
//         </button>
//         <button onClick={() => setShowForecast(!showForecast)}>
//           {showForecast ? 'Hide Forecast Data' : 'Show Forecast Data'}
//         </button>
//       </div>

//       {/* Historical weather */}
//       {showHistorical && historical.length > 0 && (
//         <div className="historical-weather">
//           <div className='head'>
//             <h2>Previous 3 Days Weather</h2>
//           </div>
//           {historical.map((day, index) => (
//             <div key={index} className="weather-info">
//               <h3>{day.date}</h3>
//               <p>Temperature: {unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f}°{unit}</p>
//               <p>Condition: {day.day.condition.text}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Forecast weather */}
//       {showForecast && forecast.length > 0 && (
//         <div className="forecast-weather">
//           <h2>Next 5 Days Weather</h2>
//           {forecast.map((day, index) => (
//             <div key={index} className="weather-info">
//               <h3>{day.date}</h3>
//               <p>Temperature: {unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f}°{unit}</p>
//               <p>Condition: {day.day.condition.text}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Monthly Temperature Line Graph */}
//       {monthlyData.length > 0 && (
//         <div className="monthly-temperature-graph">
//           <h2>Monthly Temperature Data</h2>
//           <Line data={getTemperatureData()} />
//         </div>
//       )}

//       {/* Login/Logout button */}
//       <div className="auth-buttons">
//         {user ? (
//           <button onClick={handleLogout}>Logout</button>
//         ) : (
//           <button onClick={handleLogin}>Login with Google</button>
//         )}
//         {user && <p>Welcome, {user.displayName}</p>}
//       </div>
//     </div>
//   );
// }

// export default App;



import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './App.css';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import FloodIcon from '@mui/icons-material/Flood';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAG_lZT69CpuqiHIIpPvPJkL908lxSK9Mw",
  authDomain: "weather-app-dd921.firebaseapp.com",
  projectId: "weather-app-dd921",
  storageBucket: "weather-app-dd921.appspot.com",
  messagingSenderId: "130540674111",
  appId: "1:130540674111:web:1e828742f3b992c020ec8a",
  measurementId: "G-6EZ83P1W7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

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
  const [monthlyData, setMonthlyData] = useState([]);
  const [showHistorical, setShowHistorical] = useState(false);
  const [showForecast, setShowForecast] = useState(false);
  const [user, setUser] = useState(null);

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
      ...getPreviousDates(365).map(date =>
        axios.get(`http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${date}`)
      )
    ])
      .then(responses => {
        setWeather(responses[0].data);
        setForecast(responses[1].data.forecast.forecastday);
        const historicalData = responses.slice(2).map(response => response.data.forecast.forecastday[0]);
        setHistorical(historicalData);
        setMonthlyData(calculateMonthlyAverages(historicalData));
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

  const calculateMonthlyAverages = (historicalData) => {
    const monthlyData = {};

    historicalData.forEach(day => {
      const date = new Date(day.date);
      const month = date.getMonth();
      const year = date.getFullYear();
      const key = `${year}-${month}`;

      if (!monthlyData[key]) {
        monthlyData[key] = { sumTemp: 0, count: 0 };
      }

      const temp = unit === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f;
      monthlyData[key].sumTemp += temp;
      monthlyData[key].count += 1;
    });

    const averages = [];
    for (const key in monthlyData) {
      const [year, month] = key.split('-');
      averages.push({
        month: new Date(year, month, 1).toLocaleString('default', { month: 'long' }),
        avgTemp: monthlyData[key].sumTemp / monthlyData[key].count,
      });
    }

    return averages;
  };

  const getTemperatureData = () => {
    const labels = monthlyData.map(data => data.month);
    const data = monthlyData.map(data => data.avgTemp);
    return {
      labels,
      datasets: [
        {
          label: `Average Temperature (${unit})`,
          data,
          fill: false,
          backgroundColor: 'black', // Black dots
          borderColor: 'black', // Black dots
          pointBackgroundColor: 'red', // Black dots
          pointBorderColor: 'white', // Black dots
          pointHoverBackgroundColor: 'blue', // Black dots on hover
          pointHoverBorderColor: 'pink', // Black dots on hover
          pointRadius: 5, // Dot size
          pointHoverRadius: 15, // Dot size on hover
          pointHitRadius: 7, // Dot hit radius
          color:'white',
        },
      ],
      options: {
        scales: {
          x: {
            grid: {
              color: 'red', // Red grid lines
            },
          },
          y: {
            grid: {
              color: 'red', // Red grid lines
            },
          },
        },
      },
    };
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.error('The popup was closed by the user before completing the sign-in.');
        alert('The popup was closed before completing the sign-in. Please try again.');
      } else {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  };

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

      {/* Toggle buttons for historical and forecast data */}
      <div className="toggle-buttons">
        <button onClick={() => setShowHistorical(!showHistorical)}>
          {showHistorical ? 'Hide Historical Data' : 'Show Historical Data'}
        </button>
        <button onClick={() => setShowForecast(!showForecast)}>
          {showForecast ? 'Hide Forecast Data' : 'Show Forecast Data'}
        </button>
      </div>

      {/* Historical weather */}
      {showHistorical && historical.length > 0 && (
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
      {showForecast && forecast.length > 0 && (
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

      {/* Monthly Temperature Line Graph */}
      {monthlyData.length > 0 && (
        <div className="monthly-temperature-graph">
          <h2>Monthly Temperature Data</h2>
          <Line data={getTemperatureData()} />
        </div>
      )}

      {/* Login/Logout button */}
      <div className="auth-buttons">
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login with Google</button>
        )}
        {user && <p>Welcome, {user.displayName}</p>}
      </div>
    </div>
  );
}

export default App;

// src/App.jsx


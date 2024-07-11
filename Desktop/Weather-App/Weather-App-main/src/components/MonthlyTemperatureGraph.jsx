import React from 'react';
import { Line } from 'react-chartjs-2';

const MonthlyTemperatureGraph = ({ monthlyData, unit }) => {
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

  return (
    <div className="monthly-temperature-graph">
      <h2>Monthly Temperature Data</h2>
      <Line data={getTemperatureData()} />
    </div>
  );
};

export default MonthlyTemperatureGraph;

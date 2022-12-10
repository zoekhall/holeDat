import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)



const StatsChart = () => {

  type chart = {
    labels: string[];
    datasets: { label: string, data: number[], borderColor: string, backgroundColor: string}[];
  };

  const [chartData, setChartData] = useState<chart>();

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          label: "Potholes added by day of the week",
          data: [3, 5, 2, 14, 5, 2, 7],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.4)',
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Potholes Added by Day of the Week'
        }
      }
    })
  }, [])

  return (
    <div>
      <Bar options={chartOptions} data={chartData}/>
    </div>
  )
}

export default StatsChart;

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const StatsChart = () => {
  type chart = {
    labels: string[];
    datasets: { label: string; data: number[]; borderColor: string; backgroundColor: string }[];
  };
  const [chartData, setChartData] = useState<chart>({ labels: [], datasets: [] });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ['Days Ago', '1 Day Ago', 'Today'],
      datasets: [
        {
          label: 'Potholes added by day of the week',
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
          position: 'top',
        },
        title: {
          display: true,
          text: 'Potholes Added by Day of the Week',
        },
      },
    });
  }, []);

  return <Bar options={chartOptions} data={chartData} />;
};

export default StatsChart;

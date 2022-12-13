import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const StatsChart = () => {
  const [users, setUsers] = useState<number[]>([]);
  const [count, setCount] = useState<number[]>([]);

  const statsImgs = () => {
    axios
      .get('/api/imgs/stats')
      .then((data) => {
        const userData: number[] = data.data.map((i) => {
          return i.userUserId;
        });
        setUsers(userData);
        const countData: number[] = data.data.map((i) => {
          return i.count;
        });
        setCount(countData);
        // console.log(countData, userData);
        return userData;
      })
      .then((data) => axios.get('/api/user/users', { params: data }))
      .catch((err) => console.log(err));
  };

  useEffect(statsImgs, []);

  return (
    <Bar
      options={{
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
      }}
      data={{
        labels: users,
        datasets: [
          {
            label: 'Potholes added by day of the week',
            data: count,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.4)',
          },
        ],
      }}
    />
  );
};

export default StatsChart;

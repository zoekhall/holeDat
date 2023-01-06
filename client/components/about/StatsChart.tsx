import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const StatsChart = () => {
  const [users, setUsers] = useState<{ [key: string]: string | undefined }[]>([]);

  const statsImgs = () => {
    axios
      .get('/api/imgs/stats')
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(statsImgs, []);

  return (
    <div className='chart'>
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
          labels: users.map((user) => user.name),
          datasets: [
            {
              label: 'Potholes added by day of the week',
              data: users.map((user) => user.count),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: [
                'rgba(201, 176, 55, 0.5)',
                'rgba(180, 180, 180, 0.5)',
                'rgba(106, 56, 5, 0.5)',
              ],
            },
          ],
        }}
      />
      <div className='chart-images'>
        {users.map((user) => (
          <Link key={user.user_id} to={'/User:' + user.user_id}>
            <img src={user.photo} referrerPolicy='no-referrer' />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StatsChart;

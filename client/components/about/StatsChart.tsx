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
    <div id='user-chart' className='chart'>
      <h2>Top Users</h2>
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
          labels: users.map(() => ''),
          datasets: [
            {
              label: 'Potholes added by day of the week',
              data: users.map((user) => user.count),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: [
                '#E07A5F',
                '#3D405B',
                '#81B29A',
              ],
            },
          ],
        }}
      />
      <div className='chart-images'>
        {users.map((user, i) => (
          <Link key={user.user_id} to={'/User:' + user.user_id}>
            <img src={user.photo} referrerPolicy='no-referrer' />
            <p>{users[i].name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StatsChart;

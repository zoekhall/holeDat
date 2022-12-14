import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const StatsChart = () => {
  const [users, setUsers] = useState<any>([]);

  const statsImgs = () => {
    axios
      .get('/api/imgs/stats')
      .then((data) => {
        setUsers(data.data.reverse());
      })
      .catch((err) => console.log(err));
    console.log(users);
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
              backgroundColor: 'rgba(53, 162, 235, 0.4)',
            },
          ],
        }}
      />
      <div className='chart-images'>
        {users.map((user) => (
          <img width={50} key={user.user_id} src={user.photo} referrerPolicy='no-referrer' />
        ))}
      </div>
    </div>
  );
};

export default StatsChart;

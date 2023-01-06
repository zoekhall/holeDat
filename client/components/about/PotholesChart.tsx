import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Link } from 'react-router-dom'

ChartJS.register(CategoryScale, LinearScale, BarElement);
interface element {
  pothole_id: number;
  count: number;
  photoURL: string;
}

const PotholesChart = () => {
  const [potholes, setPotholes] = useState<element[]>([]);

  const phstatsImgs = () => {
    axios
      .get('/api/imgs/phstats')
      .then((data) => {
        setPotholes(data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(phstatsImgs, []);

  return (
    <div className='chart'>
      <Bar
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Potholes Added by Day of the Week',
            },
            legend: {
              position: 'top',
            },
          },
        }}
        data={{
          labels: ['1st', '2nd', '3rd'],
          datasets: [
            {
              label: 'Potholes added by day of the week',
              data: potholes.map((pothole) => pothole.count),
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
        {potholes.map((pothole) => (
          <Link
            key={pothole.pothole_id}
            to={`/Pothole:${pothole.pothole_id}`}
          >
            <img
              src={pothole.photoURL}
              referrerPolicy='no-referrer'
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PotholesChart;

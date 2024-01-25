import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";

const UserData = [
  {
    id: 1,
    year: 2016,
    pageViews: 100,
  },
  {
    id: 2,
    year: 2017,
    pageViews: 256,
  },
  {
    id: 3,
    year: 2018,
    pageViews: 188,
  },
  {
    id: 4,
    year: 2019,
    pageViews: 200,
  },
  {
    id: 5,
    year: 2020,
    pageViews: 143,
  },
  {
    id: 6,
    year: 2021,
    pageViews: 200,
  },
  {
    id: 7,
    year: 2022,
    pageViews: 250,
  },
  {
    id: 8,
    year: 2022,
    pageViews: 350,
  },
  {
    id: 9,
    year: 2022,
    pageViews: 450,
  },
];

const AnalyticsGraphCard = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: 'Page Views',
        data: UserData.map((data) => data.pageViews),
        fill: false,
        borderColor: '#ec4899',
        pointRadius: 2,
      },
    ],
  });

  const options = {
    scales: {
      x: {
        grid: {
          display: true,
        },
        title: {
          display: false,
          text: 'Year',
        },
      },
      y: {
        grid: {
          display: true,
        },
        title: {
          display: false,
          text: 'Page Views',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
    },
  };


  return (
    <>
      <div className="w-full flex flex-col bg-zinc-800 rounded-2xl">
        <div className="w-full h-full bg-[#212325] p-6 rounded-t-2xl">
          <Line data={userData} options={options} className='w-4/5'/>
        </div>
        <div className="w-full h-full flex bg-zinc-800 p-8 rounded-b-2xl">
          <div className="w-2/3 p-4">
            <p className="font-semibold">Page Views</p>
            <p className="font-semibold text-lg">{userData.datasets[0].data.reduce((a, b) => a + b, 0)}</p>
            <p className="text-light text-sm">Share your link and put it in your social bio to capture more traffic.</p>
          </div>
          {/* You can add more data-related information here */}
        </div>
      </div>
    </>
  );
};

export default AnalyticsGraphCard;

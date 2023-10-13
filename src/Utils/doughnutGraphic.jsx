import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import '../CSS/css.css'

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const options = {
    responsive: true,
    aspectRatio: 1,
    maintainAspectRatio: false,
    plugins: {
      legend: {
          display: true,
          position: "right"
      },
      title: {
          display: true,
          text: 'Inadimplência',
          color: '#000',
          font: {
              size: '16px',
              weight: 'normal',
          },
          align: 'start',
      },
    },
};

export function DoughnutGraphic({ dados, label, text_percentage }) {

  const data = {
    labels: label[0],
    datasets: [
      {
        label: "Valor a ser pago",
        data: dados[0],
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
  <>  
    <Doughnut options={options} data={data}/>
    <div className='center_text'>{text_percentage}</div>
  </>
  );
}

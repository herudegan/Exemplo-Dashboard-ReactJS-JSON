import React, { setState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import '../CSS/css.css'

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const options = {
    responsive: true,
    aspectRatio: 1,
    maintainAspectRatio: false,
    cutout: 100,
    plugins: {
      legend: {
          display: true,
          position: "left"
      },
      title: {
          display: true,
          text: 'Entradas X Saidas',
          color: '#000',
          font: {
              size: '16px',
              weight: 'normal',
          },
          align: 'start',
      },
    },
};

export function DoughnutGraphic2({ dados, label, entrada }) {

  const data = {
    labels: label[0],
    datasets: [
      {
        data: dados[0],
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>  
      <Doughnut options={options} data={data}/>
      <div className='center_text_2'>R$ {entrada}</div>
    </>
    );
}

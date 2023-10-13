import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import * as Data from '../Back/empresas.json'

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

export const options = {
  responsive: true,
  scales: {
    y: {
      suggestedMin: 15000
    }
  },
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

export function LineGraphic({ antiga, nova, label }) {

  const data = {
    labels: label[0],
    datasets: [
      {
        label: 'Semana Passada',
        data: antiga[0],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Semana Atual',
        data: nova[0],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <>
      Vendas Comparativo Semanal (R$)
      <Line options={options} data={data} />;
    </>
  )
}

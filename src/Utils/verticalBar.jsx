import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import * as Data from '../Back/empresas.json'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
        display: false
    },
    title: {
        display: true,
        text: 'Média Vendas por Hora (QTDE x DIA)',
        color: '#000',
        font: {
            size: '16px',
            weight: 'normal',
        },
        align: 'start'
    },
  },
};

export function VerticalBar({ dados, label }) {

  const data = {
    labels: label[0],
    datasets: [
      {
        label: 'Média de vendas',
        data: dados[0],
        backgroundColor: '#7534aa',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

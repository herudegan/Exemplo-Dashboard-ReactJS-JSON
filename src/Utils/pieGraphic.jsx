import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import * as Data from '../Back/empresas.json'

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    responsive: true,
    aspectRatio: 1,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    }
};

var labels = Data.cermaq[0].bandeiras.map((x) => {
  return x.nome
})


export function PieGraphic(dados) {
  const data = {
    labels,
    datasets: [
      {
        data: dados.dados[0],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>  
        Vendas por Bandeiras Mês
        <Pie data={data} options={options} style={{paddingBottom: '10px'}}/>
    </>
  )
}

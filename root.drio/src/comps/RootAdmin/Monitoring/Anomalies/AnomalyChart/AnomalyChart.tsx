import { useState } from "react";
import {
  Title,
  Legend,
  Tooltip,
  BarElement,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js";

import { faker } from "@faker-js/faker";
import { Bar, Chart, Line } from "react-chartjs-2";

const chart = ChartJS.register(
  Title,
  Legend,
  Tooltip,
  BarElement,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale
);

export const options = {
  responsive: true,
  barPercentage: 0.6,
  categoryPercentage: 1,
  maintainAspectRatio: false,

  scales: {
    y: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },

    x: {
      ticks: {
        display: false,
      },
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
  },

  plugins: {
    legend: {
      display: false,
    },

    title: {
      display: false,
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const data = {
  labels,

  datasets: [
    {
      label: "Anomaly",
      borderColor: "#FF395C",
      backgroundColor: "#FF395C",
      data: labels.map(() => faker.number.int({ min: 10000, max: 90000 })),
    },
  ],
};

const AnomalyChart = () => {
  return (
    <div className="p-4 bg-white rounded-md">
      <Line options={options} data={{ ...data }} />
    </div>
  );
};

export default AnomalyChart;

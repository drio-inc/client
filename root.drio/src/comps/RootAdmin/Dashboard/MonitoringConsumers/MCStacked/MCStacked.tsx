import React from "react";

import {
  Title,
  Legend,
  Tooltip,
  BarElement,
  LinearScale,
  ChartOptions,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  categoryPercentage: 0.6,
  maintainAspectRatio: false,

  plugins: {
    title: {
      display: false,
    },

    legend: {
      display: false,
    },
  },

  scales: {
    x: {
      stacked: true,
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
    y: {
      stacked: true,
      border: {
        display: false,
        dash: [5],
      },
      grid: {
        z: 10000,
        color: "rgba(34,51,84,0.4)",
      },
    },
  },
};

const labels = ["1hr", "2hr", "3hr", "4hr", "5hr", "6hr", "7hr", "8hr", "9hr"];

export const data = {
  labels,
  datasets: [
    {
      borderRadius: 5,
      label: "Dataset 1",
      backgroundColor: "#6FCF97",
      data: labels.map(() => Math.floor(Math.random() * 20)),
    },
    {
      borderRadius: 5,
      label: "Dataset 2",
      backgroundColor: "#F79009",
      data: labels.map(() => Math.floor(Math.random() * 20)),
    },
    {
      borderRadius: 5,
      label: "Dataset 3",
      backgroundColor: "#42B9F4",
      data: labels.map(() => Math.floor(Math.random() * 20)),
    },
  ],
};

export default function DPRStacked() {
  return (
    <div className="w-full h-full">
      <Bar options={options} data={data} />
    </div>
  );
}

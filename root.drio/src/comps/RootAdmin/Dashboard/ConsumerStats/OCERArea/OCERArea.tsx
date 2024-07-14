import React from "react";
import { Line } from "react-chartjs-2";

import {
  Title,
  Tooltip,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  ChartOptions,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js";

ChartJS.register(
  Title,
  Filler,
  Legend,
  Tooltip,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

export const options = {
  tension: 0.5,
  pointRadius: 0,
  responsive: true,

  scales: {
    y: {
      border: {
        display: false,
        dash: [5],
      },
      grid: {
        z: 10000,
        color: "rgba(34,51,84,0.4)",
      },
    },

    x: {
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

const labels = ["1hr", "2hr", "3hr", "4hr", "5hr", "6hr", "7hr", "8hr", "9hr", "10hr", "11hr"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Consumer 1",
      borderColor: "rgba(255, 139, 140, 1)",
      backgroundColor: "rgba(255, 139, 140, 0.2)",
      data: [20, 5, 40, 25, 56, 45, 65, 38, 78, 5, 10],
    },
  ],
};

export default function OCERArea() {
  return (
    <div className="p-4 bg-white -mx-4">
      <div className="flex flex-wrap justify-between">
        <h2 className="text-[#223354] text-2xl font-semibold mb-4">
          Overall Consumer Error Rate %
        </h2>
      </div>
      <div className="flex items-center gap-x-4 border p-4 rounded-md mb-4">
        <div className="border-[6px] border-drio-red w-12 h-12 rounded-full" />
        <div className="flex flex-col text-gray-700">
          <span>
            <span className="font-bold font-inter">9</span> Messages
          </span>
          <span>Max Lag in Last 24 Hours</span>
        </div>
      </div>
      {data.datasets.map((dataset, index) => (
        <div key={index} className="flex items-center mb-2">
          <div
            className="w-8 h-[10px] rounded mr-2"
            style={{
              backgroundColor: dataset.borderColor,
            }}
          ></div>
          <p className="text-[#223354] text-sm font-semibold">{dataset.label}</p>
        </div>
      ))}
      <Line options={options} data={data} />;
    </div>
  );
}

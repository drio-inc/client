import React from "react";
import {
  Title,
  Legend,
  Tooltip,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  tension: 0.5,
  pointRadius: 0,
  responsive: true,

  interaction: {
    mode: "index" as const,
    intersect: false,
  },

  stacked: false,

  plugins: {
    title: {
      display: false,
    },

    legend: {
      display: false,
    },
  },

  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,

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
};

const labels = [
  "1hr",
  "2hr",
  "3hr",
  "4hr",
  "5hr",
  "6hr",
  "7hr",
  "8hr",
  "9hr",
  "10hr",
  "11hr",
  "12hr",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Consumer 1",
      borderColor: "#FF8B8C",
      data: [75, 55, 85, 55, 65, 68, 95, 68, 105, 65, 70, 65],
    },
    {
      label: "Consumer 2",
      borderColor: "#FDAD00",
      data: [30, 32, 28, 35, 33, 37, 34, 36, 35, 38, 36, 39],
    },
  ],
};

export default function TCTMLine() {
  return (
    <div className="p-4 bg-white -mx-4">
      <div className="flex flex-wrap justify-between">
        <h2 className="text-[#223354] text-2xl font-semibold mb-4">
          Top Consumer Throughput Msgs/Sec
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
      <div className="flex gap-x-4">
        {data.datasets.map((dataset, index) => (
          <div key={index} className="flex items-center mb-2">
            <div
              className={`w-8 h-[10px] rounded mr-2`}
              style={{
                backgroundColor: dataset.borderColor,
              }}
            />
            <p className="text-[#223354] text-sm font-semibold">{dataset.label}</p>
          </div>
        ))}
      </div>
      <Line options={options} data={data} />;
    </div>
  );
}

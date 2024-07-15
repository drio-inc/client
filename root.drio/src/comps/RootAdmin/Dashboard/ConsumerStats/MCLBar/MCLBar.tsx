import { useState } from "react";
import {
  Title,
  Legend,
  Tooltip,
  BarElement,
  LinearScale,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import KPILogs from "../../DashboardComps/KPILogs";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const Data = [
  {
    id: 1,
    year: 2016,
    userGain: Math.floor(Math.random() * 10000),
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: Math.floor(Math.random() * 10000),
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: Math.floor(Math.random() * 10000),
    userLost: 123,
  },
  {
    id: 4,
    year: 2019,
    userGain: Math.floor(Math.random() * 10000),
    userLost: 456,
  },
  {
    id: 5,
    year: 2020,
    userGain: Math.floor(Math.random() * 10000),
    userLost: 789,
  },
];

ChartJS.register(Title, Legend, Tooltip, BarElement, LinearScale, CategoryScale);

export const options = {
  responsive: true,
  barPercentage: 0.8,
  categoryPercentage: 0.6,
  maintainAspectRatio: false,

  scales: {
    y: {
      border: {
        display: false,
        dash: [10],
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

const labels = ["January", "February", "March", "April", "May", "June"];

export const data = {
  labels,

  datasets: [
    {
      borderRadius: 5,
      label: "Source 1",
      borderSkipped: false,
      backgroundColor: "#4285F4",
      data: labels.map(() => Data[0].userGain),
    },
    {
      borderRadius: 5,
      label: "Source 2",
      borderSkipped: false,
      backgroundColor: "#EB5757",
      data: labels.map(() => Data[1].userGain),
    },
    {
      borderRadius: 5,
      label: "Source 3",
      borderSkipped: false,
      backgroundColor: "#6FCF97",
      data: labels.map(() => Data[2].userGain),
    },
    {
      borderRadius: 5,
      label: "Source 4",
      borderSkipped: false,
      backgroundColor: "#807DFF",
      data: labels.map(() => Data[3].userGain),
    },
    {
      borderRadius: 5,
      label: "Source 5",
      borderSkipped: false,
      backgroundColor: "#FDAD00",
      data: labels.map(() => Data[4].userGain),
    },
  ],
};

const MCLBar = () => {
  const [hiddenDatasets, setHiddenDatasets] = useState<any>([]);

  const toggleDataset = (index: number) => {
    const isHidden = hiddenDatasets.includes(index);

    if (isHidden) {
      setHiddenDatasets(hiddenDatasets.filter((item: number) => item !== index));
    } else {
      setHiddenDatasets([...hiddenDatasets, index]);
    }
  };

  const filteredDatasets = data.datasets.filter((_, index) => !hiddenDatasets.includes(index));

  return (
    <div className="p-4 bg-white -mx-4">
      <div className="flex flex-wrap justify-between">
        <h2 className="text-[#223354] text-2xl font-semibold mb-4">
          Max. Consumer Lag For Each Data Source
        </h2>
      </div>

      <KPILogs messages={5} text="Max Lag in Last 24 Hours" />

      <div className="flex gap-x-4">
        {data.datasets.map((dataset, i) => (
          <div
            key={i}
            onClick={() => toggleDataset(i)}
            className={`flex items-center mb-2 cursor-pointer ${
              hiddenDatasets.includes(i) && "opacity-50"
            }`}
          >
            <div
              className={`w-8 h-[10px] rounded mr-2`}
              style={{
                backgroundColor: dataset.backgroundColor,
              }}
            />
            <p className="text-[#223354] text-sm font-semibold">{dataset.label}</p>
          </div>
        ))}
      </div>

      <div className="h-[300px]">
        <Bar options={options} data={{ ...data, datasets: filteredDatasets }} />
      </div>
    </div>
  );
};

export default MCLBar;

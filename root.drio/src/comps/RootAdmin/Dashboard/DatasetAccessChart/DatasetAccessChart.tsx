import { useState } from "react";
import { StatelessSelectInput } from "@/comps/ui/Forms/Inputs/Inputs";
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
import { IoRefresh } from "react-icons/io5";
import { HiOutlineFilter } from "react-icons/hi";

export const Data = [
  {
    id: 1,
    year: 2016,
    userGain: 6000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 4000,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 2000,
    userLost: 555,
  },
];

const chart = ChartJS.register(Title, Legend, Tooltip, BarElement, LinearScale, CategoryScale);

export const options = {
  barPercentage: 0.6,
  categoryPercentage: 1,
  responsive: true,
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
      label: "Org 50%",
      borderRadius: 100,
      borderSkipped: false,
      backgroundColor: "#f87171",
      data: labels.map(() => Data[0].userGain),
    },
    {
      label: "Org 30%",
      borderRadius: 100,
      borderSkipped: false,
      backgroundColor: "#60a5fa",
      data: labels.map(() => Data[1].userGain),
    },
    {
      label: "Org 20%",
      borderRadius: 100,
      borderSkipped: false,
      backgroundColor: "#4ade80",
      data: labels.map(() => Data[2].userGain),
    },
  ],
};

const DatasetAccessChart = () => {
  const [hiddenDatasets, setHiddenDatasets] = useState<number | string | any>([]);

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
    <div className="p-4 -mx-4 bg-white">
      <div className="pl-16">
        <Bar options={options} data={{ ...data, datasets: filteredDatasets }} />
      </div>

      <div className="w-full flex gap-x-8 mt-2">
        {data.datasets.map((dataset, i) => (
          <div
            key={i}
            onClick={() => toggleDataset(i)}
            className={`flex items-center cursor-pointer ${
              hiddenDatasets.includes(i) && "opacity-50"
            }`}
          >
            <div
              className="py-2 px-2 md:px-4 lg:px-8 rounded-md"
              style={{ backgroundColor: dataset.backgroundColor }}
            >
              <span className="inline-block text-white font-medium">{dataset.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatasetAccessChart;

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
];

const chart = ChartJS.register(
  Title,
  Legend,
  Tooltip,
  BarElement,
  LinearScale,
  CategoryScale
);

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
      borderRadius: 100,
      label: "Errors 50%",
      borderSkipped: false,
      backgroundColor: "#f87171",
      data: labels.map(() => Data[0].userGain),
    },
    {
      borderRadius: 100,
      borderSkipped: false,
      label: "Anomalies 30%",
      backgroundColor: "#4ade80",
      data: labels.map(() => Data[1].userGain),
    },
  ],
};

const AnomaliesAndErrorsChart = () => {
  const [filter, setFilter] = useState<string>("");
  const [hiddenDatasets, setHiddenDatasets] = useState<number | string | any>(
    []
  );

  const toggleDataset = (index: number) => {
    const isHidden = hiddenDatasets.includes(index);

    if (isHidden) {
      setHiddenDatasets(
        hiddenDatasets.filter((item: number) => item !== index)
      );
    } else {
      setHiddenDatasets([...hiddenDatasets, index]);
    }
  };

  const filteredDatasets = data.datasets.filter(
    (_, index) => !hiddenDatasets.includes(index)
  );

  return (
    <div className="p-4 bg-white rounded-md mt-2">
      <div className="flex flex-wrap justify-between">
        <h2 className="text-[#223354] text-2xl font-semibold">
          Anomalies and Errors
        </h2>

        <div className="flex flex-wrap items-center gap-x-4">
          <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 p-1 flex gap-x-1 items-center rounded border-2 border-indigo-200 text-drio-red-dark">
            <IoRefresh className="font-bold" />
            <span className="text-xs font-medium">Re-run</span>
          </button>

          <span className="inline-block p-2 bg-indigo-50 rounded border-2 border-indigo-200">
            <HiOutlineFilter className="text-drio-red w-3 h-3" />
          </span>

          <StatelessSelectInput
            label=""
            placeholder="Filter by"
            registerName="filterBy"
            onChange={(value: any) => setFilter(value)}
            options={[
              { label: "Last 7 days", value: "last_7_days" },
              { label: "Last 30 days", value: "last_30_days" },
              { label: "Last 90 days", value: "last_90_days" },
            ]}
          />
        </div>
      </div>

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
              <span className="inline-block text-white font-medium">
                {dataset.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnomaliesAndErrorsChart;

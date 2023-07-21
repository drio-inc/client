import { StatelessSelectInput } from "@/comps/ui/Forms/Inputs/Inputs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";

import { Bar } from "react-chartjs-2";
import { HiOutlineFilter } from "react-icons/hi";
import { IoRefresh } from "react-icons/io5";

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

const chart = ChartJS.register(
  Title,
  Legend,
  Tooltip,
  BarElement,
  LinearScale,
  CategoryScale
);

export const options = {
  barPercentage: 0.6,
  categoryPercentage: 1,
  responsive: true,

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
      // align: "start" as const,
      // position: "bottom" as const,
      labels: {
        // boxWidth: 40,
        // boxHeight: 40,
        // borderRadius: 6,
        // color: "#223354",
        // useBorderRadius: true,
        // font: {
        //   size: 24,
        //   weight: "bold",
        // },
      },
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
      data: labels.map(() => Data[0].userGain),
      backgroundColor: "#FF1A43",
      borderSkipped: false,
      borderRadius: 100,
    },
    {
      label: "Org 30%",
      data: labels.map(() => Data[1].userGain),
      backgroundColor: "#1A75FF",
      borderSkipped: false,
      borderRadius: 100,
    },
    {
      label: "Org 20%",
      data: labels.map(() => Data[2].userGain),
      backgroundColor: "#5DCC00",
      borderSkipped: false,
      borderRadius: 100,
    },
  ],
};

const DatasetAccessChart = () => {
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
    <div className="p-12">
      <div className="flex justify-between">
        <h2 className="text-[#223354] text-2xl font-semibold mb-8">
          Top Datasets Accessed
        </h2>

        <div className="flex items-center gap-x-4">
          <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 p-2 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
            <IoRefresh className="mr-1 font-bold" />
            <span className="text-sm font-medium">Re-run</span>
          </button>

          <span className="inline-block p-2 bg-indigo-50 rounded border-2 border-indigo-200">
            <HiOutlineFilter className="text-drio-red w-5 h-5" />
          </span>

          <StatelessSelectInput
            label=""
            placeholder="Filter by"
            registerName="filterBy"
            options={[
              { label: "Last 7 days", value: "last7" },
              { label: "Last 30 days", value: "last30" },
              { label: "Last 90 days", value: "last90" },
            ]}
          />
        </div>
      </div>

      <div>
        <Bar options={options} data={{ ...data, datasets: filteredDatasets }} />
      </div>

      <div className="w-full flex gap-x-8 mt-12 ml-12">
        {data.datasets.map((dataset, i) => (
          <div
            key={i}
            className={`flex items-center cursor-pointer ${
              hiddenDatasets.includes(i) ? "opacity-50" : ""
            }`}
            onClick={() => toggleDataset(i)}
          >
            <div
              className="py-2 px-8 rounded-md"
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

export default DatasetAccessChart;

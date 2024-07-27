import React, { useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/comps/ui/Select";

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
      label: "CPU%",
      borderColor: "#FF8B8C",
      data: [75, 55, 85, 55, 65, 68, 95, 68, 105, 65, 70, 65],
    },
    {
      label: "Disk%",
      borderColor: "#FDAD00",
      data: [30, 32, 28, 35, 33, 37, 34, 36, 35, 38, 36, 39],
    },
    {
      label: "Memory%",
      borderColor: "#6FCF97",
      data: [25, 27, 24, 28, 26, 30, 27, 29, 28, 31, 29, 32],
    },
    {
      label: "I/O Per Sec",
      borderColor: "#42B9F4",
      data: [20, 22, 21, 24, 22, 26, 23, 25, 24, 27, 25, 28],
    },
  ],
};

export default function IQRULine() {
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

  const changeDataset = (e: any) => {
    setHiddenDatasets(
      e === "all" ? [] : data.datasets.map((_, i) => i).filter((i) => data.datasets[i].label !== e)
    );
  };

  return (
    <div className="p-4 bg-white -mx-4">
      <div className="flex flex-wrap justify-between">
        <h2 className="text-[#223354] text-2xl font-semibold mb-4">DDX Resource Utilization</h2>

        {/* <Select onValueChange={(e) => changeDataset(e)}>
          <SelectTrigger className="w-[180px] mr-3">
            <SelectValue placeholder="Select Source" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            {data.datasets.map((dataset, i) => (
              <SelectItem key={i} value={dataset.label}>
                {dataset.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </div>
      <div className="flex gap-x-4">
        {data.datasets.map((dataset, i) => (
          <div
            key={i}
            onClick={() => toggleDataset(i)}
            className={`${
              hiddenDatasets.includes(i) && "opacity-50"
            } flex items-center mb-2 cursor-pointer`}
          >
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
      <Line options={options} data={{ ...data, datasets: filteredDatasets }} />;
    </div>
  );
}

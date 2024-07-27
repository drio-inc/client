import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const options: ChartOptions<"doughnut"> = {
  //   responsive: true,
  //   maintainAspectRatio: false,

  cutout: "50%",
  spacing: 2,

  plugins: {
    legend: {
      display: false,
      position: "bottom",
    },
  },
};

const data = {
  labels: ["40%", "50%", "30%", "25%"],

  datasets: [
    {
      label: "# of Datasets",
      data: [12, 10, 13, 8],

      backgroundColor: [
        "rgba(235, 87, 87, 1)",
        "rgba(66, 185, 244, 1)",
        "rgba(247, 144, 9, 1)",
        "rgba(111, 207, 151, 1)",
      ],
    },
  ],
};

const DPRDoughnut = () => {
  return (
    <div className="p-4 -mx-4 bg-white">
      <Doughnut data={data} options={options} />

      <div className="flex flex-wrap mt-4 gap-y-4">
        {data.labels.map((label, index) => (
          <div key={index} className="flex justify-center gap-2 w-1/2">
            <div
              className="w-3 h-3 rounded mt-2"
              style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg">{label}</span>
              <span className="text-xs">Consumer {index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DPRDoughnut;

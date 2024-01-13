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

import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

const line = ChartJS.register(
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

const AnomalyChart = () => {
  const numberOfDays = 365 / 4;

  const anomalyIndices = Array.from(
    { length: faker.number.int({ min: 1, max: 4 }) },
    () => faker.number.int({ min: 0, max: numberOfDays })
  );

  const labels = Array.from({ length: numberOfDays }, (_, i) => i + 1);

  const data = {
    labels,

    datasets: [
      {
        label: "Anomaly",
        borderColor: "#FF395C",
        backgroundColor: "#FF395C",

        data: labels.map((_, index) => {
          const baseValue = faker.number.int({ min: 10000, max: 25000 });

          if (anomalyIndices.includes(index)) {
            return faker.number.int({ min: 50000, max: 90000 });
          }

          return baseValue;
        }),
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded-md">
      <Line options={options} data={{ ...data }} />
    </div>
  );
};

export default AnomalyChart;

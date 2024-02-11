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

function getRandomArbitrary(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

const AnomalyChart = () => {
  const numberOfDays = Math.round(365 / 4);

  const anomalyIndices = Array.from({ length: getRandomArbitrary(1, 4) }, () =>
    getRandomArbitrary(0, numberOfDays)
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
          const baseValue = getRandomArbitrary(10000, 25000);

          if (anomalyIndices.includes(index)) {
            return getRandomArbitrary(50000, 90000);
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

import { HiArrowDown, HiArrowUp } from "react-icons/hi";

const Stats = [
  {
    value: 1,
    unit: "",
    positive: true,
    title: "Total Errors",
  },
  {
    value: 25,
    unit: "",
    title: "Organizations Accessing",
  },
  {
    value: 22,
    unit: "K",
    positive: false,
    title: "Data Accessing",
  },
  {
    value: 10,
    unit: "",
    positive: false,
    title: "Anomalies Detected",
  },
  {
    value: 78,
    unit: "",
    positive: true,
    title: "Schema Changes",
  },
  {
    value: 5,
    unit: "sec",
    title: "Avg Access Latency",

    subStats: {
      today: 8,
      this_month: 12,
      last_Month: 15,
      last_7_days: 10,
    },
  },
];

const StatCards = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-between">
      {Stats.map((stat, index) => (
        <div
          key={index}
          className="flex-1 p-3 bg-white flex flex-wrap flex-col rounded-md justify-around"
        >
          <span className="text-gray-700 font-medium">{stat.title}</span>

          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-gray-700">
                {stat.value}
              </span>
              <span
                className={`${
                  stat.unit === "sec" ? `text-xs mt-2 inline-block` : `text-3xl`
                } font-bold text-gray-700`}
              >
                {stat.unit}
              </span>

              {stat.positive === false && (
                <HiArrowUp className="text-red-500 w-6 h-6" />
              )}

              {stat.positive && (
                <HiArrowDown className="text-green-500 w-6 h-6" />
              )}
            </div>

            <div className="flex flex-wrap">
              {stat.subStats &&
                Object.keys(stat.subStats).map((key, index) => (
                  <div
                    key={index}
                    className="flex gap-x-1 basis-1/2 text-[6px] xl:text-[8px] 2xl:text-[10px] text-gray-500"
                  >
                    <span className="capitalize">
                      {key.replaceAll("_", " ")}
                    </span>
                    <span className="text-drio-red font-bold">
                      {stat.subStats[key as keyof typeof stat.subStats]}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;

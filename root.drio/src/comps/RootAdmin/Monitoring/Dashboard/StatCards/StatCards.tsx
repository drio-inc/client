import { HiArrowDown, HiArrowUp } from "react-icons/hi";

const Stats = [
  {
    value: 25,
    unit: "",
    title: "Orgs Accessing",
    gradientColor: "#a3e635, #3b82f6",
  },
  {
    value: 22,
    unit: "K",
    positive: false,
    title: "Data Accessing",
    gradientColor: "#a3e635, #3b82f6",
  },
  {
    value: 10,
    unit: "",
    positive: false,
    title: "Anomalies Detected",
    gradientColor: "#a3e635, #3b82f6",
  },
  {
    value: 1,
    unit: "",
    positive: true,
    title: "Total Errors",
    gradientColor: "#a3e635, #3b82f6",
  },
  {
    value: 5,
    unit: "sec",
    title: "Avg Access Latency",
    gradientColor: "#a3e635, #3b82f6",
    subStats: {
      today: 8,
      lastSevenDays: 10,
      thisMonth: 12,
      lastMonth: 15,
    },
  },
  {
    value: 78,
    unit: "",
    positive: true,
    title: "Schema Changes",
    gradientColor: "#a3e635, #3b82f6",
  },
];

const StatCards = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-between">
      {Stats.map((stat, index) => (
        <div
          key={index}
          className="flex-1 px-4 py-6 shadow-lg bg-white flex flex-col items-center rounded-md justify-around"
        >
          <div className="flex gap-x-4 items-center">
            <div
              className={`w-10 h-10 rounded-full`}
              style={{
                background: `linear-gradient(90deg, ${stat.gradientColor})`,
              }}
            ></div>
            <span className="text-gray-500">{stat.title}</span>
          </div>

          <div className="flex gap-x-2 items-center justify-between">
            {stat.positive === false ? (
              <HiArrowUp className="text-red-500 w-6 h-6" />
            ) : (
              <HiArrowDown className="text-green-500 w-6 h-6" />
            )}
            <span className="text-3xl font-bold text-gray-700">
              {stat.value}
              {stat.unit}
            </span>

            {stat.subStats && (
              <div className="flex flex-col gap-y-1">
                <span className="text-xs text-gray-500">
                  Today: {stat.subStats.today}
                </span>
                <span className="text-xs text-gray-500">
                  Last 7 days: {stat.subStats.lastSevenDays}
                </span>
                <span className="text-xs text-gray-500">
                  This Month: {stat.subStats.thisMonth}
                </span>
                <span className="text-xs text-gray-500">
                  Last Month: {stat.subStats.lastMonth}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;

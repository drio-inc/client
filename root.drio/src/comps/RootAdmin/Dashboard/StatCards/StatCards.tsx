const Stats = [
  {
    value: 1,
    unit: "",
    title: "Data Sources",
  },
  {
    value: 1,
    unit: "",
    title: "Data Streams",
  },
  {
    value: 1,
    unit: "",
    title: "Consumers",
  },
  {
    value: 1,
    unit: "",
    title: "Data Prod Rate",
  },
  {
    value: 1,
    unit: "",
    title: "Dataset Prod Rate",
  },
  {
    value: 1,
    unit: "",
    title: "Data Consume Rate",
  },
  {
    value: 1,
    unit: "",
    title: "Dataset Consume Rate",
  },
  {
    value: 10,
    unit: "",
    title: "Errors",
  },
  {
    value: 10,
    unit: "",
    title: "Anomalies",
  },
  {
    value: 78,
    unit: "",
    title: "Alerts",
  },
];

const StatCards = () => {
  return (
    <div className="grid grid-cols-5 grid-rows-2 gap-4">
      {Stats.map((stat, index) => (
        <div
          key={index}
          className="p-4 bg-white flex flex-wrap flex-col rounded-md justify-between gap-y-8"
        >
          <span className="text-gray-700 font-medium">{stat.title}</span>

          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-gray-700">{stat.value}</span>
              <span
                className={`${
                  stat.unit === "sec" ? `text-xs mt-2 inline-block` : `text-3xl`
                } font-bold text-gray-700`}
              >
                {stat.unit}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;

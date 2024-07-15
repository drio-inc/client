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
    value: 25,
    unit: "",
    title: "Consumers",
  },
  {
    value: 15,
    unit: "MBPS",
    title: "Avg Data Prod Rate",
  },
  {
    value: 1,
    unit: "/ Sec",
    title: "Dataset Prod Rate",
  },

  {
    title: "Errors & Anomalies",
    value: [
      {
        value: 10,
        unit: "",
        title: "Errors",
      },
      {
        value: 7,
        unit: "",
        title: "Anomalies",
      },
    ],
  },
  {
    value: 8,
    unit: "",
    title: "Alerts",
  },
];

const StatCards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-4">
      {Stats.map((stat, index) => {
        return (
          <>
            {!Array.isArray(stat.value) ? (
              <div
                key={index}
                className="p-4 bg-white flex flex-wrap flex-col rounded-md justify-between gap-y-4"
              >
                <span className="text-gray-700 font-medium">{stat.title}</span>

                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-gray-700">{stat.value}</span>

                    <span className={`text-xs mt-3 ml-1 inline-block font-bold text-gray-700`}>
                      {stat.unit}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white flex flex-wrap justify-between divide-x-2 divide-dashed rounded-md">
                {stat.value.map((stat, index) => (
                  <div
                    key={index}
                    className="p-4 flex flex-wrap flex-col justify-between gap-y-4 w-full lg:w-1/2"
                  >
                    <span className="text-gray-700 font-medium">{stat.title}</span>
                    <span className="text-3xl font-bold text-drio-red">{stat.value}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default StatCards;

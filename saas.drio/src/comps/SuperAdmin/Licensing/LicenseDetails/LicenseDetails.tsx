import Layout from "@/comps/Layout";

export default function LicenseDetails({ details }: TableRow) {
  console.log(details);

  return (
    <Layout>
      <div className="min-w-[50vw] relative w-full mx-auto p-4 rounded-lg">
        <h2 className="text-gray-700 font-medium">License capacity limits</h2>

        <div className="flex my-4 border p-2 rounded-lg bg-white text-gray-500">
          <div className="w-full">
            <div className="flex my-2">
              <span className="block w-1/2">Datasets</span>
              <span className="block">:{details.datasets}</span>
            </div>

            <div className="flex">
              <span className="block w-1/2">Data contracts</span>
              <span className="block">:{details.contract}</span>
            </div>

            <div className="flex my-2">
              <span className="block w-1/2">Access rate</span>
              <span className="block">:{details.accessRate}</span>
            </div>

            <div className="flex my-2">
              <span className="block w-1/2">License expiry date</span>
              <span className="block">
                :{details.expiryDate.split(" ").slice(1, 4).join(" ")} 12:00 AM
              </span>
            </div>
          </div>

          <div className="w-full">
            <div className="flex my-2">
              <span className="block w-1/2">Log storage</span>
              <span className="block">
                :{details.logStorage.split("")[0]} year
              </span>
            </div>

            <div className="flex my-2">
              <span className="block w-1/2">Metrics storage</span>
              <span className="block w-1/2">
                :{details.metricsStorage.split("")[0]} years
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

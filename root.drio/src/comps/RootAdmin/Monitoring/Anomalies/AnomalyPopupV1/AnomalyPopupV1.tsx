import Layout from "@/comps/Layout";
import { HiX } from "react-icons/hi";
import AnomalyChart from "../AnomalyChart";
import { setCloseModal } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import Button from "@/comps/ui/Button";
import { setRows } from "@/state/slices/anomaliesSlice";

const statusToColor = {
  Error: "text-red-500",
  Warning: "text-yellow-500",
  Informational: "text-blue-500",
};

export default function AnomalyPopupV1() {
  const dispatch = useAppDispatch();
  const { row, rows } = useAppSelector((state) => state.anomalies);

  const markAsAnomaly = (id: string) => {
    const updatedRows = rows.map((r) => {
      if (r.id === id) {
        return { ...r, status: "anomaly" };
      }
      return r;
    });

    dispatch(setRows(updatedRows));
    dispatch(setCloseModal("anomalyDetails"));
  };

  const markAsNotAnomaly = (id: string) => {
    const updatedRows = rows.map((r) => {
      if (r.id === id) {
        return { ...r, status: "not_anomaly" };
      }
      return r;
    });

    dispatch(setRows(updatedRows));
    dispatch(setCloseModal("anomalyDetails"));
  };

  return (
    <Layout>
      <div className="xl:w-[50vw] relative w-[90vw] mx-auto bg-white p-8 rounded-lg">
        <h2 className="text-gray-700 text-2xl font-bold mb-4">Anomaly Details</h2>

        <div className="flex flex-col md:flex-row gap-x-4 my-4 shadow-md p-2 rounded-lg bg-gray-50 text-gray-500 text-xs md:text-base">
          <div className="w-full">
            <div className="flex gap-x-4 my-2">
              <span className="block w-1/2 font-semibold">Description</span>
              <span className="block">
                Individual Application over time show a certain behavior pattern in terms of which
                datasets accessed, at what times and what rate. Large deviations from learned
                baseline is flagged as Anomaly
              </span>
            </div>
          </div>

          <div className="w-full border-t md:border-none border-gray-200 mt-4 md:mt-0">
            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">Severity</span>
              <span
                className={`block w-1/2 ${
                  statusToColor[row?.severity as keyof typeof statusToColor]
                } font-bold text-lg`}
              >
                : {row?.severity}
              </span>
            </div>

            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">Feature Vector</span>
              <span className="flex gap-x-1 w-1/2">
                <span>:</span>
                <div className="flex flex-col">
                  <span>Accessing App</span>
                  <span>Access rate</span>
                  <span>Geo origin</span>
                  <span>Times of access</span>
                  <span> Datasets accessed</span>
                </div>
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-gray-700 text-2xl font-bold mb-4">Detection Details</h2>

        <div className="flex flex-col md:flex-row my-4 shadow-md p-2 rounded-lg bg-gray-50 text-gray-500 text-xs md:text-base">
          <div className="w-full">
            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">Accessing Organization </span>
              <span className="block">: {row?.ou}</span>
            </div>

            <div className="flex">
              <span className="block w-1/2 font-semibold">Accessing App</span>
              <span className="block">: Finance</span>
            </div>

            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">Threshold value</span>
              <span className="block">: 4x limit</span>
            </div>
          </div>

          <div className="w-full border-t md:border-none border-gray-200 mt-4 md:mt-0">
            <div className="flex my-2">
              <span className="block w-1/2 font-semibold">Times detected</span>
              <span className="flex gap-x-1 w-1/2">
                <span>:</span>
                <div className="flex flex-col">
                  <span>Dec 11,2022 11:03:42 UTC</span>
                  <span>Dec 19,2022 11:03:42 UTC</span>
                  <span>Dec 23,2022 11:03:42 UTC</span>
                </div>
              </span>
            </div>
          </div>
        </div>

        <div className="w-full my-4 shadow-md p-2 rounded-lg bg-gray-50">
          <AnomalyChart />
        </div>

        <div className="flex gap-x-4 justify-center w-full mt-8">
          <Button
            intent={"primaryOutline"}
            onClick={() => dispatch(setCloseModal("anomalyDetails"))}
          >
            Cancel
          </Button>

          <Button
            intent={"success"}
            disabled={row?.status === "not_anomaly"}
            onClick={() => markAsNotAnomaly(row?.id)}
          >
            {row?.status === "not_anomaly" ? "Marked as Not Anomaly" : "Not an Anomaly"}
          </Button>

          <Button
            intent={"primary"}
            disabled={row?.status === "anomaly"}
            onClick={() => markAsAnomaly(row?.id)}
          >
            {row?.status === "anomaly" ? "Marked as Anomaly" : "Mark as Anomaly"}
          </Button>
        </div>

        <span
          onClick={() => dispatch(setCloseModal("anomalyDetails"))}
          className="absolute top-0 right-0 p-6 cursor-pointer"
        >
          <HiX className="w-6 h-6" />
        </span>
      </div>
    </Layout>
  );
}

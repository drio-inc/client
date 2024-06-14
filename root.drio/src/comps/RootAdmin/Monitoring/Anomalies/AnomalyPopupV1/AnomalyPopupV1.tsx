import Layout from "@/comps/Layout";
import { HiExclamation, HiX } from "react-icons/hi";
import AnomalyChart from "../AnomalyChart";
import { setCloseModal } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import Button from "@/comps/ui/Button";
import { setRow, setRows } from "@/state/slices/anomaliesSlice";
import showAlert from "@/comps/ui/Alert";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const statusToColor = {
  Error: "text-red-500",
  Warning: "text-yellow-500",
  Informational: "text-blue-500",
};

export default function AnomalyPopupV1() {
  const dispatch = useAppDispatch();
  const { row, rows } = useAppSelector((state) => state.anomalies);

  const markAsAnomaly = (id: string) => {
    const rowToUpdate = rows.find((r) => r.id === id);
    const markedRow = { ...rowToUpdate, status: "anomaly" };

    const updatedRows = rows.map((r) => {
      if (r.id === id) {
        return { ...r, status: "anomaly" };
      }
      return r;
    });

    dispatch(setRow(markedRow));
    dispatch(setRows(updatedRows));
    showAlert("Anomaly marked successfully", "success");
  };

  const markAsNotAnomaly = (id: string) => {
    const rowToUpdate = rows.find((r) => r.id === id);
    const markedRow = { ...rowToUpdate, status: "not_anomaly" };

    const updatedRows = rows.map((r) => {
      if (r.id === id) {
        return { ...r, status: "not_anomaly" };
      }
      return r;
    });

    dispatch(setRow(markedRow));
    dispatch(setRows(updatedRows));
    showAlert("Anomaly marked successfully", "success");
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

          <AlertDialog.Root>
            <AlertDialog.Trigger disabled={row?.status === "not_anomaly"}>
              <Button intent={"success"} disabled={row?.status === "not_anomaly"}>
                {row?.status === "not_anomaly" ? "Marked as Not Anomaly" : "Not an Anomaly"}
              </Button>
            </AlertDialog.Trigger>

            <AlertDialog.Portal>
              <AlertDialog.Overlay className="bg-[#6B6B6B] data-[state=open]:animate-overlayShow fixed inset-0 opacity-40 z-[10000]" />
              <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white py-12 px-8 shadow-sm focus:outline-none z-[10000]">
                <div className="mx-auto w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                  <HiExclamation className="text-yellow-500 w-10 h-10 mx-auto" />
                </div>

                <AlertDialog.Title className="text-[#223354] text-2xl font-bold text-center">
                  Are you sure you want to mark this entity as not an anomaly?
                </AlertDialog.Title>

                <AlertDialog.Description className="text-[#223354] opacity-50 mt-4 mb-5 text-center">
                  Please review the details before marking as not an anomaly.
                </AlertDialog.Description>

                <div className="flex justify-center gap-6">
                  <AlertDialog.Cancel asChild>
                    <button className="text-[#1A75FF] inline-flex items-center justify-center rounded px-4 outline-none focus:border">
                      Cancel
                    </button>
                  </AlertDialog.Cancel>

                  <AlertDialog.Action asChild>
                    <Button onClick={() => markAsNotAnomaly(row?.id)}>Confirm</Button>
                  </AlertDialog.Action>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>

          <AlertDialog.Root>
            <AlertDialog.Trigger disabled={row?.status === "anomaly"}>
              <Button intent={"primary"} disabled={row?.status === "anomaly"}>
                {row?.status === "anomaly" ? "Marked as Anomaly" : "Mark as Anomaly"}
              </Button>
            </AlertDialog.Trigger>

            <AlertDialog.Portal>
              <AlertDialog.Overlay className="bg-[#6B6B6B] data-[state=open]:animate-overlayShow fixed inset-0 opacity-40 z-[10000]" />
              <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white py-12 px-8 shadow-sm focus:outline-none z-[10000]">
                <div className="mx-auto w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                  <HiExclamation className="text-yellow-500 w-10 h-10 mx-auto" />
                </div>

                <AlertDialog.Title className="text-[#223354] text-2xl font-bold text-center">
                  Are you sure you want to mark this entity as an anomaly?
                </AlertDialog.Title>

                <AlertDialog.Description className="text-[#223354] opacity-50 mt-4 mb-5 text-center">
                  Please review the details before marking as an anomaly.
                </AlertDialog.Description>

                <div className="flex justify-center gap-6">
                  <AlertDialog.Cancel asChild>
                    <button className="text-[#1A75FF] inline-flex items-center justify-center rounded px-4 outline-none focus:border">
                      Cancel
                    </button>
                  </AlertDialog.Cancel>

                  <AlertDialog.Action asChild>
                    <Button onClick={() => markAsAnomaly(row?.id)}>Confirm</Button>
                  </AlertDialog.Action>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
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

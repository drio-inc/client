/* eslint-disable react/no-unescaped-entities */
import Layout from "@/comps/Layout";
import Button from "@/comps/ui/Button";
import showAlert from "@/comps/ui/Alert/Alert";
import { HiX, HiExclamation } from "react-icons/hi";
import { setCloseModal } from "@/state/slices/uiSlice";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { setRows, setRow } from "@/state/slices/anomaliesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

export default function AnomalyPopupV2() {
  const dispatch = useAppDispatch();
  const { row, rows } = useAppSelector((state) => state.anomalies);

  const commonFields = ["Dealer Name", "Desired ETA", "Order ID", "SKU"];

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

  const renderDescription = () => {
    const convertExcelDateToUTC = (excelDate: number) => {
      const utc_days = Math.floor(excelDate - 25569);
      const utc_value = utc_days * 86400;
      const date_info = new Date(utc_value * 1000);

      const day = date_info.getUTCDate();
      const year = date_info.getUTCFullYear();
      const month = date_info.getUTCMonth() + 1;

      return `${month}/${day}/${year}`;
    };

    switch (row?.event_type) {
      case "datatype_mismatch":
        return (
          <p>
            <span className="font-bold">'{row?.field ?? "Unknown"}'</span> attribute of{" "}
            <span className="font-bold">'{row?.name ?? "unknown"}'</span> dataset being published on{" "}
            <span className="font-bold">'{row.ds ?? "unknown source"}'</span> expected to be a{" "}
            <span className="font-bold">'{row?.datatype ?? "unknown datatype"}'</span> was received
            as <span className="font-bold">'{row?.new_datatype ?? "unknown datatype"}'</span>
          </p>
        );

      case "added_new_field":
        return (
          <p>
            A new attribute <span className="font-bold">'{row?.field}'</span> in the dataset{" "}
            <span className="font-bold">'{row?.name ?? "unknown"}'</span> being published on{" "}
            <span className="font-bold">'{row?.ds ?? "unknown"}'</span> of data type{" "}
            <span className="font-bold">'{row?.datatype}'</span> has been detected. The attribute
            was dropped.
          </p>
        );

      case "anomaly":
        return (
          <p>
            <span className="font-bold">'{row?.field}'</span> field of{" "}
            <span className="font-bold">'{row?.name}'</span> dataset being published on{" "}
            <span className="font-bold">'{row?.ds}'</span> expected to be between{" "}
            <span className="font-bold">0</span> and{" "}
            <span className="font-bold">{row?.iqr ?? "unknown iqr"}</span> but received value was{" "}
            <span className="font-bold">{row?.value ?? "unknown value"}</span>
          </p>
        );

      case "Cluster Anomaly":
        return (
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-xl mb-2 underline">Observation:</span>

            <div>
              <div className="p-4 bg-gray-200 rounded">
                <span>Common Fields:</span>

                <div className="grid grid-cols-2 gap-y-1">
                  {commonFields.map((field) => (
                    <span key={field} className="font-medium">
                      {field}:{" "}
                      {field === "Desired ETA"
                        ? convertExcelDateToUTC(row?.record[field])
                        : row?.record[field]}
                    </span>
                  ))}
                </div>
              </div>

              <span className="font-medium text-700 block my-2 underline">
                The following attributes contribute to this anomaly:
              </span>

              <div className="bg-neutral-50 rounded">
                {Object.keys(row?.record)
                  .filter((key) => !commonFields.includes(key) && key !== "NOTES")
                  .map((key) => (
                    <div className="flex flex-col text-drio-red " key={key}>
                      <div className="text-sm flex gap-x-1 bg-red-100 w-fit rounded-full px-2 py-1 my-1">
                        <span className="font-medium">{key}:</span>
                        <span>
                          {key === "Desired ETA"
                            ? convertExcelDateToUTC(row?.record[key])
                            : row?.record[key]}
                        </span>
                      </div>
                    </div>
                  )) ?? "No data found"}
              </div>
            </div>

            <div className="mt-2">
              <span className="font-medium text-700 block mb-2 underline">
                The {row?.closest_data_points?.length} closest data points seen per the learned
                contract are:
              </span>

              <div className="grid grid-cols-3 gap-x-2 text-sm divide-x-2 divide-gray-200">
                {row?.closest_data_points?.map((point: any, i: number) => (
                  <div key={i} className="flex flex-col [&:not(:first-child)]:pl-2">
                    {Object.keys(point)
                      .filter((key) => !commonFields.includes(key))
                      .map((p) => (
                        <div className="flex flex-col text-gray-900" key={p}>
                          <div className="w-fit rounded-full px-2 my-0.5">
                            <span className="font-medium">
                              {p}: {point?.[p]}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                )) ?? "No data found"}
              </div>
            </div>
          </div>
        );

      default:
        return "No description available";
    }
  };

  const renderResolution = () => {
    switch (row?.event_type) {
      case "datatype_mismatch":
        return `Please check cause of datatype change and change detected schema if the change is valid`;

      case "added_new_field":
        return `Please check if the change is valid and update schema accordingly.`;
      case "anomaly":
        return `Please check if this is a valid change or not.`;
      case "Cluster Anomaly":
        return `Please check if the data record is valid.`;
      default:
        return "No resolution available.";
    }
  };

  const renderSubtext = () => {
    switch (row?.event_type) {
      case "datatype_mismatch":
        return " Data attribute value outside expected range";

      case "added_new_field":
        return "Data attribute has unexpected meta tag";

      case "anomaly":
        return "Data attribute value found to be outside expected range";

      case "Cluster Anomaly":
        return " The combination of the dataset attributes values seems to be unexpected per the learned contract";
    }
  };

  const renderHeading = () => {
    switch (row?.event_type) {
      case "datatype_mismatch":
        return "Learned Contract Violation";

      case "added_new_field":
        return "Learned Contract Violation";

      case "anomaly":
        return "Learned Contract Violation";

      case "Cluster Anomaly":
        return "Learned Contract Violation";
      default:
        return "Unknown Event";
    }
  };

  return (
    <Layout>
      <div className="xl:w-[60vw] relative w-[90vw] mx-auto bg-[#FAFAFA] p-8 rounded-lg">
        <span
          className="absolute top-0 right-0 p-6 cursor-pointer"
          onClick={() => dispatch(setCloseModal("anomalyDetails"))}
        >
          <HiX className="w-6 h-6" />
        </span>

        <h2 className="capitalize text-gray-700 text-2xl font-bold">
          {renderHeading() ?? "Unknown Event"}
        </h2>

        {renderSubtext()}

        <div className="flex flex-col gap-y-4">
          <div className="bg-white mt-2 flex flex-col gap-y-2 rounded-md">
            <div className="border-2 p-4 rounded-md">
              <p className="text-gray-900">{renderDescription()}</p>
            </div>
          </div>

          <div className="bg-white p-4 flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
              <span className="font-medium text-gray-700">Consumers of this Data: </span>{" "}
              <span className="text-gray-900 bg-gray-200 px-2 py-0.5 rounded font-medium">
                Logistics App
              </span>
            </div>

            <div className="flex items-center gap-x-2">
              <span className="font-medium text-gray-700">Severity:</span>{" "}
              <span className="text-blue-800 bg-blue-100 px-2 py-0.5 rounded font-medium">
                {row?.severity ?? "Informational"}
              </span>
            </div>

            <div className="flex items-center gap-x-2">
              <span className="font-medium text-gray-700">Suggested Resolution:</span>{" "}
              <span className="text-gray-700">{renderResolution()}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-x-4 justify-center w-full mt-4">
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
      </div>
    </Layout>
  );
}

/* eslint-disable react/no-unescaped-entities */
import Layout from "@/comps/Layout";
import { HiX } from "react-icons/hi";
import Button from "@/comps/ui/Button";
import { setCloseModal } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

export default function AnomalyPopupV2() {
  const dispatch = useAppDispatch();
  const { row } = useAppSelector((state) => state.anomalies);

  const renderDescription = () => {
    switch (row?.event_type) {
      case "datatype_mismatch":
        return (
          <p>
            <span className="font-bold">'{row?.field ?? "Unknown"}'</span>{" "}
            attribute of{" "}
            <span className="font-bold">'{row?.name ?? "unknown"}'</span>{" "}
            dataset being published on{" "}
            <span className="font-bold">'{row.ds ?? "unknown source"}'</span>{" "}
            expected to be a{" "}
            <span className="font-bold">
              '{row?.datatype ?? "unknown datatype"}'
            </span>{" "}
            was received as{" "}
            <span className="font-bold">
              '{row?.new_datatype ?? "unknown datatype"}'
            </span>
          </p>
        );

      case "added_new_field":
        return (
          <p>
            A new attribute <span className="font-bold">'{row?.field}'</span> in
            the dataset{" "}
            <span className="font-bold">'{row?.name ?? "unknown"}'</span> being
            published on{" "}
            <span className="font-bold">'{row?.ds ?? "unknown"}'</span> of data
            type <span className="font-bold">'{row?.datatype}'</span> has been
            detected. The attribute was dropped.
          </p>
        );

      case "anomaly":
        return (
          <p>
            <span className="font-bold">'{row?.field}'</span> field of{" "}
            <span className="font-bold">'{row?.name}'</span> dataset being
            published on <span className="font-bold">'{row?.ds}'</span> expected
            to be <span className="font-bold">{row?.iqr ?? "unknown iqr"}</span>{" "}
            but received value was{" "}
            <span className="font-bold">{row?.value ?? "unknown value"}</span>
          </p>
        );

      case "Cluster Anomaly":
        return (
          <div className="flex flex-col">
            <span>
              The following <strong>{row?.name}</strong> data field combination
              was detected to be outside the normal metadata distribution.
            </span>

            <span className="font-bold text-gray-900 text-xl mt-2">
              Observation:
            </span>

            <div>
              <span className="font-medium text-700 block mb-2">
                Combination of data field values{" "}
                <span className="text-drio-red">not seen previously</span>:
              </span>
              <div className="bg-neutral-50 p-4 rounded">
                {Object.keys(row?.record).map((key) => (
                  <div className="flex flex-col text-drio-red" key={key}>
                    <div className="flex gap-x-1">
                      <span className="font-medium">{key}:</span>
                      <span>{row?.record[key]}</span>
                    </div>
                  </div>
                )) ?? "No data found"}
              </div>
            </div>

            <div className="mt-2">
              <span className="font-medium text-700 block mb-2">
                The {row?.closest_data_points?.length} closest data points seen
                previously:
              </span>
              <div className="flex flex-col gap-y-2 bg-neutral-50 p-4 rounded">
                {row?.closest_data_points?.map((point: any, i: number) => (
                  <div key={i} className="flex flex-col border-b pb-2">
                    {Object.keys(point).map((p) => (
                      <div className="flex flex-col text-drio-red" key={p}>
                        <div className="flex gap-x-1">
                          <span className="font-medium">{p}:</span>
                          <span>{point?.[p]}</span>
                        </div>
                      </div>
                    )) ?? "No data found"}
                  </div>
                )) ?? "No data found"}
              </div>
            </div>

            <p className="mt-2">This access was allowed to proceed.</p>
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
        return (
          <span className="text-gray-900 block mb-4">
            Detected deviation from learned schema on{" "}
            <span className="font-bold">
              {new Date(row?.timestamp)?.toLocaleString() ?? "Unknown Date"}
            </span>
          </span>
        );

      case "added_new_field":
        return (
          <span className="text-gray-900 block mb-4">
            Detected deviation from learned schema on{" "}
            <span className="font-bold">
              {new Date(row?.timestamp)?.toLocaleString() ?? "Unknown Date"}
            </span>
          </span>
        );

      case "anomaly":
        return (
          <span className="text-gray-900 block">
            <span>
              Detected deviation from learned data field characteristics on{" "}
              {new Date(row?.timestamp)?.toLocaleString() ?? "Unknown Date"}
            </span>
          </span>
        );

      case "Cluster Anomaly":
        return (
          <span>
            Anomaly detected based on learned characteristics of the data set on{" "}
            <strong>
              {new Date(row?.timestamp)?.toLocaleString() ?? "Unknown Date"}
            </strong>
          </span>
        );
    }
  };

  const renderHeading = () => {
    switch (row?.event_type) {
      case "datatype_mismatch":
        return "Data Type Mismatch";

      case "added_new_field":
        return "New field added to a dataset";

      case "anomaly":
        return "Data field outside expected range";

      case "Cluster Anomaly":
        return (
          <span className="w-4/5 block">
            Data fields combination in the received data appear outside of
            normal seen previously
          </span>
        );
      default:
        return "Unknown Event";
    }
  };

  return (
    <Layout>
      <div className="xl:w-[50vw] relative w-[90vw] mx-auto bg-[#FAFAFA] p-8 rounded-lg">
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
            <span className="font-medium text-gray-700">Details</span>
            <div className="border-2 p-4 rounded-md">
              <p className="text-gray-900">{renderDescription()}</p>
            </div>
          </div>

          <div className="bg-white p-4 flex flex-col gap-y-2 rounded-md">
            <span className="font-medium text-gray-700">Severity</span>
            <div className="border-2 p-4 rounded-md">
              <span className="text-gray-900">
                {row?.severity ?? "Informational"}
              </span>
            </div>
          </div>

          <div className="bg-white p-4 flex flex-col gap-y-2 rounded-md">
            <span className="font-medium text-gray-700">
              Suggested Resolution
            </span>
            <div className="border-2 p-4 rounded-md">
              <span className="text-gray-700">{renderResolution()}</span>
            </div>
          </div>
        </div>

        <div className="inline-flex justify-center w-full mt-4">
          <Button
            intent={"primary"}
            className="w-full lg:w-[10rem]"
            onClick={() => dispatch(setCloseModal("anomalyDetails"))}
          >
            Close
          </Button>
        </div>
      </div>
    </Layout>
  );
}

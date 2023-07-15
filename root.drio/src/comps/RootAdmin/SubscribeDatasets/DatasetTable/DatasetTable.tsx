import Button from "@/comps/ui/Button/Button";
import Table from "@/comps/ui/Table/Table";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setCloseModal } from "@/state/slices/uiSlice";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import SubscribeDatasetMenu from "../SubscribeDatasetMenu";

const headers = [
  {
    header: "Dataset",
    accessor: "dataset",
  },
  {
    header: "6 Months Access",
    accessor: "sixMonthsAccess",
  },

  {
    header: "Visibility",
    accessor: "visibility",
  },

  {
    header: "Contract in Place",
    accessor: "contractInPlace",
  },

  {
    header: "Daily Usage Frequency",
    accessor: "frequency",
  },

  {
    header: "Alerts (7 days)",
    accessor: "alerts",
  },
];

const DatasetTable = ({ index }: { index: string }) => {
  const dispatch = useAppDispatch();
  const subscribeDatasets = useAppSelector((state) => state.subscribeDataset);
  return (
    <div>
      <div className="flex justify-between p-2 bg-gray-100">
        <div className="flex items-center gap-x-2">
          <div className="flex gap-x-4 items-center shadow-md p-2 bg-white rounded-md">
            <Image
              src="/company-logo.svg"
              alt="company logo"
              width={40}
              height={40}
            />
            <span>Company</span>
          </div>
          <span className="text-xl">
            <span className="font-medium"> Organization Unit:</span> Kelly Blue
            Book
          </span>
        </div>
        <button
          onClick={() => dispatch(setCloseModal(`viewDatasetTable-${index}`))}
        >
          <HiX className="w-6 h-6" />
        </button>
      </div>

      <Table
        headers={headers}
        noSelection={true}
        menu={SubscribeDatasetMenu}
        rows={subscribeDatasets.rows.map((row) => ({
          dataset: row.dataset,
          sixMonthsAccess: "25",
          visibility: row.visibility,
          contractInPlace: row.contractInPlace,
          frequency: row.frequency,
          alerts: row.alerts,
        }))}
      />
    </div>
  );
};

export default DatasetTable;

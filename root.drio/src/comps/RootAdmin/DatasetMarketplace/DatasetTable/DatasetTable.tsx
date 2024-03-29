import Image from "next/image";
import { HiX } from "react-icons/hi";
import Table from "@/comps/ui/Table/Table";
import { setCloseModal } from "@/state/slices/uiSlice";
import DatasetMarketplaceMenu from "../DatasetMarketplaceMenu";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

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
  const { rows } = useAppSelector((state) => state.datasetMarketplace);

  return (
    <div>
      <div className="flex justify-between p-2 bg-gray-100">
        <div className="flex items-center gap-x-2">
          <div className="flex gap-x-4 items-center shadow-md p-2 bg-white rounded-md">
            <Image
              width={40}
              height={40}
              alt="company logo"
              src="/company-logo.svg"
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
        // menu={DatasetMarketplaceMenu}
        rows={rows.map((row) => ({
          alerts: row.alerts,
          dataset: row.dataset,
          sixMonthsAccess: "25",
          frequency: row.frequency,
          visibility: row.visibility,
          contractInPlace: row.contractInPlace,
        }))}
      />
    </div>
  );
};

export default DatasetTable;

import Image from "next/image";
import Button from "@/comps/ui/Button/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { useRouter } from "next/router";
import Link from "next/link";
import Modal from "@/comps/ui/Modal";
import SubscriptionStatus from "../../SubscribeDatasets/SubscriptionStatus/SubscriptionStatus";
import { setOpenModal } from "@/state/slices/uiSlice";

const headers = [
  {
    header: "VIN#",
    accessor: "vin",
  },
  {
    header: "Ok",
    accessor: "ok",
  },

  {
    header: "Service",
    accessor: "service",
  },

  {
    header: "Data",
    accessor: "data",
  },

  {
    header: "Year",
    accessor: "year",
  },
  {
    header: "Make",
    accessor: "make",
  },
  {
    header: "Model",
    accessor: "model",
  },
  {
    header: "Resell",
    accessor: "resell",
  },
];

const rows: TableRow[] = [
  {
    id: "1",
    vin: "CFQ123456",
    ok: "Yes",
    service: "Transmisson",
    data: "True",
    year: "2",
    make: "41",
    model: "F250",
    resell: "2",
  },
  {
    id: "2",
    vin: "CFQ123456",
    ok: "Yes",
    service: "Transmisson",
    data: "True",
    year: "2",
    make: "41",
    model: "F250",
    resell: "2",
  },
  {
    id: "3",
    vin: "CFQ123456",
    ok: "Yes",
    service: "Transmisson",
    data: "True",
    year: "2",
    make: "41",
    model: "F250",
    resell: "2",
  },
  {
    id: "4",
    vin: "CFQ123456",
    ok: "Yes",
    service: "Transmisson",
    data: "True",
    year: "2",
    make: "41",
    model: "F250",
    resell: "2",
  },
];

export default function DatasetDetails({ row }: TableRow) {
  const router = useRouter();
  const pathname = router.query.dataset;
  const dispatch = useAppDispatch();

  const datasetState = useAppSelector((state) => state.dataset);

  const currentDataset = datasetState.rows.find(
    (row) => row.dataset === pathname
  );

  return (
    <div className="py-2 h-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-gray-50"}>
        <span className="text-sm text-gray-900 inline-block p-4 rounded-md">
          {currentDataset?.dataset}
        </span>

        <div className={`bg-white rounded-lg flex flex-col`}>
          <div className="flex flex-col gap-y-4 text-sm p-4">
            <div className="p-2 shadow-lg rounded-lg w-48">
              <Image
                src="/images/xtime.png"
                alt="Logo"
                width={150}
                height={150}
              />
            </div>

            <span>Accessibility: Must Have Contract in place to access</span>
            <span>Organization / Business Unit: Xtime</span>
            <span>Number of Subscribers: 56</span>
            <span>Contract in Place: Pending </span>
            <span>Daliy Access Frequency: 25</span>
            <div>
              <Button
                intent={"primary"}
                className="-ml-1"
                onClick={() => dispatch(setOpenModal("subscriptionStatus"))}
              >
                View Contract Request
              </Button>
            </div>

            <div className="hidden">
              <Modal identifier={`subscriptionStatus`}>
                <SubscriptionStatus />
              </Modal>
            </div>
          </div>

          <div className="block w-full overflow-x-auto bg-white mt-4">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {headers?.map((header, index) => (
                    <th
                      key={index}
                      className={
                        "border-t border-b text-gray-500 text-xs p-4 text-left"
                      }
                    >
                      {header.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows?.map((row, index) => {
                  return (
                    <tr
                      key={index}
                      className={`hover:bg-gray-5 border-t border-b border-gray-100`}
                    >
                      {headers?.map((header, index) => (
                        <td
                          key={index}
                          className={
                            "border-t border-b text-gray-500 text-xs p-4 text-left"
                          }
                        >
                          <span className={`inline-block`}>
                            {row[header.accessor]}
                          </span>
                        </td>
                      ))}
                    </tr>
                  );
                })}
                <tr></tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg bg-gray-50 w-full py-3 flex justify-end">
            <Button intent={"primary"} className="mx-4">
              <Link href={`/datasets`}>Done</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

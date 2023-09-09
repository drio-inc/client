import Table from "@/comps/ui/Table";
import { setRows } from "@/state/slices/DDXInstanceSlice";
import { setCurrentDDXCluster } from "@/state/slices/DDXSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { HiX } from "react-icons/hi";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import { useGetDDXInstancesQuery } from "@/api/resources/ddx";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";

const headers = [
  {
    header: "Instance Name",
    accessor: "name",
  },
  {
    header: "Ip Address",
    accessor: "ipaddress",
  },
  {
    header: "State",
    accessor: "state",
    status: {
      failed: "bg-red-100 text-red-800 px-2 py-1 font-medium rounded",
      stopped: "bg-gray-100 text-gray-800 px-2 py-1 font-medium rounded",
      running: "bg-green-100 text-green-800 px-2 py-1 font-medium rounded",
      upgrading: "bg-yellow-100 text-yellow-800 px-2 py-1 font-medium rounded",
    },
  },
];

const DDXInstances = () => {
  const dispatch = useAppDispatch();
  const { rows } = useAppSelector((state) => state.DDXInstance);
  const { currentDDXCluster } = useAppSelector((state) => state.DDX);

  const { data: ddxInstances, isLoading } = useGetDDXInstancesQuery({
    account_id: currentDDXCluster?.account_id ?? "",
    ou_id: currentDDXCluster?.ou_id ?? "",
    cluster_id: currentDDXCluster?.id ?? "",
  });

  if (ddxInstances) {
    dispatch(setRows(ddxInstances));
  }

  const handleRowClick = (row: TableRow) => {
    dispatch(setCurrentDDXCluster(row));
    dispatch(setOpenModal("ddxInstanceTable"));
  };

  if (isLoading) return <StaticLoader />;

  return (
    <div className="w-[80vw]">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div
          className={`rounded-lg bg-gray-50 p-4 flex flex-wrap items-center justify-between`}
        >
          <h2 className="font-medium text-lg">
            DDX Instances for Cluster:{" "}
            <span className="font-bold">{currentDDXCluster?.name}</span>
          </h2>
          <span>
            <HiX
              className="w-8 h-8 cursor-pointer hover:text-drio-red-dark transition-all duration-200"
              onClick={() => dispatch(setCloseModal("ddxInstanceTable"))}
            />
          </span>
        </div>

        <Table
          rows={rows}
          noSelection
          headers={headers}
          handleRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};

export default DDXInstances;

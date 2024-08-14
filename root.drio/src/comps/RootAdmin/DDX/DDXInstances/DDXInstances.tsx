import Table from "@/comps/ui/Table";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { HiX } from "react-icons/hi";
import { setCloseModal } from "@/state/slices/uiSlice";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import { useGetDDXInstancesQuery } from "@/api/resources/ddx";

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
      failed: "bg-red-100 text-red-900 px-2 py-1 font-medium rounded",
      stopped: "bg-gray-100 text-gray-800 px-2 py-1 font-medium rounded",
      running: "bg-green-100 text-green-900 px-2 py-1 font-medium rounded",
      upgrading: "bg-yellow-100 text-yellow-900 px-2 py-1 font-medium rounded",
    },
  },
  {
    header: "Cluster #VCPU",
    accessor: "clusterVCPU",
  },
  {
    header: "Cluster Memory",
    accessor: "clusterMemory",
  },
  {
    header: "Cluster Storage",
    accessor: "clusterStorage",
  },
];

const DDXInstances = () => {
  const dispatch = useAppDispatch();
  const { currentDDXCluster } = useAppSelector((state) => state.DDX);

  const { data: ddxInstances, isLoading } = useGetDDXInstancesQuery({
    account_id: currentDDXCluster?.account_id ?? "",
    ou_id: currentDDXCluster?.ou_id ?? "",
    cluster_id: currentDDXCluster?.id ?? "",
  });

  if (isLoading) return <StaticLoader />;

  console.log(ddxInstances);

  return (
    <div className="w-[80vw]">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div className={`rounded-lg bg-gray-50 p-4 flex flex-wrap items-center justify-between`}>
          <h2 className="font-medium text-lg">
            DDX Instances for Cluster: <span className="font-bold">{currentDDXCluster?.name}</span>
          </h2>
          <span>
            <HiX
              className="w-8 h-8 cursor-pointer hover:text-drio-red-dark transition-all duration-200"
              onClick={() => dispatch(setCloseModal("ddxInstanceTable"))}
            />
          </span>
        </div>

        <Table noSelection headers={headers} rows={ddxInstances ?? []} />
      </div>
    </div>
  );
};

export default DDXInstances;

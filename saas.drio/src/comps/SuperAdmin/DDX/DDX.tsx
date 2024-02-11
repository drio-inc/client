import Table from "@/comps/ui/Table";
import DDXMenu from "@/comps/SuperAdmin/DDX/DDXMenu";
import { setSelectedRows } from "@/state/slices/DDXSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { HiMinusSm } from "react-icons/hi";
import { IoRefresh } from "react-icons/io5";
import * as Checkbox from "@radix-ui/react-checkbox";

import { useAccounts } from "@/hooks/useAccounts";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";

const INDICES_TO_CHANGE = [3];

const headers = [
  {
    header: "Name",
    accessor: "name",
  },

  {
    header: "Account",
    accessor: "account",
  },

  {
    header: "Organization Unit",
    accessor: "ou",
  },

  {
    header: "Status",
    accessor: "status",
    status: {
      Active: "bg-green-100 text-green-800 px-2 py-1 font-medium rounded",
      Inactive: "bg-gray-100 text-gray-800 px-2 py-1 font-medium rounded",
      Unregistered: "bg-red-100 text-red-800 px-2 py-1 font-medium rounded",
      Pending: "bg-yellow-100 text-yellow-800 px-2 py-1 font-medium rounded",
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

  {
    header: "Infra Provider",
    accessor: "infraProvider",
  },

  {
    header: "Location",
    accessor: "location",
  },
  {
    header: "DDX Version",
    accessor: "ddxVersion",
  },
];

const DDX = () => {
  const dispatch = useAppDispatch();
  const { rows, isLoading } = useAccounts();
  const DDXState = useAppSelector((state) => state.DDX);

  const handleCheckbox = (index: number) => {
    if (DDXState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(DDXState.selectedRows.filter((row) => row !== index))
      );
    } else {
      dispatch(setSelectedRows([...DDXState.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => dispatch(setSelectedRows([]));

  if (isLoading) return <StaticLoader />;

  const transformData = () => {
    const transformedData = [];

    for (const [index, account] of rows.entries()) {
      const accountData = {
        account: account.name,
      };

      if (account.organization_units) {
        for (const orgUnit of account.organization_units) {
          const ouData = {
            ou: orgUnit.name,
          };

          if (orgUnit.ddx_clusters) {
            for (const [index, ddxCluster] of orgUnit.ddx_clusters.entries()) {
              console.log(account.name, orgUnit.name, ddxCluster.name);

              const clusterData = {
                index_no: index,
                name: ddxCluster.name,
                ddxVersion: "1.0.2.03232023",

                location: INDICES_TO_CHANGE.includes(index)
                  ? `NA`
                  : `${account.city}, ${account.state}, ${account.country}`,

                clusterMemory: INDICES_TO_CHANGE.includes(index)
                  ? `NA`
                  : `1 GB`,

                clusterStorage: INDICES_TO_CHANGE.includes(index)
                  ? `NA`
                  : `1 TB`,

                clusterVCPU: INDICES_TO_CHANGE.includes(index)
                  ? `NA`
                  : Math.round(Math.random() * 25),

                status: INDICES_TO_CHANGE.includes(index)
                  ? "Unregistered"
                  : "Active",

                infraProvider: INDICES_TO_CHANGE.includes(index)
                  ? `NA`
                  : ["AWS", "Azure", "Kafka"][Math.round(Math.random() * 2)],
              };

              const combinedData = {
                ...ouData,
                ...accountData,
                ...clusterData,
              };

              transformedData.push(combinedData);
            }
          }
        }
      }
    }

    return transformedData;
  };

  return (
    <div className="py-2 w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div
          className={` bg-gray-50 flex flex-wrap items-center justify-between`}
        >
          {DDXState.selectedRows.length > 0 && (
            <div className="flex items-center px-4 py-4">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={DDXState.selectedRows.length > 0}
                onCheckedChange={() => {
                  clearSelectedRows?.();
                }}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className={"font-medium text-sm text-gray-700"}>
                {DDXState.selectedRows.length} Item(s) Selected
              </h3>

              <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
                <IoRefresh className="mr-1 font-bold" />
                <span className="text-sm font-medium">Re-run</span>
              </button>
            </div>
          )}
        </div>

        <Table
          menu={DDXMenu}
          headers={headers}
          rows={transformData()}
          handleCheckbox={handleCheckbox}
          selectedRows={DDXState.selectedRows}
        />
      </div>
    </div>
  );
};

export default DDX;

import Table from "@/comps/ui/Table";
import { faker } from "@faker-js/faker";
import { setRows, setSelectedRows } from "@/state/slices/quotesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import Button from "@ui/Button";
import { useEffect } from "react";

import ProductsMenu from "./QuotesMenu";
import { HiMinusSm } from "react-icons/hi";
import { IoRefresh } from "react-icons/io5";
import { useGetQuotesQuery } from "@/api/quotes";
import * as Checkbox from "@radix-ui/react-checkbox";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";

const headers = [
  {
    header: "Carrier",
    accessor: "name",
  },

  {
    header: "Carrier Type",
    accessor: "type",
  },

  {
    header: "Transport Mode",
    accessor: "mode",
  },

  {
    header: "Service",
    accessor: "service",
  },

  {
    header: "Origin Port",
    accessor: "originPort",
  },

  {
    header: "Destination Port",
    accessor: "destinationPort",
  },
  {
    header: "Minimum Weight",
    accessor: "minimumWeight",
  },
  {
    header: "Maximum Weight",
    accessor: "maximumWeight",
  },
];

const Quotes = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetQuotesQuery();
  const quotesState = useAppSelector((state) => state.quotes);

  useEffect(() => {
    if (!isLoading && data) dispatch(setRows(data));
  }, [data, dispatch, isLoading]);

  const handleCheckbox = (index: number) => {
    if (quotesState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(quotesState.selectedRows.filter((row) => row !== index))
      );
    } else {
      dispatch(setSelectedRows([...quotesState.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => dispatch(setSelectedRows([]));
  if (isLoading && !quotesState.rows.length) return <StaticLoader />;

  if (data) console.log(data);

  return (
    <div className="w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div
          className={`rounded-lg bg-gray-50 ${
            quotesState.selectedRows.length > 0 && `px-4 py-3`
          } flex flex-wrap items-center justify-between`}
        >
          {quotesState.selectedRows.length > 0 && (
            <div className="flex items-center">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={quotesState.selectedRows.length > 0}
                onCheckedChange={() => {
                  clearSelectedRows?.();
                }}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className={"font-medium text-sm text-gray-700"}>
                {quotesState.selectedRows.length} Item(s) Selected
              </h3>

              <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
                <IoRefresh className="mr-1 font-bold" />
                <span className="text-sm font-medium">Re-run</span>
              </button>
            </div>
          )}
        </div>

        <Table
          headers={headers}
          menu={ProductsMenu}
          rows={quotesState.rows}
          handleCheckbox={handleCheckbox}
          selectedRows={quotesState.selectedRows}
        />
      </div>
    </div>
  );
};

export default Quotes;

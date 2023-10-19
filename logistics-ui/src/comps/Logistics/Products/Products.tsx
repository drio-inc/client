import Table from "@/comps/ui/Table";
import { faker } from "@faker-js/faker";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { setRows, setSelectedRows } from "@/state/slices/productsSlice";

import Button from "@ui/Button";
import { useEffect } from "react";

import ProductsMenu from "./ProductsMenu";
import { HiMinusSm } from "react-icons/hi";
import { IoRefresh } from "react-icons/io5";
import { useGetProductsQuery } from "@/api/products";
import * as Checkbox from "@radix-ui/react-checkbox";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";

const headers = [
  {
    header: "Product Name",
    accessor: "name",
  },

  {
    header: "Model",
    accessor: "model",
  },

  {
    header: "Year",
    accessor: "year",
  },

  {
    header: "SKU",
    accessor: "sku",
  },

  {
    header: "Weight In LBS",
    accessor: "weight",
  },

  {
    header: "Volume In Cuin",
    accessor: "volume",
  },
  {
    header: "Inventory Location",
    accessor: "inventoryLocation",
  },
  {
    header: "Shipment Quantity",
    accessor: "shipmentQuantity",
  },
  {
    header: "Dealer Name",
    accessor: "dealerName",
  },
  {
    header: "Ship To Location",
    accessor: "shipToLocation",
  },
  {
    header: "Desired ETA",
    accessor: "desiredETA",
  },
];

const Products = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetProductsQuery();
  const productsState = useAppSelector((state) => state.products);

  useEffect(() => {
    if (!isLoading && data) dispatch(setRows(data));
  }, [data, dispatch, isLoading]);

  const handleCheckbox = (index: number) => {
    if (productsState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(
          productsState.selectedRows.filter((row) => row !== index)
        )
      );
    } else {
      dispatch(setSelectedRows([...productsState.selectedRows, index]));
    }
  };

  const clearSelectedRows = () => dispatch(setSelectedRows([]));
  if (isLoading && !productsState.rows.length) return <StaticLoader />;

  if (data) console.log(data);

  return (
    <div className="w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div
          className={`rounded-lg bg-gray-50 ${
            productsState.selectedRows.length > 0 && `px-4 py-3`
          } flex flex-wrap items-center justify-between`}
        >
          {productsState.selectedRows.length > 0 && (
            <div className="flex items-center">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={productsState.selectedRows.length > 0}
                onCheckedChange={() => {
                  clearSelectedRows?.();
                }}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className={"font-medium text-sm text-gray-700"}>
                {productsState.selectedRows.length} Item(s) Selected
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
          rows={productsState.rows}
          handleCheckbox={handleCheckbox}
          selectedRows={productsState.selectedRows}
        />
      </div>
    </div>
  );
};

export default Products;

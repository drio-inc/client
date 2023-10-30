import { useEffect } from "react";
import Table from "@/comps/ui/Table";
import { io } from "socket.io-client";
import { faker } from "@faker-js/faker";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setRows, setSelectedRows } from "@/state/slices/productsSlice";

import ProductsMenu from "./ProductsMenu";
import { useGetProductsQuery } from "@/api/products";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";

const headers = [
  {
    header: "Order ID",
    accessor: "orderId",
  },

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

  // useEffect(() => {
  //   if (!isLoading && data) dispatch(setRows(data));

  //   // const socket = io("ws://localhost:5000");
  //   // socket.on("connect", () => console.log("connected"));
  //   // socket.on("products", (data) => console.log(data));
  //   // return () => {
  //   //   socket.disconnect();
  //   // };

  // }, [data, dispatch, isLoading]);

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

  if (isLoading && !productsState.rows.length) return <StaticLoader />;

  return (
    <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
      <Table
        important
        noSelection
        headers={headers}
        menu={ProductsMenu}
        rows={productsState.rows}
        handleCheckbox={handleCheckbox}
        selectedRows={productsState.selectedRows}
      />
    </div>
  );
};

export default Products;

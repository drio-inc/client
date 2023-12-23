import { useEffect, useMemo } from "react";
import Table from "@/comps/ui/Table";
import { useRouter } from "next/router";
import { faker } from "@faker-js/faker";
import { setRows, setSelectedRows } from "@/state/slices/quotesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import ProductsMenu from "./QuotesMenu";
import ShipmentDetails from "./ShipmentDetails";
import { useGetQuotesQuery } from "@/api/quotes";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";

import location_to_origin from "@data/location_to_origin.json";
import dealer_to_destination from "@data/dealer_to_destination.json";

const headers = [
  {
    header: "Carrier",
    accessor: "carrier",
  },

  {
    header: "Carrier Type",
    accessor: "type",
  },

  {
    header: "Transport Mode",
    accessor: "transport_mode",
  },

  {
    header: "Service",
    accessor: "service",
  },

  {
    header: "Origin Port",
    accessor: "origin_port",
  },

  {
    header: "Destination Port",
    accessor: "destination_port",
  },
  {
    header: "Minimum Weight",
    accessor: "minimum_weight",
  },
  {
    header: "Rate",
    accessor: "rate",
  },
  {
    header: "Minimum Cost",
    accessor: "minimumCost",
  },
  {
    header: "Days To Deliver",
    accessor: "daysToDeliver",
  },
];

const Quotes = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetQuotesQuery({
    limit: 10,
    offset: 0,
    origin_port: "",
    destination_port: "",
  });
  const quotesState = useAppSelector((state) => state.quotes);
  const { selectedItem } = useAppSelector((state) => state.inventory);

  // useEffect(() => {
  //   if (!isLoading && data) dispatch(setRows(data));
  // }, [data, dispatch, isLoading]);

  const originPort =
    location_to_origin[
      selectedItem?.inventoryLocation as keyof typeof location_to_origin
    ];

  const destinationPort =
    dealer_to_destination[
      selectedItem?.dealerName as keyof typeof dealer_to_destination
    ]?.destination_port;

  const filteredRows = useMemo(() => {
    return quotesState.rows.filter(
      (row) =>
        row.originPort === originPort && row.destinationPort === destinationPort
    );
  }, [destinationPort, originPort, quotesState.rows]);

  if (isLoading && !quotesState.rows.length) return <StaticLoader />;

  return (
    <div className="w-full">
      <ShipmentDetails />

      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <Table
          noSelection
          headers={headers}
          menu={ProductsMenu}
          selectedRows={quotesState.selectedRows}
          rows={filteredRows.length === 0 ? quotesState.rows : filteredRows}
        />
      </div>
    </div>
  );
};

export default Quotes;

import Table from "@/comps/ui/Table";
import { useAppSelector } from "@/hooks/useStoreTypes";

import InventoryMenu from "./InventoryMenu";
import useInventory from "@/hooks/useInventory";
import { useGetOrdersQuery } from "@/api/orders";
import { useGetProductsQuery } from "@/api/products";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";

const headers = [
  {
    header: "Order ID",
    accessor: "order_id",
  },

  {
    header: "Product Name",
    accessor: "name",
  },

  {
    header: "Cost of Goods",
    accessor: "price",
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
    accessor: "inventory_location",
  },
  {
    header: "Shipment Quantity",
    accessor: "shipment_quantity",
  },
  {
    header: "Dealer Name",
    accessor: "dealer_name",
  },
  {
    header: "Ship To Location",
    accessor: "ship_to_location",
  },
  // {
  //   header: "Desired ETA",
  //   accessor: "desiredETA",
  // },
];

const Products = () => {
  // const { isLoading: isProductsLoading } = useGetProductsQuery({
  //   name: "",
  //   offset: 0,
  //   limit: 10,
  // });

  // const { isLoading: isOrdersLoading } = useGetOrdersQuery({
  //   name: "",
  //   offset: 0,
  //   limit: 10,
  // });

  const { inventoryRows } = useInventory();
  const { selectedRows } = useAppSelector(({ inventory }) => inventory);

  // if (isProductsLoading || isOrdersLoading) return <StaticLoader />;

  return (
    <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
      <Table
        important
        noSelection
        headers={headers}
        rows={inventoryRows}
        menu={InventoryMenu}
        selectedRows={selectedRows}
      />
    </div>
  );
};

export default Products;

import Table from "@/comps/ui/Table";
import InventoryMenu from "./InventoryMenu";
import { useGetOrdersQuery } from "@/api/orders";
import { useGetProductsQuery } from "@/api/products";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

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

const Inventory = () => {
  const dispatch = useAppDispatch();
  const { isLoading: isProductsLoading } = useGetProductsQuery({
    name: "",
    offset: 0,
    limit: 10,
  });

  const { isLoading: isOrdersLoading } = useGetOrdersQuery({
    name: "",
    offset: 0,
    limit: 10,
  });

  const {
    orders,
    products,
    selectedRows,
    rows: productRows,
  } = useAppSelector(({ inventory }) => inventory);

  if (isProductsLoading || isOrdersLoading) return <StaticLoader />;

  const rows = () => {
    const orderMap = new Map(orders.map((order) => [order.name, order]));
    const combinedInventory = products.map((product) => {
      const matchingOrder = orderMap.get(product.name);

      if (matchingOrder) {
        return {
          ...product,
          order_id: matchingOrder.order_id,
          dealer_name: matchingOrder.dealer_name,
          ship_to_location: matchingOrder.ship_to_location,
          shipment_quantity: matchingOrder.shipment_quantity,
          price: `$ ${new Intl.NumberFormat().format(matchingOrder.price)}`,
        };
      }

      return product;
    });

    return combinedInventory;
  };

  return (
    <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
      <Table
        important
        noSelection
        headers={headers}
        rows={productRows}
        menu={InventoryMenu}
        selectedRows={selectedRows}
      />
    </div>
  );
};

export default Inventory;

import React, { useCallback, useEffect } from "react";
import { setRows } from "@/state/slices/inventorySlice";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreTypes";

const useInventory = () => {
  const dispatch = useAppDispatch();
  const {
    orders,
    products,
    rows: inventoryRows,
  } = useAppSelector(({ inventory }) => inventory);

  const rows = useCallback(() => {
    const combinedInventory = products.map((product) => {
      const matchingOrder = orders.find((order) => order.sku === product.sku);

      if (matchingOrder) {
        return {
          ...product,
          order_id: matchingOrder.order_id,
          dealer_name: matchingOrder.dealer_name,
          shipment_quantity: matchingOrder.ship_quantity,
          ship_to_location: matchingOrder.ship_to_location,
          price: `$${new Intl.NumberFormat().format(matchingOrder.price)}`,
        };
      }

      return product;
    });

    return combinedInventory;
  }, [orders, products]);

  useEffect(() => {
    dispatch(setRows(rows()));
  }, [dispatch, rows]);

  return { inventoryRows };
};

export default useInventory;

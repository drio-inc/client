export type Order = {
  id: string;
  name: string;
  price: string;
  order_id: string;
  dealer_name: string;
  ship_to_location: number;
  shipment_quantity: number;
};

export type OrderParams = {
  name?: string;
  limit?: number;
  offset?: number;
};

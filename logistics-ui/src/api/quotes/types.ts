export type Quote = {
  id: string;
  name: string;
  model: string;
  year: string;
  sku: string;
  weight: number;
  volume: number;
  inventoryLocation: string;
  shipmentQuantity: number;
};

export type Quotes = Quote[];

export type Product = {
  id: string;
  name: string;
  year: string;
  sku: string;
  weight: number;
  volume: number;
  product_code: string;
  inventoryLocation: string;
};

export type ProductParams = {
  name?: string;
  limit?: number;
  offset?: number;
};

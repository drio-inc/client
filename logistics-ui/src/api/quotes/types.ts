export type Quote = {
  id: string;
  type: string;
  service: string;
  carrier: string;
  origin_port: number;
  minimum_weight: string;
  maximum_weight: string;
  destination_port: number;
};

export type QuoteParams = {
  limit?: number;
  offset?: number;
  origin_port?: string;
  destination_port?: string;
};

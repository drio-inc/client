type TableRow = {
  [key: string]: any;
};

type TemplateBody = {
  id: string;
  uom: string;
  volex_item: string;
  item_description: string;
  forecast_information: {
    id: string;
    qty: number;
    forecast_code: string;
    forecast_date_load: string;
    warehouse_location_id: string;
    interval_grouping_of_forecast: string;
  }[];
};

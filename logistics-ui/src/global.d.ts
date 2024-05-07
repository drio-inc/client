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

interface ItemInformation {
  id: string;
  "Line #": string;
  "Buyer's Part Number": string;
  "Unit Detail": {
    "Composite Unit of Measure": string;
  };

  "Contact Information": {
    "Contact Function Code": string;
    Name: string;
    Telephone: string;
  };

  "Forecast Schedule": {
    id: string;
    Quantity: string;
    "Forecast Qualifier": string;
    "Timing Qualifier": string;
    Date: string;
  }[];
}

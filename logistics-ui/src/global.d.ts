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

interface DocumentInformation {
  "Transaction Set Purpose Code": string;
  "Forecast Order Number": string;
  "Release Number": string;
  "Forecast Type Qualifier": string;
  "Forecast Quantity Qualifier": string;
  "Schedule Horizon Start Date": string;
  "Schedule Horizon End Date": string;
  "Issue Date": string;
}

interface ReferenceInformation {
  "Warehouse Storage Location": string;
  Number: string;
}

interface ShipInformation {
  "Company Name": string;
  "Additional Name": string;
  "Assigned by Buyer": string;
  Address: string;
  "Address 1": string;
  "Address 2": string;
  "Citiy/State/Zip": string;
  Country: string;
}

interface ContactInformation {
  "Contact Function Code": string;
  Name: string;
  Telephone: string;
}

interface ForecastSchedule {
  Quantity: string;
  "Forecast Qualifier": string;
  "Timing Qualifier": string;
  Date: string;
}

interface ShippingDocument {
  documentInformation: DocumentInformation;
  referenceInformation: ReferenceInformation;
  shipFromInformation: ShipInformation;
  shipToInformation: ShipInformation;
  contactInformation: ContactInformation;
  forecastSchedule: ForecastSchedule;
}

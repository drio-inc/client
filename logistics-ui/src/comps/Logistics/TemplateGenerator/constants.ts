import { v4 as uuid } from "uuid";

export const forecastCodeEnum = ["Firm", "Planning", "Order"];
export const warehouseLocationIdEnum = ["1A", "2B", "3C", "4D", "5E"];
export const intervalGroupingOfForecastEnum = ["Weekly", "Yearly", "Monthly", "Quarterly"];
export const uomEnum = ["Each", "Case", "Box", "Foot", "Pound", "Liter", "Meter", "Kilogram"];

export const newForecast = {
  id: uuid(),
  forecast_code: "",
  interval_grouping_of_forecast: "",
  qty: 0,
  forecast_date_load: "",
  warehouse_location_id: "",
};

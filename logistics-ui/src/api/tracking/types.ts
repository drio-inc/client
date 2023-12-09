export type TrackingData = {
  id: string;
  order_id: string;
  current_lat: number;
  current_long: number;
  carrier_name: string;
  product_name: string;
  customer_name: string;
  delay_in_days: string;
  origin_location: string;
  end_date: Date | string;
  current_location: string;
  start_date: Date | string;
  distance_in_miles: number;
  planned_eta: Date | string;
  destincation_location: string;
  status_check_time: Date | string;
};

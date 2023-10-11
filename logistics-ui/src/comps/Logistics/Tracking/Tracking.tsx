import React from "react";
import Location from "./Location";
import Overview from "./Overview";
import ShipmentList from "./ShipmentList";
import Status from "./Status";

const Tracking = () => {
  return (
    <div className="flex flex-wrap flex-col lg:flex-row gap-x-4 gap-y-4">
      <Location />
      <Overview />
      <ShipmentList />
      <Status />
    </div>
  );
};

export default Tracking;

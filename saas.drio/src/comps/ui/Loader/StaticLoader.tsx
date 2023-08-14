import React from "react";
import { RiLoader4Fill } from "react-icons/ri";

const StaticLoader = () => {
  return (
    <div className="custom-container flex justify-center items-center">
      <RiLoader4Fill
        className="animate-spin text-5xl text-drio-red font-bold"
        data-testid="loading-svg"
      />
    </div>
  );
};

export default StaticLoader;

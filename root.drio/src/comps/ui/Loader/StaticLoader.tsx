import React from "react";
import { RiLoader4Fill } from "react-icons/ri";

const StaticLoader = () => {
  return (
    <div className="flex justify-center items-center bg-transparent">
      <RiLoader4Fill className="animate-spin text-5xl text-drio-red font-bold" />
    </div>
  );
};

export default StaticLoader;

import React from "react";
import AnomalyPopupV1 from "../AnomalyPopupV1";
import AnomalyPopupV2 from "../AnomalyPopupV2";
import { useAppSelector } from "@/hooks/useStoreTypes";

const AnomalyDetails = () => {
  const { row } = useAppSelector((state) => state.anomalies);

  return <AnomalyPopupV2 />;
};

export default AnomalyDetails;

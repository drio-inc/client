import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi";

import { formatHourAgo } from "@/utils/formatTime";

interface IAlertProps {
  timeStamp?: number;
  status?: "success" | "error" | "warning" | "info" | undefined;
  message: string | null;
}

const AlertMessage = ({ message, status, timeStamp }: IAlertProps) => {
  const [serverError, setServerError] = useState<{
    message: string | null;
    timestamp: number;
  }>({ message: null, timestamp: 0 });

  useEffect(() => {
    if (serverError.message && serverError.timestamp > 0) {
      showAlert(serverError.message);
    }
  }, [serverError, serverError.timestamp]);

  const hourAgo = formatHourAgo(timeStamp ?? Date.now());

  return (
    <div className="flex">
      {status === "error" && (
        <HiOutlineXCircle className="text-drio-red w-6 h-6 inline-block mr-2" />
      )}

      {status === "success" && (
        <HiOutlineCheckCircle
          className={`text-green-400 w-6 h-6 inline-block mr-2`}
        />
      )}

      <div>
        <span className="font-medium text-sm text-gray-900">
          {message ?? "Something went wrong. Please try again."}
        </span>
        <br />
        {/* <span className="text-gray-700 text-sm">
          Your username or password is incorrect!
        </span>
        <br /> */}
        <span className="text-gray-400 text-sm">{hourAgo}</span>
      </div>
    </div>
  );
};

const showAlert = (
  message: string | null,
  status?: "success" | "error" | "warning" | "info" | undefined
) => {
  return toast(<AlertMessage message={message} status={status} />, {
    icon: false,
    theme: "light",
    autoClose: 5000,
    draggable: false,
    pauseOnHover: true,
    closeOnClick: true,
    progress: undefined,
    hideProgressBar: true,
    position: "bottom-right",
    style: {
      width: "100%",
      maxWidth: "400px",
      padding: ".5rem",
      borderRadius: "0px",
      boxShadow:
        "0px 2px 2px rgba(159, 162, 191, 0.32), 0px 9px 16px rgba(159, 162, 191, 0.18)",
    },
  });
};

export default showAlert;

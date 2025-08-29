import { useEffect, useState } from "react";

import { formatTime } from "@/utils/formatTime";
import { setRow } from "@/state/slices/anomaliesSlice";
import { AnimatePresence, motion } from "framer-motion";
import { setOpenModal, setShowSidebar } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { AnomalyNotification } from "@/state/slices/notificationSlice";
import { MdDeleteOutline, MdOutlineClose, MdOutlineNotifications } from "react-icons/md";

type Node = {
  name: string;
  labels: string;
  address?: string;
};

export default function Notificationbar() {
  const dispatch = useAppDispatch();
  const [alerts, setAlerts] = useState<any[]>([]);
  const { showSidebar } = useAppSelector((state) => state.ui);
  const { notifications, isRead } = useAppSelector((state) => state.notifications);

  const handleClick = (n: AnomalyNotification) => {
    dispatch(setRow(n));
    dispatch(setOpenModal("anomalyDetails"));
  };

  useEffect(() => {
    const es = new EventSource(
      `${process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000"}/alerts`
    );

    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAlerts((prevAlerts) => [data, ...prevAlerts]);
    };

    es.addEventListener("alert", (event) => {
      const data = JSON.parse(event.data);

      data.map((n: any) => {
        setAlerts((prevAlerts) => [n, ...prevAlerts]);
      });
    });

    return () => es.close();
  }, []);

  return (
    <AnimatePresence>
      {showSidebar && (
        <motion.div
          initial={{ x: "100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed bg-white top-0 right-0 text-daisy-bush-50 w-full max-w-sm h-screen overflow-auto"
          animate={{
            x: 0,
          }}
          exit={{
            x: "100%",
          }}
        >
          <div className="flex justify-between items-center border-b border-neutral-200 p-4">
            <span className="flex gap-x-2 items-center">
              <h2 className="text-xl font-medium">Notifications</h2>
              <div className="relative">
                <MdDeleteOutline
                  className="w-8 h-8 text-red-500 cursor-pointer hover:text-red-700 transition-colors"
                  onClick={() => setAlerts([])}
                />
                {/* <MdOutlineNotifications className="w-8 h-8 text-[#1F2937]" /> */}
                {/* {!isRead && (
                  <div className="absolute p-[9px] top-0 right-0 bg-drio-red rounded-full flex items-center justify-center w-3 h-3">
                    <span className="text-[12px] text-white font-medium">
                      {alerts?.length ?? 0}
                    </span>
                  </div>
                )} */}
              </div>
            </span>

            <MdOutlineClose
              className="h-8 w-8 mb-2 cursor-pointer"
              onClick={() => dispatch(setShowSidebar(!showSidebar))}
            />
          </div>

          {alerts
            .map((alert, index) => {
              const parsedAlert: Node = JSON.parse(alert);

              if (parsedAlert.labels !== "supplier") return null;

              return (
                <div
                  key={index}
                  className="p-4 border-b border-neutral-200 cursor-pointer hover:bg-neutral-100"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{parsedAlert.name}</h3>
                    <span className="text-sm text-neutral-500">{parsedAlert.labels}</span>
                  </div>
                  <p className="text-sm text-neutral-700 mt-1">{parsedAlert.address}</p>
                </div>
              );
            })
            .reverse()
            .slice(2)}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

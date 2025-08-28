import { useEffect } from "react";

import { formatTime } from "@/utils/formatTime";
import { setRow } from "@/state/slices/anomaliesSlice";
import { AnimatePresence, motion } from "framer-motion";
import { setOpenModal, setShowSidebar } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { AnomalyNotification } from "@/state/slices/notificationSlice";
import { MdOutlineClose, MdOutlineNotifications } from "react-icons/md";

export default function Notificationbar() {
  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state.ui);
  const { notifications, isRead } = useAppSelector((state) => state.notifications);

  const handleClick = (n: AnomalyNotification) => {
    dispatch(setRow(n));
    dispatch(setOpenModal("anomalyDetails"));
  };

  useEffect(() => {
    const eventSource = new EventSource("/api/receive-event");

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received event data:", data);
      } catch (error) {
        console.error("Error parsing event data:", error);
      }
    };

    eventSource.onerror = () => {
      console.error("EventSource connection error.");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [dispatch]);

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
                <MdOutlineNotifications className="w-8 h-8 text-[#1F2937]" />
                {!isRead && (
                  <div className="absolute p-[9px] top-0 right-0 bg-drio-red rounded-full flex items-center justify-center w-3 h-3">
                    <span className="text-[12px] text-white font-medium">
                      {notifications?.length ?? 0}
                    </span>
                  </div>
                )}
              </div>
            </span>

            <MdOutlineClose
              className="h-8 w-8 mb-2 cursor-pointer"
              onClick={() => dispatch(setShowSidebar(!showSidebar))}
            />
          </div>

          {[...notifications]
            ?.sort((a, b) => b.timestamp - a.timestamp)
            ?.map((n) => {
              return (
                <motion.div
                  key={n.id}
                  onClick={() => handleClick(n)}
                  className="flex flex-col px-4 pt-4 hover:bg-gray-100 cursor-pointer"
                >
                  <div className="border-b pb-2">
                    {/* <span className="mb-2 block text-[#6B7280] text-sm font-medium">
                      {isPreviousDay ? "Previous" : "Today"}
                    </span> */}

                    <span className="text-[#1F2937] font-medium capitalize">
                      {n?.event_type?.replaceAll("_", " ") ?? "Unknown Event"} on{" "}
                      {n?.name ?? "Unknown"} Dataset
                    </span>

                    <div className="flex items-center gap-x-2">
                      <div className="inline-block w-[10px] h-[10px] rounded-full bg-drio-red" />
                      <span className="text-drio-red text-sm">{formatTime(n?.timestamp)}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

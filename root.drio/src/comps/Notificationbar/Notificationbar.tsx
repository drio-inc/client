import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { formatTime } from "@/utils/formatTime";
import { AnimatePresence, motion } from "framer-motion";
import { setShowSidebar } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { MdOutlineClose, MdOutlineNotifications } from "react-icons/md";

type Notifications = {
  id: number;
  time: Date;
  name: string;
  isPreviousDay: boolean;
};

const Notifications = [
  {
    id: 1,
    time: faker.date.recent(),
    name: "Data type mismatch occurred in shipping dataset",
  },
  {
    id: 2,
    time: faker.date.recent(),
    name: "New data field detected",
  },
  {
    id: 3,
    time: faker.date.recent(),
    name: "Data type mismatch occurred in sales dataset",
  },
  {
    id: 4,
    time: faker.date.recent(),
    name: "Data traffic to UPS higher than expected detected",
  },
  {
    id: 5,
    time: faker.date.recent(),
    name: "Data value out of bound",
  },
  {
    id: 6,
    time: faker.date.recent(),
    name: "Combination of attributes outside normal level",
  },
  {
    id: 7,
    time: faker.date.recent(),
    name: "Data traffic for quotes is far below normal",
  },
];

export default function Notificationbar() {
  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state.ui);
  const [notifications, setNotifications] = useState<Notifications[] | []>([]);

  useEffect(() => {
    const updatedNotifications = Notifications.sort(
      (a, b) => b.time.getTime() - a.time.getTime()
    ).map((notification) => {
      const days =
        (Date.now() - notification.time.getTime()) / (1000 * 60) / 60 / 24;

      return {
        ...notification,
        isPreviousDay: days >= 1,
      };
    });

    setNotifications(updatedNotifications);
  }, []);

  return (
    <AnimatePresence>
      {showSidebar && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{
            x: 0,
          }}
          exit={{
            x: "100%",
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="fixed bg-white top-0 right-0 text-daisy-bush-50 w-full max-w-sm h-screen overflow-auto"
        >
          <div className="flex justify-between items-center border-b border-neutral-200 p-4">
            <span className="flex gap-x-2 items-center">
              <h2 className="text-xl font-medium">Notifications</h2>
              <div className="relative">
                <MdOutlineNotifications className="w-8 h-8 text-[#1F2937]" />
                <div className="absolute p-[9px] top-0 right-0 bg-drio-red rounded-full flex items-center justify-center w-3 h-3">
                  <span className="text-[12px] text-white font-medium">
                    {notifications?.length ?? 0}
                  </span>
                </div>
              </div>
            </span>

            <MdOutlineClose
              className="h-8 w-8 mb-2 cursor-pointer"
              onClick={() => dispatch(setShowSidebar(!showSidebar))}
            />
          </div>

          {notifications.map(({ id, name, time, isPreviousDay }) => {
            return (
              <motion.div key={id} className="flex flex-col px-4 pt-4">
                <div className="border-b pb-2">
                  <span className="mb-2 block text-[#6B7280] text-sm font-medium">
                    {isPreviousDay ? "Previous" : "Today"}
                  </span>

                  <span className="text-[#1F2937] font-medium">{name}</span>
                  <div className="flex items-center gap-x-2">
                    <div className="inline-block w-[10px] h-[10px] rounded-full bg-drio-red" />
                    <span className="text-drio-red text-sm">
                      {formatTime(time.getTime())}
                    </span>
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

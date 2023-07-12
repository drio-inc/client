import Modal from "@/comps/ui/Modal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import { setOpenModal } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import Link from "next/link";
import RequestDataAccessForm from "../RequestDataAccessForm/RequestDataAccessForm";
import ExportAppLink from "../ExportAppLink/ExportAppLink";

const SubscribeDatasetMenu = ({ row, detailsWindow }: any) => {
  const dispatch = useAppDispatch();
  const datasetState = useAppSelector((state) => state.dataset);

  return (
    <Popover.Root>
      <Popover.Trigger>
        <HiDotsVertical />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="left"
          sideOffset={5}
          align="center"
          className="bg-white rounded-lg shadow-lg text-sm text-gray-700 z-[1001]"
        >
          <span
            className={
              "cursor-pointer hover:bg-indigo-50 hover:text-drio-red w-full block"
            }
          >
            <Modal
              label="Request Access"
              identifier="requestDataAccessForm"
              onClick={() => dispatch(setOpenModal("requestDataAccessForm"))}
            >
              <RequestDataAccessForm />
            </Modal>
          </span>

          <span
            className={
              "cursor-pointer hover:bg-indigo-50 hover:text-drio-red w-full block"
            }
          >
            <Modal
              label="Get App Link"
              identifier="getAppLink"
              onClick={() => dispatch(setOpenModal("getAppLink"))}
            >
              <ExportAppLink row={row} />
            </Modal>
          </span>

          <span
            className={
              "cursor-pointer hover:bg-indigo-50 hover:text-drio-red w-full block py-2 px-4"
            }
          >
            Favorite
          </span>

          <Link href={`/datasets/${row.dataset}`}>
            <span
              className={
                "cursor-pointer hover:bg-indigo-50 hover:text-drio-red w-full block py-2 px-4"
              }
            >
              View
            </span>
          </Link>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default SubscribeDatasetMenu;

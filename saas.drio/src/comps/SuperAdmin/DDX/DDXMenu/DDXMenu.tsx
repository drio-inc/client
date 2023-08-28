import Modal from "@/comps/ui/Modal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { useAppDispatch } from "@/hooks/useStoreTypes";

import DDXDetails from "../DDXDetails";
import { setOpenModal } from "@/state/slices/uiSlice";
import UpdateLicenseForm from "../../Licensing/UpdateLicenseForm";
import Link from "next/link";

const AccountMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();

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
          className="bg-white rounded-lg shadow-lg text-sm text-gray-700"
        >
          {/* <span
            className={
              "cursor-pointer hover:bg-indigo-50 w-full block text-drio-red-dark py-2 px-4"
            }
          >
            <Link href={`/ddx/${row.account}/dashboard`}>View Dashboard</Link>
            View Dashboard
          </span> */}

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <Modal
              label="Update License"
              identifier="updateLicenseForm"
              onClick={() => dispatch(setOpenModal("updateLicenseForm"))}
            >
              <UpdateLicenseForm row={row} />
            </Modal>
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <Modal
              label="Details"
              identifier="detailsWindow"
              onClick={() => dispatch(setOpenModal("detailsWindow"))}
            >
              <DDXDetails row={row} />
            </Modal>
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default AccountMenu;

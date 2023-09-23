import Modal from "@/comps/ui/Modal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import Link from "next/link";
import AlertModal from "@/comps/ui/AlertModal";
import UpdateLicenseForm from "../../Licensing/UpdateLicenseForm";
import { setOpenModal } from "@/state/slices/uiSlice";
import { setRows, setSelectedRows } from "@/state/slices/DDXSlice";
import EditDDXForm from "../EditDDXForm";
import DDXDetails from "../DDXDetails";
import DeleteDDX from "../DeleteDDX";

const AccountMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const ddxState = useAppSelector((state) => state.DDX);

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
          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <Modal
              label="Edit"
              identifier="editDDXForm"
              onClick={() => dispatch(setOpenModal("editDDXForm"))}
            >
              <EditDDXForm row={row} />
            </Modal>
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <Modal
              label="View"
              identifier="detailsWindow"
              onClick={() => dispatch(setOpenModal("detailsWindow"))}
            >
              <DDXDetails row={row} />
            </Modal>
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <Modal
              label="Delete"
              identifier="deleteDDX"
              onClick={() => dispatch(setOpenModal("deleteDDX"))}
            >
              <DeleteDDX row={row} />
            </Modal>
          </span>

          {/* <span
            className={
              "cursor-pointer hover:bg-indigo-50 w-full block text-drio-red-dark py-2 px-4"
            }
          >
            <Link href={`/ddx/${row.account}/dashboard`}>View Dashboard</Link>
          </span> */}

          {/* <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <Modal
              label="Update License"
              identifier="updateLicenseForm"
              onClick={() => dispatch(setOpenModal("updateLicenseForm"))}
            >
              <UpdateLicenseForm />
            </Modal>
          </span> */}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default AccountMenu;

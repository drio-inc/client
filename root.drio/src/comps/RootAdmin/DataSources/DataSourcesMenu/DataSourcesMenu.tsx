import Modal from "@/comps/ui/Modal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { useAppDispatch } from "@/hooks/useStoreTypes";

import DeleteDataSource from "../DeleteDataSource";
import { setOpenModal } from "@/state/slices/uiSlice";
import EditDataSourceForm from "../EditDataSourceForm";
import DataSourceSecurity from "../DataSourceSecurity";

const DataSourcesMenu = ({ row }: TableRow) => {
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
          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <Modal
              label="Edit"
              identifier="editDataSourceForm"
              onClick={() => dispatch(setOpenModal("editDataSourceForm"))}
            >
              <EditDataSourceForm row={row} />
            </Modal>
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <Modal
              label="Delete"
              identifier="deleteDataSource"
              onClick={() => dispatch(setOpenModal("deleteDataSource"))}
            >
              <DeleteDataSource row={row} />
            </Modal>
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <Modal
              label="Security"
              identifier="editSecurityForm"
              onClick={() => dispatch(setOpenModal("editSecurityForm"))}
            >
              <DataSourceSecurity row={row} />
            </Modal>
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default DataSourcesMenu;

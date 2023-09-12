import Modal from "@/comps/ui/Modal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import AlertModal from "@/comps/ui/AlertModal";
import { setOpenModal } from "@/state/slices/uiSlice";
import { setRows, setSelectedRows } from "@/state/slices/dataSourceSlice";
import EditDataSourceForm from "../EditDataSourceForm";

const DataSourcesMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const dataSourceState = useAppSelector((state) => state.dataSource);

  const deleteRow = (id: number | string) => {
    dispatch(setRows(dataSourceState.rows.filter((row) => row.id !== id)));
    dispatch(setSelectedRows([]));
  };

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
            <AlertModal
              row={row}
              accessor={row.ou}
              onClick={() => deleteRow(row.id)}
            />
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default DataSourcesMenu;

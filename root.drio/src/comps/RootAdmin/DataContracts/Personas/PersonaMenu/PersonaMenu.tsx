import Modal from "@/comps/ui/Modal";
import AlertModal from "@ui/AlertModal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setRows, setSelectedRows } from "@/state/slices/personaSlice";
import EditPersonaForm from "../EditPersonaForm";
import { setOpenModal } from "@/state/slices/uiSlice";

const PersonaMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const personaState = useAppSelector((state) => state.personas);

  const deleteRow = (id: number | string) => {
    dispatch(setRows(personaState.rows.filter((row) => row.id !== id)));
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
              identifier="editPersonaForm"
              onClick={() => dispatch(setOpenModal("editPersonaForm"))}
            >
              <EditPersonaForm row={row} />
            </Modal>
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <AlertModal row={row} accessor={row.ou} onClick={() => deleteRow(row.id)} />
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PersonaMenu;

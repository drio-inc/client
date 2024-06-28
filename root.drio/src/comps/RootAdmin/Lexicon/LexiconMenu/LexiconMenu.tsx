import Modal from "@/comps/ui/Modal";
import ReviewLexicon from "../ReviewLexicon";
import AlertModal from "@/comps/ui/AlertModal";
import { HiDotsVertical } from "react-icons/hi";
import EditLexiconForm from "../EditLexiconForm";
import * as Popover from "@radix-ui/react-popover";
import { setOpenModal } from "@/state/slices/uiSlice";
import AddLexiconFilesForm from "../AddLexiconFilesForm";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setRows, setSelectedRows, setLexiconDetails } from "@/state/slices/lexiconSlice";

type MenuProps = {
  row: Lexicon;
};

const LexiconMenu = ({ row }: MenuProps) => {
  const dispatch = useAppDispatch();
  const lexiconState = useAppSelector((state) => state.lexicon);

  const deleteRow = (id: number | string) => {
    dispatch(setRows(lexiconState.rows.filter((row) => row.id !== id)));
    dispatch(setSelectedRows([]));
  };

  const deployLexicon = (id: number | string) => {
    dispatch(
      setRows(
        lexiconState.rows.map((row) => (row.id === id ? { ...row, status: "Deployed" } : row))
      )
    );
  };

  const disableLexicon = (id: number | string) => {
    dispatch(
      setRows(
        lexiconState.rows.map((row) => (row.id === id ? { ...row, status: "Disabled" } : row))
      )
    );
  };

  return (
    <Popover.Root>
      <Popover.Trigger>
        <HiDotsVertical />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="left"
          align="center"
          sideOffset={5}
          className="bg-white rounded-lg shadow-lg text-sm text-gray-700 flex flex-col"
        >
          <span className="cursor-pointer hover:bg-indigo-50">
            <Modal
              label="Edit"
              identifier="editLexiconForm"
              onClick={() => dispatch(setOpenModal("editLexiconForm"))}
            >
              <EditLexiconForm row={row} />
            </Modal>
          </span>

          <span className="cursor-pointer hover:bg-indigo-50">
            <Modal
              label="Add Files"
              identifier="addLexiconFilesForm"
              onClick={() => {
                dispatch(setLexiconDetails(row));
                dispatch(setOpenModal("addLexiconFilesForm"));
              }}
            >
              <AddLexiconFilesForm />
            </Modal>
          </span>

          {row.status !== "Deployed" ? (
            <Popover.Close
              onClick={() => deployLexicon(row.id)}
              className="cursor-pointer hover:bg-indigo-50 py-2 px-4 text-left"
            >
              Deploy
            </Popover.Close>
          ) : (
            <Popover.Close
              onClick={() => disableLexicon(row.id)}
              className="cursor-pointer hover:bg-indigo-50 py-2 px-4 text-left"
            >
              Disable
            </Popover.Close>
          )}

          <span className="cursor-pointer hover:bg-indigo-50">
            <Modal
              label="Review"
              identifier="reviewLexicon"
              onClick={() => dispatch(setOpenModal("reviewLexicon"))}
            >
              <ReviewLexicon row={row} />
            </Modal>
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <AlertModal row={row} accessor={row.name} onClick={() => deleteRow(row.id)} />
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default LexiconMenu;

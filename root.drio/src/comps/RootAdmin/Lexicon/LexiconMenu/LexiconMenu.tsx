import AlertModal from "@/comps/ui/AlertModal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { setRows, setSelectedRows } from "@/state/slices/lexiconSlice";

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
          <Popover.Close className="cursor-pointer hover:bg-indigo-50 py-2 px-4 text-left">
            Edit
          </Popover.Close>

          <Popover.Close className="cursor-pointer hover:bg-indigo-50 py-2 px-4 text-left">
            Add to Corpus
          </Popover.Close>

          <Popover.Close className="cursor-pointer hover:bg-indigo-50 py-2 px-4 text-left">
            Disable
          </Popover.Close>

          <Popover.Close className="cursor-pointer hover:bg-indigo-50 py-2 px-4 text-left">
            View Lexicon
          </Popover.Close>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <AlertModal row={row} accessor={row.name} onClick={() => deleteRow(row.id)} />
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default LexiconMenu;

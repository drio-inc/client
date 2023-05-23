import AlertModal from "@ui/AlertModal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";

const TableMenu = ({ row, editForm }: any) => {
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
            <AlertModal row={row} />
          </span>

          <span className={"cursor-pointer py-2 px-4 block hover:bg-indigo-50"}>
            Edit
          </span>
          <span className={"cursor-pointer py-2 px-4 block hover:bg-indigo-50"}>
            View
          </span>
          <span className={"cursor-pointer py-2 px-4 block hover:bg-indigo-50"}>
            Add new OU
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default TableMenu;

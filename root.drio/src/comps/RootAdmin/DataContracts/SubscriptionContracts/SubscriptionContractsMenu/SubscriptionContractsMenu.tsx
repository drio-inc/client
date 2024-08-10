import Link from "next/link";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import AlertModal from "@/comps/ui/AlertModal";
import { setRows, setSelectedRows } from "@/state/slices/subscriptionContractSlice";

const SubscriptionContractsMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const dataContractState = useAppSelector((state) => state.subscriptionContract);

  const deleteRow = (id: number | string) => {
    dispatch(setRows(dataContractState.rows.filter((row) => row.id !== id)));
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
          <Link href={`/data-contracts/subscription-contracts/${row.id}/edit`}>
            <span className="cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4">Edit</span>
          </Link>

          <Link href={`/data-contracts/subscription-contracts/${row.id}/view`}>
            <span className="cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4">View</span>
          </Link>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <AlertModal row={row} accessor={row.dataset} onClick={() => deleteRow(row.id)} />
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default SubscriptionContractsMenu;

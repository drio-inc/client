import { useRouter } from "next/router";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import {
  setSelectedRows,
  setselectedItem,
} from "@/state/slices/inventorySlice";

const InventoryMenu = ({ row }: TableRow) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedRows } = useAppSelector((state) => state.inventory);

  const onQuotesClick = (row: TableRow) => {
    dispatch(setselectedItem(row));
    router.push({
      pathname: "/quotes",
      query: {
        id: row.id,
        sku: row.sku,
        name: row.name,
        to: row.dealerName,
        orderId: row.orderId,
        from: row.inventoryLocation,
      },
    });
  };

  const handleCheckbox = (index: number) => {
    if (selectedRows.includes(index)) {
      dispatch(setSelectedRows(selectedRows.filter((row) => row !== index)));
    } else {
      dispatch(setSelectedRows([...selectedRows, index]));
    }
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
          className="w-full bg-white rounded-lg shadow-lg text-sm text-gray-700 flex flex-col items-start justify-start"
        >
          <Popover.Close
            onClick={() => onQuotesClick(row)}
            className="w-full flex hover:bg-indigo-50"
          >
            <span className="inline-block py-2 px-4 cursor-pointer">
              Get Quote
            </span>
          </Popover.Close>

          <Popover.Close
            onClick={() => handleCheckbox(row.id)}
            className="w-full flex hover:bg-indigo-50"
          >
            <span className="inline-block py-2 px-4 cursor-pointer">
              Mark as Important
            </span>
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default InventoryMenu;

import { useRouter } from "next/router";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import {
  setSelectedRows,
  setselectedItem,
} from "@/state/slices/eventSlice";

const EventMenu = ({ row }: TableRow) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedRows } = useAppSelector((state) => state.event);

  const onQuotesClick = (row: TableRow) => {
    dispatch(setselectedItem(row));
    router.push({
      pathname: "/quotes",
      query: {
        id: row.id,
        sku: row.sku,
        name: row.name,
        to: row.dealer_name,
        order_id: row.order_id,
        from: row.inventory_location,
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
          className="bg-white rounded-lg shadow-lg text-sm text-gray-700 flex flex-col"
        >
          <Popover.Close
          
            className="inline-block py-2 px-4 cursor-pointer hover:bg-indigo-50"
          >
       		Edit
          </Popover.Close>

          <Popover.Close
            onClick={() => handleCheckbox(row.id)}
            className="inline-block py-2 px-4 cursor-pointer hover:bg-indigo-50"
          >
            Mark as Important
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default EventMenu;

import { useRouter } from "next/router";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import {
  setSelectedRows,
  setSelectedproduct,
} from "@/state/slices/productsSlice";

const ProductsMenu = ({ row }: TableRow) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const productsState = useAppSelector((state) => state.products);

  const onQuotesClick = (row: TableRow) => {
    dispatch(setSelectedproduct(row));
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
    if (productsState.selectedRows.includes(index)) {
      dispatch(
        setSelectedRows(
          productsState.selectedRows.filter((row) => row !== index)
        )
      );
    } else {
      dispatch(setSelectedRows([...productsState.selectedRows, index]));
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
          <span
            onClick={() => onQuotesClick(row)}
            className="inline-block py-2 px-4 cursor-pointer hover:bg-indigo-50"
          >
            Get Quote
          </span>

          <span
            onClick={() => handleCheckbox(row.id)}
            className="inline-block py-2 px-4 cursor-pointer hover:bg-indigo-50"
          >
            Mark as Important
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default ProductsMenu;

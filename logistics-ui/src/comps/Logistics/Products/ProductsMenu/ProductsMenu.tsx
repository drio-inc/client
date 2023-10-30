import { useRouter } from "next/router";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { setSelectedproduct } from "@/state/slices/productsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

const ProductsMenu = ({ row }: TableRow) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onQuotesClick = (row: TableRow) => {
    dispatch(setSelectedproduct(row));
    router.push(`/quotes`, {
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
            className={
              "inline-block py-2 px-4 cursor-pointer hover:bg-indigo-50 "
            }
          >
            Track
          </span>

          <span
            className={
              "inline-block py-2 px-4 cursor-pointer hover:bg-indigo-50 "
            }
          >
            Mark as Important
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default ProductsMenu;

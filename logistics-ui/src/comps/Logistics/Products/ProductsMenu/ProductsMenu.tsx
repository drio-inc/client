import Link from "next/link";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

const ProductsMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();

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
          <Link
            href={{
              pathname: `/quotes`,
              query: {
                id: row.id,
                sku: row.sku,
                name: row.name,
                from: row.inventoryLocation,
              },
            }}
            className="inline-block py-2 px-4 cursor-pointer hover:bg-indigo-50"
          >
            Get Quote
          </Link>

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

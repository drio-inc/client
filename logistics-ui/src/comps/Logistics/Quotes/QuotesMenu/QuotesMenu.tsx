import { useRouter } from "next/router";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { setSelectedproduct } from "@/state/slices/productsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

const QuotesMenu = ({ row }: TableRow) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const bookQuote = () => {
    dispatch(setSelectedproduct(row));
    router.push("/tracking");
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
            onClick={bookQuote}
            className="inline-block py-2 px-4 cursor-pointer hover:bg-indigo-50 "
          >
            Book
          </span>

          <span className="inline-block py-2 px-4 cursor-pointer hover:bg-indigo-50 ">
            Remove
          </span>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default QuotesMenu;

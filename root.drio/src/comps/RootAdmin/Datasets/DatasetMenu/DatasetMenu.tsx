import Modal from "@/comps/ui/Modal";
import { HiDotsVertical } from "react-icons/hi";
import * as Popover from "@radix-ui/react-popover";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import AlertModal from "@/comps/ui/AlertModal";
import { setOpenModal } from "@/state/slices/uiSlice";
import { setRows, setSelectedRows } from "@/state/slices/datasetSlice";

import Link from "next/link";
import EditDatasetForm from "../EditDatasetForm";

const DatasetMenu = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const datasetState = useAppSelector((state) => state.dataset);

  const deleteRow = (id: number | string) => {
    dispatch(setRows(datasetState.rows.filter((row) => row.id !== id)));
    dispatch(setSelectedRows([]));
  };

  console.log("row", row);

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
          <Link href={`/datasets/my-datasets/${row?.id}/view`}>
            <span className="cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4">View</span>
          </Link>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <Modal
              label="Publish"
              identifier="editDatasetForm"
              onClick={() => dispatch(setOpenModal("editDatasetForm"))}
            >
              <EditDatasetForm row={row} />
            </Modal>
          </span>

          <span className={"cursor-pointer hover:bg-indigo-50 w-full block"}>
            <AlertModal row={row} accessor={row?.dataset} onClick={() => deleteRow(row.id)} />
          </span>

          <Link
            href={`/datasets/my-datasets/${row?.data_source_id}/learned-contract?dataset=${row?.name}`}
          >
            <span className="cursor-pointer hover:bg-indigo-50 w-full block py-2 px-4">
              Learned Contract
            </span>
          </Link>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default DatasetMenu;

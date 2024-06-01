import Table from "@/comps/ui/Table";
import Modal from "@/comps/ui/Modal";
import Button from "@/comps/ui/Button";
import LexiconMenu from "./LexiconMenu";
import { IoRefresh } from "react-icons/io5";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { HiCheck, HiMinusSm, HiPlus } from "react-icons/hi";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setSelectedRows } from "@/state/slices/lexiconSlice";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import DataTable from "@/comps/ui/Table/DataTable";

const columns: ColumnDef<Lexicon>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox.Root
        className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      >
        <Checkbox.Indicator className="text-white">
          <HiCheck />
        </Checkbox.Indicator>
      </Checkbox.Root>
    ),
    cell: ({ row }) => (
      <Checkbox.Root
        className="flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      >
        <Checkbox.Indicator className="text-white">
          <HiCheck />
        </Checkbox.Indicator>
      </Checkbox.Root>
    ),
  },

  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "ou",
    header: "Org Unit",
  },

  {
    accessorKey: "domain",
    header: "Domain",
  },

  {
    accessorKey: "description",
    header: "Description",
  },

  {
    accessorKey: "docs_in_corpus",
    header: "Docs in Corpus",
  },

  {
    accessorKey: "pre_existing",
    header: "Pre-Existing",
  },

  {
    accessorKey: "status",
    header: "Status",
  },

  {
    accessorKey: "last_updated",
    header: "Last Updated",
  },

  {
    id: "actions",
    cell: ({ row }) => <LexiconMenu row={row.original} />,
  },
];

const Lexicon = () => {
  const dispatch = useAppDispatch();
  const { rows, selectedRows } = useAppSelector((state) => state.lexicon);

  const handleCheckbox = (index: number) => {
    if (selectedRows.includes(index)) {
      dispatch(setSelectedRows(selectedRows.filter((row) => row !== index)));
    } else {
      dispatch(setSelectedRows([...selectedRows, index]));
    }
  };

  const clearSelectedRows = () => dispatch(setSelectedRows([]));

  return (
    <div className="w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div className="rounded-lg bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between">
          {selectedRows.length > 0 && (
            <div className="flex items-center">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={selectedRows.length > 0}
                onCheckedChange={() => clearSelectedRows?.()}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className="font-medium text-sm text-gray-700">
                {selectedRows.length} Item(s) Selected
              </h3>

              <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
                <IoRefresh className="mr-1 font-bold" />
                <span className="text-sm font-medium">Re-run</span>
              </button>
            </div>
          )}

          <div className="flex gap-4 ml-auto">
            <Button
              icon={<HiPlus />}
              intent={"primary"}
              onClick={() => dispatch(setOpenModal("addNewDictionaryForm"))}
            >
              Add New Dictionary
            </Button>
          </div>

          <div className="hidden">
            <Modal identifier="addNewDictionaryForm">
              <div className="p-4 flex flex-col justify-center gap-4">
                <h3>Form to be added</h3>
                <Button
                  intent={"secondary"}
                  onClick={() => dispatch(setCloseModal("addNewDictionaryForm"))}
                >
                  Cancel
                </Button>
              </div>
            </Modal>
          </div>
        </div>

        {/* 
        <Table
          rows={rows}
          headers={headers}
          menu={LexiconMenu}
          selectedRows={selectedRows}
          handleCheckbox={handleCheckbox}
        /> */}

        <DataTable columns={columns} data={rows} />
      </div>
    </div>
  );
};

export default Lexicon;

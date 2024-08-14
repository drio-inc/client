/* eslint-disable react-hooks/rules-of-hooks */
import Modal from "@/comps/ui/Modal";
import Button from "@/comps/ui/Button";
import LexiconMenu from "./DomainLearningMenu";
import { MdCheck } from "react-icons/md";
import { IoRefresh } from "react-icons/io5";
import { HiCheck, HiPlus } from "react-icons/hi";
import { ColumnDef } from "@tanstack/react-table";
import * as Checkbox from "@radix-ui/react-checkbox";
import { setSelectedRows } from "@/state/slices/lexiconSlice";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import ReviewLexicon from "./ReviewDomain";
import AddLexiconForm from "./AddDomainForm";
import GraphView from "./ReviewDomain/GraphView";
import DataTable from "@/comps/ui/Table/DataTable";
import { MdOutlineCheckCircleOutline, MdOutlineRemoveCircleOutline } from "react-icons/md";

const Lexicon = () => {
  const dispatch = useAppDispatch();
  const { rows, selectedRows, lexiconDetails } = useAppSelector((state) => state.lexicon);

  const handleCheckbox = (id: string) => {
    if (selectedRows.includes(id)) {
      dispatch(setSelectedRows(selectedRows.filter((row) => row !== id)));
    } else {
      dispatch(setSelectedRows([...selectedRows, id]));
    }
  };

  const columns: ColumnDef<Lexicon>[] = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <Checkbox.Root
            className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
            onCheckedChange={(value) => {
              if (table.getIsAllPageRowsSelected()) {
                dispatch(setSelectedRows([]));
              } else {
                dispatch(setSelectedRows(rows.map((row) => row.id)));
              }

              table.toggleAllPageRowsSelected(!!value);
            }}
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
          >
            <Checkbox.Indicator className="text-white">
              <HiCheck />
            </Checkbox.Indicator>
          </Checkbox.Root>
        );
      },

      cell: ({ row }) => {
        return (
          <Checkbox.Root
            className="flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              handleCheckbox(row.id);
              row.toggleSelected(!!value);
            }}
          >
            <Checkbox.Indicator className="text-white">
              <HiCheck />
            </Checkbox.Indicator>
          </Checkbox.Root>
        );
      },
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
      header: "Pre-Existing",
      accessorKey: "pre_existing",
      cell: ({ row }) => {
        const pre_existing = row.original.pre_existing;
        const color = pre_existing === "Yes" ? "text-green-900" : "text-red-900";

        return (
          <span className={`px-2 py-1 rounded font-medium flex items-center gap-x-2 ${color}`}>
            {pre_existing === "Yes" ? (
              <MdOutlineCheckCircleOutline className="w-5 h-5" />
            ) : (
              <MdOutlineRemoveCircleOutline className="w-5 h-5" />
            )}
            {pre_existing}
          </span>
        );
      },
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusEnum = {
          Disabled: "bg-gray-200 text-gray-800",
          Deployed: "bg-green-200 text-green-900",
          Uploaded: "bg-yellow-200 text-yellow-900",
        };

        return (
          <span
            className={`px-2 py-1 rounded font-medium ${
              statusEnum[status as keyof typeof statusEnum]
            }`}
          >
            {status}
          </span>
        );
      },
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

  return (
    <div className="w-full">
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div className="rounded-lg bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between">
          {selectedRows.length > 0 && (
            <div className="flex items-center">
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
              onClick={() => dispatch(setOpenModal("addLexiconForm"))}
            >
              Add New Lexicon
            </Button>
          </div>

          <div className="hidden">
            <Modal identifier="addLexiconForm">
              <AddLexiconForm />
            </Modal>
          </div>
        </div>

        <DataTable columns={columns} data={rows} />

        <div className="hidden">
          <Modal
            label="Success!"
            identifier="successLexiconAlert"
            onClick={() => dispatch(setOpenModal("successLexiconAlert"))}
          >
            <div className="flex items-center justify-center flex-col gap-y-4 p-8">
              <span className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
                <MdCheck className="w-12 h-12 text-green-900" />
              </span>

              <h2 className="text-gray-700 text-xl font-bold">
                Custom Lexicon created successfully
              </h2>

              <div className="flex gap-x-4 justify-center">
                <Button
                  intent="secondary"
                  onClick={() => dispatch(setCloseModal("successLexiconAlert"))}
                >
                  Close
                </Button>

                {/* <Button intent="primary">Review</Button> */}
                <span className="cursor-pointer hover:bg-indigo-50">
                  <Modal
                    label="Review"
                    identifier="reviewLexicon"
                    onClick={() => dispatch(setOpenModal("reviewLexicon"))}
                  >
                    <ReviewLexicon row={lexiconDetails as Lexicon} />
                  </Modal>
                </span>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Lexicon;

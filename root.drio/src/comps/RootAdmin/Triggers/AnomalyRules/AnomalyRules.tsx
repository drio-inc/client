import { setSelectedRows } from "@/state/slices/anomalyPoliciesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import Modal from "@/comps/ui/Modal";
import Button from "@/comps/ui/Button";
import { IoRefresh } from "react-icons/io5";
import { MdCheckCircle } from "react-icons/md";
import { HiCheck, HiPlus } from "react-icons/hi";
import { RiCloseCircleFill } from "react-icons/ri";
import * as Checkbox from "@radix-ui/react-checkbox";
import AnomalyRulesMenu from "./AnomalyRulesMenu";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/comps/ui/Accordion";

import { useState } from "react";
import { Slider } from "@/comps/ui/Slider";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/comps/ui/Table/DataTable";

const AlertPolicies = () => {
  const dispatch = useAppDispatch();
  const { rows, selectedRows } = useAppSelector((state) => state.anomalyPolicies);

  const handleCheckbox = (id: string) => {
    if (selectedRows.includes(id)) {
      dispatch(setSelectedRows(selectedRows.filter((row) => row !== id)));
    } else {
      dispatch(setSelectedRows([...selectedRows, id]));
    }
  };

  const columns: ColumnDef<AnomalyRule>[] = [
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
      header: "Anomaly Type",
      accessorKey: "anomaly_type",
      cell: ({ row }) => {
        const active = row.original.active;
        const color = active ? "text-green-800" : "text-red-800";

        return (
          <span className={`px-2 py-1 rounded font-medium flex items-center gap-x-2`}>
            {active ? (
              <MdCheckCircle className={`${color} w-5 h-5`} />
            ) : (
              <RiCloseCircleFill className={`${color} w-5 h-5`} />
            )}
            {active}
            {row.original.anomaly_type}
          </span>
        );
      },
    },
    {
      header: "Sensitivity",
      accessorKey: "sensitivity",
      cell: ({ row }) => {
        const max = 100;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [sliderValue, setSliderValue] = useState(row.original.sensitivity);

        return (
          <div>
            <Accordion collapsible type="single">
              <AccordionItem value={row.original.id} className="border-none">
                <AccordionTrigger className="justify-start">{sliderValue}</AccordionTrigger>

                <AccordionContent className="mt-2">
                  <Slider
                    max={max}
                    step={1}
                    value={[sliderValue]}
                    onValueChange={(value) => setSliderValue(value[0])}
                  />

                  <div className="mt-1.5 flex flex-row justify-between">
                    {Array.from({ length: max + 1 }).map((_, i) => (
                      <span key={i} className={"text-sm font-light"}>
                        {i === 0 || i === max ? i : ""}
                      </span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      },
    },
    {
      header: "Trigger",
      accessorKey: "trigger",
    },
    {
      id: "actions",
      cell: ({ row }) => <AnomalyRulesMenu />,
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
              onClick={() => dispatch(setOpenModal("addAnomalyPolicyForm"))}
            >
              Add New Anomaly Rule
            </Button>
          </div>

          <div className="hidden">
            <Modal identifier="addAnomalyPolicyForm">
              <div className="p-4 flex flex-col justify-center gap-4">
                <h3>Form to be added</h3>
                <Button
                  intent={"secondary"}
                  onClick={() => dispatch(setCloseModal("addAnomalyPolicyForm"))}
                >
                  Cancel
                </Button>
              </div>
            </Modal>
          </div>
        </div>

        <DataTable columns={columns} data={rows} />
      </div>
    </div>
  );
};

export default AlertPolicies;

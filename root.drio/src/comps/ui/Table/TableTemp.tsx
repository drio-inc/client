import Button from "@ui/Button";
import { IoRefresh } from "react-icons/io5";
import * as Checkbox from "@radix-ui/react-checkbox";
import DashboardFooter from "@ui/Footer/DashbaordFooter";
import { HiOutlinePencil, HiCheck, HiMinusSm } from "react-icons/hi";

import * as EditModal from "@radix-ui/react-alert-dialog";

import { setOpenModal } from "@/state/slices/uiSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

type TableHeader = {
  header: string;
  accessor: string;
  status?: {
    [key: string]: string | undefined;
  };
};

type TableProps = {
  rows?: TableRow[];
  menu?: React.FC | any;
  selectedRows: number[];
  primaryButton?: string;
  secondaryButton?: string;
  headers?: TableHeader[];
  modalIdentifier?: string;
  modalIdentifier2?: string;
  addForm?: React.FC | any;
  editForm?: React.FC | any;
  detailsWindow?: React.FC | any;
  clearSelectedRows?: () => void;
  handleRowSelection?: (index: number) => void;
};

const Table = ({
  rows,
  headers,
  selectedRows,
  primaryButton,
  secondaryButton,
  clearSelectedRows,
  handleRowSelection,
  modalIdentifier,
  modalIdentifier2,
  menu: TableMenu,
  addForm: AddFormComponent,
  editForm: EditFormComponent,
  detailsWindow: DetailsWindow,
  ...props
}: TableProps) => {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector((state) => state.ui);

  return (
    <>
      <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
        <div
          className={`rounded-lg bg-gray-50 ${
            (selectedRows.length > 0 || primaryButton) && `px-4 py-3`
          } flex flex-wrap items-center justify-between`}
        >
          {selectedRows.length > 0 && (
            <div className="flex items-center">
              <Checkbox.Root
                className="mr-3 flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                checked={selectedRows.length > 0}
                onCheckedChange={() => {
                  clearSelectedRows?.();
                }}
              >
                <Checkbox.Indicator className="text-white">
                  <HiMinusSm />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <h3 className={"font-medium text-sm text-gray-700"}>
                {selectedRows.length} Item(s) Selected
              </h3>

              <button className="transition-all duration-200 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 flex items-center ml-3 rounded border-2 border-indigo-200 text-drio-red-dark">
                <IoRefresh className="mr-1 font-bold" />
                <span className="text-sm font-medium">Re-run</span>
              </button>
            </div>
          )}

          <div className="flex gap-4 ml-auto">
            {secondaryButton && (
              <Button
                intent={"primary"}
                onClick={() => dispatch(setOpenModal(modalIdentifier ?? ""))}
              >
                + {secondaryButton ?? "Add Entity"}
              </Button>
            )}

            {primaryButton && (
              <Button
                intent={"primary"}
                onClick={() => dispatch(setOpenModal(modalIdentifier ?? ""))}
              >
                + {primaryButton ?? "Add Entity"}
              </Button>
            )}
          </div>

          {AddFormComponent && (
            <EditModal.Root open={uiState[modalIdentifier ?? ""]}>
              <EditModal.Overlay className="bg-[#6B6B6B] data-[state=open]:animate-overlayShow fixed inset-0 bg-opacity-40" />
              <EditModal.Content className="data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-4">
                {<AddFormComponent {...props} />}
              </EditModal.Content>
            </EditModal.Root>
          )}
        </div>

        <div className="block w-full overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-t border-b text-gray-500 text-xs p-4 text-left"></th>
                {headers?.map((header, index) => (
                  <th
                    key={index}
                    className={
                      "border-t border-b text-gray-500 text-xs p-4 text-left"
                    }
                  >
                    {header.header}
                  </th>
                ))}
                <th
                  className={
                    "border-t border-b text-gray-500 text-xs p-4 text-left"
                  }
                >
                  <HiOutlinePencil />
                </th>
              </tr>
            </thead>
            <tbody>
              {rows?.map((row, index) => {
                const isChecked = selectedRows.includes(row.id);
                return (
                  <tr
                    key={index}
                    className={`${
                      isChecked
                        ? "bg-indigo-50 hover:bg-indigo-50"
                        : "hover:bg-gray-50"
                    } border-t border-b border-gray-100`}
                  >
                    <td className="border-t border-b text-xs p-4">
                      <Checkbox.Root
                        className="flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                        id={index.toString()}
                        checked={isChecked}
                        onCheckedChange={() => {
                          handleRowSelection?.(row.id);
                        }}
                      >
                        <Checkbox.Indicator className="text-white">
                          <HiCheck />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                    </td>

                    {headers?.map((header, index) => (
                      <td
                        key={index}
                        className={
                          "border-t border-b text-gray-500 text-xs p-4 text-left"
                        }
                      >
                        <span
                          className={`${
                            header?.status?.[row[header.accessor]]
                          } inline-block`}
                        >
                          {row[header.accessor]}
                        </span>
                      </td>
                    ))}

                    <td
                      className={
                        "border-t border-b text-gray-500 text-xs p-4 text-left"
                      }
                    >
                      {TableMenu && (
                        <TableMenu
                          row={row}
                          editForm={<EditFormComponent row={row} />}
                          detailsWindow={<DetailsWindow row={row} />}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan={headers?.length && headers?.length + 1}>
                  <DashboardFooter rows={rows} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;

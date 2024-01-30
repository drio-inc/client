import { ReactNode } from "react";

import * as Checkbox from "@radix-ui/react-checkbox";
import DashboardFooter from "@ui/Footer/DashbaordFooter";
import { HiOutlinePencil, HiCheck } from "react-icons/hi";
import MetaTags from "@/comps/RootAdmin/Datasets/Metadata/MetaTags";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@ui/Tooltip";

type TableHeader = {
  type?: string;
  header: string;
  menu?: ReactNode;
  accessor: string;
  status?: {
    [key: string]: string | undefined;
  };
};

type TableRow<T extends Record<string, any>> = T;

type TableProps<T extends Record<string, any>, Key extends keyof T> = {
  rows?: TableRow<T>[];
  menu?: React.FC | any;
  noSelection?: boolean;
  selectedRows?: number[];
  headers?: TableHeader[];
  tooltip?: React.FC | any;
  clearSelectedRows?: () => void;
  handleRowClick?: (row: any) => void;
  handleCheckbox?: (index: number) => void;
};

const Table = <T extends Record<string, any>, Key extends keyof T>({
  rows,
  headers,
  selectedRows,
  handleCheckbox,
  handleRowClick,
  menu: TableMenu,
  noSelection = false,
  tooltip: TableTooltip,
}: TableProps<T, Key>) => {
  return (
    <div className="block w-full overflow-x-auto bg-white rounded-lg">
      <table className="w-full">
        <thead className="bg-[#F4F9FF]">
          <tr>
            {!noSelection && (
              <th className="border-t border-b text-gray-500 text-xs px-4 py-6 text-left" />
            )}
            {headers?.map((header, index) => (
              <th
                key={index}
                className="uppercase border-t border-b text-gray-500 text-xs px-4 py-6 text-left whitespace-nowrap"
              >
                {header.header}

                {header.menu && (
                  <div className="inline-block ml-2">{header.menu}</div>
                )}
              </th>
            ))}

            {TableMenu && (
              <th className="border-t border-b text-gray-500 text-xs px-4 py-6 text-left">
                <HiOutlinePencil />
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, index) => {
            const isChecked = selectedRows?.includes(row?.id);
            return (
              <tr
                key={index}
                className={`${
                  isChecked
                    ? "bg-[#ECF5FF] hover:bg-[#ECF5FF]"
                    : "hover:bg-gray-50"
                } border-t border-b border-gray-100`}
              >
                {!noSelection && (
                  <td className="border-t border-b text-xs p-4">
                    <Checkbox.Root
                      className="flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300"
                      checked={isChecked}
                      id={index.toString()}
                      onCheckedChange={() => handleCheckbox?.(row.id)}
                    >
                      <Checkbox.Indicator className="text-white">
                        <HiCheck />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                  </td>
                )}

                {headers?.map((header, index) => {
                  return (
                    <>
                      {header.type === "array" ? (
                        <td className="min-w-[12rem] 2xl:min-w-0 max-w-[12rem]">
                          <MetaTags tags={row?.[header.accessor]} />
                        </td>
                      ) : header.type === "object" ? (
                        <td className="w-[200px]">{row?.[header.accessor]}</td>
                      ) : (
                        <td
                          key={index}
                          onClick={() => handleRowClick?.(row)}
                          className="cursor-pointer border-t border-b text-gray-500 text-xs p-4"
                        >
                          <div
                            className={`${
                              header?.status?.[row?.[header.accessor]]
                            } inline-block`}
                          >
                            <span>
                              {header?.accessor === "name" &&
                                (row?.status === "learning" ||
                                  row?.status === "learned") && (
                                  <TooltipProvider delayDuration={0}>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <span
                                          className={`inline-block w-3 h-3 rounded-full ${
                                            row?.status === "learning"
                                              ? `bg-drio-red-dark`
                                              : `bg-green-400`
                                          } mr-2`}
                                        />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <span>
                                          {row?.status === "learning"
                                            ? `Learning Schema`
                                            : `Schema Learned`}
                                        </span>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}

                              {row?.[header.accessor]?.toString() ?? "NA"}
                            </span>
                          </div>
                        </td>
                      )}
                    </>
                  );
                })}

                {TableMenu && (
                  <td className="border-t border-b text-gray-500 text-xs p-4 text-left">
                    <TableMenu row={row} />
                  </td>
                )}
              </tr>
            );
          })}
          <tr>
            <td colSpan={headers?.length && headers?.length + 2}>
              <DashboardFooter rows={rows} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;

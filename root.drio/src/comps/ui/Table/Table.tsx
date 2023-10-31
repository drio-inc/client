import { ReactNode, useRef } from "react";
import Tooltip from "@/comps/ui/Tooltip";
import * as Checkbox from "@radix-ui/react-checkbox";
import DashboardFooter from "@ui/Footer/DashbaordFooter";
import { HiOutlinePencil, HiCheck } from "react-icons/hi";
import MetaTags from "@/comps/RootAdmin/Datasets/Metadata/MetaTags";
import DDXTooltip from "@/comps/RootAdmin/DDX/DDXTooltip";

type TableHeader = {
  type?: string;
  header: string;
  menu?: ReactNode;
  accessor: string;
  status?: {
    [key: string]: string | undefined;
  };
};

type TableProps = {
  rows?: TableRow[];
  menu?: React.FC | any;
  noSelection?: boolean;
  selectedRows?: number[];
  headers?: TableHeader[];
  tooltip?: React.FC | any;
  clearSelectedRows?: () => void;
  handleRowClick?: (row: TableRow) => void;
  handleCheckbox?: (index: number) => void;
};

const Table = ({
  rows,
  headers,
  selectedRows,
  handleCheckbox,
  handleRowClick,
  menu: TableMenu,
  tooltip: TableTooltip,
  noSelection = false,
}: TableProps) => {
  return (
    <div className="block w-full overflow-x-auto bg-white rounded-lg">
      <table className="w-full">
        <thead className="bg-[#F4F9FF]">
          <tr>
            {!noSelection && (
              <th className="border-t border-b text-gray-500 text-xs px-4 py-6 text-left"></th>
            )}
            {headers?.map((header, index) => (
              <th
                key={index}
                className={
                  "uppercase border-t border-b text-gray-500 text-xs px-4 py-6 text-left"
                }
              >
                {header.header}

                {header.menu && (
                  <div className="inline-block ml-2">{header.menu}</div>
                )}
              </th>
            ))}

            {TableMenu && (
              <th
                className={
                  "border-t border-b text-gray-500 text-xs px-4 py-6 text-left"
                }
              >
                <HiOutlinePencil />
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, index) => {
            const isChecked = selectedRows?.includes(row.id);
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
                      id={index.toString()}
                      checked={isChecked}
                      onCheckedChange={() => {
                        handleCheckbox?.(row.id);
                      }}
                    >
                      <Checkbox.Indicator className="text-white">
                        <HiCheck />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                  </td>
                )}

                {headers?.map((header, index) => {
                  const value = row[header.accessor];
                  return (
                    <>
                      {header.type === "array" ? (
                        <MetaTags tags={row[header.accessor]} />
                      ) : (
                        <td
                          key={index}
                          onClick={() => handleRowClick?.(row)}
                          className={
                            "cursor-pointer border-t border-b text-gray-500 text-xs p-4"
                          }
                        >
                          <div
                            className={`${
                              header?.status?.[row[header.accessor]]
                            } inline-block`}
                          >
                            <Tooltip
                              key={index}
                              content={
                                TableTooltip && <TableTooltip row={row} />
                              }
                            >
                              <span
                                className={`${
                                  typeof value === "string" &&
                                  (value.includes("http") ||
                                    value.includes(".com"))
                                    ? ``
                                    : `capitalize`
                                }`}
                              >
                                {row[header.accessor] ?? "NA"}
                              </span>
                            </Tooltip>
                          </div>
                        </td>
                      )}
                    </>
                  );
                })}

                {TableMenu && (
                  <td
                    className={
                      "border-t border-b text-gray-500 text-xs p-4 text-left"
                    }
                  >
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

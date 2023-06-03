import * as Checkbox from "@radix-ui/react-checkbox";
import DashboardFooter from "@ui/Footer/DashbaordFooter";
import { HiOutlinePencil, HiCheck } from "react-icons/hi";

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
  headers?: TableHeader[];
  editForm?: React.FC | any;
  detailsWindow?: React.FC | any;
  clearSelectedRows?: () => void;
  handleRowSelection?: (index: number) => void;
};

const Table = ({
  rows,
  headers,
  selectedRows,
  menu: TableMenu,
  handleRowSelection,
  editForm: EditFormComponent,
  detailsWindow: DetailsWindow,
}: TableProps) => {
  return (
    <div className="block w-full overflow-x-auto bg-white rounded-br-lg rounded-bl-lg">
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
                      "border-t border-b text-gray-500 text-xs p-4 text-left "
                    }
                  >
                    <span
                      className={`${
                        header?.status?.[row[header.accessor]]
                      } inline-block`}
                    >
                      {row[header.accessor] ?? "N/A"}
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
          <tr className="">
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

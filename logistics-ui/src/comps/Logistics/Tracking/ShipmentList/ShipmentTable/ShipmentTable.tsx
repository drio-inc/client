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
  headers?: TableHeader[];
  selectedRow?: number | null;
  handleRowClick?: (id: string) => void;
  handleCheckbox?: (index: number) => void;
};

const Table = ({
  rows,
  headers,
  selectedRow,
  handleCheckbox,
  handleRowClick,
}: TableProps) => {
  return (
    <div className="block w-full overflow-x-auto bg-white pl-4">
      <table className="w-full ">
        <thead className="bg-[#FAFAFA] mb-4">
          <tr className="mb-4">
            <th className="text-gray-700 text-sm px-4 py-6 text-left rounded-tl-lg rounded-bl-lg"></th>
            {headers?.map((header, index) => (
              <th
                key={index}
                className={` uppercase text-gray-700 text-sm px-4 py-6 text-left font-medium ${
                  index === headers.length - 1 && `rounded-tr-lg rounded-br-lg`
                }`}
              >
                {header.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="relative">
          <tr className="invisible">
            <td>Empty Row</td>
          </tr>

          {rows?.map((row, index) => {
            const isChecked = selectedRow === row.id;
            return (
              <tr
                key={index}
                className={`${
                  isChecked
                    ? "bg-[#F6FAFF] hover:bg-[#ECF5FF]"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className={`text-xs p-4 rounded-tl-lg rounded-bl-lg`}>
                  <Checkbox.Root
                    className={`flex h-4 w-4 appearance-none items-center justify-center rounded bg-white data-[state=checked]:bg-drio-red outline-none data-[state=unchecked]:border border-gray-300`}
                    checked={isChecked}
                    id={index.toString()}
                    onCheckedChange={() => handleCheckbox?.(row.id)}
                  >
                    <Checkbox.Indicator className="text-white">
                      <HiCheck />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                </td>

                {headers?.map((header, index) => (
                  <td
                    key={index}
                    onClick={() => handleRowClick?.(row.id)}
                    className={`cursor-pointer text-gray-700 text-sm p-4 text-left`}
                  >
                    <span
                      className={`${
                        header?.status?.[row[header.accessor]]
                      } inline-block capitalize`}
                    >
                      {row[header.accessor] ?? "NA"}
                    </span>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

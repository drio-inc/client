import Pagination from "@ui/Pagination";
import { StatelessSelectInput } from "@ui/Forms/Inputs/Inputs";

interface Props {
  rows?: TableRow[];
}

export default function DashboardFooter(props: Props) {
  return (
    <div className="bg-gray-50 shadow-lg rounded-br-lg rounded-bl-lg flex justify-between items-center p-2 text-xs">
      <Pagination />

      <div>
        {props.rows && props.rows?.length > 0 ? (
          <span>
            Showing 1 to {props.rows?.length} of {props.rows?.length} results
          </span>
        ) : (
          <span>No results</span>
        )}
      </div>

      <div className="flex items-center gap-x-2">
        <span>Rows per page</span>

        <StatelessSelectInput
          label=""
          registerName="rowsPerPage"
          defaultSelectedValue={{
            label: "10",
            value: 10,
          }}
          options={[
            { label: "10", value: 10 },
            { label: "25", value: 25 },
            { label: "50", value: 50 },
            { label: "100", value: 100 },
          ]}
        />
      </div>
    </div>
  );
}

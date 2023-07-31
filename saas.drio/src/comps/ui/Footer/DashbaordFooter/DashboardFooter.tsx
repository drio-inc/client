import React from "react";
import Pagination from "../../Pagination/Pagination";

interface Props {
  rows?: TableRow[];
}

export default function DashboardFooter(props: Props) {
  return (
    <div className="bg-gray-50 shadow-lg rounded-br-lg rounded-bl-lg flex justify-between p-4 text-xs">
      <Pagination />
      <div>
        <span>
          Showing {props.rows?.length && props.rows?.length > 0 ? "1" : "0"} to{" "}
          {props.rows?.length} of {props.rows?.length} results
        </span>
      </div>

      <div>
        <span>Rows per page</span>
      </div>
    </div>
  );
}

import showAlert from "@/comps/ui/Alert/Alert";
import { useEffect } from "react";
import { HiOutlineDuplicate } from "react-icons/hi";

type PayloadObject = {
  name: string;
  account_id: string;
  ou_id: string;
  cluster_id: string;
  ip_address: string;
  state: string;
  token: string;
};

const copyJSON = (json: PayloadObject) => {
  navigator.clipboard.writeText(JSON.stringify(json));
  showAlert("Payload Successfully Copied!", "success");
};

const DDXTooltip = ({ row }: TableRow) => {
  useEffect(() => {
    const tooltip = document.querySelector(".tooltip");

    if (tooltip) {
      tooltip.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

    return () => {
      if (tooltip) {
        tooltip.removeEventListener("click", (e) => {
          e.stopPropagation();
        });
      }
    };
  }, []);

  return (
    <div className="shadow-sm p-8 bg-indigo-50 rounded-md text-zinc-600">
      <h2 className="text-md font-medium mb-4">
        Copy the following payload to register a DDX
      </h2>

      <div className="flex flex-col bg-indigo-50 rounded-md">
        <div className="tooltip flex flex-col gap-2">
          <span>
            Name: <strong>{`<instance name>`}</strong>
          </span>
          <span>
            Account ID: <strong>{row.account_id ?? ""}</strong>
          </span>
          <span>
            OU ID: <strong>{row.ou_id ?? ""}</strong>
          </span>
          <span>
            Cluster ID: <strong>{row.id ?? ""}</strong>
          </span>
          <span>
            IP Address: <strong>{`<ip address>`}</strong>
          </span>
          <span>
            State: <strong>{`running`}</strong>
          </span>
          <span>
            Token: <strong>{`<cluster_token>`}</strong>
          </span>
        </div>

        <div className="border-t border-gray-500 pt-2 mt-2 flex items-center">
          <span>Copy JSON Payload</span>
          <HiOutlineDuplicate
            className="w-6 h-6 text-gray-600 ml-auto cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              copyJSON({
                name: "<instance name>",
                account_id: row.account_id ?? "",
                ou_id: row.ou_id ?? "",
                cluster_id: row.id ?? "",
                ip_address: "<ip address>",
                state: "running",
                token: "<cluster_token>",
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DDXTooltip;

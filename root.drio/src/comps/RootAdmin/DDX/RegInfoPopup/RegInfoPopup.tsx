import Button from "@ui/Button";
import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import { HiOutlineDuplicate } from "react-icons/hi";
import { setCloseModal } from "@/state/slices/uiSlice";
import { useAppDispatch } from "@/hooks/useStoreTypes";

type PayloadObject = {
  name: string;
  ou_id: string;
  state: string;
  token: string;
  account_id: string;
  cluster_id: string;
  ip_address: string;
};

export default function RegInfoPopup({ row }: TableRow) {
  const dispatch = useAppDispatch();

  const copyJSON = (json: PayloadObject) => {
    navigator.clipboard.writeText(JSON.stringify(json));
    showAlert("Payload Successfully Copied!", "success");
  };

  return (
    <Layout>
      <div className="mx-auto bg-white p-8 rounded-lg xl:max-w-[25vw]">
        <h2 className="text-gray-700 text-2xl font-bold text-center">
          Registration Info
        </h2>

        <p className="text-center text-[#4C566A] text-sm my-2">
          Copy the following JSON payload to register a DDX instance.
        </p>

        <div className="flex flex-col my-4 text-[#4C566A] text-sm gap-y-2 shadow-sm border rounded-md bg-indigo-50 p-4 font-medium">
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

        <div className="flex gap-x-2 justify-center w-full mt-4">
          <Button
            type="button"
            className="w-full"
            intent={`secondary`}
            onClick={() => dispatch(setCloseModal("viewRegInfo"))}
          >
            <span className="inline-flex justify-center w-full">Cancel</span>
          </Button>

          <Button
            intent={`primary`}
            className="w-full"
            onClick={() =>
              copyJSON({
                name: "<instance name>",
                account_id: row.account_id ?? "",
                ou_id: row.ou_id ?? "",
                cluster_id: row.id ?? "",
                ip_address: "<ip address>",
                state: "running",
                token: "<cluster_token>",
              })
            }
          >
            <span>Copy JSON</span>
            <HiOutlineDuplicate className="inline-block w-5 h-5" />
          </Button>
        </div>
      </div>
    </Layout>
  );
}

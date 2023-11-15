import Image from "next/image";
import Table from "@/comps/ui/Table";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import Button from "@/comps/ui/Button";
import { HiPlus, HiX } from "react-icons/hi";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";

import Modal from "@/comps/ui/Modal";
import { useRouter } from "next/router";

import PolicyRulesMenu from "./PolicyRulesMenu";
import AddNewRuleForm from "./AddNewRuleForm/AddNewRuleForm";
import { useZodForm } from "@/comps/ui/Forms/Form";
import EmptyTable from "./EmptyTable";

const headers = [
  {
    header: "Rule Name",
    accessor: "name",
  },
  {
    header: "Dataset",
    accessor: "dataset",
  },
  {
    header: "Default Allow",
    accessor: "defaultAllow",
  },
  {
    header: "Metadata",
    accessor: "metadata",
  },
  {
    header: "Conditions",
    accessor: "conditions",
  },
  {
    header: "Conditional Value",
    accessor: "value",
  },
  {
    header: "Subrule",
    accessor: "subrule",
  },
  {
    header: "Action",
    accessor: "action",
  },
];

type PolicyProps = {
  row?: any;
  modal?: boolean;
};

const PolicyRules = ({ modal, row }: PolicyProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { ruleRows } = useAppSelector((state) => state.policies);

  return (
    <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
      <div
        className={`bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between border-t`}
      >
        <h2 className="text-gray-700 text-2xl font-bold">Policy Rules</h2>

        {modal ? (
          <Button
            intent={"primary"}
            className="ml-auto"
            onClick={() => {
              dispatch(setCloseModal("policyRulesTable"));
              router.push("/policies/new-policy");
            }}
          >
            <div className="flex items-center gap-1">
              <HiPlus />
              <span className="inline-block">Add New Policy</span>
            </div>
          </Button>
        ) : (
          <Button
            className="ml-auto"
            intent={"primaryOutline"}
            onClick={() => dispatch(setOpenModal("addNewRuleForm"))}
          >
            <div className="flex items-center gap-1">
              <HiPlus className="w-4 h-4" />
              <span className="inline-block">Add New Rule</span>
            </div>
          </Button>
        )}

        {modal && (
          <span>
            <HiX
              className="w-8 h-8 cursor-pointer hover:text-drio-red-dark transition-all duration-200 ml-4"
              onClick={() => dispatch(setCloseModal("policyRulesTable"))}
            />
          </span>
        )}
      </div>

      <div className="hidden">
        <Modal identifier="addNewRuleForm">
          <AddNewRuleForm />
        </Modal>
      </div>

      {modal ? (
        <>
          {row?.rules && row?.rules.length > 0 ? (
            <Table
              noSelection
              rows={row.rules}
              headers={headers}
              // menu={PolicyRulesMenu}
            />
          ) : (
            <EmptyTable />
          )}
        </>
      ) : (
        <>
          {ruleRows.length > 0 ? (
            <Table
              noSelection
              rows={ruleRows}
              headers={headers}
              // menu={PolicyRulesMenu}
            />
          ) : (
            <EmptyTable />
          )}
        </>
      )}
    </div>
  );
};

export default PolicyRules;

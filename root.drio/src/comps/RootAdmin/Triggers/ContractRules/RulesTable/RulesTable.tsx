import Table from "@/comps/ui/Table";
import Button from "@/comps/ui/Button";
import { HiPlus, HiX } from "react-icons/hi";
import { useAppDispatch } from "@/hooks/useStoreTypes";
import type { FlattenedRule } from "@/functions/flattenRules";
import { closeAllModals, setCloseModal, setOpenModal } from "@/state/slices/uiSlice";

import Modal from "@/comps/ui/Modal";
import { useRouter } from "next/router";

import RulesMenu from "./RulesMenu";
import AddNewRuleForm from "./AddRuleForm";
import EmptyTable from "@ui/Table/EmptyTable";

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
    accessor: "subrule_metadata",
  },
  {
    header: "Conditions",
    accessor: "subrule_conditions",
  },
  {
    header: "Conditional Value",
    accessor: "subrule_value",
  },
  {
    header: "Subrule",
    accessor: "subrule_subrule",
  },
  {
    header: "Trigger",
    accessor: "action",
  },
];

type PolicyProps = {
  modal?: boolean;
  editable?: boolean;
  rows?: FlattenedRule[];
};

const RulesTable = ({ rows, editable = false, modal = false }: PolicyProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const transformedRules = rows?.map((rule, index, array) => {
    const currentId = rule.id;
    const firstIndex = array.map((item) => item.id).indexOf(currentId);
    const lastIndex = array.map((item) => item.id).lastIndexOf(currentId);

    if (rows.length === 1) return rule;

    if (index === firstIndex) {
      return {
        ...rule,
        action: "",
      };
    } else if (index === lastIndex) {
      return {
        ...rule,
        name: "",
      };
    } else {
      return {
        ...rule,
        name: "",
        action: "",
      };
    }
  });

  return (
    <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
      <div className="bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between border-t">
        <h2 className="text-gray-700 text-2xl font-bold">Contract</h2>

        {modal ? (
          <Button
            intent={"primary"}
            className="ml-auto"
            onClick={() => {
              dispatch(setCloseModal("contractRulesTable"));
              router.push("/triggers/contract-rules/new-contract-rule");
            }}
          >
            <div className="flex items-center gap-1">
              <HiPlus />
              <span className="inline-block">Add New Contract Rule</span>
            </div>
          </Button>
        ) : (
          <Button
            className="ml-auto"
            intent={"primaryOutline"}
            onClick={() => dispatch(setOpenModal("addRuleForm"))}
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
              onClick={() => dispatch(closeAllModals())}
            />
          </span>
        )}
      </div>

      <div className="hidden">
        <Modal identifier="addRuleForm">
          <AddNewRuleForm />
        </Modal>
      </div>

      {rows && rows?.length > 0 ? (
        <Table
          noSelection
          headers={headers}
          menu={!modal && RulesMenu}
          rows={transformedRules ?? []}
        />
      ) : (
        <EmptyTable />
      )}
    </div>
  );
};

export default RulesTable;

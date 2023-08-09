import Image from "next/image";
import Table from "@/comps/ui/Table";

import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import Button from "@/comps/ui/Button";
import { HiPlus, HiX } from "react-icons/hi";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";

import Modal from "@/comps/ui/Modal";
import { useRouter } from "next/router";
import AddNewPolicyForm from "../AddNewPolicyForm";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";

import PolicyRulesMenu from "./PolicyRulesMenu";
import AddNewRuleForm from "./AddNewRuleForm/AddNewRuleForm";

const headers = [
  {
    header: "Rule Name",
    accessor: "name",
  },
  {
    header: "Metadata Attribute",
    accessor: "metadata",
  },

  {
    header: "Conditions",
    accessor: "conditions",
  },
  {
    header: "Value",
    accessor: "value",
  },
  {
    header: "Action",
    accessor: "action",
  },
  {
    header: "Subrule",
    accessor: "subrule",
  },
  {
    header: "Date Last Modified",
    accessor: "dateLastModified",
  },
  {
    header: "Modified By",
    accessor: "modifiedBy",
  },
];

const PolicyRules = ({ modal = false }: { modal?: boolean }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const policiesState = useAppSelector((state) => state.policies);

  return (
    <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white"}>
      <div
        className={`bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between border-t`}
      >
        <h2 className="text-gray-700 text-2xl font-bold">Policy-Mktg Rules</h2>

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
            intent={"primaryOutline"}
            className="ml-auto"
            onClick={() => {
              dispatch(setOpenModal("addNewRuleForm"));
            }}
          >
            <div className="flex items-center gap-1">
              <HiPlus />
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

      {policiesState.ruleRows.length > 0 ? (
        <Table
          noSelection
          headers={headers}
          menu={PolicyRulesMenu}
          rows={policiesState.ruleRows}
          selectedRows={policiesState.selectedRuleRows}
        />
      ) : (
        <>
          <div className="w-full flex justify-between bg-[#F4F9FF]">
            {headers?.map((header, index) => (
              <div
                key={index}
                className={"font-bold uppercase text-gray-500 text-xs p-4"}
              >
                {header.header}
              </div>
            ))}
          </div>
          <div className="relative bg-gradient-to-t from-gray-100">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="border-t border-b p-4 h-[48px]" />
            ))}

            <Image
              width={40}
              height={40}
              alt="empty"
              src="/document.svg"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PolicyRules;

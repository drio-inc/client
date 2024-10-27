import Button from "@ui/Button";
import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import Modal from "@/comps/ui/Modal";
import { TbFile } from "react-icons/tb";
import { useEffect, useState } from "react";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";
import * as RadioGroup from "@radix-ui/react-radio-group";

import { z } from "zod";
import { FiBookOpen } from "react-icons/fi";
import ReviewLexicon from "../ReviewDomain";
import { SubmitHandler } from "react-hook-form";
import * as Switch from "@radix-ui/react-switch";
import { useZodForm, Form } from "@ui/Forms/Form";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import { RiUploadCloud2Line, RiCloseFill } from "react-icons/ri";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";
import { setRows } from "@/state/slices/lexiconSlice";

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),

  ou: z.string({
    required_error: "Please select an option",
  }),

  domain: z.string({
    required_error: "Please select an option",
  }),

  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type FormProps = {
  row: Lexicon;
};

const domainOptions = [
  { label: "Supply Chain", value: "supply_chain" },
  { label: "Loans/Contracts", value: "loans/contracts" },
  { label: "Auto mfg", value: "auto_mfg" },
  { label: "Automobile", value: "automobile" },
  { label: "Auto Service", value: "auto_service" },
];

export default function LexiconForm({ row }: FormProps) {
  const dispatch = useAppDispatch();
  const lexicon = useAppSelector((state) => state.lexicon);
  const [associateLexicon, setAssociateLexicon] = useState("");
  const [isDeployed, setIsDeployed] = useState(row.status === "Deployed");

  const form = useZodForm({
    schema: schema,
  });

  const ouOptions = [{ label: "Corp", value: "corp" }];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const updatedRow = {
      ...row,
      ...data,
      files: row.files,
      status: isDeployed ? "Deployed" : "Disabled",
      ou: ouOptions.find((ou) => ou.value === data.ou)?.label ?? "",
      domain: domainOptions.find((domain) => domain.value === data.domain)?.label ?? "",
    };

    dispatch(
      setRows(
        lexicon.rows.map((lexiconRow) =>
          lexiconRow.id === updatedRow.id ? updatedRow : lexiconRow
        )
      )
    );

    form.reset();
    dispatch(setCloseModal("editLexiconForm"));
    dispatch(setOpenModal("reviewLexicon"));
  };

  type RenderFilesProps = {
    filesToRender: CustomFile[];
  };

  const renderFiles = ({ filesToRender }: RenderFilesProps) => {
    const handleFileRemove = (idx: number) => {};

    return (
      filesToRender && (
        <div className="w-full flex flex-col gap-y-4 mb-4">
          {filesToRender.map((enhancedFile, idx) => (
            <div
              className="flex justify-between items-center  bg-white p-4 rounded-md border text-gray-700"
              key={idx}
            >
              <div className="flex gap-x-2">
                <TbFile className="w-6 h-6 mt-1" />

                <div className="flex flex-col">
                  <span className="font-bold text-sm">{enhancedFile.name}</span>
                  <span className="text-xs">
                    {(enhancedFile.size / (1024 * 1024)).toFixed(2)}mb
                  </span>
                </div>
              </div>

              {/* <RiCloseFill
                onClick={() => handleFileRemove(idx)}
                className="text-gray-500 cursor-pointer w-6 h-6"
              /> */}
            </div>
          ))}
        </div>
      )
    );
  };

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit}>
        <div className="mx-auto bg-white py-8 px-6 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
          <h2 className="text-gray-700 text-2xl font-bold text-center">Edit Lexicon</h2>

          <div className="w-full flex justify-between px-2 mt-4">
            <span className="text-gray-700 font-medium">Deploy Lexicon</span>
            <Switch.Root
              checked={isDeployed}
              onCheckedChange={() => setIsDeployed(!isDeployed)}
              className="w-[42px] h-[25px] bg-gray-200 rounded-full shadow-lg data-[state=checked]:bg-drio-red outline-none cursor-pointer"
            >
              <Switch.Thumb className="flex items-center justify-center w-[21px] h-[21px] bg-white rounded-full shadow-sm transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
          </div>

          <div className="flex flex-wrap -m-2 rounded-lg my-4">
            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Name"}
                defaultValue={row.name}
                {...form.register("name")}
                placeholder={"Enter name"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-full">
              <SelectInput
                registerName="ou"
                label={"For Org Unit"}
                options={ouOptions ?? []}
                placeholder={"Select Org Unit"}
                className="md:text-sm 2xl:text-base"
                defaultSelectedValue={ouOptions.find(
                  (option) => (option.value === row.ou || option.label === row.ou) ?? []
                )}
              />
            </div>

            <div className="px-4 py-2 w-full">
              <SelectInput
                label={"Domain"}
                registerName="domain"
                options={domainOptions}
                placeholder={"Select Domain"}
                className="md:text-sm 2xl:text-base"
                defaultSelectedValue={domainOptions.find(
                  (option) => option.label === row.domain ?? []
                )}
              />
            </div>

            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Description"}
                defaultValue={row.description}
                {...form.register("description")}
                placeholder={"Write a description"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="bg-[#F9FAFB] w-full shadow py-2 mx-4">
              <h3 className="px-4 text-gray-700 text-[18px] font-medium mb-2">
                Associated Lexicon
              </h3>

              <div className="px-4 py-2 w-full">
                <RadioGroup.Root
                  value={associateLexicon}
                  aria-label="Associate Lexicon"
                  onValueChange={setAssociateLexicon}
                  className="flex flex-col flex-wrap gap-4 w-full"
                >
                  <div>{renderFiles({ filesToRender: row.files })}</div>
                </RadioGroup.Root>
              </div>
            </div>
          </div>

          <div className="py-2 px-2 flex w-full mt-4 gap-4">
            <Button
              type="button"
              className="w-full"
              intent={`secondary`}
              onClick={() => dispatch(setCloseModal("editLexiconForm"))}
            >
              <span className="inline-flex justify-center">Cancel</span>
            </Button>

            <Button intent={`primary`} className="w-full" isLoading={false}>
              <span className="inline-flex justify-center">Review and Save</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}

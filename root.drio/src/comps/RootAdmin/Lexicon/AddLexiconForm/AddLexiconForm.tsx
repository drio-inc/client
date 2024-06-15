import Button from "@ui/Button";
import showAlert from "@ui/Alert";
import { v4 as uuidV4 } from "uuid";
import { useEffect, useState } from "react";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";

import { z } from "zod";
import Layout from "@/comps/Layout";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";
import { setLexiconDetails, setRows } from "@/state/slices/lexiconSlice";

const schema = z.object({
  name: z.string().nonempty("Please Enter a value"),

  ou: z.string({
    required_error: "Please select an option",
  }),

  domain: z.string({
    required_error: "Please select an option",
  }),

  description: z.string().nonempty("Please Enter a value"),
});

type FormData = z.infer<typeof schema>;

const domainOptions = [
  { label: "Supply Chain", value: "supply_chain" },
  { label: "Loans/Contracts", value: "loans/contracts" },
  { label: "Auto mfg", value: "auto_mfg" },
  { label: "Automobile", value: "automobile" },
  { label: "Auto Service", value: "auto_service" },
];

export default function AddLexiconForm() {
  const dispatch = useAppDispatch();
  const { rows } = useAppSelector((state) => state.lexicon);
  const { recursiveRows: ouRows } = useAppSelector((state) => state.orgUnit);

  const form = useZodForm({
    schema: schema,
  });

  //   const ouOptions =
  //     ouRows?.map((row) => ({
  //       label: row.name,
  //       value: row.id,
  //     })) ?? [];

  const ouOptions = [{ label: "Corp", value: "corp" }];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const rowData = {
      ...data,
      id: uuidV4(),
      status: "Disabled",
      pre_existing: "Yes",
      last_updated: new Date().toISOString().split("T")[0],
      ou: ouOptions.find((ou) => ou.value === data.ou)?.label ?? "",
      domain: domainOptions.find((domain) => domain.value === data.domain)?.label ?? "",
    };

    dispatch(setLexiconDetails(rowData));
    dispatch(setRows([...rows, rowData]));

    form.reset();
    dispatch(setCloseModal("addLexiconForm"));
    dispatch(setOpenModal("addLexiconFilesForm"));
    showAlert("Lexicon added successfully", "success");
  };

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit}>
        <div className="mx-auto bg-white py-8 px-6 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw]">
          <h2 className="text-gray-700 text-2xl font-bold text-center">Add New Lexicon</h2>

          <div className="flex flex-wrap -m-2 rounded-lg my-4">
            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Name"}
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
              />
            </div>

            <div className="px-4 py-2 w-full">
              <SelectInput
                label={"Domain"}
                registerName="domain"
                options={domainOptions ?? []}
                placeholder={"Select Domain"}
                className="md:text-sm 2xl:text-base"
              />
            </div>

            <div className="px-4 py-2 w-full">
              <TextInput
                label={"Description"}
                {...form.register("description")}
                placeholder={"Write a description"}
                className="md:text-sm 2xl:text-base"
              />
            </div>
          </div>

          <div className="py-2 px-2 flex w-full mt-4 gap-4">
            <Button
              type="button"
              className="w-full"
              intent={`secondary`}
              onClick={() => dispatch(setCloseModal("addLexiconForm"))}
            >
              <span className="inline-flex justify-center">Cancel</span>
            </Button>

            <Button
              intent={`primary`}
              className="w-full"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              <span className="inline-flex justify-center">Add Lexicon</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}

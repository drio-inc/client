import Button from "@ui/Button";
import showAlert from "@ui/Alert";
import { v4 as uuidV4 } from "uuid";
import Layout from "@/comps/Layout";
import { TbFile } from "react-icons/tb";
import { useEffect, useState } from "react";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";
import * as RadioGroup from "@radix-ui/react-radio-group";

import { z } from "zod";
import { FiBookOpen } from "react-icons/fi";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";
import { setRows } from "@/state/slices/lexiconSlice";
import { setCloseModal } from "@/state/slices/uiSlice";
import { RiUploadCloud2Line, RiCloseFill } from "react-icons/ri";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

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

type FilesState = {
  file: File;
  status:
    | "idle"
    | "error"
    | "uploaded"
    | "uploading"
    | "processed"
    | "processing"
    | "upload_failed"
    | "process_failed";
}[];

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
  const [associateLexicon, setAssociateLexicon] = useState<string>("");
  const { recursiveRows: ouRows } = useAppSelector((state) => state.orgUnit);

  const [customfiles, setCustomFiles] = useState<FilesState>([]);
  const [existingFiles, setExistingFiles] = useState<FilesState>([]);

  useEffect(() => {
    console.log(existingFiles, customfiles);
  }, [existingFiles, customfiles]);

  const form = useZodForm({
    schema: schema,
  });

  const ouOptions =
    ouRows?.map((row) => ({
      label: row.name,
      value: row.id,
    })) ?? [];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (associateLexicon === "") {
      showAlert("Please select an option for Associate Lexicon", "error");
      return;
    }

    if (associateLexicon === "pre-existing" && existingFiles.length === 0) {
      showAlert("Please upload a file for pre-existing lexicon", "error");
      return;
    }

    if (associateLexicon === "create-new" && customfiles.length === 0) {
      showAlert("Please upload a file for custom lexicon", "error");
      return;
    }

    if (associateLexicon === "create-new") {
      const customFilesToAdd = customfiles.map((file) => ({
        id: uuidV4(),
        file: file.file.name,
        size: file.file.size,
      }));

      dispatch(
        setRows([
          ...rows,
          {
            ...data,
            id: uuidV4(),
            pre_existing: "No",
            files: customFilesToAdd,
            docs_in_corpus: customFilesToAdd.length,
            last_updated: new Date().toISOString().split("T")[0],
            ou: ouOptions.find((ou) => ou.value === data.ou)?.label ?? "",
            domain: domainOptions.find((domain) => domain.value === data.domain)?.label ?? "",
          },
        ])
      );
    }

    if (associateLexicon === "pre-existing") {
      const existingFilesToAdd = existingFiles.map((file) => ({
        id: uuidV4(),
        file: file.file.name,
        size: file.file.size,
      }));

      dispatch(
        setRows([
          ...rows,
          {
            ...data,
            id: uuidV4(),
            status: "Active",
            pre_existing: "Yes",
            files: existingFilesToAdd,
            docs_in_corpus: existingFilesToAdd.length,
            last_updated: new Date().toISOString().split("T")[0],
            ou: ouOptions.find((ou) => ou.value === data.ou)?.label ?? "",
            domain: domainOptions.find((domain) => domain.value === data.domain)?.label ?? "",
          },
        ])
      );
    }

    form.reset();
    dispatch(setCloseModal("addLexiconForm"));
  };

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    uploadType: "custom" | "existing"
  ) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const enhancedFiles: FilesState = Array.from(selectedFiles).map((file) => ({
        file,
        status: "idle",
      }));

      if (uploadType === "custom") setCustomFiles(enhancedFiles);
      else setExistingFiles(enhancedFiles);
    }
  };

  type RenderFilesProps = {
    filesToRender: FilesState;
    renderType: "custom" | "existing";
  };

  const renderFiles = ({ filesToRender, renderType }: RenderFilesProps) => {
    const handleFileRemove = (idx: number) => {
      if (renderType === "custom") {
        setCustomFiles(customfiles.filter((_, i) => i !== idx));
      } else {
        setExistingFiles(existingFiles.filter((_, i) => i !== idx));
      }
    };

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
                  <span className="font-bold text-sm">{enhancedFile.file.name}</span>
                  <span className="text-xs">
                    {(enhancedFile.file.size / (1024 * 1024)).toFixed(2)}
                    mb
                  </span>
                </div>
              </div>

              <div>
                <RiCloseFill
                  onClick={() => handleFileRemove(idx)}
                  className="text-gray-500 cursor-pointer w-6 h-6"
                />
              </div>
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

            <div className="bg-[#F9FAFB] w-full shadow py-2 mx-4">
              <h3 className="px-4 text-gray-700 text-[18px] font-medium mb-2">Associate Lexicon</h3>

              <div className="px-4 py-2 w-full">
                <RadioGroup.Root
                  value={associateLexicon}
                  aria-label="Associate Lexicon"
                  onValueChange={setAssociateLexicon}
                  className="flex flex-col flex-wrap gap-4 w-full"
                >
                  <div className="flex items-center gap-x-2">
                    <RadioGroup.Item
                      id="r1"
                      value={"pre-existing"}
                      className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red"
                    />
                    <label
                      htmlFor="r1"
                      className="text-gray-500 text-sm font-medium cursor-pointer"
                    >
                      Pre-existing Lexicon
                    </label>
                  </div>

                  {associateLexicon === "pre-existing" && (
                    <div>
                      {existingFiles && Array.from(existingFiles).length > 0 ? (
                        renderFiles({ filesToRender: existingFiles, renderType: "existing" })
                      ) : (
                        <>
                          <label
                            htmlFor="upload-existing-lexicon"
                            className="bg-white p-4 border shadow-sm mb-4 rounded cursor-pointer block"
                          >
                            <RiUploadCloud2Line className="text-2xl text-gray-500 mx-auto mb-2" />
                            <p className="text-sm text-gray-700 text-center">
                              <span className="font-bold">Click to upload</span> or drag and drop
                              Wordnet zip file for the domain
                            </p>
                          </label>

                          <input
                            multiple
                            type="file"
                            accept="pdf/*"
                            className="hidden"
                            id="upload-existing-lexicon"
                            onChange={(e) => handleFileSelect(e, "existing")}
                          />
                        </>
                      )}

                      <Button
                        type="button"
                        intent={`primary`}
                        disabled={!(existingFiles && Array.from(existingFiles).length > 0)}
                      >
                        Upload
                      </Button>
                    </div>
                  )}

                  <div className="flex justify-between items-center gap-x-2">
                    <div>
                      <RadioGroup.Item
                        id="r2"
                        value={"create-new"}
                        className="bg-white w-[16px] h-[16px] rounded-full outline-none border-2 border-gray-300 data-[state=checked]:border-[5px] data-[state=checked]:border-drio-red mr-2"
                      />
                      <label
                        htmlFor="r2"
                        className="text-gray-500 text-sm font-medium cursor-pointer"
                      >
                        Custom Lexicon
                      </label>
                    </div>

                    <button
                      type="button"
                      className="flex items-center gap-x-1 text-sm text-red-800 transition-all duration-200 ease-in-out hover:text-red-900"
                    >
                      <FiBookOpen className="text-xl" />
                      <span className="font-medium">Create Lexicon</span>
                    </button>
                  </div>

                  {associateLexicon === "create-new" && (
                    <div>
                      {customfiles && Array.from(customfiles).length > 0 ? (
                        renderFiles({ filesToRender: customfiles, renderType: "custom" })
                      ) : (
                        <>
                          <label
                            htmlFor="upload-custom-lexicon"
                            className="bg-white p-4 border shadow-sm mb-4 rounded cursor-pointer block"
                          >
                            <RiUploadCloud2Line className="text-2xl text-gray-500 mx-auto mb-2" />
                            <p className="text-sm text-gray-700 text-center">
                              <span className="font-bold">Click to upload</span> or drag to bulk
                              upload files to automatically create a lexicon
                            </p>
                          </label>

                          <input
                            multiple
                            type="file"
                            accept="pdf/*"
                            className="hidden"
                            id="upload-custom-lexicon"
                            onChange={(e) => handleFileSelect(e, "custom")}
                          />
                        </>
                      )}

                      <Button
                        type="button"
                        intent={`primary`}
                        disabled={!(customfiles && Array.from(customfiles).length > 0)}
                      >
                        Upload
                      </Button>
                    </div>
                  )}
                </RadioGroup.Root>
              </div>
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

            <Button intent={`primary`} className="w-full" isLoading={false}>
              <span className="inline-flex justify-center">Add Lexicon</span>
            </Button>
          </div>
        </div>
      </Form>
    </Layout>
  );
}

import Button from "@ui/Button";
import showAlert from "@ui/Alert";
import { v4 as uuidV4 } from "uuid";
import { useEffect, useState } from "react";
import { SelectInput, TextInput } from "@ui/Forms/Inputs";
import * as RadioGroup from "@radix-ui/react-radio-group";

import { z } from "zod";
import Layout from "@/comps/Layout";
import { SubmitHandler } from "react-hook-form";
import { Separator } from "@/comps/ui/Separator";
import { useZodForm, Form } from "@ui/Forms/Form";
import AddLexiconFilesForm from "../AddLexiconFilesForm";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";
import { setLexiconDetails, setRows } from "@/state/slices/lexiconSlice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/comps/ui/Tabs";
import RenderFiles from "../RenderFiles";
import { RiUploadCloud2Line } from "react-icons/ri";
import { FiBookOpen } from "react-icons/fi";

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
  fileType: "custom" | "pre-existing";
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
  const { rows, lexiconDetails } = useAppSelector((state) => state.lexicon);
  const [tabValue, setTabValue] = useState("details" as "details" | "associate");

  const [customfiles, setCustomFiles] = useState<FilesState>([]);
  const [existingFiles, setExistingFiles] = useState<FilesState>([]);
  const [associateLexicon, setAssociateLexicon] = useState<string>("");

  const form = useZodForm({
    schema: schema,
  });

  const ouOptions = [{ label: "Corp", value: "corp" }];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const rowData = {
      ...data,
      id: uuidV4(),
      docs_in_corpus: 0,
      status: "Disabled",
      pre_existing: "No",
      last_updated: new Date().toISOString().split("T")[0],
      ou: ouOptions.find((ou) => ou.value === data.ou)?.label ?? "",
      domain: domainOptions.find((domain) => domain.value === data.domain)?.label ?? "",
    };

    dispatch(setLexiconDetails(rowData));
    dispatch(setRows([...rows, rowData]));

    form.reset();
    setTabValue("associate");
    showAlert("Lexicon added successfully", "success");
  };

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    uploadType: "custom" | "pre-existing"
  ) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const enhancedFiles: FilesState = Array.from(selectedFiles).map((file) => ({
        file,
        status: "idle",
        fileType: associateLexicon === "pre-existing" ? "pre-existing" : "custom",
      }));

      if (uploadType === "custom") setCustomFiles(enhancedFiles);
      else setExistingFiles(enhancedFiles);
    }
  };

  const handleFileRemove = (fileType: "custom" | "pre-existing", idx: number) => {
    if (fileType === "custom") {
      setCustomFiles(customfiles.filter((_, i) => i !== idx));
    } else {
      setExistingFiles(existingFiles.filter((_, i) => i !== idx));
    }
  };

  const onFilesSubmit = async () => {
    if (associateLexicon === "create-new") {
      const customFilesToAdd = customfiles.map((file) => ({
        id: uuidV4(),
        file: file.file.name,
        size: file.file.size,
      }));

      dispatch(
        setRows(
          rows.map((row) => {
            if (row.id === lexiconDetails?.id) {
              return {
                ...row,
                pre_existing: "No",
                files: customFilesToAdd,
                docs_in_corpus: customFilesToAdd.length,
                last_updated: new Date().toISOString().split("T")[0],
              };
            }

            return row;
          })
        )
      );
    }

    if (associateLexicon === "pre-existing") {
      const existingFilesToAdd = existingFiles.map((file) => ({
        id: uuidV4(),
        name: file.file.name,
        size: file.file.size,
      }));

      dispatch(
        setRows(
          rows.map((row) => {
            if (row.id === lexiconDetails?.id) {
              return {
                ...row,
                pre_existing: "Yes",
                files: existingFilesToAdd,
                docs_in_corpus: existingFilesToAdd.length,
                last_updated: new Date().toISOString().split("T")[0],
              };
            }

            return row;
          })
        )
      );
    }

    dispatch(setCloseModal("addLexiconForm"));
    showAlert("Files added successfully", "success");
  };

  return (
    <Layout>
      <Form form={form} onSubmit={onSubmit}>
        <div className="mx-auto bg-white py-8 px-4 rounded-lg w-[400px]">
          <h2 className="text-gray-700 text-2xl font-bold text-center">Add New Lexicon</h2>

          <Tabs
            value={tabValue}
            className="w-full flex flex-col justify-center mt-8"
            onValueChange={(val) => setTabValue(val as "details" | "associate")}
          >
            <TabsList className="flex justify-center w-full ">
              <TabsTrigger
                value="details"
                className="flex flex-col data-[state=active]:bg-white data-[state=active]:text-drio-red rounded-lg border-none p-0 data-[state=inactive]:bg-transparent"
              >
                <span className="border-2 px-5 py-4 rounded-lg">1</span>
                <span>Details</span>
              </TabsTrigger>

              <Separator className="w-[160px] mx-8" />

              <TabsTrigger
                value="associate"
                className="flex flex-col data-[state=active]:bg-white data-[state=active]:text-drio-red rounded-lg border-none p-0 data-[state=inactive]:bg-transparent"
              >
                <span className="border-2 px-5 py-4 rounded-lg">2</span>
                <span>Associate</span>
              </TabsTrigger>
            </TabsList>

            <div className="px-4">
              <Separator className="w-full mt-8" />
            </div>

            <TabsContent value="details">
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

              <div className="py-2 flex gap-x-4 justify-center w-full mt-4 px-4">
                <Button
                  type="button"
                  intent={`secondary`}
                  className="w-full"
                  onClick={() => dispatch(setCloseModal("addLexiconForm"))}
                >
                  <span className="inline-flex justify-center w-full">Cancel</span>
                </Button>

                <Button className="w-full" intent={`primary`}>
                  <span className="inline-flex justify-center w-full">Save & Next</span>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="associate">
              <div className="mx-auto bg-white py-8 rounded-lg px-4 max-w-[380px]">
                <div className="bg-[#F9FAFB] w-full shadow py-2">
                  <h3 className="px-4 text-gray-700 text-[18px] font-medium mb-2">
                    Associate Lexicon
                  </h3>

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
                            RenderFiles({
                              filesToRender: existingFiles,
                              handleFileRemove,
                            })
                          ) : (
                            <>
                              <label
                                htmlFor="upload-existing-lexicon"
                                className="bg-white p-4 border shadow-sm mb-4 rounded cursor-pointer block w-full"
                              >
                                <RiUploadCloud2Line className="text-2xl text-gray-500 mx-auto mb-2" />
                                <p className="text-sm text-gray-700 text-center">
                                  <span className="font-bold">Click to upload</span> or drag and
                                  drop Wordnet zip file for the domain
                                </p>
                              </label>

                              <input
                                multiple
                                type="file"
                                accept="pdf/*"
                                className="hidden"
                                id="upload-existing-lexicon"
                                onChange={(e) => handleFileSelect(e, "pre-existing")}
                              />
                            </>
                          )}
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

                        {customfiles && Array.from(customfiles).length > 0 && (
                          <button
                            type="button"
                            className="flex items-center gap-x-1 text-sm text-red-800 transition-all duration-200 ease-in-out hover:text-red-900"
                          >
                            <FiBookOpen className="text-xl" />
                            <span className="font-medium">Create Lexicon</span>
                          </button>
                        )}
                      </div>

                      {associateLexicon === "create-new" && (
                        <div>
                          {customfiles && Array.from(customfiles).length > 0 ? (
                            RenderFiles({ filesToRender: customfiles, handleFileRemove })
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
                        </div>
                      )}
                    </RadioGroup.Root>
                  </div>
                </div>
              </div>

              <div className="py-2 flex gap-x-4 justify-center w-full mt-4 px-4">
                <Button
                  type="button"
                  intent={`secondary`}
                  className="w-full"
                  onClick={() => setTabValue("details")}
                >
                  <span className="inline-flex justify-center w-full">Back</span>
                </Button>

                <Button
                  type="button"
                  className="w-full"
                  intent={`primary`}
                  onClick={onFilesSubmit}
                  disabled={
                    associateLexicon === "" ||
                    (associateLexicon === "create-new" && customfiles.length === 0) ||
                    (associateLexicon === "pre-existing" && existingFiles.length === 0)
                  }
                >
                  <span className="inline-flex justify-center w-full">Add to Lexicon</span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Form>
    </Layout>
  );
}

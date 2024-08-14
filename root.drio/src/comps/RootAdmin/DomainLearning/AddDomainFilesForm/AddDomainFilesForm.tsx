import Layout from "@/comps/Layout";
import { v4 as uuidV4 } from "uuid";
import Button from "@/comps/ui/Button";
import React, { useState } from "react";
import showAlert from "@/comps/ui/Alert";
import RenderFiles from "../RenderFiles";
import { FiBookOpen } from "react-icons/fi";
import { RiUploadCloud2Line } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import { setRows } from "@/state/slices/lexiconSlice";

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

const AddLexiconFilesForm = () => {
  const dispatch = useAppDispatch();
  const [associateLexicon, setAssociateLexicon] = useState<string>("");
  const { rows, lexiconDetails } = useAppSelector((state) => state.lexicon);

  const [customfiles, setCustomFiles] = useState<FilesState>([]);
  const [existingFiles, setExistingFiles] = useState<FilesState>([]);

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

    dispatch(setCloseModal("addLexiconFilesForm"));
    showAlert("Files added successfully", "success");
  };

  return (
    <Layout>
      <div className="mx-auto bg-white py-8 rounded-lg px-4 w-[400px]">
        <h2 className="text-gray-700 text-2xl font-bold text-center mb-4">Add Files to Lexicon</h2>

        <div className="bg-[#F9FAFB] w-full shadow py-2">
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
                <label htmlFor="r1" className="text-gray-500 text-sm font-medium cursor-pointer">
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
                  <label htmlFor="r2" className="text-gray-500 text-sm font-medium cursor-pointer">
                    Custom Lexicon
                  </label>
                </div>

                {customfiles && Array.from(customfiles).length > 0 && (
                  <button
                    type="button"
                    className="flex items-center gap-x-1 text-sm text-red-900 transition-all duration-200 ease-in-out hover:text-red-900"
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
                          <span className="font-bold">Click to upload</span> or drag to bulk upload
                          files to automatically create a lexicon
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

        <div className="flex gap-x-4 p-4">
          <Button
            type="button"
            className="w-full"
            intent={`secondary`}
            onClick={() => dispatch(setCloseModal("addLexiconFilesForm"))}
          >
            Cancel
          </Button>

          <Button
            type="button"
            intent={`primary`}
            className="w-full"
            onClick={onFilesSubmit}
            disabled={
              associateLexicon === "" ||
              (associateLexicon === "create-new" && customfiles.length === 0) ||
              (associateLexicon === "pre-existing" && existingFiles.length === 0)
            }
          >
            Add to Lexicon
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default AddLexiconFilesForm;

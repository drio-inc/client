import React, { useState } from "react";
import { TbFile } from "react-icons/tb";
import { FiBookOpen } from "react-icons/fi";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { RiUploadCloud2Line, RiCloseFill } from "react-icons/ri";
import showAlert from "@/comps/ui/Alert";
import { setCloseModal, setOpenModal } from "@/state/slices/uiSlice";
import { useAppDispatch } from "@/hooks/useStoreTypes";
import Layout from "@/comps/Layout";
import Button from "@/comps/ui/Button";

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

type RenderFilesProps = {
  filesToRender: FilesState;
  renderType: "custom" | "existing";
};

const AddLexiconFilesForm = () => {
  const dispatch = useAppDispatch();
  const [associateLexicon, setAssociateLexicon] = useState<string>("");

  const [customfiles, setCustomFiles] = useState<FilesState>([]);
  const [existingFiles, setExistingFiles] = useState<FilesState>([]);

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

  const renderFiles = ({ filesToRender, renderType }: RenderFilesProps) => {
    const handleFileRemove = (idx: number) => {
      if (renderType === "custom") {
        setCustomFiles(customfiles.filter((_, i) => i !== idx));
      } else {
        setExistingFiles(existingFiles.filter((_, i) => i !== idx));
      }
    };

    const onUpload = async () => {
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

      dispatch(setOpenModal("successLexiconAlert"));
    };

    return (
      filesToRender && (
        <div className="w-full flex flex-col gap-y-4 mb-4">
          {filesToRender.map((enhancedFile, idx) => (
            <div
              className="flex justify-between items-center  bg-white p-4 rounded-md border text-gray-700"
              key={idx}
            >
              <div className="flex gap-x-2 ">
                <TbFile className="w-6 h-6 mt-1" />

                <div className="flex flex-col">
                  <span className="font-bold text-sm">
                    {enhancedFile.file.name.substring(0, 30)}...
                  </span>
                  <span className="text-xs">
                    {(enhancedFile.file.size / (1024 * 1024)).toFixed(2)}
                    mb
                  </span>
                </div>
              </div>

              <div className="blo">
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
      <div className="mx-auto bg-white py-8 px-6 rounded-lg w-[400px]">
        <h2 className="text-gray-700 text-2xl font-bold text-center">Add Files to Lexicon</h2>
        <div className="bg-[#F9FAFB] w-full shadow py-2 ">
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
                <label htmlFor="r1" className="text-gray-500 text-sm font-medium cursor-pointer">
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
                    renderFiles({ filesToRender: customfiles, renderType: "custom" })
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

          <div className="flex gap-x-4 p-4">
            <Button
              type="button"
              className="w-full"
              intent={`secondary`}
              onClick={() => dispatch(setCloseModal("addLexiconFilesForm"))}
            >
              <span className="inline-flex justify-center">Cancel</span>
            </Button>

            <Button
              type="button"
              intent={`primary`}
              className="w-full"
              disabled={
                associateLexicon === "" ||
                (associateLexicon === "create-new" && customfiles.length === 0) ||
                (associateLexicon === "pre-existing" && existingFiles.length === 0)
              }
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddLexiconFilesForm;

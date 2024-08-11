import { RiCloseFill } from "react-icons/ri";
import { TbFile } from "react-icons/tb";

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

type RenderFilesProps = {
  filesToRender: FilesState;
  handleFileRemove: (fileType: "custom" | "pre-existing", idx: number) => void;
};

const RenderFiles = ({ filesToRender, handleFileRemove }: RenderFilesProps) => {
  return (
    filesToRender && (
      <div className="w-full flex flex-col gap-y-4 mb-4">
        {filesToRender.map((enhancedFile, idx) => (
          <div
            className="flex justify-between items-center bg-white p-4 rounded-md border text-gray-700"
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

            <div>
              <RiCloseFill
                onClick={() => handleFileRemove(enhancedFile.fileType, idx)}
                className="text-gray-500 cursor-pointer w-6 h-6"
              />
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default RenderFiles;

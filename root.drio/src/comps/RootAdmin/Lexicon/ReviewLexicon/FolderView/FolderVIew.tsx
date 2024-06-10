import React, { useState } from "react";
import { FaFolder } from "react-icons/fa";
import { MdExpandMore, MdChevronRight } from "react-icons/md";

interface FolderViewProps {
  data: any;
  name?: string;
}
const FolderView = ({ data, name = "" }: FolderViewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // Determine if the data is an object or an array (considered as a folder)
  const isObject = typeof data === "object" && data !== null;
  const isArray = Array.isArray(data);

  // Only add click handlers and toggling if the data is a folder or array
  if (isObject) {
    return (
      <div>
        <div onClick={toggle} className="flex cursor-pointer gap-x-2">
          {isOpen ? (
            <span className="flex items-center text-gray-700">
              <MdExpandMore className="w-5 h-5" />
              <FaFolder />
            </span>
          ) : (
            <span className="flex items-center text-gray-700">
              <MdChevronRight className="w-5 h-5" />
              <FaFolder />
            </span>
          )}

          <strong>{name}</strong>
        </div>

        {isOpen && (
          <div className="pl-4">
            {isArray
              ? data.map((item, index) => (
                  <FolderView key={index} data={item} name={`Item ${index + 1}`} />
                ))
              : Object.keys(data).map((key) => (
                  <FolderView key={key} data={data[key]} name={key} />
                ))}
          </div>
        )}
      </div>
    );
  }

  // Render non-folder/array data
  return (
    <div>
      <span className="font-bold">{name}: </span>
      <span>{data}</span>
    </div>
  );
};

export default FolderView;

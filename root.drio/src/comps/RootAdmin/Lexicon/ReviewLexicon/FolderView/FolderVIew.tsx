import React, { useState } from "react";

interface FolderViewProps {
  data: any;
  name?: string;
}
const FolderView = ({ data, name = "" }: FolderViewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // Determine if the data is an object or an array (considered as a folder)
  const isFolder = typeof data === "object" && data !== null;
  const isArray = Array.isArray(data);

  // Only add click handlers and toggling if the data is a folder or array
  if (isFolder) {
    return (
      <div>
        <div onClick={toggle} style={{ cursor: "pointer" }}>
          <span>{isOpen ? "📂" : "📁"}</span> <strong>{name}</strong>
        </div>
        {isOpen && (
          <div style={{ paddingLeft: "20px" }}>
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
      {name ? <strong>{name}: </strong> : null}
      {data}
    </div>
  );
};

export default FolderView;

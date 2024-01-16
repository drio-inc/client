import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { BsXSquareFill } from "react-icons/bs";

type MetaTagsProps = {
  tags: {
    id: string;
    name: string;
    type?: string;
    status: string;
  }[];
};

const mapStatusToColor = {
  Pending: "border-[#FF7800] text-[#FF7800]",
  Rejected: "border-red-500 bg-red-50 text-red-500",
  default: "border-gray-500 bg-gray-50 text-gray-500",
  Approved: "border-green-500 bg-green-50 text-green-500",
};

type MapStatusToColor = keyof typeof mapStatusToColor;

const MetaTags = ({ tags }: MetaTagsProps) => {
  return (
    <div className="flex flex-wrap gap-1 py-[10px]">
      {tags?.map((tag, index) => (
        <div
          key={index}
          className={`flex justify-center border ${
            mapStatusToColor[tag.status as MapStatusToColor]
          } rounded-md px-2 py-1 items-center gap-x-2`}
          // style={{ minWidth: "calc(25% - 8px)" }}
        >
          {tag.status === "Rejected" && (
            <BsXSquareFill className="text-red-500" />
          )}

          {tag.status === "Approved" && (
            <FaCheckSquare className="text-green-500" />
          )}

          {tag.status === "Pending" && (
            <Image
              width={18}
              height={18}
              alt="pending logo"
              src="/pending.svg"
            />
          )}

          <span
            className={`text-xs capitalize ${
              mapStatusToColor[tag.status as MapStatusToColor]
            } font-medium`}
          >
            {tag.name ?? tag.type}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MetaTags;

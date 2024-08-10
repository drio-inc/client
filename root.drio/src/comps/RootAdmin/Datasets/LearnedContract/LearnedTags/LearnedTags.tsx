import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { BsXSquareFill } from "react-icons/bs";
import { MdPersonOutline } from "react-icons/md";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/comps/ui/Tooltip";

type LearnedTagsProps = {
  tags: {
    id: string;
    name: string;
    type?: string;
    status: string;
    addedByUser: boolean;
  }[];
};

const mapStatusToColor = {
  Pending: "border-[#FF7800] text-[#FF7800]",
  Rejected: "border-red-500 bg-red-50 text-red-500",
  default: "border-gray-500 bg-gray-50 text-gray-500",
  Approved: "border-green-500 bg-green-50 text-green-500",
};

type MapStatusToColor = keyof typeof mapStatusToColor;

const LearnedTags = ({ tags }: LearnedTagsProps) => {
  console.log(tags);

  return (
    <div className="flex flex-wrap gap-1 py-[10px]">
      {tags?.map((tag, index) => (
        <div
          key={index}
          className={`flex justify-center border ${
            mapStatusToColor[tag.status as MapStatusToColor]
          } rounded-md px-2 py-1 items-center`}
          // style={{ minWidth: "calc(25% - 8px)" }}
        >
          <div className="flex items-center">
            {tag.status === "Rejected" && <BsXSquareFill className="text-red-500" />}

            {tag.status === "Approved" && <FaCheckSquare className="text-green-500" />}

            {tag.status === "Pending" && (
              <Image width={18} height={18} alt="pending logo" src="/pending.svg" />
            )}

            {tag.addedByUser && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <MdPersonOutline />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Added by User</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          <span
            className={`inline-block ml-1 mt-0.5 text-xs capitalize ${
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

export default LearnedTags;

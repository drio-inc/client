import Image from "next/image";
import { FaCheckSquare } from "react-icons/fa";
import { BsXSquareFill } from "react-icons/bs";

type MetaTagsProps = {
  tags: {
    id: string;
    name: string;
    status: string;
  }[];
};

const MetaTags = ({ tags }: MetaTagsProps) => {
  return (
    <div className="inline-grid grid-cols-3 gap-2 my-2">
      {tags.map((tag, index) => (
        <div
          key={index}
          className={`inline-flex flex-wrap border ${
            tag.status === "Pending"
              ? "border-[#FF7800]"
              : tag.status === "Approved"
              ? "border-green-500 bg-green-50"
              : tag.status === "Rejected"
              ? "border-red-500 bg-red-50"
              : "border-gray-500 bg-gray-50"
          } rounded-md px-2 py-1 items-center gap-x-2`}
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
              tag.status === "Pending"
                ? "text-[#FF7800]"
                : tag.status === "Approved"
                ? "text-green-500"
                : tag.status === "Rejected"
                ? "text-red-500"
                : "text-gray-500"
            } font-medium`}
          >
            {tag.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MetaTags;

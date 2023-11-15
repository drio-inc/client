import Image from "next/image";

export const headers = [
  {
    header: "Rule Name",
    accessor: "name",
  },
  {
    header: "Dataset",
    accessor: "dataset",
  },
  {
    header: "Default Allow",
    accessor: "defaultAllow",
  },
  {
    header: "Metadata",
    accessor: "metadata",
  },
  {
    header: "Conditions",
    accessor: "conditions",
  },
  {
    header: "Conditional Value",
    accessor: "value",
  },
  {
    header: "Subrule",
    accessor: "subrule",
  },
  {
    header: "Action",
    accessor: "action",
  },
];

const EmptyTable = () => {
  return (
    <>
      <div className="w-full flex justify-between bg-[#F4F9FF]">
        {headers?.map((header, index) => (
          <div
            key={index}
            className={"font-bold uppercase text-gray-500 text-xs p-4"}
          >
            {header.header}
          </div>
        ))}
      </div>
      <div className="relative bg-gradient-to-t from-gray-100">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="border-t border-b p-4 h-[48px]" />
        ))}

        <Image
          width={40}
          height={40}
          alt="empty"
          src="/document.svg"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white"
        />
      </div>
    </>
  );
};

export default EmptyTable;

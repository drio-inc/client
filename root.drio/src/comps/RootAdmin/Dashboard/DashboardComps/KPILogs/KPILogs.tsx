import React from "react";

type KPILogsProps = {
  text: string;
  messages: number;
};

const KPILogs = ({ text, messages }: KPILogsProps) => {
  return (
    <div className="flex items-center gap-x-4 border p-4 rounded-md mb-4 bg-white">
      <div className="border-[6px] border-drio-red w-12 h-12 rounded-full" />
      <div className="flex flex-col text-gray-700">
        <span>
          <span className="font-bold font-inter">{messages}</span> Messages
        </span>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default KPILogs;

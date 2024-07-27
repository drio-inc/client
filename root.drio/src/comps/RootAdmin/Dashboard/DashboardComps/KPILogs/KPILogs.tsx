import React from "react";

type KPILogsProps = {
  text: string;
  messages: number;
};

const KPILogs = ({ text, messages }: KPILogsProps) => {
  return (
    <div className="border p-4 rounded-md mb-4 bg-gray-50">
      <div className="flex items-center justify-between text-gray-700 w-full">
        <div className="flex items-center gap-x-2">
          <span className="font-bold font-inter text-2xl">{messages}</span> Messages
        </div>
        <span className="text-gray-500">{text}</span>
      </div>
    </div>
  );
};

export default KPILogs;

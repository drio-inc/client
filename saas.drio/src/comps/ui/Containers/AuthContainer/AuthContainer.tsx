import React from "react";
import Image from "next/image";

const AuthContainer = ({
  authText,
  children,
  authSubText,
  maxWidth = "6xl",
}: {
  maxWidth?: "xl" | "6xl";
  authText: string;
  authSubText?: string;
  children: React.ReactNode;
}) => {
  return (
    <section className={`flex flex-col items-center justify-center relative`}>
      <Image
        src="/lang.svg"
        alt="lang"
        width={24}
        height={12}
        className="absolute top-0 right-0 -mr-8 my-2 md:m-4"
      />
      <div
        className={`${
          maxWidth === "xl" ? `max-w-xl` : `max-w-6xl`
        } px-8 sm:px-16 py-10 md:py-24 mx-auto`}
      >
        <div className="flex flex-col text-center items-center w-full mb-8">
          <Image
            src="/logo.svg"
            alt="Drio Logo"
            width={145}
            height={145}
            className="mb-8"
          />
          <h1 className="sm:text-3xl text-2xl font-extrabold text-gray-900">
            {authText}
          </h1>
          <span className="text-sm text-gray-600 inline-block mt-2">
            {authSubText}
          </span>
        </div>
        <div className="w-full mx-auto bg-white p-8 drop-shadow rounded-lg">
          <div className="flex flex-wrap -m-2">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default AuthContainer;

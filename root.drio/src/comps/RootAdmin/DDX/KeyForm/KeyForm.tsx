import showAlert from "@/comps/ui/Alert";
import { HiOutlineDuplicate } from "react-icons/hi";

interface KeyFormProps {}

const copyKey = () => {
  navigator.clipboard.writeText("wJalrXUtnFEMIK7MDENGbPxRfiCY");

  showAlert("Rollover Key Successfully Copied!", "success");
};

const KeyForm = () => {
  return (
    <div className="py-2 relative">
      <input
        disabled
        className={`transition-colors ease-in-out duration-200 border py-2 px-3 my-1 rounded-md focus:outline-none shadow-sm md:text-sm 2xl:text-base`}
        placeholder={"wJalrXUtnFEMIK7MDENGbPxRfiCY"}
      />

      <HiOutlineDuplicate
        className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 z-50 cursor-pointer block bg-gray-100"
        onClick={() => copyKey()}
      />
    </div>
  );
};

export default KeyForm;

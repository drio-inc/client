import showAlert from "@/comps/ui/Alert";
import { HiOutlineDuplicate } from "react-icons/hi";
import { useAppSelector } from "@/hooks/useStoreTypes";

const KeyForm = () => {
  const { clusterToken } = useAppSelector((state) => state.DDX);

  const copyKey = () => {
    navigator.clipboard.writeText(clusterToken);
    showAlert("Token Successfully Copied!", "success");
  };

  return (
    <div className="relative bg-indigo-100 rounded-md flex items-center shadow-sm">
      <input
        disabled
        value={clusterToken}
        className={`py-[10px] px-3 focus:outline-none md:text-sm 2xl:text-base`}
      />

      <div className="px-2">
        <HiOutlineDuplicate
          className="w-5 h-5 text-gray-700 z-50 cursor-pointer block bg-indigo-100"
          onClick={() => copyKey()}
        />
      </div>
    </div>
  );
};

export default KeyForm;

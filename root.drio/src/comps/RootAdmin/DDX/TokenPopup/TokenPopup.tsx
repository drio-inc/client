import showAlert from "@/comps/ui/Alert";
import { setCloseModal } from "@/state/slices/uiSlice";
import { HiOutlineDuplicate, HiX } from "react-icons/hi";
import { setClusterToken } from "@/state/slices/DDXSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

const TokenPopup = () => {
  const dispatch = useAppDispatch();
  const { clusterToken } = useAppSelector((state) => state.DDX);

  const copyKey = () => {
    navigator.clipboard.writeText(clusterToken);
    showAlert("Token Successfully Copied!", "success");
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700">DDX Cluster Token</h2>
        <HiX
          className="w-6 h-6 cursor-pointer"
          onClick={() => {
            dispatch(setClusterToken(""));
            dispatch(setCloseModal("tokenPopup"));
          }}
        />
      </div>

      <p className="mt-2 mb-6">
        Please copy this{" "}
        <span className="font-bold text-drio-red-dark">ONE TIME</span> token to
        bring up a DDX instance. If you lose this token, <br /> you will need to
        generate a new one from the cluster details screen.
      </p>
      <div className="bg-indigo-100 flex items-center rounded-md">
        <input
          disabled
          value={clusterToken.substring(0, 60) + "..."}
          className={`py-[10px] px-3 focus:outline-none md:text-sm 2xl:text-base w-full`}
        />

        <div className="px-2">
          <HiOutlineDuplicate
            className="w-5 h-5 text-gray-700 z-50 cursor-pointer block bg-indigo-100"
            onClick={() => copyKey()}
          />
        </div>
      </div>
    </div>
  );
};

export default TokenPopup;

import Link from "next/link";
import { useRouter } from "next/router";
import { HiX } from "react-icons/hi";
import { setCloseModal } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

const DataSourcePopup = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const ui = useAppSelector((state) => state.ui);
  return (
    <div className="px-4 py-6 w-[35vw]">
      <div className="flex justify-between">
        <h2 className="capitalize text-xl font-bold text-gray-700">
          {ui.notification}
        </h2>
        <HiX
          className="w-6 h-6 cursor-pointer"
          onClick={() => dispatch(setCloseModal("dataSourcePopup"))}
        />
      </div>

      <span className="font-medium my-2 text-gray-700 block">
        Discovering and learning from data source. This may take a while.
      </span>

      <p className="mt-2">
        Please proceed to{" "}
        <span
          className="text-blue-500 hover:text-blue-600 hover:underline inline-block cursor-pointer"
          onClick={() => {
            dispatch(setCloseModal("dataSourcePopup"));
            router.push(`/datasets/my-datasets`);
          }}
        >
          My Datasets
        </span>{" "}
        page to view the details of the discovered data, the learned schema and
        metadata.
      </p>
    </div>
  );
};

export default DataSourcePopup;

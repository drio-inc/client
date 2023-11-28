import { HiX } from "react-icons/hi";
import Button from "@/comps/ui/Button";
import showAlert from "@/comps/ui/Alert/Alert";
import { useAppDispatch } from "@/hooks/useStoreTypes";
import { useDeleteDataSourceMutation } from "@/api/resources/data-sources";

import { setCloseModal } from "@/state/slices/uiSlice";
import { setSelectedRows } from "@/state/slices/dataSourceSlice";

const DeleteOrgUnit = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const [deleteDataSource, result] = useDeleteDataSourceMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteDataSource({
        id: row?.id ?? "",
        ou_id: row?.ou_id ?? "",
        account_id: row?.account_id ?? "",
      });

      dispatch(setSelectedRows([]));
      dispatch(setCloseModal("deleteDataSource"));
      showAlert("Data source deleted successfully", "success");
    } catch (error) {
      showAlert("Something went wrong", "error");
    }
  };

  return (
    <div className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white py-12 px-8 shadow-sm focus:outline-none">
      <div className="mx-auto w-20 h-20 rounded-full bg-[#FFE8EC] flex items-center justify-center mb-4">
        <HiX className="text-[#FF4D4D] w-10 h-10 mx-auto" />
      </div>
      <h2 className="text-[#223354] text-2xl font-bold text-center">
        Are you sure you want to permanently delete {row.name}?
      </h2>
      <p className="text-[#223354] opacity-50 mt-4 mb-5 text-center">
        Once completed, this action cannot be reverted.
      </p>
      <div className="flex justify-center gap-6">
        <button
          onClick={() => dispatch(setCloseModal("deleteDataSource"))}
          className="text-[#1A75FF] inline-flex items-center justify-center rounded px-4 outline-none focus:border"
        >
          Cancel
        </button>

        <Button isLoading={result.isLoading} onClick={() => handleDelete()}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteOrgUnit;

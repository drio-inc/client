import { HiX } from "react-icons/hi";
import Button from "@/comps/ui/Button";
import showAlert from "@/comps/ui/Alert/Alert";
import { useDeleteDDXClusterMutation } from "@/api/resources/ddx";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";
import { setRows, setSelectedRows } from "@/state/slices/orgUnitSlice";

const DeleteDDX = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const [deleteDDX, result] = useDeleteDDXClusterMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteDDX({
        account_id: row?.account_id ?? "",
        ou_id: row?.id ?? "",
        cluster_id: row?.id ?? "",
      }).unwrap();

      dispatch(setRows([]));
      dispatch(setSelectedRows([]));

      dispatch(setCloseModal("deleteDDX"));
      showAlert("DDX cluster deleted successfully", "success");
    } catch (error: any) {
      showAlert(
        error.data.messsage ?? "Something went wrong, please try again",
        "error"
      );
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
          onClick={() => dispatch(setCloseModal("deleteDDX"))}
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

export default DeleteDDX;
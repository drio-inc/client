import { HiRefresh, HiX } from "react-icons/hi";
import Button from "@/comps/ui/Button";
import showAlert from "@/comps/ui/Alert/Alert";
import { useResetGraphMutation } from "@/api/events";
import { useAppDispatch } from "@/hooks/useStoreTypes";

import { setCloseModal } from "@/state/slices/uiSlice";
import { setSelectedRows, setRows } from "@/state/slices/eventSlice";

const ResetPipelineModal = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();
  const [resetPipeline, result] = useResetGraphMutation();

  const handleResetPipeline = async () => {
    try {
      const res = await resetPipeline(null).unwrap();

      dispatch(setRows([]));
      dispatch(setSelectedRows([]));
      dispatch(setCloseModal("resetPipelineModal"));
      showAlert(
        `Pipeline reset successfully. Cleared ${res.result.emergency_reset.number_of_reset_nodes} nodes`,
        "success"
      );
    } catch (error) {
      showAlert("Something went wrong", "error");
    }
  };

  return (
    <div className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white py-12 px-8 shadow-sm focus:outline-none">
      <div className="mx-auto w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
        <HiRefresh className="text-yellow-700 w-10 h-10 mx-auto" />
      </div>

      <h2 className="text-[#223354] text-2xl font-bold text-center">
        Are you sure you want to reset the pipeline?
      </h2>

      <p className="text-[#223354] opacity-50 mt-4 mb-5 text-center">
        Once reset, all events will be cleared and the pipeline will be reset.
      </p>

      <div className="flex justify-center gap-6">
        <button
          onClick={() => dispatch(setCloseModal("resetPipelineModal"))}
          className="text-[#1A75FF] inline-flex items-center justify-center rounded px-4 outline-none focus:border"
        >
          Cancel
        </button>

        <Button
          disabled={result.isLoading}
          isLoading={result.isLoading}
          onClick={() => handleResetPipeline()}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default ResetPipelineModal;

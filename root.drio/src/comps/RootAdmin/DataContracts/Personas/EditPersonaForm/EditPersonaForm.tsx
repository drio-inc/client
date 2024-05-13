import Button from "@/comps/ui/Button";
import { useAppDispatch } from "@/hooks/useStoreTypes";
import { setCloseModal } from "@/state/slices/uiSlice";

const EditPersonaForm = ({ row }: TableRow) => {
  const dispatch = useAppDispatch();

  return (
    <div className="mx-auto bg-white p-4 rounded-lg xl:max-w-[25vw] 2xl:max-w-[22vw] w-[400px]">
      <h2 className="text-gray-700 text-2xl font-bold text-center">Edit Persona</h2>

      <p className="text-center mt-4">Form to be defined</p>

      <div className="px-2 py-2 flex gap-4 justify-center w-full mt-4">
        <Button
          type="button"
          className="w-full"
          intent={`secondary`}
          onClick={() => dispatch(setCloseModal("editPersonaForm"))}
        >
          <span className="inline-flex justify-center">Cancel</span>
        </Button>
      </div>
    </div>
  );
};

export default EditPersonaForm;

import Table from "@/comps/ui/Table";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import Modal from "../ui/Modal";
import Button from "../ui/Button";
import EventMenu from "./EventMenu";
import { HiPlus, HiRefresh } from "react-icons/hi";
import DispatchEventForm from "./DispatchEventForm";
import { setOpenModal } from "@/state/slices/uiSlice";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import ResetPipelineModal from "./ResetPipelineModal/ResetPipelineModal";

const headers = [
  {
    header: "Occurence Time",
    accessor: "occurence_time",
  },

  {
    header: "Event",
    accessor: "event",
  },

  {
    header: "Event Type",
    accessor: "event_type",
  },

  {
    header: "Location",
    accessor: "location",
  },

  {
    header: "Severity",
    accessor: "severity",
  },

  {
    header: "Affected Nodes",
    accessor: "number_of_affected_nodes",
  },
];

const Events = () => {
  const dispatch = useAppDispatch();
  const { rows, selectedRows } = useAppSelector(({ event }) => event);

  return (
    <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white gap-4"}>
      <div className="flex gap-4 ml-auto items-center mt-4 mr-4">
        <Button
          icon={<HiPlus />}
          intent={"primary"}
          onClick={() => dispatch(setOpenModal("dispatchEventForm"))}
        >
          Publish New Event
        </Button>

        <Button
          icon={<HiRefresh />}
          intent={"primary"}
          onClick={() => dispatch(setOpenModal("resetPipelineModal"))}
        >
          Reset Knowledge Graph
        </Button>
      </div>

      <div className="hidden">
        <Modal identifier="dispatchEventForm">
          <DispatchEventForm />
        </Modal>
      </div>

      <div className="hidden">
        <Modal identifier="resetPipelineModal">
          <ResetPipelineModal />
        </Modal>
      </div>

      <Table
        important
        rows={rows}
        noSelection
        headers={headers}
        menu={EventMenu}
        selectedRows={selectedRows}
      />
    </div>
  );
};

export default Events;

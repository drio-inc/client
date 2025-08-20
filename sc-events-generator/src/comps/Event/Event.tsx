import Table from "@/comps/ui/Table";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import Button from "../ui/Button";
import EventMenu from "./EventMenu";
import { HiPlus, HiRefresh } from "react-icons/hi";
import { useGetEventsQuery } from "@/api/events";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import { setOpenModal } from "@/state/slices/uiSlice";
import Modal from "../ui/Modal";
import DispatchEventForm from "./DispatchEventForm";

const headers = [
  {
    header: "Event ID",
    accessor: "event_id",
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
    header: "Country",
    accessor: "country",
  },

  {
    header: "State",
    accessor: "state",
  },

  {
    header: "City",
    accessor: "city",
  },

  {
    header: "Severity",
    accessor: "severity",
  },

];

const Events = () => {
	const dispatch = useAppDispatch();
  const { data, isLoading } = useGetEventsQuery({
    name: "",
    offset: 0,
    limit: 10,
  });

  const { rows, selectedRows } = useAppSelector(({ event }) => event);

   if (isLoading) return <StaticLoader />;

  return (
    <div className={"flex flex-col w-full shadow-lg rounded-lg bg-white gap-4"}>
      <div className="flex gap-4 ml-auto items-center mt-4 mr-4">
        <Button
          icon={<HiPlus />}
          intent={"primary"}
          onClick={() => dispatch(setOpenModal("dispatchEventForm"))}
        >
          Dispatch New Event
        </Button>

        <Button
          icon={<HiRefresh />}
          intent={"primary"}
          onClick={() => dispatch(setOpenModal("dispatchEventForm"))}
        >
        Resest Knowledge Graph
        </Button>
      </div>

      <div className="hidden">
        <Modal identifier="dispatchEventForm">
          <DispatchEventForm />
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

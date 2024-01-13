import Image from "next/image";
import Modal from "@/comps/ui/Modal";
import { v4 as uuidv4 } from "uuid";
import Button from "@/comps/ui/Button";
import DatasetTable from "../DatasetTable";
import { setOpenModal } from "@/state/slices/uiSlice";
import { useAppDispatch } from "@/hooks/useStoreTypes";

type Categories = {
  name: string;
  organizations: {
    id: string;
    ou: string;
    name?: string;
    imgURL: string;
    dataset?: string;
  }[];
}[];

const categories: Categories = [
  {
    name: "Automotive",
    organizations: [
      {
        id: uuidv4(),
        ou: "Corporate",
        dataset: "Auto Sales",
        name: "Cox Automotive",
        imgURL: "/images/cox-automotive-2.jpeg",
      },
      {
        id: uuidv4(),
        ou: "Xtime",
        name: "Cox Automotive",
        dataset: "Dealer Orders",
        imgURL: "/images/cox-automotive-2.jpeg",
      },
      {
        id: uuidv4(),
        dataset: "Quotes",
        name: "DHL Express",
        imgURL: "/images/dgf.svg",
        ou: "International Shipping",
      },
      {
        id: uuidv4(),
        ou: "Corporate",
        name: "Gebruder Weiss",
        dataset: "Order Tracking",
        imgURL: "/images/gw.jpeg",
      },
    ],
  },
  {
    name: "Customer",
    organizations: [
      {
        id: uuidv4(),
        ou: "Corporate",
        dataset: "Tesla",
        imgURL: "/company-logo.svg",
      },
    ],
  },
];

const Categories = () => {
  const dispatch = useAppDispatch();

  const openModal = (id: string) => {
    dispatch(setOpenModal(`viewDatasetTable-${id}`));
  };

  return (
    <div className="border bg-gray-100 rounded-md">
      {categories.map((category, index) => {
        return (
          <div key={index}>
            <span className="bg-gray-50 block p-4 rounded-md">
              {category.name}
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 p-6 gap-8">
              {category.organizations.map((ou, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-wrap p-4 shadow-md rounded-lg divide-y-2 lg:divide-y-0 lg:divide-x-2 gap-x-2 bg-white -m-2"
                  >
                    <div className="w-full lg:w-1/4 flex flex-col items-center p-4">
                      <div className="rounded-full shadow-xl p-3 mb-4">
                        <Image
                          width={50}
                          height={50}
                          src={ou.imgURL}
                          alt={ou.dataset ?? "Company Logo"}
                          className="rounded-full aspect-square object-cover object-center"
                        />
                      </div>

                      <span>{ou.name}</span>
                    </div>
                    <div className="flex-grow flex flex-col p-4 gap-y-2">
                      <span>{ou.ou}</span>
                      <span className="text-gray-500">{ou.dataset}</span>
                      <div className="w-full 2xl:w-1/3">
                        <Button
                          className="w-full"
                          intent="primaryOutline"
                          onClick={() => openModal(ou.id ?? "")}
                        >
                          View
                        </Button>
                      </div>
                      <div className="hidden">
                        <Modal identifier={`viewDatasetTable-${ou.id}`}>
                          <DatasetTable index={ou.id ?? ""} />
                        </Modal>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
